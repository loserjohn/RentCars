<template>
	<view class="pages">
		<view class="header flex">
			<!-- <view class="flex "> -->
			<view @click="toggleUser">
				<u-avatar :src="src" size="mini"></u-avatar>
			</view>
			<navigator url="../../features/citySelect/citySelect">
				<text class="header_area">福州</text>
			</navigator>
			<u-icon name="arrow-down" color="#333333" size="28"></u-icon>
			<view class="f1"></view>
			<image src="../../../static/images/sy_xx.png" class="cm_action"></image>
			<!-- </view> -->
		</view>

		<view class="banner">
			<u-swiper name="Text" :list="banners" @click="click" :effect3d="false" :height="350"></u-swiper>
		</view>

		<view class="content">
			<view class="boxs">
				<view class="formItems" @click="locationPicker">
					<view class="formLabal">取车地点</view>
					<view class="formContent">
						<text>三大法师的阿萨德发送到</text>
						<u-icon name="arrow-right" color="#666" size="28"></u-icon>
					</view>

					<view class="line"></view>
				</view>
				<view class="formItems" @click="locationPicker">
					<view class="formLabal">还车地点</view>
					<view class="formContent">
						<text>三大法师的阿萨德发送到</text>
						<u-icon name="arrow-right" color="#666" size="28"></u-icon>
					</view>
				</view>

				<view @click="rentDatePicker">

					<RentingTime customstyle="background:#f8f8f8" />
				</view>
				<u-button shape="circle" @click="_nav" :custom-style="{width:'100%',marginTop:'80rpx'}" type="primary">
					选车</u-button>
			</view>
			<view class="boxs menus">
				<u-grid :col="4" :border="false">
					<u-grid-item @click="showModal(1)">
						<!-- <u-avatar src="../../../static/images/sy_bm.png" :size="90"></u-avatar> -->
						<image src="../../../static/images/sy_xc.png" mode="scaleToFill"
							style="width: 90rpx;height: 90rpx;"></image>
						<view class="grid-text">我的行程</view>
					</u-grid-item>
					<u-grid-item @click="showModal(2)">
						<!-- <u-avatar src="../../../static/images/sy_xx.png" :size="90"></u-avatar> -->
						<image src="../../../static/images/sy_qb.png" mode="scaleToFill"
							style="width: 90rpx;height: 90rpx;"></image>
						<view class="grid-text">我的钱包</view>
					</u-grid-item>
					<u-grid-item @click="_auth_href('/pages/features/classMate/classMate')">
						<!-- <u-avatar src="../../../static/images/sy_tx.png" :size="90"></u-avatar> -->
						<image src="../../../static/images/sy_fp.png" mode="scaleToFill"
							style="width: 90rpx;height: 90rpx;"></image>
						<view class="grid-text">开具发票</view>
					</u-grid-item>
					<u-grid-item @click="_auth_href('/pages/features/share/share')">
						<image src="../../../static/images/sy_kf.png" mode="scaleToFill"
							style="width: 90rpx;height: 90rpx;"></image>
						<!-- <u-avatar src="../../../static/images/sy_zq.png" :size="90"></u-avatar> -->
						<view class="grid-text">客服</view>
					</u-grid-item>
				</u-grid>

			</view>

		</view>



		<!-- 
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
				<image src="../../../static/images/sy_gb.png" mode="scaleToFill" style="width: 100rpx;height: 100rpx;">
				</image>
			</view>
		</u-mask> -->
		<u-popup v-model="userPanel" mode="left" width="500rpx">
			<view class="userBox u-flex-y">
				<u-avatar :src="src" size="large"></u-avatar>
				<view>姓名</view>
				<view class="listBar">
					<u-cell-group title=" ">
						<u-cell-item title="行程" arrow>
							<image src="../../../static/images/cb_xc.png" mode="aspectFill" class="licons" slot="icon">
							</image>
						</u-cell-item>
						<u-cell-item title="钱包" arrow>
							<image src="../../../static/images/cb_qb.png" mode="aspectFill" class="licons" slot="icon">
							</image>
						</u-cell-item>
						<u-cell-item title="违章处理" arrow>
							<image src="../../../static/images/cb_wz.png" mode="aspectFill" class="licons" slot="icon">
							</image>
						</u-cell-item>
						<u-cell-item title="开具发票" arrow>
							<image src="../../../static/images/cb_fp.png" mode="aspectFill" class="licons" slot="icon">
							</image>
						</u-cell-item>
						<u-cell-item title="个人资料" arrow>
							<image src="../../../static/images/cb_zl.png" mode="aspectFill" class="licons" slot="icon">
							</image>
						</u-cell-item>
						<u-cell-item title="客服" arrow>
							<image src="../../../static/images/cb_kf.png" mode="aspectFill" class="licons" slot="icon">
							</image>
						</u-cell-item>
						<u-cell-item title="设置" arrow>
							<image src="../../../static/images/cb_sz.png" mode="aspectFill" class="licons" slot="icon">
							</image>
						</u-cell-item>
					</u-cell-group>

				</view>
			</view>
		</u-popup>
		<u-top-tips ref="uTips" :z-index="10100" :navbar-height="0"></u-top-tips>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	const global_Set_zdjy = uni.getStorageSync('global_Set_zdjy');
	import RentingTime from '@/components/RentingTime.vue'
	export default {
		data() {
			return {
				baseKey: 'GetCourseList',
				show: false,
				userPanel: false,
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
				}
			}
		},
		components: {
			RentingTime
		},
		computed: {
			// 将vuex的state中的所有变量，解构到全局混入的mixin中
			...mapState(['currentAction', 'inBunding']),

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
			_nav() {
				uni.navigateTo({
					url: '/pages/features/carsSelect/carsSelect'
				})
			},
			rentDatePicker() {
				uni.navigateTo({
					url: '/pages/features/rentDate/rentDate'
				})
			},
			locationPicker() {
				// debugger
				uni.navigateTo({
					url: '/pages/features/addressSelect/addressSelect'
				})
			},
			toggleUser() {
				this.userPanel = !this.userPanel
			},
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
			padding: 0 30rpx;
			position: sticky;
			top: 0;
			left: 0;
			z-index: 2;

			.header_area {
				margin: 0 10rpx 0 30rpx;
			}
		}

		.banner {
			width: 100%;
			height: 350rpx;
		}

		.line {
			width: 100%;
			height: 1rpx;
			background-color: #f8f8f8;
		}

		.content {
			padding: 20rpx;
			margin-top: -80rpx;
			position: relative;
			z-index: 1;

			.boxs {
				background-color: #fff;
				padding: 40rpx;
				border-radius: 20rpx;
				margin-bottom: 20rpx;

				.formItems {
					margin-bottom: 20rpx;

					.formLabal {
						line-height: 2;
						color: #888;
					}

					.formContent {
						line-height: 3;

						text {
							font-size: 36rpx;
							color: #333;
							margin-right: 20rpx;
							font-weight: 600;
						}

					}
				}


			}
		}

		.menus {
			border-radius: 20rpx;
			overflow: hidden;
			background-color: #fff;
			padding: 0 !important;

			.grid-text {
				font-size: 24rpx;
				margin-top: 20rpx;
				color: #333;
			}
		}


		.userBox {
			padding: 30rpx;

			.listBar {
				width: 100%;
				margin-top: 40rpx;
			}

			.licons {
				width: 40rpx;
				height: 40rpx;
			}
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



	}
</style>
