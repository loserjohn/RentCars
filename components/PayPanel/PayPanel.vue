<template>
	<view class="modal" v-if="panelshow">
		<view class="panel animated slideInUp" v-if="panelshow">
			<view class="cm_title cm_t_32">选择支付方式</view>
			<view style="margin-bottom: 60upx;">
				<view class="cells flex flex_center cm_bdb" @click="_choose(2)" v-if="isWeixin&&payList.indexOf('wx') > -1">
					<!-- <image src="/components/PayPanel/wx.png" mode="" class="icons"></image> -->
					<u-icon name="weixin-circle-fill" size="40" color="#07c160" ></u-icon>
					<view class="f1 cm_title">微信支付</view>
					<!-- <image src="./xz.png" mode="" class="icons" v-if="payParams.pay_type == 2"></image> -->
					<u-icon name="checkmark-circle-fill" size="40" color="#2F96F3" v-if="payParams.pay_type == 2"></u-icon>
					
					<text class="wxz" v-else></text>
				</view>
				<view class="cells flex flex_center cm_bdb" @click="_choose(5)" v-if="isWeixin&&payList.indexOf('SYK') > -1">
					<u-icon name="weixin-circle-fill" size="40" color="#07c160" ></u-icon>
					<view class="f1 cm_title">微信支付</view>
					<u-icon name="checkmark-circle-fill" size="40" color="#2F96F3" v-if="payParams.pay_type == 5"></u-icon>
					<text class="wxz" v-else></text>
				</view>
				<view class="cells flex flex_center" @click="_choose(1)" v-if="!isWeixin&&payList.indexOf('Alipay') > -1">
					<image src="./zf.png" mode="" class="icons"></image>
					<view class="f1 cm_title">支付宝支付</view>
					<u-icon name="checkmark-circle-fill" size="36" color="#2F96F3" v-if="payParams.pay_type == 1"></u-icon>
					<text class="wxz" v-else></text>
				</view>
				<view class="cm_bdb" v-if="payList.indexOf('CCB') > -1">
					<view class="cells flex flex_center " @click="_choose(3)">
						<image src="./js.png" mode="" class="icons"></image>
						<view class="f1 cm_title">建设银行卡支付</view>
						<u-icon name="checkmark-circle-fill" size="36" color="#2F96F3" v-if="payParams.pay_type == 3"></u-icon>
						<text class="wxz" v-else></text>
					</view>
					<view v-if="payParams.pay_type == 3" class="animated fadeIn">
						<view class="cm_title ">分期方式</view>
						<!-- <view class="slider "> -->
						<scroll-view scroll-x="true" class="slider">
							<view class="flex flex_center " style="width: 1208upx;">
								<view class="bar  flex flex_y flex_center" @click="_way('')" :class="{ active: payParams.install_num == 0 }">
									<view>不分期</view>
									<!-- <view class="cm_des">手续费{{item.charge}}/期</view> -->
								</view>
								<block v-for="(item, index) in agrs" :key="index">
									<view class="bar  flex flex_y flex_center" @click="_way(item.num)" :class="{ active: payParams.install_num == item.num }">
										<view>￥{{ item.price }} × {{ item.num }}期</view>
										<view class="cm_des">免息</view>
									</view>
								</block>
							</view>
						</scroll-view>
						<!-- </view> -->
					</view>
				</view>
				
			</view>
			<view style="padding-bottom: 20rpx;">
				<view class="flex flex_center">
					<!-- <tui-button type="primary" class="sbtn" :plain="true" shape="circle" :loading="loading" @click="_hide">取消</tui-button>
					<tui-button type="primary" class="sbtn" shape="circle" :loading="loading" @click="_submit">提交</tui-button> -->
					<button type="error" class="sbtn f1  plain " :plain="true" shape="circle" :loading="loading" @click="_hide">取消</button>
					<button type="error" class="sbtn f1" shape="circle" :loading="loading" @click="_submit">提交</button>
				</view>
			</view>		
		</view>
	</view>
</template>

<script>
import Utils from '@/common/utils.js';
const global_Set_zdjy = uni.getStorageSync('global_Set_zdjy')
import SET from '@/SET.js';
// const jweixin = require('jweixin-module')
export default {
	data() {
		return {
			loading: false,
			agrs: [
				{
					price: 100, //每期金额
					num:6, //期数
					charge: 2 //每期手续费
				},
				{
					price: 100, //每期金额
					num: 12, //期数
					charge: 2 //每期手续费
				},
				{
					price: 100, //每期金额
					num: 24, //期数
					charge: 2 //每期手续费
				}
			],
			payParams: {
				openId:'',
				pay_type:5, //1-支付宝 2-微信 3-CBB(建行支付)
				order_code: '', //订单号
				install_num: '' //分期数
			},
			panelshow: false,
			payList:[],
			isWeixin:false
		};
	},
	props: {
		amout: {
			//是否是统一规格
			Type: Number,
			default: 0
		},
		oderId: {
			//图片
			Type: String,
			default: ''
		}
	},
	created(){
		this.payParams.openId  =  uni.getStorageSync(SET.opIdName)
		global_Set_zdjy.pay_route.forEach(item=>{
			this.payList.push(item.Value)
		})
		this.isWeixin = this.is_weixin()
		// debugger
		// alert(this.isWeixin)
		// if(this.isWeixin){
		// 	// const opid = uni.getStorageSync('JLL_openId');
		// 	// alert(opid)
		// 	// this.payParams.openId = opid;
		// 	this.payParams.pay_type = 2
		// }else{
		// 	this.payParams.pay_type = 1
		// }
		// console.log(this.$jsWx)
	},
	watch: {
		oderId(n, o) {
			if (n) {
				this.payParams.order_code = n;
				this.initPrice();
			}
		}
	},
	methods: {
		is_weixin() {
			// #ifdef H5
			var ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
			// #endif
			// #ifdef MP
			return true;
			// #endif
		},
		_way(k) {
			this.payParams.install_num = k;
		},
		// 初始化价格
		initPrice() {
			let n = this.amout;
			if (!n) return;
			this.agrs.forEach(item => {
				item.price = (n / item.num).toFixed(2);
			});
		},
		_show() {
			this.panelshow = true;
		},
		_hide() {
			this.panelshow = false;
			this.$emit('cancel')
			// this._href();
		},
		_choose(k) {
			this.payParams.pay_type=k
		},
		// 提交支付
		async _submit() {
			if(this.payParams.pay_type==1){
				// uni.showToast('开发中')
				this._pay(1)
			}else if(this.payParams.pay_type==2){
				// uni.showToast('开发中')
				this._pay(2) 
				//1-支付宝 2-微信 3-CBB(建行支付)4- 商云客-小程序 5-商云客-公众号 9-测试
			}else if(this.payParams.pay_type==3){
				//建行支付
				this._pay(3)
			}else if(this.payParams.pay_type==5){
				// uni.showToast('开发中')
				this._pay(5) 
				//1-支付宝 2-微信 3-CBB(建行支付)4- 商云客-小程序 5-商云客-公众号 9-测试
			}
		},
		_href() {
			uni.redirectTo({
				url: '/pages/features/order/orderDetail/orderDetail?code=' + this.payParams.order_code
			});
		},
		// 支付接口
		async _pay(k, callback) {
			let that = this;
			// this.payParams.pay_type = k;
			this.payParams.pay_type = k;
			// this.payParams.pay_type = 9;
			// console.log(this.payParams)
			// return;
			try {
				// that.loading1 = true;
				that.$ui.showloading()
				 // console.log(this.payParams)
				let res = await this.$api.toPayment(this.payParams);
				
				that.$ui.hideloading()
				if (res.Success) {
					if (k == 1) {
						// 支付宝支付
						that._toAliPay(res.Data);
					} else if (k == 2) {
						debugger
						// 微信支付
						that._toWXPay(res.Data);
					} else if (k == 3) {
						// 建行
						window.location.href = res.Data;
					}else if (k == 5){
						// 商云课 微信支付
						that._toWXPay(res.Data);
					}
					that.$emit('success',res.Msg)
					// that._href()
				} else {
					// debugger
					that.$ui.toast(res.Msg);
					
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}

			if (callback) callback();
		},
		async _toWXPay(data) {
			// debugger
			let that = this;
			// #ifdef H5
				uni.$emit('wxPay',data)
			// #endif
			// #ifdef MP
				try {
					let that = this
					
					let s = `{${data.js_prepay_info}}`
					// console.log(s)
					let set = s.replace(/\'/g,'"');
					
					set = JSON.parse(set)
					console.log(set)
					Utils.WxPay(set,()=>{
						uni.redirectTo({
							url:'/pages/success/success'
						})
					},()=>{
						
					})
			
				} catch (err) {
					console.log('请求结果false : ' + err)
				
				}
			// #endif
				
			},
			
		_toAliPay(str) {
			let that = this;
			// Utils.AliPay(str, () => {
			// 	that.$refs.successModal.show();
			// 	that.$store.commit('refresh_account');
			// 	uni.$emit('refresh_user');
			// 	uni.$emit('refresh_order');
			// 	uni.redirectTo({
			// 		url: '/pages/features/success/success?form=orderDetail'
			// 	});
				
			// 	that.$emit('success')
			// });
		}
	}
};
</script>

<style lang="scss" scoped>
.modal {
	width: 100vw;
	// height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	z-index: 999;
	.panel {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		background: #fff;
		border-radius: 20upx 20upx 0 0;
		padding: 20upx;
		padding-bottom: env(safe-area-inset-bottom);
		.cells {
			min-height: 110upx;
			.cm_title {
				padding: 0 20upx;
			}
			.icons {
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
			}
			.wxz {
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
				border: 1upx solid #f1f1f1;
			}
			&:active {
				background: #f3f3f3;
			}
		}
		.slider {
			width: 100%;
			height: 100upx;
			// background: red;
			margin: 40upx 0;
			overflow-x: auto;
			.bar {
				width: 282upx;
				height: 98upx;
				border-radius: 4upx;
				color: #333;
				background: #f3f3f3;
				margin: 0 20upx;
				.cm_des {
					margin-top: 10upx;
					// color: #DD3A30;
				}
			}
			.active {
				border: 2upx solid #dd3a30;
				color: #dd3a30;
				background: #fff5f5;
				.cm_des {
					color: #dd3a30;
				}
			}
		}
		.cm_bdb {
			position: relative;
			border-bottom: 1upx solid #f1f1f1;
		}
	}
	.sbtn {
		// transform: scale(.8);
		height: 70upx;
		line-height: 70upx;
		margin: 0 20upx;
		border-radius: 35rpx;
		background-color: $uni-color-primary;
		color: #fff;
		text-align: center;
		font-size: 30rpx;
	}
	.plain{
		line-height: 68upx;
		background-color:#fff ;
		color: $uni-color-primary;
		border: 1rpx solid $uni-color-primary ;
	}
}
</style>
