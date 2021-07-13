import http from '@/common/http/index.js';
import {
	mapState
} from 'vuex'
import SET from '@/SET.js'
module.exports = {
	data() {
		return {
			baseKey: 'GetGoodsList',
			hasRow: false,
			lists: [],
			loadStatus: 'more',
			pageLoad: false,
			formParams: {
				pageIndex: 1,
				pageSize: 10
			},
			ifWx: false,
			onBottom: false,
			onTop:false,
			lock: false,
			pageLoading: true,
			pageFixTop:'0rpx'
		}
	},
	onLoad() {
		// getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
		this.$u.getRect = this.$uGetRect;
		this.ifWx = uni.getStorageSync('ifWx')
		// alert(111)
		// #ifdef H5
			this.pageFixTop = '88rpx'
		// #endif
	},
	computed: {
		// 将vuex的state中的所有变量，解构到全局混入的mixin中
		...mapState(['hasLogin', 'userInfo', 'currentAction'])
	},
	onPullDownRefresh() {
		if (!this.onTop) return;
		this.formParams.pageIndex = 1;
		this.lists = [];
		this._loadData('refresh');
	},
	// 上拉加载
	onReachBottom() {
		if (!this.onBottom) return;
		// console.log(this.loadStatus)
		if (this.loadStatus == 'noMore') {
			return;
		}
		this.formParams.pageIndex += 1;
		this.loadStatus = 'loading';
		this._loadData('add');
		// uni.$emit('uOnReachBottom')
	},
	methods: {
		_config_href(item){
			let type = item.UrlType
			let url = item.Url
		
			if(!type || !url)return;
			switch (type){
				case 'href':
					// debugger
					uni.navigateTo({
						url: url
					});
					break;
				case 'inWeb':
					this.$store.commit('setWebviewUrl',url)
					uni.navigateTo({
						url:'/pages/webview/webview'
					})
					break;
				case 'mini':
					uni.navigateToMiniProgram({
					  appId: url,
					  path: 'pages/index/index',
					  extraData: {
					    'data1': 'test'
					  },
					  success(res) {
					    // 打开成功
					  }
					})
					break;
				default:
					break;
			}
		},
		_lock() {
			this.lock = true
		},
		_unlock() {
			this.lock = false
		},
		// 查询节点信息
		// 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
		// 解决办法为在组件根部再套一个没有任何作用的view元素
		$uGetRect(selector, all) {
			// console.log(selector, all)
			// debugger 
			return new Promise(resolve => {
				uni.createSelectorQuery().
				in(this)[all ? 'selectAll' : 'select'](selector)
					.boundingClientRect(rect => {
						if (all && Array.isArray(rect) && rect.length) {
							resolve(rect)
						}
						if (!all && rect) {
							resolve(rect)
						}
					})
					.exec()
			})
		},
		_auth_href(url) {
			if (!this.hasLogin) {
				// #ifdef H5
					if (this.ifWx) {
						// debugger
						uni.navigateTo({
							url: '/pages/role/wxLogin/wxLogin',
							animationType: 'pop-in',
							   animationDuration: 200
						})
					} else {
						uni.navigateTo({
							url: '/pages/role/yzmLogin/yzmLogin',
							animationType: 'pop-in',
							   animationDuration: 200
						})
					}
				// #endif
				// #ifdef MP
					uni.navigateTo({
						url: '/pages/role/wxLogin/wxLogin',
						animationType: 'pop-in',
						   animationDuration: 200
					})
				// #endif
			} else {
				uni.navigateTo({
					url: url
				})
			}
		},
		// 普通跳转
		_href(url) {
			// alert(url)
			uni.navigateTo({
				url: url,
				 animationType: 'pop-in',
				    animationDuration: 200
			})
		},
		// 先登录
		_login() {
			// #ifdef H5
				if (this.ifWx) {
					uni.navigateTo({
						url: '/pages/role/wxLogin/wxLogin'
					})
				} else {
					uni.navigateTo({
						url: '/pages/role/yzmLogin/yzmLogin'
					})
				}
			// #endif
			// #ifdef MP
				uni.navigateTo({
					url: '/pages/role/wxLogin/wxLogin',
					animationType: 'pop-in',
					   animationDuration: 200
				})
			// #endif
		
		},
		loadDataComplete() {

		},
		async _loadData(type) {
			let that = this;
			if (type == 'add') {
				that.loadStatus = 'loading';
			} else {
				that.loadStatus = 'loading';
				uni.stopPullDownRefresh();
			}
			try {
				let res = await http[this.baseKey](this.formParams)
				// console.log(res);
				
				if (res.Success) {
					if (type == 'add') {
						// 加载更多
						if (that.hasRow) {
							that.lists = that.lists.concat(res.Data[that.hasRow]);
							if (res.Data[that.hasRow].length < that.formParams.pageSize) {
								that.loadStatus = 'noMore';
								// 没有数据了
							} else {
								that.loadStatus = 'more';
							}
						} else {
							that.lists = that.lists.concat(res.Data);
							if (res.Data.length < that.formParams.pageSize) {
								that.loadStatus = 'noMore';
								// 没有数据了
							} else {
								that.loadStatus = 'more';
							}
						}
					} else {
						// 刷新
						if (that.hasRow) {
							that.lists = res.Data[that.hasRow];
							if (res.Data[that.hasRow].length < that.formParams.pageSize) {
								that.loadStatus = 'noMore';
								// 没有数据了
							} else {
								that.loadStatus = 'more';
							}

						} else {
							that.lists = res.Data
							if (res.Data.length < that.formParams.pageSize) {
								that.loadStatus = 'noMore';
								// 没有数据了
							} else {
								that.loadStatus = 'more';
							}
						}
						that.refreshing = false
					}
					that.loadDataComplete(true, res.Data)
				} else {
					that.$ui.toast(res.Msg);
					that.loadDataComplete(false, res.Data)
				}
				that.pageLoading = false
			} catch (err) {
				console.log('请求结果false : ' + err);
				that.loadStatus = 'more';
				that.loadDataComplete(false)
				that.pageLoading = false
			}
		},

		_upload(tempFilePaths) {
			let that = this;
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: SET.baseUrl + '/api/Upload/UploadWebP', //仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					name: 'folder',
					// formData: {
					// 	'folder': 'tempFilePaths[0]'
					// },
					success: (uploadFileRes) => {
						// console.log(uploadFileRes.data);
						let res =JSON.parse(uploadFileRes.data) ;
						if(res.Success){
							resolve(res.Data)
						}else{
							reject(res.Msg)
						}
					}
				});
			})


		}
	}
}
