<template>
	<view class="components">
		<view class="result u-flex" :style="customstyle">
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
</template>

<script>
	export default {
		name:"RentingTime",
		data() {
			return {
				
			};
		},
		props:{
			customstyle:{
				type:String,
				default:"background:#f8f8f8"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.components{
		
		.result {
			background-color: #f8f8f8;
			padding: 20rpx;
			border-radius: 12rpx;
			text-align: center;
			// margin-bottom: 80rpx;
		
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
</style>
