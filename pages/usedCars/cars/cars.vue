<template>
	<view class="pages ">
		<view class="header ">
			<view class=" block" style="padding:20rpx 20rpx 0 20rpx;">
				<u-search circle placeholder="请输入想要找的商品、服务、保险" clearabled v-model="keyword"></u-search>
			</view>
			<view class="filterBox ">
				<u-dropdown active-color="#EE7F48">
					<u-dropdown-item v-model="value1" title="综合排序" :options="options"></u-dropdown-item>
					<u-dropdown-item v-model="value2" title="车辆品牌" :options="options">
						<view class="slot-content" style="background-color: #FFFFFF;">
			
							<scroll-view scroll-y="true" style="height: 748rpx;">
								<view class="u-flex carBrandBar">
									<view class=" carBrand u-flex">
										<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons">
										</image>
										<view class="grid-text">我的行程</view>
									</view>
									<view class=" carBrand u-flex">
										<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons">
										</image>
										<view class="grid-text">我的行程</view>
									</view>
									<view class=" carBrand u-flex">
										<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons">
										</image>
										<view class="grid-text">我的行程</view>
									</view>
									<view class=" carBrand u-flex">
										<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons">
										</image>
										<view class="grid-text">我的行程</view>
									</view>
									<view class=" carBrand u-flex">
										<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons">
										</image>
										<view class="grid-text">我的行程</view>
									</view>
									<view class=" carBrand u-flex">
										<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons">
										</image>
										<view class="grid-text">我的行程</view>
									</view>
									<view class=" carBrand u-flex">
										<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons">
										</image>
										<view class="grid-text">我的行程</view>
									</view>
									<view class="f1"></view>
								</view>
							</scroll-view>
							<view class="footer u-flex">
								<view class="f1 btns">重置</view>
								<!-- <u-button class="f1" type="primary" @click="closeDropdown">保存</u-button> -->
								<view class="f1 btns sure" @click="closeDropdown">保存</view>
							</view>
						</view>
					</u-dropdown-item>
					<u-dropdown-item v-model="value1" title="价格" :options="options"></u-dropdown-item>
					<u-dropdown-item v-model="value2" title="筛选" :options="options">
						<view class="slot-content" style="background-color: #FFFFFF;">
							<scroll-view scroll-y="true" style="height: 348rpx;">
								<view class="filteritems">
									<view class="cm_title">座位</view>
									<view class="u-flex carBrandBar">
										<view class=" carBrand u-flex">
											<!-- <image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image> -->
											<view class="grid-text">我的行程</view>
										</view>
										<view class=" carBrand u-flex">
											<!-- <image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image> -->
											<view class="grid-text">我的行程</view>
										</view>
										<view class=" carBrand u-flex">
											<!-- <image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image> -->
											<view class="grid-text">我的行程</view>
										</view>
										<view class=" carBrand u-flex">
											<!-- <image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image> -->
											<view class="grid-text">我的行程</view>
										</view>
										<view class="f1"></view>
									</view>
								</view>
								<view class="filteritems">
									<view class="cm_title">座位</view>
									<view class="u-flex carBrandBar">
										<view class=" carBrand u-flex">
											<!-- <image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image> -->
											<view class="grid-text">我的行程</view>
										</view>
										<view class=" carBrand u-flex">
											<!-- <image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image> -->
											<view class="grid-text">我的行程</view>
										</view>
										<view class=" carBrand u-flex">
											<!-- <image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image> -->
											<view class="grid-text">我的行程</view>
										</view>
										<view class=" carBrand u-flex">
											<!-- <image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image> -->
											<view class="grid-text">我的行程</view>
										</view>
										<view class="f1"></view>
									</view>
								</view>
							</scroll-view>
							<view class="footer">
								共<text style="color: #EE7F48;">10</text>车型可选
							</view>
							<view class="footer u-flex">
								<view class="f1 btns">重置</view>
								<!-- <u-button class="f1" type="primary" @click="closeDropdown">保存</u-button> -->
								<view class="f1 btns sure" @click="closeDropdown">保存</view>
							</view>
						</view>
					</u-dropdown-item>
				</u-dropdown>
			</view>
		</view>

		
		<view class=" carPanel">
			<CarListItems />
			<CarListItems />
			<CarListItems />
			<CarListItems />
			<CarListItems />
			<CarListItems />
			<CarListItems />
			<CarListItems />
			<CarListItems />
		</view>
	</view>
</template>

<script>
	import CarListItems from '@/components/CarListItems.vue'
	export default {
		data() {
			return {
				options: [{
						label: '蜀道难',
						value: 1
					},
					{
						label: '难以上青天',
						value: 2
					}
				],
				value1: 1,
				value2: 2
			};
		},
		onLoad() {
			const sys = uni.getSystemInfoSync()
			console.log(sys)
		},
		components: {
			CarListItems
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		background-color: #fff;
		padding-top: 164rpx;

		.header {
			width: 100%;
			// padding: 20rpx;
			position: fixed;
			left: 0;
			top: 0;
			background-color: #fff;
			z-index: 100;
			.result {
				background-color: #f8f8f8;
				padding: 20rpx;
				border-radius: 12rpx;
				text-align: center;
				width: 100%;

				.cm_title {
					line-height: 2;
				}

				.line {
					width: 70%;
					height: 1rpx;
					background-color: #b4b4b4;

					margin: 0 auto;
					margin-top: 20rpx;
					box-sizing: border-box;
				}
			}

		}

		.filterBox {
			width: 100%;
			// position: sticky;
			// left: 0;
			// top: 104rpx;
			// z-index: 2;		
			// background-color: #fff;
			.carBrandBar {
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 0 30rpx;

				.carBrand {
					width: 214rpx;
					text-align: center;
					// padding: 20rpx;
					height: 72rpx;
					line-height: 72rpx;
					border-radius: 8rpx;
					background-color: #F4F5F6;
					margin-bottom: 16rpx;

					.icons {
						width: 40rpx;
						height: 40rpx;
						margin-right: 16rpx;
					}
				}

			}

			.filteritems {
				.cm_title {
					line-height: 2;
					padding-left: 30rpx;
					margin-bottom: 20rpx;
				}
			}

			.footer {
				height: 98rpx;
				width: 100%;
				line-height: 98rpx;
				text-align: center;

				.btns {
					height: 98rpx;
					line-height: 98rpx;
					text-align: center;
					background-color: #f8f8f8;
				}

				.sure {
					background: #EE7F48;
					color: #fff;
				}
			}
		}

		.carPanel {
			width: 100%;
			border-top: 1rpx solid #f8f8f8;
			// padding-top: 180rpx;

			.left {
				width: 188rpx;
				height: 100%;

				.leftItems {
					height: 98rpx;
					line-height: 98rpx;
					text-align: center;
					border-bottom: 1rpx solid #f8f8f8;
				}

				.active {
					position: relative;

					&::after {
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						width: 12rpx;
						height: 100%;
						background-color: #EE7F48;
					}
				}
			}

			.right {
				height: 100%;
				background: #f8f8f8;
				padding: 16rpx;

				.content {
					// .CarListItems {
					// 	padding: 20rpx;
					// 	background-color: #fff;
					// 	margin-bottom: 16rpx;
					// 	border-radius: 12rpx;

					// 	.pics {
					// 		width: 210rpx;
					// 		height: 118rpx;
					// 		margin-right: 24rpx;
					// 		background: #f1f1f1;
					// 	}

					// 	.title {
					// 		font-weight: 600;
					// 		line-height: 2;
					// 	}
					// }

					// .CarListItemsFooter {
					// 	padding-top: 16rpx;
					// 	margin-top: 16rpx;
					// 	border-top: 1rpx solid #f8f8f8;
					// }
				}
			}
		}
		
	}
	.u-dropdown__content{
		position: fixed!important;
	}
</style>
