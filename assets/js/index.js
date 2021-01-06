$(function () {
    getUserInfo();
    //点击退出弹出询问框
    var layer = layui.layer
    $('#btnLogOut').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //清空本地存储的token
            localStorage.removeItem('token');
            //跳转到login页面
            location.href = '/login.html'
            layer.close(index);
        })
    })

});

function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        //headers就是请求头配置对象
        //设置http的请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            } else {
                //调用函数渲染头像
                renderAvatar(res.data);
            }
        }
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })
}


//渲染头像函数
function renderAvatar(user) {
    //获取用户名称
    var uname = user.nickname || user.username;
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname);
    //按需渲染用户头像，如果有昵称就让昵称显示，没有昵称就显示登录名称
    if (user.user_pic !== null) {
        //attr返回被选中元素的属性和属性值
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        //如果名称为英文的话将首字母大写
        var first = uname[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}


