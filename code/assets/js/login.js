$(function () {

    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui获取form对象
    var form = layui.form;
    var layer = layui.layer;


    //进行表单验证
    form.verify({
        //自定义了一个叫pwd的规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //检验两次密码输入的是否一致
        repwd: function (value) {
            //获取第一次输入的密码
            var pwd = $('.reg-box [name="password"]').val();
            //进行判断是否不一致
            if (pwd !== value) {
                return '两次输入的密码不一致';
            }
        }
    })

    //监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        //阻止表单的默认事件
        e.preventDefault();
        //发送ajax请求
        $.post('/api/reguser',
            {
                username: $('#form_reg [name="username"]').val(),
                password: $('#form_reg [name="password"]').val()
            },
            function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录');

                //切换到登录界面
                $('#link_login').click();

            })
    })


    //监听登录表单提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            //快速获取表单里的数据
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                //将登录获得的token字符串放在localstorage
                localStorage.setItem('token',res.token);
                //切换到后台
                location.href='/index.html'
            }
        })
    })
})

