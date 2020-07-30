// 设置测试路径
var baseURL='http://ajax.frontend.itheima.net'
// // 设置生产路径
// var URL='http://ajax.frontend.itheima.net'
// 过滤每一次ajax请求，配置请求所需要的参数
$.ajaxPrefilter(function(options){
options.url=baseURL+options.url
})