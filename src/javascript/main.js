import router from './router/index';

// 未匹配成功，跳转 统一错误处理页面
router.on('notfound', () => {
    debugger;
    router.go('app.index');
});

// 启动路由
router.start({
    html5: true,
    view: document.querySelector('#page')
});