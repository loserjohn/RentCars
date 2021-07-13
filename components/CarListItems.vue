<template>
	<view style="padding:0 30rpx;" @click="_nav">
		<view class="u-flex carItems">
			<image src="../static/images/fp_sm.png" class="pics" mode="aspectFill"></image>
			<view class="f1 u-flex-y content" >
				<view class="title cm_ellipsis2">萨法的啥的萨法的啥的萨法的啥的萨法的啥的萨法的啥的</view>
				<view class="cm_text cm_ellipsis">是打发点啥的是是打发点啥的是是打发点啥的是</view>
				<view class="f1"></view>
				<view class="u-flex priceBox f1">
					<text class="price">1.2万 </text>
					<text style="color:#EE7F48 ;"> 首付1.2万</text>
					<view class="f1"></view>
				</view>
			</view>
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
					url:'/pages/usedCars/carDetail/carDetail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carItems {
		padding: 20rpx 0;
		background-color: #fff;
		margin-bottom: 16rpx;
		// border-radius: 12rpx;
		border-bottom: 1rpx solid #f4f4f4;
		.pics {
			width: 276rpx;
			height: 184rpx;
			margin-right: 24rpx;
			background: #f1f1f1;
		}

		.title {
			font-weight: 600;
			line-height: 1.2;
			margin-bottom: 10rpx;
			font-size: 32rpx;
		 
		}
		.priceBox{
			padding: 10rpx 0;
			.price{
				color: #EE7F48;
				font-size: 32rpx;
				margin-right: 16rpx;
				font-weight: 600;
			}
		}
		.cm_title,.cm_time{
			white-space: nowrap;
			width: 100%;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.cm_text{
			width: 100%;
		}
		.content{
			width: 50%;
			height: 184rpx;
			align-items: flex-start;
		}
		
	}

 
</style>
