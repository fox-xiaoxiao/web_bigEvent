// 设置测试路径
var baseURL = 'http://ajax.frontend.itheima.net'
// // 设置生产路径
// var URL='http://ajax.frontend.itheima.net'
// 过滤每一次ajax请求，配置请求所需要的参数
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url

    // 判断请求路径是否包含/my/
    // 请求头配置对象 token
    if (options.url.indexOf(/my/) != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        // console.log(res.responseJSON);
        if (res.responseJSON.status == 1 && res.responseJSON.message == '登录失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})