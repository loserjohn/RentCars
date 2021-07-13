<template>
	<view class="pages ">
		<view class="header">
			<view class="result u-flex">
				<view class="timeBox">
					<view class="cm_title">3月13号</view>
					<view class="cm_text">周六 13：00</view>
				</view>
				<view class="f1">
					<view class="cm_text">两天</view>
					<view class="line"></view>
				</view>
				<view class="timeBox">

					<view class="cm_title">3月13号</view>
					<view class="cm_text">周六 13：00</view>
				</view>
			</view>

		</view>

		<view class="filterBox ">
			<u-dropdown active-color="#EE7F48">
				<u-dropdown-item v-model="value1" title="排序" :options="options"></u-dropdown-item>
				<u-dropdown-item v-model="value2" title="车辆品牌" :options="options">
					<view class="slot-content" style="background-color: #FFFFFF;">

						<scroll-view scroll-y="true" style="height: 748rpx;">
							<view class="u-flex carBrandBar">
								<view class=" carBrand u-flex">
									<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image>
									<view class="grid-text">我的行程</view>
								</view>
								<view class=" carBrand u-flex">
									<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image>
									<view class="grid-text">我的行程</view>
								</view>
								<view class=" carBrand u-flex">
									<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image>
									<view class="grid-text">我的行程</view>
								</view>
								<view class=" carBrand u-flex">
									<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image>
									<view class="grid-text">我的行程</view>
								</view>
								<view class=" carBrand u-flex">
									<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image>
									<view class="grid-text">我的行程</view>
								</view>
								<view class=" carBrand u-flex">
									<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image>
									<view class="grid-text">我的行程</view>
								</view>
								<view class=" carBrand u-flex">
									<image src="../../../static/images/sy_xc.png" mode="scaleToFill" class="icons" > </image>
									<view class="grid-text">我的行程</view>
								</view>
								<view class="f1"></view>
							</view>
						</scroll-view>
						<view class="footer u-flex">
							<view class="f1 btns">重置</view>
							<!-- <u-button class="f1" type="primary" @click="closeDropdown">保存</u-button> -->
							<view class="f1 btns sure"  @click="closeDropdown">保存</view>
						</view>
					</view>
				</u-dropdown-item>
				<u-dropdown-item v-model="value2" title="筛选" :options="options">
					<view class="slot-content" style="background-color: #FFFFFF;">
						<scroll-view scroll-y="true" style="height: 748rpx;">
							<view  class="filteritems">
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
							<view class="f1 btns sure"  @click="closeDropdown">保存</view>
						</view>
					</view>
				</u-dropdown-item>
			</u-dropdown>
			<!-- <view class="f1 u-flex">
				<text>排序</text>
				<u-icon name="arrow-down" color="#666" size="28"></u-icon>
			</view>
			<view class="f1 u-flex">
				<text>车辆品牌</text>
				<u-icon name="arrow-down" color="#666" size="28"></u-icon>
			</view>
			<view class="f1 u-flex">
				<text>筛选</text>
				<u-icon name="arrow-down" color="#666" size="28"></u-icon>
			</view> -->
		</view>
		<view class=" carPanel u-flex">
			<view class="left">
				<view class="leftItems active">全部</view>
				<view class="leftItems">特价车</view>
				<view class="leftItems">经济型</view>
				<view class="leftItems">舒适性</view>
				<view class="leftItems">特价车</view>
				<view class="leftItems">经济型</view>
				<view class="leftItems">舒适性</view>
			</view>
			<view class="right f1">
				<view class="content">
					<CarItems />
					<CarItems />
					<CarItems />
					<CarItems />
					<CarItems />
					<CarItems />
					<CarItems />
					<CarItems />
					<CarItems />
					<!-- <view class="carItems">
						<view class="u-flex">
							<image src="../../../components/PayPanel/xz.png" class="pics" mode="aspectFill"></image>
							<view class="f1">
								<view class="title">萨法的啥的</view>
								<view class="cm_text">是打发点啥的是</view>
							</view>
						</view>
						<view class="carItemsFooter u-flex">
							<text class="cm_price_tip">234534</text>

							<text class="cm_text"> / 天</text>
							<view class="f1"></view>
							<text class="cm_text">车辆详情</text>
							<u-icon name="arrow-right" color="#999" size="24"></u-icon>
						</view>
					</view>
					<view class="carItems">
						<view class="u-flex">
							<image src="../../../components/PayPanel/xz.png" class="pics" mode="aspectFill"></image>
							<view class="f1">
								<view class="title">萨法的啥的</view>
								<view class="cm_text">是打发点啥的是</view>
							</view>
						</view>
						<view class="carItemsFooter u-flex">
							<text class="cm_price_tip">234534</text>

							<text class="cm_text"> / 天</text>
							<view class="f1"></view>
							<text class="cm_text">车辆详情</text>
							<u-icon name="arrow-right" color="#999" size="24"></u-icon>
						</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CarItems from '@/components/CarItems.vue'
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
		components:{
			CarItems
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		background-color: #fff;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.header {
			width: 100%;
			padding: 20rpx;

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
			.carBrandBar{
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 0 30rpx;
				.carBrand{
					width:214rpx;
					text-align: center;
					// padding: 20rpx;
					height: 72rpx;
					line-height: 72rpx;
					border-radius: 8rpx;
					background-color: #F4F5F6;
					margin-bottom: 16rpx;
					.icons{
						width: 40rpx;
						height: 40rpx;
						margin-right: 16rpx;
					}
				}
				
			}
			.filteritems{
				.cm_title{
					line-height: 2;
					padding-left: 30rpx;
					margin-bottom: 20rpx;
				}
			}
			.footer{
				height: 98rpx;
				width: 100%;
				line-height: 98rpx;
				text-align: center;
				.btns{
					height: 98rpx;
					line-height: 98rpx;
					text-align: center;
					background-color: #f8f8f8;
				}
				.sure{
					background: #EE7F48;
					color: #fff;
				}
			}
		}

		.carPanel {
			width: 100%;
			border-top: 1rpx solid #f8f8f8;
			// background: red; 
			position: absolute;
			left: 0;
			top: 276rpx;
			bottom: 0;

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
					// .carItems {
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

					// .carItemsFooter {
					// 	padding-top: 16rpx;
					// 	margin-top: 16rpx;
					// 	border-top: 1rpx solid #f8f8f8;
					// }
				}
			}
		}
	}
</style>
