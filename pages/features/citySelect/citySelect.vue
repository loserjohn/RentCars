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
		<view class="hotBox">
			<view class="cm_title">热门城市</view>
			<view class="hotBar">
				<u-row gutter="16">
					<u-col span="3">
						<view class="hotCitys">福州</view>
					</u-col>
					<u-col span="3">
						<view class="hotCitys">厦门</view>
					</u-col>
					<u-col span="3">
						<view class="hotCitys">福州</view>
					</u-col>
					<u-col span="3">
						<view class="hotCitys">福州</view>
					</u-col>
					<u-col span="3">
						<view class="hotCitys">福州</view>
					</u-col>
					<u-col span="3">
						<view class="hotCitys">福州</view>
					</u-col>
					<u-col span="3">
						<view class="hotCitys">福州</view>
					</u-col>
				</u-row>

			</view>
		</view>
		<view class="indexlistBar">
			<u-index-list :scrollTop="scrollTop">
				<view v-for="(item, index) in indexList" :key="index">
					<u-index-anchor :index="item" />
					<view class="list-cell">
						列表1
					</view>
					<view class="list-cell">
						列表2
					</view>
					<view class="list-cell">
						列表3
					</view>
				</view>
			</u-index-list>

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

		.hotBox {
			padding: 0 30rpx 30rpx 30rpx;

			.cm_title {
				line-height: 3;
			}

			.hotBar {
				margin-left: -8rpx;
				margin-right: -8rpx;
			}

			.hotCitys {
				height: 72rpx;
				line-height: 72rpx;
				border-radius: 8rpx;
				background-color: #fff;
				text-align: center;
				margin-bottom: 16rpx;
			}
		}

		.indexlistBar {
			background-color: #fff;
			
		}
	}
	.u-index-anchor{
		background-color: #fff!important;
	}
</style>
