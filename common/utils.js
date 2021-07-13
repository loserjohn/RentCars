import SET from '../SET.js'
// import http from './http/index.js'
const Utils = {
	emailCheck(value) {
		const reg = /^\w+@[a-z0-9]+\.[a-z]+$/i
		const r = reg.test(value)
		return r
	},
	phoneCheck(value) {
		const reg = /^1\d{10}$/
		const r = reg.test(value)
		return r
	},
	passCheck(val) {
		let patrn = /^(\w){6,20}$/;
		if (!patrn.exec(val)) return false
		return true
	},
	// 银行卡校验
	bankCardCheck(val) {
		let patrn = /^([1-9]{1})(\d{15}|\d{18})$/;
		if (!patrn.test(val)) return false
		return true
	},
	// 中文字符
	chineseCheck(val) {
		let patrn = /^[\u4E00-\u9FA5]{2,4}/;

		if (!patrn.test(val)) return false
		return true
	},
	// 银行卡数字加密
	encryptBankCode(val) {

		let str = val.replace(/\s/g, '')
		console.log(str)
		let reg = /^(\d{4})\d+(\d{4})$/;
		str.replace(reg, "$1 **** **** $2");
		console.log(str)
		return str
	},


	/**
	 * Parse the time to string
	 * @param {(Object|string|number)} time
	 * @param {string} cFormat
	 * @returns {string}
	 */
	parseTime(time, cFormat) {
		if (arguments.length === 0) {
			return null
		}
		const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
		let date
		if (typeof time === 'object') {
			date = time
		} else {
			if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
				time = parseInt(time)
			}
			if ((typeof time === 'number') && (time.toString().length === 10)) {
				time = time * 1000
			}
			date = new Date(time)
		}
		const formatObj = {
			y: date.getFullYear(),
			m: date.getMonth() + 1,
			d: date.getDate(),
			h: date.getHours(),
			i: date.getMinutes(),
			s: date.getSeconds(),
			a: date.getDay()
		}
		const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
			let value = formatObj[key]
			// Note: getDay() returns 0 on Sunday
			if (key === 'a') {
				return ['日', '一', '二', '三', '四', '五', '六'][value]
			}
			if (result.length > 0 && value < 10) {
				value = '0' + value
			}
			return value || 0
		})
		return time_str
	},

	/**
	 * @param {number} time
	 * @param {string} option
	 * @returns {string}
	 */
	formatTime(time, option) {
		if (('' + time).length === 10) {
			time = parseInt(time) * 1000
		} else {
			time = +time
		}
		const d = new Date(time)
		const now = Date.now()

		const diff = (now - d) / 1000

		if (diff < 30) {
			return '刚刚'
		} else if (diff < 3600) {
			// less 1 hour
			return Math.ceil(diff / 60) + '分钟前'
		} else if (diff < 3600 * 24) {
			return Math.ceil(diff / 3600) + '小时前'
		} else if (diff < 3600 * 24 * 2) {
			return '1天前'
		}
		if (option) {
			return parseTime(time, option)
		} else {
			return (
				d.getMonth() +
				1 +
				'月' +
				d.getDate() +
				'日' +
				d.getHours() +
				'时' +
				d.getMinutes() +
				'分'
			)
		}
	},
	/**
	 * @param {string} type
	 * @returns {Date}
	 */
	getTime(type) {
		if (type === 'start') {
			return new Date().getTime() - 3600 * 1000 * 24 * 90
		} else {
			return new Date(new Date().toDateString())
		}
	},

	// 记录本地足迹
	// setTrace(item) {
	// 	let list = uni.getStorageSync('kxTraceList');
	// 	if (list) {
	// 		list = JSON.parse(list)
	// 	} else {
	// 		list = {}
	// 	}
	// 	console.log('存入足迹')
	// 	// 判断该记录书是否存在
	// 	let time = new Date().getTime()
	// 	let id = item.code
	// 	item.time = time
	// 	list[id] = item
	// 	uni.setStorageSync('kxTraceList', JSON.stringify(list));
	// },
	// // 获取足迹
	// getTrace() {
	// 	let list = uni.getStorageSync('kxTraceList');
	// 	if (list) {
	// 		return (JSON.parse(list))
	// 	} else {
	// 		return []
	// 	}

	// },
	// // 清除所有足迹
	// clearTrace() {
	// 	uni.removeStorageSync('kxTraceList');
	// },

	// 支付宝支付 app、小程序
	AliPay(strData, callback, failFun) {
		if (!strData) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}
		uni.requestPayment({
			provider: "alipay",
			orderInfo: strData,
			success: function(res) {
				plus.nativeUI.toast('支付成功');
				if (callback) callback()
			},
			fail: function(res) {
				if (failFun) {
					failFun();
					return;
				}
				uni.showToast({
					title: '支付失败',
					icon: "none",
					duration: 2000,
					complete: function() {
						uni.redirectTo({
							url: '/pages/features/order/order?current=1'
						})
					}
				});
			}
		});
	},
	// 支付宝支付_h5  手机网页使用
	AliPay_H5(strData, callback, failFun) {
		if (!strData) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}
		const div = document.createElement('div')
		/* 此处form就是后台返回接收到的数据 */
		div.innerHTML = res.data.data.alipayInfo
		document.body.appendChild(div)
		document.forms[0].submit()
	},
	// 微信支付_h5 jsapi支付（公众号内部使用）
	WxPay_js_h5(orderinfo, callback, failFun) {
		if (!orderinfo) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}
		// const jweixin = require('jweixin-module')
		// try {
		// let url = window.location.href
		// let res = await http.GetWxJsApiConfig({url:url}, true)

		// if (res.Success) {
		// let set = res.Data;
		// jweixin.config({
		// 	debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		// 	appId: set.appId, // 必填，公众号的唯一标识
		// 	timestamp: set.timestamp, // 必填，生成签名的时间戳
		// 	nonceStr: set.noncestr, // 必填，生成签名的随机串
		// 	signature: set.signature, // 必填，签名
		// 	jsApiList:[
		// 		'chooseWXPay'
		// 	] // 必填，需要使用的JS接口列表
		// });

		//jweixin.ready(function() {
		// 	// 我自己的pid
		// 	that.wsPay(data)
		// });
		// jweixin.error(function(res){
		// 	// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		// 	console.log(JSON.stringify(res))
		// });
		// } else {

		// }
		// } catch (err) {
		// 	console.log('请求结果false : ' + err)

		// }
	},
	// async wsPay(){
	// 	let that = this
	// 	jweixin.chooseWXPay({
	// 		timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
	// 		nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
	// 		package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
	// 		signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
	// 		paySign: data.paySign, // 支付签名
	// 		success: function (res) {
	// 		// 支付成功后的回调函数
	// 			uni.redirectTo({
	// 				url:'/pages/success/success'
	// 			})
	// 		}
	// 	});
	// },
	// 微信支付_h5   网页h5使用
	WxPay_H5(orderinfo, callback, failFun) {
		if (!orderinfo) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}
		//...
	},
	// 微信支付  app、小程序
	WxPay(orderinfo, callback, failFun) {
		if (!orderinfo) {
			uni.showToast({
				icon: 'none',
				title: '支付参数无效'
			})
			return
		}
		// debugger
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: orderinfo.timeStamp,
			nonceStr: orderinfo.nonceStr,
			package: orderinfo.package,
			signType: orderinfo.signType,
			paySign: orderinfo.paySign,
			// orderInfo: {
			// 	appid: orderinfo.appid,
			// 	noncestr: orderinfo.noncestr,
			// 	package: orderinfo.package,
			// 	partnerid: orderinfo.mchid,
			// 	prepayid: orderinfo.prepayid,
			// 	timestamp: orderinfo.timestamp,
			// 	sign: orderinfo.sign,
			// },
			success: function(res) {
				// plus.nativeUI.toast('支付成功');

				if (callback) callback()
			},
			fail: function(res) {
				// console.log(JSON.stringify(res));
				if (failFun) {
					failFun();
					return;
				}
				uni.showToast({
					title: '支付失败',
					icon: "none",
					duration: 2000,
					complete: function() {
						uni.redirectTo({
							url: '/pages/features/order/order?current=1'
						})
					}
				});
			}
		});
	},
	// 判断是否可以指纹解锁
	// 判断当前机型是否支持指纹
	checkFinger() {
		if (!plus.fingerprint.isSupport()) {
			plus.nativeUI.toast('此设备不支持指纹识别');
			// this.supportFinger = false;
			return false
		} else if (!plus.fingerprint.isKeyguardSecure()) {
			plus.nativeUI.toast('此设备未设置密码锁屏');
			// this.supportFinger = false;
			return false
		} else if (!plus.fingerprint.isEnrolledFingerprints()) {
			plus.nativeUI.toast('此设备未录入指纹');
			// this.supportFinger = false;
			return false
		} else {
			// this.supportFinger = true;
			return true
		}

	},
	// 是否微信浏览器
	is_weixn() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			return true;
		} else {
			return false;
		}
	},
	// 是否受过权
	// 返回code
	ifAuth(success) {
		let url = window.location.href;
		let s = url.match(/code=(.*)&state/)
		if (s) {
			// 是授权后的页面,则做opnegid判断 使用code获取pid
			// return s[1]
			// 换取oid
			success(s[1])
		} else {
			// 不是授权的页面，重定向进行授权

			this.wxauth()
		}
	},

	// wx授权跳转
	wx_auth() {
		// alert(1)
		let set = {
			appid: SET.appid, //测试环境
			redirect_uri: SET.redirect,
		}
		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + set.appid + '&redirect_uri=' +
			set.redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
	},

}
export default Utils
