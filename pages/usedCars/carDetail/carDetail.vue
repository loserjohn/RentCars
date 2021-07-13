<template>
	<view class="pages">
		<view class="banner">
			<u-swiper name="Text" mode="number" indicator-pos="bottomRight" :list="banners" @click="click"
				:effect3d="false" :height="500"></u-swiper>
		</view>
		<view class="cm_boxs">
			<view class="u-flex">
				<text class="cm_price_tip">530万</text>
				<view class="f1"></view>
				<!-- <image src="" mode="aspectFill"></image> -->
				<u-icon name="zhuanfa" color="#333" size="50"></u-icon>
			</view>
			<view class="cm_title title" style="margin-top: 16rpx;">标日</view>
			<view class="cm_text">3.0万公里·2.0T·自动</view>
			<view class="tipsBox">
				分期特惠:首付三成 7.76万开回家
			</view>
		</view>
		<view class="cm_boxs">
			<view class="cm_title">车辆信息</view>
			<view class="u-flex configBox">
				<view class="configItems u-flex">
					<text class="labels">行驶里程</text>
					<view class="f1">
						无级变速
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="labels">首次上牌</text>
					<view class="f1">
						80L
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="labels">排放标准</text>
					<view class="f1">
						3.5T
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="labels">过户</text>
					<view class="f1">
						3.5T
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="labels">排量</text>
					<view class="f1">
						3.5T
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="labels">变速箱</text>
					<view class="f1">
						3.5T
					</view>
				</view>
				<view class="f1"></view>
			</view>
			<view class="boxFooter">
				查看更多参数<u-icon name="arrow-right" color="#EE7F48" size="24"></u-icon>
			</view>
		</view>

		<view class="cm_boxs">
			<view class="cm_title">车辆情况</view>
			<view class="u-flex currentBox">
				<view class="configItems u-flex">
					<text class="f1 labels">事故排查(60项)</text>
					<view class=" good">
						良好
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="f1 labels">底盘检测(48项)</text>
					<view class=" good">
						良好
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="f1 labels">轻微碰撞检测(24项)</text>
					<view class=" waring">
						一般
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="f1 labels">易损耗部件(27项)</text>
					<view class=" error">
						欠佳
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="f1 labels">常用功能检测(96项)</text>
					<view class=" good">
						良好
					</view>
				</view>
				<view class="configItems u-flex">
					<text class="f1 labels">启动检测(20项)</text>
					<view class=" good">
						良好
					</view>
				</view>
				<!-- <view class="f1"></view> -->
			</view>
			<view class="boxFooter">
				查看更多车况<u-icon name="arrow-right" color="#EE7F48" size="24"></u-icon>
			</view>
		</view>
		
		<view class="cm_boxs u-flex mapBox">
			<image src="../../../static/images/mc_esc.png" mode="aspectFill" class="addressLogo"></image>
			<view class="f1">
				<view class="cm_title title">的说法沙发斯蒂芬</view>
				<view class="cm_text">三大法师的发啥的</view>
				<view class="cm_time">营业时间</view>
			</view>
			<view class="u-flex-y">
				<u-icon name="map" color="#666" size="50"  ></u-icon>
				<text class="cm_text" style="margin-top: 16rpx;" >导航</text>
			</view>
		</view>
		
		<view class="cm_boxs">
			<image src="https://cdn.uviewui.com/uview/swiper/1.jpg" mode="widthFix" class="preview"></image>
			<image src="https://cdn.uviewui.com/uview/swiper/2.jpg" mode="widthFix" class="preview"></image>
			<image src="https://cdn.uviewui.com/uview/swiper/3.jpg" mode="widthFix" class="preview"></image>
			<image src="https://cdn.uviewui.com/uview/swiper/1.jpg" mode="widthFix" class="preview"></image>
			
		</view>
		<view class="footer saveBottom">
			<view class="flex">
				<view class="actions u-flex-y">
					<image src="../../../static/images/sy_xx.png" mode="aspectFill" class="icons"></image>
					<text class="cm_time">客服</text>
				</view>
				<view class="f1" style="padding-right: 30rpx;">
					<u-button @click="submit" shape="circle" class="f1" type="primary">预约看车</u-button>
				</view>
		
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banners: [{
					Text: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				}, {
					Text: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				}],
			};
		}
	}
</script>

<style lang="scss" scoped>
	.pages {
		padding-bottom: 150rpx;
		.title{
			margin: 16rpx 0;
		}
		.tipsBox{
			background-color: #FFF4EA;
			color: #A5590A;
			height: 58rpx;
			line-height: 58rpx;
			border-radius: 6rpx;
			margin-top: 32rpx;
			padding: 0 24rpx;
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
		.currentBox{
			flex-wrap: wrap;
			justify-content: space-between;
			.configItems {
				width: 310rpx;
				line-height: 70rpx;
					
				// padding-right: 36rpx;
				.labels {
					color: #666;
					text-align: left;
				}
				.good{
					color: #58AD3B;
				}
				.waring{
					color: #EE7F48;
				}
				.error{
					color: red;
				}
			}
		}
		.boxFooter{
			margin-top: 16rpx;
			padding-top: 25rpx;
			text-align: center;
			color: #EE7F48;
			border-top: 1rpx solid #f4f4f4;
		}
		.mapBox{
			.addressLogo{
				width: 150rpx;
				height: 150rpx;
				margin-right: 24rpx;
			}
			.cm_text{
				margin-bottom: 16rpx;
			}
		}
		.preview{
			width: 100%;
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
