<template>
	<view class="calendar">
		<view class="weeks_con flex-row align-items-center space-between">
	    <view class="weeks_item" v-for="(item,index ) in monthList" :key="item.text">{{item.text}}</view>
	  </view>
	  <view class="month_item" v-for="(monthitem,index ) in monthList" :key="monthitem.month" >
	    <view class="month_title">{{monthitem.year}}年{{monthitem.month}}月</view>
	    <view class="week_con">
	      <view class="weekitem flex-row align-items-center" :class="[range[1]?'rangeTip':'']"  v-for="(weekitem,index) in monthitem.monthArr" :key="index">
	        <view class="dateCon" :class="[dateitem.time == range[0]?'startRangeTime':dateitem.time == range[1]?'endRangeTime':(dateitem.time > range[0] && dateitem.time < range[1]?'rangeTime':'')]" v-for="(dateitem,index) in weekitem" :key="dateitem.time">
	          <view :class="[(today == dateitem.time)?'today':'', (dateitem.time == range[0])?'startTime':(dateitem.time == range[1])?'endTime':'']" :data-item="dateitem.time" @click="selectDate">{{today == dateitem.time?'今':dateitem.text}}</view>
	        </view>
	      </view>
	    </view>
	  </view>
	  <!-- <view class="btn_sure"  @click="btnSureFun">确定</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			tendencyTimeArr: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				weeks: [{ num: 0, text: '日' }, { num: 1, text: '一' }, { num: 2, text: '二' }, { num: 3, text: '三' }, { num: 4, text: '四' }, { num: 5, text: '五' }, { num: 6, text: '六' }],
				monthList: [],
				range: [],
				today:''
			}
		},
		created() {
			let today = this.dateFormat()
			   this.today = new Date(today).getTime();
			   let [timeStart,timeEnd] = this.tendencyTimeArr;
			   timeStart = new Date(timeStart).getTime();
			   timeEnd = new Date(timeEnd).getTime()
			   this.range = [timeStart,timeEnd]
			   this.showMoreMonth({})
		},
		methods: {
			showMoreMonth({ key }) {
				let monthList = this.monthList;
				if (!monthList.length) {
					let date = new Date()
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					this.getMonth({ year, month })
					if (month == 1) {
						this.getMonth({
							year: year - 1,
							month: 12
						})
						// this.getMonth({year:year-1,month:11})
					} else if (month == 2) {
						this.getMonth({
							year,
							month: 1
						})
						// this.getMonth({year:year-1,month:12})
					} else {
						this.getMonth({
							year: year,
							month: month - 1
						})
						// this.getMonth({year:year,month:month-2})
					}
				} else if (key == 1) {
					let {
						year,
						month
					} = monthList[monthList.length - 1];
					if (month == 12) {
						this.getMonth({
							year: year + 1,
							month: 1
						})
					} else {
						this.getMonth({
							year: year,
							month: month + 1
						})
					}
				} else if (key == -1) {
					let {
						year,
						month
					} = monthList[0];
					if (month > 1) {
						this.getMonth({
							year,
							month: month - 1
						})
					} else {
						this.getMonth({
							year: year - 1,
							month: 12
						})
					}
				} else {

				}

			},
			getMonth({ year, month, num }) {
				var d = new Date(year, month, 0);
				let dayNumger = d.getDate();
				let str = `${year}/${month}/01`;
				let day = new Date(str).getDay()
				let monthArr = [];
				let weekArr = [];
				for (let i = 0; i < dayNumger + day; i++) {
					if (i < day) {
						weekArr.push({ text: '', time: 'kk' })
					} else {
						let text = i + 1 - day;
						let time = new Date(year + '/' + month + '/' + text).getTime()
						weekArr.push({ text, time})
						if (weekArr.length == 7) {
							monthArr.push(weekArr);
							weekArr = []
						}
					}
				}
				monthArr.push(weekArr);
				let monthList= this.monthList;
				let obj = {
					monthArr,
					year,
					month,
					time: new Date(str).getTime()
				}
				monthList.push(obj)
				monthList.sort(function(a, b) {
					return a.time - b.time;
				})
				this.monthList = monthList
			},
			selectDate(e) {
				let time = e.currentTarget.dataset.item;
				let range = this.range;
				if (range.length <= 1) {
					if (range.indexOf(time) > -1) {
						return;
					}
					range.push(time)
				} else {
					range = [];
					range.push(time)
				}
				range.sort((a, b) => {
					return a - b
				})
				this.range = range
			},
			dateFormat(time = new Date(),fmt = 'YYYY/MM/DD') {
			    let ret;
			    let date = new Date(time);
			    const opt = {
			        "Y+": date.getFullYear().toString(),        // 年
			        "M+": (date.getMonth() + 1).toString(),     // 月
			        "D+": date.getDate().toString(),            // 日
			        "H+": date.getHours().toString(),           // 时
			        "m+": date.getMinutes().toString(),         // 分
			        "s+": date.getSeconds().toString()          // 秒
			    };
			    for (let k in opt) {
			        ret = new RegExp("(" + k + ")").exec(fmt);
			        if (ret) {
			            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			        };
			    };
			    return fmt;
			},
			btnSureFun(){
				this.$emit('submitFun',this.range)
			}
		}
	}
</script>

<style>
	.flex-row{
	  display: flex;
	  flex-direction: row;
	  -webkit-flex-direction: row;
	}
	.align-items-center{
	  align-items: center;
	}
	view{
	  margin: 0;
	  padding: 0;
	  line-height: 1;
	  box-sizing: border-box;
	  font-size: 28rpx;
	  font-family: PingFang SC;
	  font-weight: 500;
	  color: #617683;
	}
	.calendar{
		width: 750rpx;
		overflow-x: auto;
	  /* margin-top: 80rpx; */
	  padding-bottom: 280rpx;
	}
	.weeks_con{
	  padding: 0 60rpx;
	}
	.weeks_item{
	  width: 90rpx;
	  text-align: center;
	}
	.month_title{
	  margin-top: 30rpx;
	  text-align: left;
	  /* background-color: #ddd; */
	  padding: 10rpx 30rpx;
	}
	.week_con{
	  margin-top: 50rpx;
	  padding: 0 60rpx;
	}
	.dateCon{
	  width: 60rpx;
	  height: 60rpx;
	  line-height: 60rpx;
	  text-align: center;
	  margin: 15rpx;
	  position: relative;
	}
	.dateCon view{
	  width: 60rpx;
	  height: 100%;
	  line-height: 60rpx;
	  text-align: center;
	  margin: 0 auto;
	}
	.rangeTip .startRangeTime{
	  width: 75rpx;
	  margin-right: 0;
	  border-radius: 30rpx 0 0 30rpx;
	  background-color: rgba(19, 158, 238, 0.1);
	}
	.rangeTip .startRangeTime view{
	  margin-right: 15rpx;
	}
	.startTime{
	  border-radius: 30rpx;
	  background-color: #4C81FC;
	  color: #fff;
	  position: relative;
	}
	.startTime::before{
		content: '取车';
		position: absolute;
		bottom: -44rpx;
		color: #333;
		font-size: 22rpx;
		width: 100%;
		text-align: center;
		left: 0;
	}
	.rangeTip .endRangeTime{
	  width: 75rpx;
	  margin-left: 0;
	  border-radius: 0 30rpx 30rpx 0;
	  background-color: rgba(19, 158, 238, 0.1);
	}
	.rangeTip .endRangeTime view{
	  margin-left: 15rpx;
	}
	.endTime{
	  border-radius: 30rpx;
	  background-color: #4C81FC;
	  color: #fff;
	  position: relative;
	  width: 100%;
	  text-align: center;
	}
	.endTime::before{
		content: '还车';
		position: absolute;
		bottom: -44rpx;
		color: #333;
		font-size: 22rpx;
		left: 0;
		
		width: 100%;
		
	}
	.rangeTip .rangeTime{
	  width: 90rpx;
	  margin: 15rpx 0;
	  background-color: rgba(19, 158, 238, 0.1);
	}
	.today{
	  border-radius: 30rpx;
	  background-color: #dbe626;
	  color: #fff;
	}
	
	.btn_sure{
	  position: fixed;
	  bottom: 0;
	  width: 750rpx;
	  height: 100rpx;
	  line-height: 100rpx;
	  text-align: center;
	  background: linear-gradient(90deg, #FE9E1C, #FA5C10);
	  font-size: 32rpx;
	  font-family: PingFang SC;
	  font-weight: 500;
	  color: #FFFFFF;
	}
</style>
