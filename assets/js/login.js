$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 自定义pwd校验规则  form.verify()
    form.verify({
        pwd: [/^\S{6,12}$/, '密码必须6到12位，不能出现空格'],
        // 校验两次密码是否一致 value是确认密码框的值
        repwd: function (value) {
            // 先获取到密码框的值
            //   再判断
            // var pwd=$('.reg-box' [name=password]).val()
            var pwd = $('#reg-pwd').val()
            if (pwd != value) {
                return '密码输入不一致'
            }
        }
    })
    //  监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //    阻止表单默认提交 
        e.preventDefault()
        // ajax发送请求
        $.ajax({
            method: "post",
            url: "/api/reguser",
            // data:$('#form_reg').serialize()
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()

            },
            success: function (res) {
                // 注册失败校验
                if (res.status != 0) {
                    layer.msg(res.message)
                    return;
                }
                // 注册成功，提示
                layer.msg(res.message)
                // 触发切换到登录的a连接的点击行为
                $('#link_login').click()
                // 清空表单
                $('#form_reg')[0].reset()
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 保存token
                localStorage.setItem('token',res.token)
                // 跳转到登录页面
                location.href='/index.html'
            }
        })
    })
})