import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import http from '../common/http/index.js'
import SET from '@/SET.js';

const store = new Vuex.Store({
	state: {
		token: '',
		currentAction:false,
		hasLogin:false,
		inBunding:false,   //是否回调绑定页
		userInfo:'', //用户得基本信息
		accountInfo:{}, //账户基本信息
		currentOrder:''  //当前订单信息
	},
	mutations: {
		// payload为用户传递的值，可以是单一值或者对象
		userLogin(state, payload){
			state.hasLogin = true;
		},
		userLoginOut(state, payload){
			uni.removeStorageSync(SET.tokenName)
			
			uni.removeStorageSync('inviCode')
			state.hasLogin = false;
			
		},
		setToken(state, payload) {
			// debugger
			state.token = payload;
		},
		currentAction(state,payload){

			state.currentAction = {...payload};
		},
		inBunding(state,payload){
			state.inBunding = payload;
		},
		setUserInfo(state,payload){
			state.userInfo = {...payload};
		},
		creatOrder(state,items){
			state.currentOrder = [...items]
			// debugger
		},
	},
	actions:{
		async refreshUser({ state,commit }, payload){
			// console.log(payload);
			let res =  await http.getConsumer();
			console.log(res)
			if(res.Success){
				commit('setUserInfo',res.Data)
			}
		}
	}
})

export default store