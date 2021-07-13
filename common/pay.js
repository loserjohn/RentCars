import SET from '../SET.js'
import http from './http/index.js'
const jweixin = require('jweixin-module')
const PayUtils = {
	// 支付宝支付  app/小程序
	AliPay(strData, callback, failFun) {
		if (!strData) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}
		uni.requestPayment({
			provider: "alipay",
			orderInfo: strData,
			success: function(res) {
				plus.nativeUI.toast('支付成功');
				if (callback) callback()
			},
			fail: function(res) {
				if (failFun) {
					failFun();
					return;
				}
				uni.showToast({
					title: '支付失败',
					icon: "none",
					duration: 2000,
					complete: function() {
						uni.redirectTo({
							url: '/pages/features/order/order?current=1'
						})
					}
				});
			}
		});
	},
	// 支付宝支付_h5
	AliPay_H5(strData, callback, failFun) {
		if (!strData) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}
		try {
			let url = window.location.href
			let res = await http.GetWxJsApiConfig({url:url}, true)	 //获取支付参数 返回的是表单字符
			if (res.Success) {
				const div = document.createElement('div');
				console.log("我是后端返回的数据:"+res.Data)
				div.innerHTML = res.Data;
				document.body.appendChild(div);
				// console.log("punchout_form:"+document.forms.punchout_form)
				document.forms.punchout_form.submit();
			} else {
		
			}
		} catch (err) {
			console.log('请求结果false : ' + err)
		
		}
		
	},
	// 微信支付_h5 jsapi支付（公众号内部使用）
	WxPay_js_h5(orderinfo, callback, failFun) {
		if (!orderinfo) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}	
		try {
			let url = window.location.href
			let res = await http.GetWxJsApiConfig({url:url}, true)

			if (res.Success) {
				let set = res.Data;
				jweixin.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: set.appId, // 必填，公众号的唯一标识
					timestamp: set.timestamp, // 必填，生成签名的时间戳
					nonceStr: set.noncestr, // 必填，生成签名的随机串
					signature: set.signature, // 必填，签名
					jsApiList:[
						'chooseWXPay'
					] // 必填，需要使用的JS接口列表
				});
					
				jweixin.ready(function() {
					// 我自己的pid
					that.wsPay(data)
				});
				jweixin.error(function(res){
					// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					console.log(JSON.stringify(res))
				});
			} else {
		
			}
		} catch (err) {
			console.log('请求结果false : ' + err)
		
		}
	},
	async wsPay(){
		let that = this
		jweixin.chooseWXPay({
			timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
			package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
			signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
			paySign: data.paySign, // 支付签名
			success: function (res) {
			// 支付成功后的回调函数
				uni.redirectTo({
					url:'/pages/success/success'
				})
			}
		});
	},
	// 微信支付_h5
	WxPay_H5(orderinfo, callback, failFun) {
		if (!orderinfo) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}
		try {
			let url = window.location.href
			let res = await http.GetWxJsApiConfig({url:url}, true)	
			if (res.Success) {
				window.open(res.Data.url)  //直接打开支付的中间页
			} else {
		
			}
		} catch (err) {
			console.log('请求结果false : ' + err)
		
		}
	},
	// 微信支付   app/小程序
	WxPay(orderinfo, callback, failFun) {
		if (!orderinfo) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}
		uni.requestPayment({
			provider: "wxpay",
			timeStamp: orderinfo.timestamp,
			nonceStr: orderinfo.noncestr,
			package: orderinfo.package,
			signType: "MD5",
			paySign: orderinfo.paySign,
			orderInfo: {
				appid: orderinfo.appid,
				noncestr: orderinfo.noncestr,
				package: orderinfo.package,
				partnerid: orderinfo.mchid,
				prepayid: orderinfo.prepayid,
				timestamp: orderinfo.timestamp,
				sign: orderinfo.sign,
			},
			success: function(res) {
				plus.nativeUI.toast('支付成功');
				if (callback) callback()
			},
			fail: function(res) {
				console.log(JSON.stringify(res));
				if (failFun) {
					failFun();
					return;
				}
				uni.showToast({
					title: '支付失败',
					icon: "none",
					duration: 2000,
					complete: function() {
						uni.redirectTo({
							url: '/pages/features/order/order?current=1'
						})
					}
				});
			}
		});
	},
	// 是否微信浏览器
	is_weixn() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	// 是否受过权
	// 返回code
	ifAuth(success){
		let url = window.location.href;
		let s = url.match(/code=(.*)&state/)				
		if (s) {
			// 是授权后的页面,则做opnegid判断 使用code获取pid
			// return s[1]
			// 换取oid
			success(s[1])		
		} else {
			// 不是授权的页面，重定向进行授权
		
			this.wxauth()
		}	
	},

	// wx授权跳转
	wx_auth() {
		// alert(1)
		let set = {
			appid: SET.wx_appid, //测试环境
			redirect_uri: SET.wx_redirect_url,
		}
		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + set.appid + '&redirect_uri=' +
			set.redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
	},
	
}
export default Utils
