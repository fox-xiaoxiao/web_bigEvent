$(function () {
    var form = layui.form;
    var layer = layui.layer
    // 校验
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称应该输入1-6位之间'
            }
        }
    })
    // 初始化用户信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 调用form.val()为表单赋值 展示用户信息
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 调用函数 
        initUserInfo()
    })
    // 监听表单的提交事件
    $(".layui-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // iframe有html 有自己的window
                // 调用父页面的方法,重新渲染用户头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})