<template>
	<view class="pages">
		<view class="cm_boxs" style="margin-top: -10rpx;">
			<view class="carItems u-flex">
				<image src="../../../components/PayPanel/xz.png" class="pics" mode="aspectFill"></image>
				<view class="f1">
					<view class="title">萨法的啥的</view>
					<view class="cm_text">是打发点啥的是</view>
				</view>
			</view>
			<view class="grayBoxs">
				<view class="u-flex">
					<text class="labels">取车地点</text>
					<view class="f1">
						sdfsdfsdfasdfa
					</view>
				</view>
				<view style="width: 100%;height: 30rpx;"> </view>
				<view class="u-flex">
					<text class="labels">用车时间</text>
					<view class="f1">
						2117-1-22（12天）
					</view>
				</view>
			</view>
		</view>

		<view class="cm_boxs">

			<view class="cm_title">车辆押金</view>

			<view class="u-flex">
				<view class="wayBoxs u-flex-y active">
					<image src="../../../static/images/xq_zmxy.png" mode="aspectFill" class="icons"></image>
					<image src="../../../static/images/xq_gx.png" mode="aspectFill" class="icons activeIcons"></image>
					<text class="cm_time">芝麻信用免押金</text>
				</view>
				<view class="wayBoxs u-flex-y">
					<image src="../../../static/images/xq_zx.png" mode="aspectFill" class="icons"></image>
					<image src="../../../static/images/xq_gx.png" mode="aspectFill" class="icons activeIcons"></image>
					<text class="cm_time">在线支付</text>
				</view>
				<view class="f1"></view>
			</view>
		</view>

		<view class="cm_boxs">

			<view class="cm_title">费用明细</view>

			<view class="rows u-flex  ">
				<view class="label">租车费用</view>
				<view class="f1"></view>
				<view class="label">￥320</view>
			</view>
			<view class="rows u-flex  ">
				<view class="label">基本服务费</view>
				<u-icon name="question-circle" color="#999" size="28"></u-icon>
				<view class="f1"></view>
				<view class="label">￥320</view>
			</view>
			<view class="rows u-flex  ">
				<view class="label">手续费</view>
				<u-icon name="question-circle" color="#999" size="28"></u-icon>
				<view class="f1"></view>
				<view class="label">￥320</view>
			</view>
			<view class="rows u-flex  ">
				<view class="label">押金</view>
				<u-icon name="question-circle" color="#999" size="28"></u-icon>
				<view class="f1"></view>
				<view class="label">￥320</view>
			</view>
			<view class="rows rowsBot u-flex">
				<view class="f1"></view>
				<text class="cm_time">合计</text>
				<Text class="cm_price_tip">340</Text>
			</view>
		</view>

		<view class="footer saveBottom">
			<view class="flex footerBar">
				<text class="cm_time">总价</text>
				<Text class="cm_price_tip">340</Text>
				<view class="f1" style="padding-right: 30rpx;"> </view>
				<View class="sure">提交订单</View>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.pages {

		.carItems {
			// padding: 20rpx;
			background-color: #fff;
			margin-bottom: 16rpx;
			border-radius: 12rpx;

			.pics {
				width: 210rpx;
				height: 118rpx;
				margin-right: 24rpx;
				background: #f1f1f1;
			}

			.title {
				font-weight: 600;
				line-height: 2;
				font-size: 32rpx;
				margin-bottom: 0;
			}
		}

		.grayBoxs {
			margin-top: 32rpx;
			background-color: #f5f5f5;
			padding: 30rpx;
			border-radius: 12rpx;
			font-size: 26rpx;

			.labels {
				color: #666;
				width: 164rpx;
				text-align: left;
			}
		}

		.wayBoxs {
			width: 220rpx;
			height: 152rpx;
			border-radius: 8rpx;
			border: 1rpx solid #C5C5C5;
			position: relative;
			margin-right: 16rpx;

			.icons {
				width: 48rpx;
				height: 48rpx;
			}

			.activeIcons {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				right: 0;
				bottom: 0;
				display: none;
			}
		}

		.active {
			border: 2rpx solid #EE7F48;

			.icons {
				width: 48rpx;
				height: 48rpx;
				margin-bottom: 16rpx;
			}

			.activeIcons {
				display: block;
			}

			.cm_time {
				color: #EE7F48;
			}
		}


		.rows {
			line-height: 80rpx;
		}

		.rowsBot {
			border-top: 1rpx solid #f8f8f8;
			padding-top: 16rpx;
			margin-top: 16rpx
		}

		.label {
			font-weight: 400;
			font-size: 26rpx;
			color: #333;
		}

		.footer {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background-color: #fff;

			.footerBar {
				height: 98rpx;
				line-height: 98rpx;

				.sure {
					padding: 0 34rpx;
					color: #fff;
					background-color: $uni-color-primary;
				}

				.cm_time {
					margin-left: 30rpx;
				}
			}
		}
	}
</style>
