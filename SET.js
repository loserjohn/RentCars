
const defSet = {
	devEnv:false,  //是否是测试环境
	dev_appid: 'wx09daee2f47e178aa', //测试环境appid
	dev_redirect: 'http://test.fjdmll.com',  //测试环境h5授权回调地址
	pro_appid: 'wx9892f69cef5695d8', //正式环境appid
	pro_redirect: 'http://shop.fjdmll.com',  //正式环境h5授权回调地址
}
// AppID：wx9892f69cef5695d8
// AppSecret：4695652c20ada19645ec0a623ba9f269
/*  当前常用配置*/
 const SET = {
	appid:defSet.devEnv?defSet.dev_appid:defSet.pro_appid, //appid
	redirect: defSet.devEnv?defSet.dev_redirect:defSet.pro_redirect,  //h5授权回调地址
	tokenName:'zdjy_token', //储存的token名字
	opIdName:'zdjy_opendId',
	// baseUrl:'',
	// mainUrl:''
	baseUrl:defSet.devEnv?'http://test.fjdmll.com/Data':'http://shop.fjdmll.com/Data',
	mainUrl:defSet.devEnv?'http://192.168.2.161:8080':'http://shop.fjdmll.com',
	// baseUrl:defSet.devEnv?'http://test.fjdmll.com/Data':'http://shop.fjdmll.com/Data',
	// mainUrl:defSet.devEnv?'http://test.fjdmll.com':'http://shop.fjdmll.com'
}

export default SET