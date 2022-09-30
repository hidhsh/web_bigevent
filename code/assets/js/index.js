$(function () {
    //调用用户信息
    getUserInfo();

    //绑定退出的点击事件
    $('#btnlogout').on('click', function () {
        console.log('ok');
        var layer = layui.layer;
        //弹出退出询问框
        layer.confirm('此操作将退出登录, 是否继续?', { icon: 3, title: '提示' }, function (index) {

            //1.清除本地储存中的token
            localStorage.removeItem('token');

            //2.跳转到登录页面
            location.href = '/code/login.html'
            layer.close(index);
        });
    })
})


//封装获取用户信息函数
function getUserInfo() {
    //发送请求
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            //判断是否获取成功
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用渲染用户头像
            renderAvatar(res.data)
        },
        // //判断是否强制登录后台网页
        // complete: function (res) {
        //     console.log(res);
        //     //通过服务器拿到的响应数据来进行判断
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //强制清空本地储存
        //         localStorage.removeItem('token');
        //         //强制跳转到登录页面
        //         location.href = '/code/login.html'
        //     }
        // }
    })
}

//封装渲染用户头像函数
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    //设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    //按需渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('url', user.user_pic).show;
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }

}
