
<template>
	<view class="tabs">
		<!-- #ifdef H5 -->
			<view class="video-js" ref="video" style="width: 100%;height:420rpx;"></view>
		<!-- #endif -->
		<!-- #ifdef MP -->
			<video :title="title" x5-video-player-type="h5-page" @play="_play" :initial-time="current" @timeupdate="_timeupdate"  class="mp4player"  :muted="true" :show-mute-btn="true" @loadedmetadata="loadedmetadata" :poster="mainPic"  id="myVideo" :autoplay="false" :src="src"></video>
		<!-- #endif -->
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				ons: false,
				player: null,
				classCode:'',
				code:'',
				current:0,
				ifNew:true,
				duration:0
			}
		},
		props: {
			src: {
				type:String,
				default:''
			} , //音频链接
			mainPic:{
				type:String,
				default:''
			},
			// title:{
			// 	type:String,
			// 	default:''
			// },
			autoplay:  {
				type:Boolean,
				default:false
			}, //是否自动播放
			// duration: {
			// 	type:String,
			// 	default:10
			// }, //总时长（单位：s）
			// control: {
			// 	type:Boolean,
			// 	default:true
			// }, //是否需要上一曲/下一曲按钮
			// continue:{
			// 	type:Boolean,
			// 	default:true
			// },//播放完成后是否继续播放下一首，需定义@next事件
			// color: {
			// 	type:String,
			// 	default:'#fff'
			// } //主色调
		},
		// watch:{
			
		// },
		created() {
			// console.log(videojs)
			
			uni.getNetworkType({
			    success: function (res) {
			        // console.log(res);
					const onlyWifi =  uni.getStorageInfoSync('onlyWifi')
					if(res.networkType!='wifi'){
						uni.showModal({
							title:'中旦教育提醒您',
							content:'当前非wifi网络，可能回消耗部分流量',
							showCancel:false,
							confirmText:'我知道了',						
							success(e){
							}
						})
					}
			    }
			});	
			// 这个是vue可以使用拿过来,在这个框架不行了
			// this.playVideo();
		},
		beforeDestroy() {
			// #ifdef H5
				this.player.dispose();
			// #endif
			
			this.settleStudy()  
			
		},
		methods: {
			// 初始化小程序播放器
			initVideo(){
				this.player =  uni.createVideoContext('myVideo') //创建音频
			},
			loadedmetadata(){},
			_timeupdate(e){
				this.current= e.detail.currentTime
			},
			_play(){
				console.log("开始播放");
				if(this.ifNew){
					this.settleStudy() 
					this.ifNew = false							
				}
				let t = new Date().getTime();
				uni.setStorageSync('studyLesson',this.classCode)
				uni.setStorageSync('studyTime',t)
			},
			// 初始化h5播放器
			initPlayer(callback){
				
				let video = document.createElement('video');
				video.id = 'h5_video';
				video.style = 'width: 100%; height: 100%;';
				// video.class = 'video-js vjs-big-play-centered'
				video.controls = true;
				video.setAttribute('class', 'video-js vjs-big-play-centered') 
				video.setAttribute('playsinline', true) //IOS微信浏览器支持小窗内播放
				video.setAttribute('webkit-playsinline', true) //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全zhi屏播放的video标签的一个属性
				video.setAttribute('x5-video-player-type', 'h5') //安卓 声明启用同层H5播放器 可以在video上面加东西
				let source = document.createElement('source');
				source.src = this.src;
				source.type = 'video/mp4';
				video.appendChild(source);
				let  that = this;
				this.$nextTick(function(){
					that.$refs.video.$el.appendChild(video);
					let player = videojs('h5_video', {
						poster: that.mainPic, // 视频封面图地址
						title:that.title,
						playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
						autoDisable: true,
						currentTime:that.current, 
						preload: 'auto', //auto - 当页面加载后载入整个视频 meta - 当页面加载后只载入元数据 none - 当页面加载后不载入视频
						language: 'zh-CN',
						fluid: true, // 自适应宽高
						muted: false, //  是否静音
						aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
						controls: true, //是否拥有控制条 【默认true】,如果设为false ,那么只能通过api进行控制了。也就是说界面上不会出现任何控制按钮
						autoplay: that.autoplay, //如果true,浏览器准备好时开始回放。 autoplay: "muted", // //自动播放属性,muted:静音播放
						loop: false, // 导致视频一结束就重新开始。 视频播放结束后，是否循环播放
						techOrder: ["html5", "flash"], //播放顺序
						screenshot:true,
						withCredentials: true,
						controlBar: {
							volumePanel: { //声音样式
								inline: false // 不使用水平方式
							},
							timeDivider: true, // 时间分割线
							durationDisplay: true, // 总时间
							progressControl: true, // 进度条
							remainingTimeDisplay: true, //当前以播放时间
							fullscreenToggle: true, //全屏按钮
							pictureInPictureToggle: true, //画中画
				
						},
						
						
					}, function() {
						
						this.on('error', function() { //请求数据时遇到错误
							console.log("请求数据时遇到错误")
						});
						this.on('stalled', function() { //网速失速
							console.log("网速失速")
						});
						this.on('play', function() { //开始播放
							console.log("开始播放")
							if(that.ifNew){
								that.settleStudy() 
								that.ifNew = false							
							}
							let t = new Date().getTime();
							uni.setStorageSync('studyLesson',that.classCode)
							uni.setStorageSync('studyTime',t)
						});
						this.on('pause', function() { //暂停
							console.log("暂停")
						});
						this.on('timeupdate', function() {
							// console.log(this.currentTime())
							let c = this.currentTime(); 
							// console.log(c,that.duration)
							that.current = c
							// if(that.current)
						})
						this.on('ended', function() {
							// console.log(this.currentTime())
							that.settleStudy('end') 
							
						})
					});							
					
					
					// console.log(player)
					that.player = player;
					this.player.currentTime(this.current); 
				})
			},
			settleStudy(type){
				let st = uni.getStorageSync('studyTime');
				let t = new Date().getTime();
				let d = t - st
				// debugger
				let that = this
				// console.log(st,t,d)
				if(type=='end'){
					uni.$emit('settleStudy',{
						duration:d,  //停留时间，
						currentTime:that.duration,
						code:that.code,
						classCode:that.classCode
					})
				}else if(st && d>1000*10){
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
			reset(e) {
	
				// this.src = e.src
				this.duration = e.duration? e.duration:0
				this.current = e.current? e.current:0
				this.code = e.code
				this.title = e.title
				this.classCode = e.classCode
				// video.requestFullScreen()
				
				this.loading = true
				
				//#ifdef H5
					if(!this.player){
						this.initPlayer()
					}else{
						this.changeVideo()
					}
				//#endif
				//#ifdef MP
					if(!this.player){
						this.initVideo()
					}else{
						this.changeVideo()
					}
				//#endif
				
			},

			changeVideo() {
				let type = ''
				let url = this.src
				if (url.indexOf('.mp4') !== -1) {
					type = 'video/mp4'
				} else if (url.indexOf(('.m3u8')) !== -1) {
					type = 'application/x-mpegURL'
				} else {
					type = 'rtmp/hls'
				}
				this.settleStudy()  //计算学习
				
				// #ifdef H5
					this.player.src({
						src: url,
						type: type,
						withCredentials: true, //跨域请求设置withCredentials
					})
					// let video = document.getElementById('video_Html5_api');
					// let video = document.getElementById('video');
					// video.setAttribute('playsinline', true) //IOS微信浏览器支持小窗内播放
					// video.setAttribute('webkit-playsinline', true) //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全zhi屏播放的video标签的一个属性
					// video.setAttribute('x5-video-player-type', 'h5') //安卓 声明启用同层H5播放器 可以在video上面加东西
					// this.player.playbackRate(2.0);//设定新的播放速度2倍速度
					//  // 动态切换poster 封面
					// this.player.posterImage.setSrc('https://s.yun-live.com/images/20200708/73d80639dd17bfdacc45e6cc1a526ab2.jpg');
					this.player.load()
					this.player.currentTime(this.current);  
				// #endif
				// #ifdef MP
					// this.player.seek(this.current);
					// this.player.play()
				// #endif
				
				// this.player.play();

			},

			playVideo() {
				// debugger
				var that = this;
				// var video = document.createElement('video')
				//初始化视频
				var videoPlayer = videojs(
					"video", {
						sources: [
							// {
							//   src: "https://p2.weizan.cn/11800347/941814099869602690/live.m3u8",
							//   // src: "http://yun-live.oss-cn-shanghai.aliyuncs.com/record/yunlive/record/yunlive/meeting_1273/2020-07-16-15-43-01_2020-07-16-18-27-04.m3u8",
							//   // src: "http://i3.vzan.cc/clip/11800347/853716862/C6497C4C63C6691C.m3u8",
							//   type: "application/x-mpegURL"
							// },
							{
								withCredentials: false, //跨域请求设置withCredentials
								src: "https://yun-live.oss-cn-shanghai.aliyuncs.com/video/20200723/X3pcENeMzw.mp4",
								type: "video/mp4"
							},
							{
								withCredentials: false, //跨域请求设置withCredentials
								src: "rtmp://r2.weizan.cn/v/11800347_941814099869602690",
								type: "rtmp/flv",
								// type: 'rtmp/hls',
							}
						],
						playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
						autoDisable: true,
						preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
						language: 'zh-CN',
						muted: false, //  是否静音
						aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
						controls: true, //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
						autoplay: false, //如果true,浏览器准备好时开始回放。 autoplay: "muted", // //自动播放属性,muted:静音播放
						loop: true, // 导致视频一结束就重新开始。 视频播放结束后，是否循环播放
						techOrder: ["html5", "flash"],
						// width: "400",
						// height: "240",
						controlBar: {
							timeDivider: true,
							durationDisplay: true,
							remainingTimeDisplay: false,
							fullscreenToggle: true //全屏按钮
						}
					},
					function() {
						console.log(this)
						// this.play();
					}
				);

				// var myPlayer = neplayer('my-video', {controlBar:{
				//     'currentTimeDisplay':true,
				//     'timeDivider':true,
				//     'durationDisplay':true,
				//     'remainingTimeDisplay':false
				// }}, function() {
				//     console.log('播放器初始化完成');
				// });
				// var player = videojs(document.getElementById('myVideo'), {
				//   controls: true, // 是否显示控制条
				//   poster: 'xxx', // 视频封面图地址
				//   preload: 'auto',
				//   autoplay: false,
				//   fluid: true, // 自适应宽高
				//   language: 'zh-CN', // 设置语言
				//   muted: false, // 是否静音
				//   inactivityTimeout: false,
				//   controlBar: { // 设置控制条组件
				//     /* 设置控制条里面组件的相关属性及显示与否
				//     'currentTimeDisplay':true,
				//     'timeDivider':true,
				//     'durationDisplay':true,
				//     'remainingTimeDisplay':false,
				//     volumePanel: {
				//       inline: false,
				//     }
				//     */
				//     /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
				//     children: [
				//       {name: 'playToggle'}, // 播放按钮
				//       {name: 'currentTimeDisplay'}, // 当前已播放时间
				//       {name: 'progressControl'}, // 播放进度条
				//       {name: 'durationDisplay'}, // 总时间
				//       { // 倍数播放
				//         name: 'playbackRateMenuButton',
				//         'playbackRates': [0.5, 1, 1.5, 2, 2.5]
				//       },
				//       {
				//         name: 'volumePanel', // 音量控制
				//         inline: false, // 不使用水平方式
				//       },
				//       {name: 'FullscreenToggle'} // 全屏
				//     ]
				//   },
				//   sources:[ // 视频源
				//       {
				//           src: '//vjs.zencdn.net/v/oceans.mp4',
				//           type: 'video/mp4',
				//           poster: '//vjs.zencdn.net/v/oceans.png'
				//       }
				//   ]
				// }, function (){
				//   console.log('视频可以播放了',this);
				// });
			},
			

		}
	}
</script>

<style>
	.njd {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #00FF00;
		top: 0;
		z-index: 9999;
		color: #0000EE;
		font-size: 20px;

	},
	.mp4player{
		width: 100%;
	}
</style>
