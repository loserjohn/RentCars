<template>
	<view class="pages">
		<view class="header flex">
			<view class="f1">

				<u-search circle placeholder="请输入想要找的城市" clearabled v-model="keyword"></u-search>
			</view>
		</view>

		<view class="u-flex top">
			<text>当前城市：福州</text>
			<view class="f1"></view>
			<!-- <u-icon name="arrow-down" color="red" size="28"></u-icon> -->
			<image src="../../../static/images/cs_dw.png" mode="aspectFill" class="stepIcon"></image>
			<text class="stips">重新定位</text>
		</view>
		<view class="resultBox">
			<view class="u-flex">
				<text>搜索历史</text>
				<view class="f1"></view>
				<text class="cm_des">清空历史</text>
			</view>
			<view class="result">
				<view class="items">人味儿无若</view>
				
					<view class="items">人味儿无若</view>
					
						<view class="items">人味儿无若</view>
						
							<view class="items">人味儿无若</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
					"T", "U",
					"V", "W", "X", "Y", "Z"
				]
			};
		}
	}
</script>

<style lang="scss">
	.pages {
		.header {
			width: 100%;
			height: 88rpx;
			background: #fff;
			padding: 0 30rpx;
		}

		.top {
			background: #fff;
			padding: 0 30rpx;
			line-height: 104rpx;
			height: 104rpx;

			.stepIcon {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}

			.stips {
				color: #EE7F48;
				font-size: 24rpx;
			}
		}

		.resultBox {
			padding: 30rpx 30rpx 30rpx 30rpx;
			background-color: #fff;
			margin-top: 20rpx;
			.cm_title {
				line-height: 3;
			}
			.items{
				line-height: 88rpx;
				height: 88rpx;
				border-bottom: 1rpx solid #f8f8f8;
			}
		}

		 
	} 
</style>
