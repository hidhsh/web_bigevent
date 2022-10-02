$(function () {

    var layer = layui.layer;
    var form = layui.form;

    initCase();

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //获取文章分类列表    
    function initCase() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败')
                }

                //调用模板引擎,渲染分类下拉菜单
                var htmlStr = template('tpl-cate', res);
                $('[name="cate_id"]').html(htmlStr);
                //调用form.render()重新渲染后面添加的
                form.render();
            }
        })
    }

    //选择封面绑定事件
    $('#btnChoseImge').on('click', function () {
        $('#coverFile').click();
    })

    // 监听 coverFile 的change事件，获取用户选择的文件
    $('#coverFile').on('change', function (e) {
        // 获取到文件的列表数组
        var files = e.target.files;
        // 判断用户是否选择了文件
        if (files.length == 0) {
            return
        };
        // 根据文件，创建对应的url地址
        var newImgURL = URL.createObjectURL(files[0]);
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    // 定义文章的发布状态
    var art_state = '已发布';

    //为草稿按钮，绑定事件
    $('#btnSave2').on('click', function () {
        art_state = '草稿';
    })


    //为表单绑定一个提交事件
    $('#form-pub').on('submit', function (e) {
        // 1.阻止默认行为
        e.preventDefault();
        // 2.基于表单创建一个formdata对象
        var fd = new FormData($(this)[0]);
        // 3.添加状态数据到fd
        fd.append('state', art_state)

        // fd.forEach(function(v,k){
        //     console.log(k,v);
        // })

        // 4.将裁剪的对象输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5.储存到fd中
                fd.append('cover_img', blob);

                // 6.发起ajax请求
                pushListArticle(fd);
            })
    })

    // 定义一个发布文章的方法
    function pushListArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')

                //发布成功后跳转页面到，文章列表中
                location.href = '/code/article/art_list.html'
            }


        })
    }
})