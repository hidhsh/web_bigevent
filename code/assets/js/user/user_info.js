$(function () {

    var form = layui.form;
    var layer = layui.layer;
    //生成用户校验规则
    form.verify({
        nickname: function (value) {
            if (value > 6) {
                return '昵称长度必须在1~6之间'
            }
        }

    })

    getUserInfo();

    //初始化用户的基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('获取用户信息失败')
                }
                //调用form.val()快速为表单赋值
                form.val('forUserInfo', res.data);

            }
        })
    }

    // 重置表单按钮
    $('#btnReset').on('click', function (e) {
        //阻止默认行为
        e.preventDefault();
        getUserInfo();
    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止默认行为
        e.preventDefault();
        //发送更新请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            //快速获取表单中的值
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')

                //调用父页面的方法，重新渲染头像和昵称
                window.parent.getUserInfo();
            }
        })

    })
})