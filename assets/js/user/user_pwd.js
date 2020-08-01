$(function () {
    // 获取layui提供的成员
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
        samePwd: function (value) {
            if (value == $('[name=oldPwd').val()) {
                return '新密码不能与原密码相同'
            }
        },
        // 第二次密码验证
        rePwd: function (value) {
            if (value != $('[name=newPwd]').val()) {
                return '两次密码不一样!'
            }
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
               layer.msg('密码修改成功')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})