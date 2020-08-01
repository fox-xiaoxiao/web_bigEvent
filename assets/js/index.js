$(function () {
    // 调用函数获取信息
    getUserInfo()
    // 退出
    // 引入layer
    var layer = layui.layer
    $('#login_out').on('click', function () {
        //eg2
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 关闭弹窗
            layer.close(index);
            // 清空token
            localStorage.removeItem('token')
            // 跳转页面
            location.href = '/login.html'
        });
    })
})
// 获取用户的基本信息的封装
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: { Authorization: localStorage.getItem('token') || '' },
        //  token会失效，要重新登录
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg(res.message)
            }
            // console.log(res);
            // 调用用户渲染
            renderUser(res.data)
        }
    })
}
// 封装渲染函数
function renderUser(user) {
    // 渲染用户名
    var uname = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
    // 渲染用户头像
    // 判断头像是用户头像还是文本头像，用户头像就渲染图片
    if (user.user_pic != null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(uname[0].toUpperCase())
    }
<<<<<<< HEAD
}
=======
} 
>>>>>>> user
