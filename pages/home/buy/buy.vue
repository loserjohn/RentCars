<template>
	<view class="pages">
		<view class="header flex">
			<view class="f1">

				<u-search circle placeholder="请输入想要找的商品、服务、保险" clearabled v-model="keyword"></u-search>
			</view>
		</view>
		<view class="banner">
			<u-swiper name="Text" :list="banners" @click="click" :effect3d="false" :height="360"></u-swiper>
		</view>
		<view class="boxs">
			<view class="u-flex tipsBpx">
				<view class="f1 u-flex">
					<image src="../../../static/images/mc_bz.png" mode="aspectFill" class="tips"></image>
					<text style="color:#C48847;font-size: 22rpx;">30天全面保障</text>
				</view>
				<view class="f1 u-flex">
					<image src="../../../static/images/mc_bz.png" mode="aspectFill" class="tips"></image>
					<text style="color:#C48847;font-size: 22rpx;">7天无理由退车</text>
				</view>
				<view class="f1 u-flex">
					<image src="../../../static/images/mc_bz.png" mode="aspectFill" class="tips"></image>
					<text style="color:#C48847;font-size: 22rpx;">7天无理由换车</text>
				</view>
			</view>
			<view style="padding: 10rpx 0;">
				<u-grid :col="4" :border="false">
					<u-grid-item  @click="_href('/pages/usedCars/cars/cars')">
						<!-- <u-avatar src="../../../static/images/sy_bm.png" :size="90"></u-avatar> -->
						<image src="../../../static/images/mc_esc.png" mode="scaleToFill"
							style="width: 90rpx;height: 90rpx;"></image>
						<view class="grid-text">二手车</view>
					</u-grid-item>
					<u-grid-item @click="_auth_href('/pages/features/classMate/classMate')">
						<!-- <u-avatar src="../../../static/images/sy_xx.png" :size="90"></u-avatar> -->
						<image src="../../../static/images/mc_mr.png" mode="scaleToFill"
							style="width: 90rpx;height: 90rpx;"></image>
						<view class="grid-text">车辆美容</view>
					</u-grid-item>
					<u-grid-item @click="_auth_href('/pages/features/classMate/classMate')">
						<!-- <u-avatar src="../../../static/images/sy_tx.png" :size="90"></u-avatar> -->
						<image src="../../../static/images/mc_bx.png" mode="scaleToFill"
							style="width: 90rpx;height: 90rpx;"></image>
						<view class="grid-text">车辆保险</view>
					</u-grid-item>
					<u-grid-item @click="_auth_href('/pages/features/share/share')">
						<image src="../../../static/images/mc_wx.png" mode="scaleToFill"
							style="width: 90rpx;height: 90rpx;"></image>
						<!-- <u-avatar src="../../../static/images/sy_zq.png" :size="90"></u-avatar> -->
						<view class="grid-text">车辆维修</view>
					</u-grid-item>
				</u-grid> 
			</view>
		</view>

		<view class="carTitle">精选推荐</view>

		<view class="container u-flex">
			<view class="carBlocks">
				<image src="../../../static/images/cb_sz.png" class="previewImage" mode="aspectFill"></image>
				<view class="content">
						<view class="cm_title">a奥迪A4la奥迪A4la奥迪A4la奥迪A4l</view>
						<view class="cm_time">a奥迪A4la奥迪A4la奥迪A4l2.15款全自动</view>
						<view class="u-flex priceBox">
							<text class="price">1.2万 </text>
							<text style="color:#EE7F48 ;"> 首付1.2万</text>
							<view class="f1"></view>
						</view>
				</view>		
			</view>
			<view class="carBlocks">
				<image src="../../../static/images/cb_sz.png" class="previewImage" mode="aspectFill"></image>
				<view class="content">
						<view class="cm_title">a奥迪A4la奥迪A4la奥迪A4la奥迪A4l</view>
						<view class="cm_time">a奥迪A4la奥迪A4la奥迪A4l2.15款全自动</view>
						<view class="u-flex priceBox">
							<text class="price">1.2万 </text>
							<text style="color:#EE7F48 ;"> 首付1.2万</text>
							<view class="f1"></view>
						</view>
				</view>		
			</view>
			<view class="carBlocks">
				<image src="../../../static/images/cb_sz.png" class="previewImage" mode="aspectFill"></image>
				<view class="content">
						<view class="cm_title">a奥迪A4la奥迪A4la奥迪A4la奥迪A4l</view>
						<view class="cm_time">a奥迪A4la奥迪A4la奥迪A4l2.15款全自动</view>
						<view class="u-flex priceBox">
							<text class="price">1.2万 </text>
							<text style="color:#EE7F48 ;"> 首付1.2万</text>
							<view class="f1"></view>
						</view>
				</view>		
			</view>
			<view class="carBlocks">
				<image src="../../../static/images/cb_sz.png" class="previewImage" mode="aspectFill"></image>
				<view class="content">
						<view class="cm_title">a奥迪A4la奥迪A4la奥迪A4la奥迪A4l</view>
						<view class="cm_time">a奥迪A4la奥迪A4la奥迪A4l2.15款全自动</view>
						<view class="u-flex priceBox">
							<text class="price">1.2万 </text>
							<text style="color:#EE7F48 ;"> 首付1.2万</text>
							<view class="f1"></view>
						</view>
				</view>		
			</view>
			<view class="f1"></view>
			
			<u-loadmore :status="status" />
		</view>

		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect u-flex-y" @click.stop>
					<view class="maskHeader">
						{{modalMsg.content}}
					</view>
					<view class="u-flex-1 u-flex-y">
						<image class="maskPic" :src="modalMsg.src" mode="widthFix"></image>
					</view>

				</view>
				<image src="../../../static/img/sy_gb.png" mode="scaleToFill" style="width: 100rpx;height: 100rpx;">
				</image>
			</view>
		</u-mask>
		<u-top-tips ref="uTips" :z-index="10100" :navbar-height="0"></u-top-tips>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	const global_Set_zdjy = uni.getStorageSync('global_Set_zdjy');
	export default {
		data() {
			return {
				baseKey: 'GetCourseList',
				show: false,
				banners: [{
					Text: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				}],
				iconList: [],
				tableList: [],
				list: [1],
				lists: [],
				modalMsg: {
					content: '',
					src: ''
				},
				hasRow: 'ListInfo',
				listForm: {
					date: 10
				},
				status:'loadMore'
			}
		},
		computed: {
			// 将vuex的state中的所有变量，解构到全局混入的mixin中
			...mapState(['currentAction', 'inBunding'])
		},
		onLoad(options) {
			let that = this
			// if (this.currentAction && !this.hasLogin) {
			// 	// 执行动作
			// 	let action = this.currentAction.action
			// 	switch (action) {
			// 		case 'share':
			// 			if(this.ifWx){
			// 				uni.navigateTo({
			// 					url: '/pages/role/wxLogin/wxLogin'
			// 				})
			// 			}else{
			// 				uni.navigateTo({
			// 					url: '/pages/role/yzmLogin/yzmLogin'
			// 				})
			// 			}			
			// 			break;
			// 		default:
			// 			break;
			// 	}
			// }

			// uni.$on('Bunding',(msg)=>{
			// 	// console.log('111'+msg)
			// 	uni.removeStorageSync('inBunding')
			// 	if(msg){
			// 		that.$refs.uToast.show({
			// 			title: msg?msg:'身份错误',
			// 			type: 'error',
			// 			position: 'bottom',
			// 			callback:()=>{
			// 				uni.navigateTo({
			// 					url: `/pages/role/wxBunding/wxBunding`
			// 				})
			// 			}
			// 		})	
			// 	}else{
			// 		uni.navigateTo({
			// 			url: `/pages/role/wxBunding/wxBunding`
			// 		})
			// 	}

			// })
			// this.banners = global_Set_zdjy.banerList
			// this.iconList = global_Set_zdjy.iconList;
			// this.tableList = global_Set_zdjy.coursetable;
			// this._loadList('refresh');
			// // #ifdef H5
			// 	uni.preloadPage({url: "/pages/features/share/share"});
			// // #endif

		},
		onPullDownRefresh() {
			this.listForm.date = 10;
			this.lists = [];
			this._loadList('refresh');
		},
		// 上拉加载
		onReachBottom() {
			if (this.loadStatus == 'noMore') {
				return;
			}
			this.listForm.date += 3;
			this.loadStatus = 'loading';
			this._loadList('add');
			// uni.$emit('uOnReachBottom')
		},
		methods: {
			click(index) {
				// debugger
				this._config_href(this.banners[index]);

			},
			async _loadList(type) {
				let that = this;
				try {
					let res = await this.$api[this.baseKey](this.listForm)
					// console.log(res);
					if (type == 'add') {
						that.loadStatus = 'loading';
					} else {
						uni.stopPullDownRefresh();
					}
					if (res.Success) {
						if (type == 'add') {
							// 加载更多
							if (that.hasRow) {
								that.lists = that.lists.concat(res.Data[that.hasRow]);
								if (res.Data[that.hasRow].length < that.listForm.date) {
									that.loadStatus = 'noMore';
									// 没有数据了
								} else {
									that.loadStatus = 'more';
								}
							} else {
								debugger
								that.lists = that.lists.concat(res.Data);
								if (res.Data.length < that.listForm.date) {
									that.loadStatus = 'noMore';
									// 没有数据了
								} else {
									that.loadStatus = 'more';
								}
							}
						} else {
							// 刷新
							if (that.hasRow) {
								that.lists = res.Data[that.hasRow];
								if (res.Data[that.hasRow].length < that.formParams.pageSize) {
									that.loadStatus = 'noMore';
									// 没有数据了
								} else {
									that.loadStatus = 'more';
								}

							} else {
								that.lists = res.Data
								if (res.Data.length < that.formParams.pageSize) {
									that.loadStatus = 'noMore';
									// 没有数据了
								} else {
									that.loadStatus = 'more';
								}
							}
							that.refreshing = false
						}
						that.loadDataComplete(true, res.Data)
					} else {
						that.$ui.toast(res.Msg);
						that.loadDataComplete(false, res.Data)
					}
					that.pageLoading = false
				} catch (err) {
					console.log('请求结果false : ' + err);
					that.loadStatus = 'more';
					that.loadDataComplete(false)
					that.pageLoading = false
				}
			},
			// 二维码显示
			showModal(k) {
				switch (k) {
					case 1:
						if (!this.hasLogin) {
							this._login();
							break;
						}
						this.modalMsg = {
							content: '长按识别二维码，添加专属老师微信号进行报名',
							src: this.userInfo.consumer_qr_code
						}
						this.show = true
						break;
					case 2:
						this.modalMsg = {
							content: '长按识别二维码，关注微信公众号订阅开课通知',
							src: global_Set_zdjy.RQ_CodeList[0].Text
						}
						this.show = true
						break;
					default:
						break;
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.pages {
		width: 100vw;
		min-height: 100vh;
		padding-bottom: 80rpx;

		.header {
			height: 88rpx;
			width: 100vw;
			background-color: #fff;
			padding: 0 40rpx;
			position: sticky;
			top: 0;
			left: 0;
			z-index: 2;
		}

		.banner {
			// margin-top: 20rpx;
			width: 100vw;
			height: 360rpx;
		}

		.boxs {
			width: 100%;
			background-color: #fff;
			position: 0 30rpx;

			.tipsBpx {
				font-size: 22rpx;
				border-bottom: 1rpx solid #f1f1f1;
				padding: 20rpx 0;

				.tips {
					width: 24rpx;
					height: 28rpx;
					margin-right: 8rpx;
				}
			}
		}
		
		
		.carTitle{
			margin-top: 40rpx;
			margin-bottom: 24rpx;
			text-align: center;
			font-size: 32rpx;
			color: #333;
			font-weight: bolder;
		}

		.warp {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100%;

			.rect {
				width: 90vw;
				height: 790rpx;
				border-radius: 12rpx;
				overflow: hidden;
				background-color: #fff;

				.maskHeader {
					width: 100%;
					background: linear-gradient(to top, #248EE9, #54ABF6);
					padding: 32rpx 53rpx;
					color: #fff;
				}

				.maskPic {
					width: 476rpx;
					height: 476rpx;
					margin: 30rpx auto;
				}
			}
		}
		.container{
			flex-wrap: wrap;
			padding: 0 10rpx;
		}
		.carBlocks{
			width: 348rpx;
			height: 426rpx;
			border-radius:12rpx ;
			background-color: #fff;
			margin:8rpx;
			.previewImage{
				width: 100%;
				height: 232rpx;
			}
			.content{
				padding:20rpx ;
				.priceBox{
					padding: 16rpx 0;
					.price{
						color: #EE7F48;
						font-size: 32rpx;
						margin-right: 16rpx;
						font-weight: 600;
					}
				}
				.cm_title,.cm_time{
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}

	}
</style>
