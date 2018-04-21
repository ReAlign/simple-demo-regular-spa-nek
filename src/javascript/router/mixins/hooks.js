import * as API from './api';
import router from './../index';

window.RGLSPA.urlObj = {};

let _getAuthFlag = false;

// 权限判断
async function hasAuth(url = '') {
    return !!window.RGLSPA.urlObj.appUrls.find(item => item == url);
}

// 获取权限
async function getAuth() {
    try {
        _getAuthFlag = true;
        const urlObj = window.RGLSPA.urlObj;
        const json = await API.getUserOperationUrls();
        urlObj.allUrls = json.data || [];

        // 按照前缀区分路由，方便后续处理
        if(urlObj.allUrls && urlObj.allUrls.length) {
            urlObj.appUrls = urlObj.allUrls.filter((item = '') => item == '/' || item.indexOf('/app/') === 0);
            urlObj.apiUrls = urlObj.allUrls.filter((item = '') => item.indexOf('/api/') === 0);
        }
    } catch(error) {
        console.log(error);
        return;
    }
}


// 路由配置扩展，添加canEnter事件
function addCanEnter(config) {
    !_getAuthFlag && getAuth();

    // url 白名单
    if(config.url === '/app/unauthorized') {
        return config;
    }

    // 过滤请求参数
    const url = config.url.split(':')[0];

    // 路由切换时:做登陆和权限验证
    config.canEnter = async function(option) {
        try {
            const _flag = await hasAuth(url);

            // 无权限则阻止页面打开
            const resolve = option.async();
            if(!_flag) {
                resolve(false);
                router.go('app.unauthorized');
            }
        } catch(e) {
            return e;
        }
    };

    return config;
}

export default addCanEnter;