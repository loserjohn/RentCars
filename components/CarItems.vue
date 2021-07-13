<template>
	<view class="carItems" @click="_nav">
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
</template>

<script>
	export default {
		name: "carItems",
		data() {
			return {

			};
		},
		methods:{
			_nav(){
				uni.navigateTo({
					url:'/pages/features/carDetail/carDetail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carItems {
		padding: 20rpx;
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
		}
	}

	.carItemsFooter {
		padding-top: 16rpx;
		margin-top: 16rpx;
		border-top: 1rpx solid #f8f8f8;
	}
</style>
