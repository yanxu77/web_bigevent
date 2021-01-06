$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })

    initUserInfo();

    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                //使用form.val快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //给重置按钮绑定点击事件
    $('#btnReset').on('click', function (e) {
        //阻止表单的默认重置行为
        e.preventDefault();
        //初始化用户信息
        initUserInfo()
        // $('.layui-form')[0].reset();
    })

    //监听表单的提交事件 更新用户修改的信息
    $('.layui-form').on('submit', function (e) {
        //阻止表单默认提交行为
        e.preventDefault();
        //发起Ajax请求
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                } else {
                    layer.msg('修改用户信息成功！')
                    //调用父页面中的方法重新渲染用户的头像和信息
                    //注意此方法不可写在入口函数里面，要不然就变成了入口函数的局部函数
                    window.parent.getUserInfo();
                }
            }
        })
    })
})