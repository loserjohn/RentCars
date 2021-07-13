<template>
	<view class="imt-audio">
		<view class="title">{{title}}</view>
		<view class="audio-wrapper">
			<!-- <view class="audio-number"></view> -->
			<slider class="audio-slider" activeColor="#1e8ff3" block-size="0" :value="current" :max="duration" @changing="seek=true,current=$event.detail.value"
			 @change="change"></slider>
			<view class="audio-number">{{currentTime}}/{{durationTime}}</view>
		</view>
		<view class="audio-control-wrapper" :style="{color:color}">
			<view hover-class="cm_hover_m" class="audio-control audio-control-prev" v-if="control" :style="{borderColor:color}" @click="prev">&#xe601;</view>
			<view  class="audio-control audio-control-switch" :class="{audioLoading:loading}" :style="{borderColor:color}" @click="operation">{{loading?'&#xe600;':(paused?'&#xe865;':'&#xe612;')}}</view>
			<view hover-class="cm_hover_m" class="audio-control audio-control-next" v-if="control" :style="{borderColor:color}" @click="next">&#xe601;</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				currentTime: '', //当前播放时间
				durationTime: '', //总时长
				current: '', //slider当前进度
				loading: false, //是否处于读取状态
				paused: true, //是否处于暂停状态
				seek: false ,//是否处于拖动状态
				title:'',
				src:'',
				classCode:'',
				code:'',
				ifNew:true,
				audio:null
			}
		},
		beforeDestroy() {
			// let st = uni.getStorageSync('studyTime');
			// let t = new Date().getTime();
			// // let d = t - st
			// let that = this
			// if(st && t-st>1000*10){
			// 	// 有效学习时间
			// 	// 结算学习时间
			// 	uni.$emit('settleStudy',{
			// 		duration:t-st,  //停留时间，
			// 		currentTime:that.current,
			// 		code:that.code,
			// 		classCode:that.classCode
			// 	})
			// }else{
			// 	// 无效学习
			// 	console.log('无效学习')
			// }
			this.audio.destroy();
				this.settleStudy()  
		},
		props: {
			// title:{
			// 	type:String,
			// 	default:''
			// },
			// src: {
			// 	type:String,
			// 	default:true
			// } , //音频链接
			autoplay:  {
				type:Boolean,
				default:false
			}, //是否自动播放
			duration: {
				type:String,
				default:'0'
			}, //总时长（单位：s）
			control: {
				type:Boolean,
				default:true
			}, //是否需要上一曲/下一曲按钮
			continue:{
				type:Boolean,
				default:false
			},//播放完成后是否继续播放下一首，需定义@next事件
			color: {
				type:String,
				default:'#fff'
			} //主色调
		},
		created() {
			uni.getNetworkType({
			    success: function (res) {
			        // console.log(res);
					const onlyWifi =  uni.getStorageInfoSync('onlyWifi')
					if(onlyWifi && res.networkType!='wifi'){
						uni.showModal({
							title:'中旦教育提醒您',
							content:'当前非wifi网络，继续播放会产生流量消耗',
							showCancel:false,
							confirmText:'我知道了',						
							success(e){
							}
						})
					}
			    }
			});	
			
		},
		watch: {
			//监听音频地址更改
			// src(e) {
			// 	audio.src = e
			// 	this.current = 0
				
			// 	audio.play()
			// 	this.loading = true
			// },
			//监听总时长改变
			// duration(e) {
			// 	this.durationTime = this.format(e)
			// },
			//监听当前进度改变
			current(e) {
				this.currentTime = this.format(e)
			}
		},
		methods: {
			//返回prev事件
			prev() {
				this.$emit('prev')
			},
			//返回next事件
			next() {
				this.$emit('next')
			},
			//格式化时长
			format(num) {
				// console.log(num)
				num =   parseInt(Number(num )) 
				// console.log(num)
				return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(
					Math.floor(num % 60)).length) + Math.floor(num % 60)
			},
			//播放/暂停操作
			operation() {
				console.log(this.audio.paused)
				if (this.audio.paused) {				
					this.audio.play()
				} else {
					this.audio.pause()
				}
			},
			
			//完成拖动事件
			change(e) {
				this.audio.seek(e.detail.value)
				// console.log(this.audio.paused)
			},
			reset(e){
				if(this.ifNew){
					
				}else{
					this.settleStudy()
				}
				
				this.durationTime =  this.format(e.duration?e.duration:0) 
				this.current = e.current?e.current:0
				this.src = e.src
				this.code = e.code
				this.title = e.title
				this.classCode = e.classCode
				
				this.paused = true
				
				// audio.play()
				if(!this.audio){
					this.initPlayer()
				}else{
					this.audio.src = e.src
					this.audio.seek(this.current )
				}
				// this.loading = true
			},
			initPlayer(callback){
				let that = this
				this.audio = uni.createInnerAudioContext();
				this.audio.src = this.src
				// this.current = 0
				this.durationTime = this.format(this.duration)
				this.audio.obeyMuteSwitch = false
				this.audio.autoplay = this.autoplay
				this.audio.seek(this.current )
				//音频进度更新事件
				this.audio.onTimeUpdate(() => {
					that.loading = false;
					if (!that.seek) {
						that.current = that.audio.currentTime
					}
				})
				//音频播放事件
				this.audio.onPlay(() => {
					console.log('播放音乐');
					that.paused = false
					that.loading = false;
					
					if(that.ifNew){
						that.settleStudy() 
						that.ifNew = false
						
					}
					let t = new Date().getTime();
					uni.setStorageSync('studyLesson',that.classCode)
					uni.setStorageSync('studyTime',t)
				})
				//音频暂停事件
				this.audio.onPause(() => {
					that.paused = true
				})
				//音频结束事件
				this.audio.onEnded(() => {
					if (that.continue) {
						that.next()
					} else {
						that.paused = true
						that.current = 0
					}
					that.settleStudy() 
				})
				//音频完成更改进度事件
				this.audio.onSeeked(() => {
					console.log(this.audio.paused)
					that.seek = false
				})
			},
			settleStudy(){
				let st = uni.getStorageSync('studyTime');
				let t = new Date().getTime();
				let d = t - st
				// debugger
				let that = this
				if(st && d>1000*10){
					// 结算学习时间
					uni.$emit('settleStudy',{
						duration:d,  //停留时间，
						currentTime:that.current,
						code:that.code,
						classCode:that.classCode
					})
				}else{
					// 无效学习
					console.log('无效学习')
				}
				// uni.setStorageSync('studyLesson',that.classCode)
				// uni.setStorageSync('studyTime',t)
			},
		},
		
	}
</script>

<style scoped> 
	@font-face {
		font-family: 'icon';
		src: url('//at.alicdn.com/t/font_1104838_fxzimc34xw.eot');
		src: url('//at.alicdn.com/t/font_1104838_fxzimc34xw.eot?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.woff') format('woff'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.ttf') format('truetype'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.svg#iconfont') format('svg');
	}
	.title{
		line-height: 1.4;
		/* margin-bottom: 20rpx; */
	}
	.imt-audio {
		padding: 30upx;
		background: rgba(255,255,255,0.2);
		
		border-radius: 20upx;
	}

	.audio-wrapper {
		display: flex;
		align-items: center;
	}

	.audio-number {
		font-size: 24upx;
		line-height: 1;
		color: #fff;
	}
	.uni-slider{
		margin: 0!important;
	}
	.audio-slider {
		flex: 1;
		/* margin: 0 20upx; */
		margin-right: 20rpx;
		overflow: hidden;
	}

	.audio-control-wrapper {
		margin-top:12upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: "icon" !important;
	}

	.audio-control {
		font-size: 32upx;
		line-height: 1;
		border: 4upx solid;
		border-radius: 50%;
		padding: 16upx;
	}

	.audio-control-next {
		transform: rotate(180deg);
	}

	.audio-control-switch {
		font-size: 40upx;
		margin: 0 80upx;
	}

	.audioLoading {
		animation: loading 2s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	@keyframes loading {
		to {
			transform: rotate(360deg);
		}
	}
</style>