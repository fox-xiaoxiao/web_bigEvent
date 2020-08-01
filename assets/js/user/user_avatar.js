$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //   为上传按钮绑定事件
    $('#chooseImage').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function (e) {
        // var files=$('#file')[0].files
        var files = e.target.files
        if (files.length == 0) {
            return layer.msg('请选择文件')
        }
        //    拿到用户选择唯一的一个文件
        var file = e.target.files[0]
        // 将文件转换为路径 原生js的方法，在内存中生成一个地址
        var newImgURL = URL.createObjectURL(file)
        // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
})