<template>
	<view class="pages">
		<view>
			<image src="../../../static/images/mc_bz.png" mode="aspectFill" class="carPics"></image>
		</view>

		<view class="cm_boxs" style="margin-top: -10rpx;">
			<view class="u-flex">
				<text class="title">车型</text>
				<view class="f1"></view>
				<text class="cm_price_tip">123</text>
				<text class="cm_time" style="margin-top: 10rpx;">/天</text>
			</view>
			<view class="cm_time" style="margin-top: 10rpx;">自动挡 · 5座.1 · 6L</view>
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
			<view class="cm_title">车辆配置</view>
			<view class="u-flex configBox">
				<view class="configItems u-flex">
					<text class="labels">变速箱</text>
					<view class="f1">
						无级变速
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="labels">油箱容量</text>
					<view class="f1">
						80L
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="labels">排量</text>
					<view class="f1">
						3.5T
					</view>
				</view>
				<view class="f1"></view>
			</view>
		</view>


		<view class="cm_boxs">
			<view class="cm_title">租车须知</view>
			<view class="noteBox">
				<view class="title">·取车凭证</view>
				<view class="cm_time"> 本人有效身份证原件（有效期1个月以上）</view>
				<view class="cm_time"> 本人有效身份证原件（有效期1个月以上）</view>
			</view>
			<view class="noteBox">
				<view class="title">·押金说明</view>
				<view class="cm_time"> 本人有效身份证原件（有效期1个月以上）</view>
				<view class="cm_time"> 本人有效身份证原件（有效期1个月以上）</view>
			</view>
			<view class="noteBox">
				<view class="title">·燃油政策</view>
				<view class="cm_time"> 本人有效身份证原件（有效期1个月以上）</view>
				<view class="cm_time"> 本人有效身份证原件（有效期1个月以上）</view>
			</view>
			<view class="noteBox">
				<view class="title">·取消规则</view>
				<view class="tables">
					<view class="rows u-flex rows-header">
						<view class="cells cell-header">取消时间</view>
						<view class="cells cell-content ">免费取消</view>
					</view>
					<view class="rows u-flex ">
						<view class="cells cell-header">取车前24小时</view>
						<view class="cells cell-content green">扣费标准</view>
					</view>
					<view class="rows u-flex ">
						<view class="cells cell-header">取车前24小时-取车时间</view>
						<view class="cells cell-content">扣订单总费用30%</view>
					</view>
					<view class="rows u-flex ">
						<view class="cells cell-header">取车时间后</view>
						<view class="cells cell-content">扣订单总费用100%</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer saveBottom">
			<view class="flex">
				<view class="actions u-flex-y">
					<image src="../../../static/images/sy_xx.png" mode="aspectFill" class="icons"></image>
					<text class="cm_time">客服</text>
				</view>
				<view class="f1" style="padding-right: 30rpx;">
					<u-button @click="submit" shape="circle" class="f1" type="primary">预约车辆</u-button>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			submit() {
				uni.navigateTo({
					url: '/pages/features/createOder/createOder'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		padding-bottom: 150rpx;

		.carPics {
			width: 100%;
			height: 422rpx;
			background-color: #fff;
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

		.configBox {
			flex-wrap: wrap;

			.configItems {
				width: 50%;
				line-height: 70rpx;

				.labels {
					color: #666;
					width: 164rpx;
					text-align: left;
				}
			}
		}

		.noteBox {
			border-bottom: 1rpx solid #f8f8f8;
			padding: 16rpx 0 20rpx 0;
			.title {
				font-size: 26rpx; 
				font-weight: 400;
				margin-bottom: 24rpx;
			}
			.cm_time {
				line-height: 2;
				text-indent: 20rpx;
			}
		}

		.tables {
			border-top: 1rpx solid #f8f8f8;
			border-left: 1rpx solid #f8f8f8;
			margin-top: 16rpx;
			.cells {
				color: #666;
				height: 74rpx;
				line-height: 74rpx;
				text-align: left;
				padding: 0 20rpx;
				border-right: 1rpx solid #f8f8f8;
				// color: #666;
				border-bottom: 1rpx solid #f8f8f8;
			}

			.rows-header {
				color: #333;
				background-color: rgba(206, 225, 245, .2);

				.cells {
					color: #333;
				}
			}

			.cell-header {
				flex: 1
			}

			.cell-content {
				width: 282rpx;
			}

			.green {
				background-color: #E4F9F3;
				color: #109E70;
			}
		}


		.footer {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background-color: #fff;

			.actions {
				width: 98rpx;
				height: 98rpx;
			}

			.icons {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
</style>
