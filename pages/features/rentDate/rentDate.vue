<template>
	<view class="pages u-flex-y ">
		<view class="header">

			<RentingTime customstyle="background:#fff" />
			<view class="u-flex timeTipsBars">
				<view class="f1 timeTips">日</view>
				<view class="f1 timeTips">一</view>
				<view class="f1 timeTips">二</view>
				<view class="f1 timeTips">三</view>
				<view class="f1 timeTips">四</view>
				<view class="f1 timeTips">五</view>
				<view class="f1 timeTips">六</view>
			</view>
		</view>

		<scroll-view scroll-y="true" class="dateBox" @scrolltoupper="pullDownRefresh" @scrolltolower="reachBottom">
			<!-- <view class="dateBox"> -->
			<timeHorizon ref='timeHorizon' @submitFun='submitFun'></timeHorizon>
			<!-- </view> -->
		</scroll-view>
		<view class="timeBox ">
			<view class="u-flex">
				<view class="f1 timeTitle">取车时间</view>
				<view class="f1 timeTitle">还车时间</view>
			</view>
			<view class="timePickBox">
				<view class="hideBox hideBox1"></view>
				<view class="hideBox hideBox2"></view>
				<view class="hideBox hideBox3"></view>

				<picker-view class="timePanel" :indicator-style="indicatorStyle" :value="value[0]" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item,index) in times" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in times" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
		<view class="footer saveBottom">
			<view class="flex">
				<text>共48小时</text>
				<view class="f1"></view>
				<u-button @click="submit" type="primary">确认</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import timeHorizon from '@/components/time-horizon/time-horizon.vue' //引入组件
	import RentingTime from '@/components/RentingTime.vue'
	export default {
		data() {
			return {
				times: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00'],
				indicatorStyle: 'color:#333;font-weight:600',
				value: ['8:00', '12:00']
			};
		},
		components: {
			RentingTime,
			timeHorizon //注册组件
		},
		methods: {
			bindChange() {},
			submit() {
				this.$refs.timeHorizon.btnSureFun()
			},
			submitFun(obj) { //组件点击回调
				console.log(obj)
			},
			pullDownRefresh() { //下拉获取上一个月日历
				this.$refs.timeHorizon.showMoreMonth({
					key: -1
				})
				uni.stopPullDownRefresh()
			},
			reachBottom() { //触底获取下一个月日历
				this.$refs.timeHorizon.showMoreMonth({
					key: 1
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.pages {
		.header {
			width: 100%;
			background: #fff;
			height: 236rpx;
			padding: 30rpx;

			.timeTipsBars {
				margin: 0;
				margin-top: 20rpx;

				.timeTips {
					// height: 40rpx;
					text-align: center;
					color: #666;
				}
			}

		}

		.dateBox {
			flex: 1;
			width: 100%;
			height: 656rpx;
			width: 100%;
			background-color: #fff;
			margin-top: 20rpx;
		}

		.timeBox {
			height: 370rpx;
			width: 100%;
			overflow: hidden;
			background-color: #fff;
			position: relative;
			border-top: 1rpx solid #f8f8f8;
			border-bottom: 1rpx solid #f8f8f8;
			.timeTitle{
				line-height: 80rpx;
				text-align: center;
			}
			.timePickBox {
				width: 100%;
				height: 290rpx;
				position: relative;

				.hideBox {
					width: 118rpx;
					height: 100%;
					background: #FFFFFF;
					position: absolute;
					z-index: 1;
					top: 40rpx;
					border-bottom: 0;
				}

				.hideBox1 {
					left: 0;
				}

				.hideBox2 {
					width: 236rpx;
					left: 50%;
					margin-left: -118rpx;
				}

				.hideBox3 {
					right: 0;
				}
			}


			.timePanel {
				width: 100%;				
				height: 290rpx;

				.item {
					// width: 140rpx;
					z-index: 1;
					text-align: center;
					line-height: 2.2;
					color: #999;
					font-size: 30rpx;
					// height: 200rpx;
				}
			}

		}

		.footer {
			width: 100%;
			background-color: #fff;
			padding-top: 10rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
		}
	}
</style>
