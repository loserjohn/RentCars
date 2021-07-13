import Vue from 'vue'
import App from './App'
import store from './store/index.js';
import SET from '@/SET.js';
import api from './common/http/index.js'

Vue.config.productionTip = false

App.mpType = 'app'
import uView from 'uview-ui'
Vue.use(uView);
Vue.prototype.$api = api

// 判断是否是微信浏览器
// // #ifdef H5
// 	let  ua = navigator.userAgent.toLowerCase();
// 	// let ifWx;
// 	if (ua.match(/MicroMessenger/i) == "micromessenger") {
// 		uni.setStorageSync('ifWx',true)
// 	} else {
// 		uni.setStorageSync('ifWx',false)
// 	}
// // #endif


// initGlobalSet()
// initClassSet()
// 全局分类配置
async function initClassSet() {
	let that = this
	try {
		uni.request({
			url: SET.baseUrl + '/api/Class/GetClass', //仅为示例，并非真实接口地址。
			method: 'get',
			data: {},
			header: {
				'Content-Type': 'application/json'
			},
			success: res => {			
				let statusCode = res.statusCode;
				if (statusCode == 200 && res.data.Success) {
					// console.log(res.data.Data);
					uni.setStorageSync('global_Class_zdjy', res.data.Data.ListInfo);

				}
			},
			fail(err) {
				console.log(err);
			}
		});
	} catch (e) {
		that.errorCallback();
	}
}
// 全局配置
async function initGlobalSet() {
	let that = this
	try {
		uni.request({
			url: SET.baseUrl + '/api/Config/Config', //仅为示例，并非真实接口地址。
			method: 'get',
			data: {},
			header: {
				'Content-Type': 'application/json'
			},
			success: res => {			
				let statusCode = res.statusCode;
				if (statusCode == 200 && res.data.Success) {
					// console.log(res.data.Data);
					uni.setStorageSync('global_Set_zdjy', res.data.Data);
					let global_Set = res.data.Data
					createdFilter(global_Set)
				}
			},
			fail(err) {
				console.log(err);
			}
		});
	} catch (e) {
		that.errorCallback();
	}
}
// 创建全局的过滤器
function createdFilter(set) {
	let filters = {}
	Object.keys(set).forEach(key => {
		// console.log(key,set[key])
		let filter = set[key]
		filters[key + 'Filter'] = val => {
			let r
			filter.forEach((k, t) => {
				// console.log(k,t)
				if (k.Value == val) {
					r = k.Text
				}
			})
			return r
		}
		Vue.filter(key + 'Filter', filters[key + 'Filter'])
	})
}


const UI = {
	toast: function(text, duration, success) {

		// #ifdef H5 || MP-WEIXIN
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
		// #endif
	},
	showloading: function(text) {
		// #ifdef H5 || MP-WEIXIN
				uni.showLoading({
					title: text?text:'加载中',
					mask:true
				})
		// #endif
		// #ifdef APP-PLUS
		plus.nativeUI.showWaiting(text = '请稍后...', {
			loading: {
				display: 'inline',
				// type:'snow'
			}
		})
		// #endif
	},
	hideloading: function() {
		// #ifdef H5 || MP-WEIXIN
		uni.hideLoading()
		// #endif
		// #ifdef APP-PLUS
		plus.nativeUI.closeWaiting()
		// #endif
	}
}

Vue.prototype.$ui = UI

const app = new Vue({
	store,
	...App
})

// if (process.env.NODE_ENV === 'development') {
// 	console.warn(process.env.NODE_ENV)
// }



// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
// import httpInterceptor from '@/common/http.interceptor.js'
// Vue.use(httpInterceptor, app)

// // http接口API抽离，免于写url或者一些固定的参数
// import httpApiRole from '@/common/api.role.js'
// Vue.use(httpApiRole, app)


app.$mount()
