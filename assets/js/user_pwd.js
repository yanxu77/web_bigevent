$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致！'
            }
        }
    })

    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        //取消默认提交行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改密码失败！')
                } else {
                    layer.msg('修改密码成功！')
                    //重置表单，将jQuery对象转换成DOM对象
                    $('.layui-form')[0].reset();
                }
            }
        })
    })


})
