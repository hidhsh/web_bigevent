//每次调用$.get()或$.post()或$.ajax()的时候
//会先调用ajaxPrefilter 这个函数
//在这个函数中，我们可以拿到ajax提供的配置对象
$.ajaxPrefilter(function (option) {
    //在发起真正的ajax请求前 ，统一拼接其请求的根路径
    option.url = 'http://www.liulongbin.top:3007' + option.url
    console.log(option.url);

    //判断是否需要添加
    if (option.url.indexOf('/my/') !== -1) {
        //统一为有权限接口，设置headers请求头
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //将complete挂载到option上面
    option.complete = function (res) {
        console.log(res);
        //通过服务器拿到的响应数据来进行判断
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //强制清空本地储存
            localStorage.removeItem('token');
            //强制跳转到登录页面
            location.href = '/code/login.html'
        }
    }



})