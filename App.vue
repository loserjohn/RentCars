<script>
	import SET from '@/SET.js';
	import Utils from '@/common/utils.js';
	// // #ifdef H5	
	// const jweixin = require('jweixin-module');
	// import pageAnimation from './components/page-animation'
	// // #endif


	import Vue from 'vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				set: {
					appid: SET.appid, //测试环境
					redirect_uri: SET.redirect,
				},
				wxConfig: '',
				ifWxLogin: false //wx是微信登录 ，mm密码登录
			};
		},
		//#ifdef H5
		// mixins: [pageAnimation],
		// #endif
		onLaunch: function() {
			const token = uni.getStorageSync(SET.tokenName);
			const opid = uni.getStorageSync(SET.opIdName);
			let that = this;
			// 	uni.$on('settleStudy', (data) => {
			// 		that.settleStudy(data)
			// 	})
			// 	// #ifdef H5	
			// 		this.ifWx = uni.getStorageSync('ifWx')
			// 		uni.removeStorageSync('studyTime')


			// 		uni.$on('wxPay', (data) => {
			// 			that.wxPay(data)
			// 		})
			// 		let url = window.location.href;
			// 		let i = url.match(/action=(.*)action/);
			// 		let p = url.match(/payload=(.*)payload/);

			// 		let s = url.match(/code=(.*)&state/); //微信code
			// 		// 记录动作
			// 		if (i && i[1] && p && p[1]) {
			// 			// 储存推广码 分享注册
			// 			let action = i[1];
			// 			let payload = p[1]
			// 			// 记录动作
			// 			this.$store.commit('currentAction', {
			// 				action,
			// 				payload
			// 			})
			// 			if (action == 'share') {
			// 				uni.setStorageSync('inviCode', payload)
			// 			}
			// 		}
			// 		// 先判断微信浏览器下获取code
			// 		if (this.ifWx) {
			// 			this._iniWxJdk();
			// 			if (!s && !opid) {
			// 				// 是授权后的页面,则做opnegid判断 使用code获取pid

			// 				Utils.wx_auth()
			// 				return false;
			// 			}else if(s && s[1]&& !opid ){
			// 				this._getOpenId(s[1],0)
			// 				// return false;
			// 			}
			// 		}else{
			// 			// window.location.href = "http://shop.fjdmll.com/onlyWx.html"
			// 			// return
			// 		}	
			// 	// #endif

			// 	// #ifdef MP	
			// 		if (!opid) {
			// 			// 是授权后的页面,则做opnegid判断 使用code获取pid
			// 			uni.login({
			// 			  provider: 'weixin', 
			// 			  success: function (res) {
			// 				let code =  res.code;
			// 				// 获取code换opid
			// 				console.log(code)
			// 				// const r = await that.getopId(code)	
			// 				that._getOpenId(code,1)	
			// 			  }
			// 			});
			// 		}
			// 	// #endif
			// 	//判断是否已登过,进行免登
			// 	if (token) {
			// 		//直接判断token是过期
			// 		this.ifEffect()
			// 		// return;
			// 	}

		},
		onShow: function() {

		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 结算学习进度
			async settleStudy(data) {
				// alert(data.duration)
				// console.log(data)
				let that = this;
				if (data.currentTime == 0) return;


				try {
					let res = await this.$api.SubmitLearn({
						"catalogue_code": data.code, //目录编码
						"course_code": data.classCode, //目录编码
						"last_duration": data.currentTime, //上次播放时间
					});
					if (res.Success) {


					} else {

					}
				} catch (err) {
					console.log('请求结果false : ' + err)

				}
			},
			// 使用code获取pid  ,直接判断是否存在，存在则直接登录，不存在则
			async _getOpenId(code, type) {
				let that = this;
				try {
					const inviCode = uni.getStorageSync('inviCode')
					let data = {
						// "wx_code": code,
						// "invitation": inviCode
						"wx_code": code,
						"wx_code_type": type, //0-公众号 1-小程序
					}
					this.$ui.showloading()
					let res = await this.$api.GetOpenId(data, false);
					this.$ui.hideloading()

					console.log(res)
					// return

					if (res.Success) {
						// #ifdef H5
						uni.setStorageSync(SET.opIdName, res.Data.openid)
						uni.setStorageSync('zdjy_wxAccount', res.Data);
						// #endif
						// #ifdef MP
						uni.setStorageSync(SET.opIdName, res.Data)
						// #endif
					} else {

					}
				} catch (err) {
					uni.hideLoading()
				}
			},
			// token是否过期判断
			async ifEffect() {
				let that = this;
				try {
					let res = await this.$api.getConsumer({}, false);
					// console.log(res)
					if (res.Success) {
						// 有效token，直接登录
						that.$store.commit('userLogin')
						that.$store.commit('setUserInfo', res.Data);
						// uni.switchTab({
						// 	url:'/pages/home/main/main'
						// })
					} else {
						// uni.switchTab({
						// 	url:'/pages/home/main/main'
						// })
						that.$store.commit('userLoginOut')
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
					that.$store.commit('userLoginOut')
				}
			},
			// 微信sdk
			async _iniWxJdk() {
				let that = this;
				try {
					// #ifdef H5
					let url = window.location.href;
					// #endif
					let res = await this.$api.GetWxJsApiConfig({
						url: url
					}, true);

					if (res.Success) {
						let set = res.Data;
						that.wxConfig = set
						jweixin.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: set.appId, // 必填，公众号的唯一标识
							timestamp: set.timestamp, // 必填，生成签名的时间戳
							nonceStr: set.noncestr, // 必填，生成签名的随机串
							signature: set.signature, // 必填，签名
							jsApiList: [
								'onMenuShareAppMessage',
								'onMenuShareTimeline',
								'onMenuShareQQ',
								'onMenuShareQZone',
								'onMenuShareWeibo',
								'chooseWXPay',
								'chooseImage',
								'uploadImage'
							] // 必填，需要使用的JS接口列表
						});
						jweixin.ready(function() {
							// alert('ok')
							// 我自己的pid
							// let parentId = that.accountInfo.invitation_code
							let options = {
								title: '中旦教育', // 分享标题
								link: SET.mainUrl, // 分享链接，记得使用绝对路径，不能用document.URL
								imgUrl: './static/img/logo.png', // 分享图标
								desc: '中旦教育', // 分享描述
								success: function() {
									console.info('分享成功！');
								},
								cancel: function() {
									console.info('取消分享！');
									// 用户取消分享后执行的回调函数
								}
							};
							// jweixin.updateTimelineShareData(options); // 分享到朋友圈
							// jweixin.updateAppMessageShareData(options); // 分享给朋友
							jweixin.onMenuShareAppMessage(options); // 分享到朋友圈
							jweixin.onMenuShareTimeline(options); // 分享给朋友
							jweixin.onMenuShareQQ(options); // 分享到朋友圈
							jweixin.onMenuShareQZone(options); // 分享给朋友
							jweixin.onMenuShareWeibo(options); // 分享到朋友圈
						});
						jweixin.error(function(res) {
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
							console.log(JSON.stringify(res));
						});
						// Vue.prototype.$jsWx = jweixin
					} else {}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			// 微信js支付（公众号专用）
			async wxPay(data) {
				// debugger
				let that = this

				let s = `{${data.js_prepay_info}}`
				// console.log(s)
				let set = s.replace(/\'/g, '"');
				// console.log(set)
				set = JSON.parse(set)

				jweixin.chooseWXPay({
					timestamp: set
					.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: set.nonceStr, // 支付签名随机串，不长于 32 位
					package: set.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
					signType: set.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: set.paySign, // 支付签名
					success: function(res) {
						// 支付成功后的回调函数
						uni.redirectTo({
							url: '/pages/success/success'
						})
					},
					false: function() {

					},
				});
			},
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */

	.pages {
		width: 100vw;
		min-height: 100vh;
		background-color: #f4f4f4;
	}
	view,text{
		font-size: 26rpx;
	}
	.hover {
		background-color: #f7f7f7;
		transform: translate(-1rpx, -1rpx);
	}

	.cm_action {
		width: 48rpx;
		height: 48rpx;
	}

	.cm_hover_m {
		transform: translate(-1rpx, -1rpx);
	}

	.hover_eee {
		background-color: #ccc;
	}
	.cm_boxs{
		background-color: #fff;
		margin-bottom: 16rpx;
		padding: 32rpx 30rpx;
	}
	.cm_title {
		color: #333;
		font-weight: 600;
		font-size: 30rpx;
		margin-bottom: 24rpx;
	}

	.cm_text {
		color: #999;
		font-size: 26rpx;
		line-height: 1;
	}

	.cm_time {
		color: #999;
		font-size: 24rpx;
		line-height: 1;
	}

	.cm_full {
		width: 100vw;
		height: 80vh;
	}

	.cm_ellipsis {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.cm_ellipsis2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.contain {
		width: 100%;
		height: auto;
	}

	.cm_bdb {
		position: relative;
	}

	.cm_bdb::before {
		content: '';
		width: 100%;
		height: 1rpx;
		background: #f1f1f1;
		transform: scaleY(.5);
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.cm_price {
		color: #FA3534;
		font-size: 36rpx;
		font-weight: 600;

	}

	.cm_price_tip {
		color: #EE7F48;
		font-size: 44rpx;
		font-weight: 400;
		position: relative;
		text-indent: 30rpx;
	}

	.cm_price_tip::before {
		    content: '￥';
		    position: absolute;
		    left: -28rpx;
		    bottom: 0rpx;
		    color: #EE7F48;
		    font-size: 28rpx;
	}

	.cm_price_delete {
		color: #999;
		/* font-size: 28upx; */
		text-decoration: line-through;
	}

	.flex {
		display: -webkit-flex;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.u-flex-y,
	.flex-y {
		display: -webkit-flex;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.f1 {
		flex: 1;
	}

	.f2 {
		flex: 2;
	}

	uni-button {
		background-color: #fff;
		border: none;
	}

	uni-button::after {
		border: none;
	}

	.cm_tags {
		border-radius: 40rpx;
		border: 1rpx solid #f1f1f1;
	}

	.saveBottom {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

	}

	.cm_bg {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 0;
	}
</style>
