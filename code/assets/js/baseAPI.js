//每次调用$.get()或$.post()或$.ajax()的时候
//会先调用ajaxPrefilter 这个函数
//在这个函数中，我们可以拿到ajax提供的配置对象
$.ajaxPrefilter(function (option) {
    //在发起真正的ajax请求前 ，统一拼接其请求的根路径
    option.url = 'http://www.liulongbin.top:3007' + option.url
    console.log(option.url);
})