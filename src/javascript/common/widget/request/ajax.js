/**
 * @name    ajax
 * @author  hzanliangjun(hzanliangjun@corp.netease.com)
 * @since   2018-04-09
 */
import axios from 'axios';
import * as Notify from 'common/base/mixin/notify';
import _ from 'common/widget/util';
import _u from './util';
import NProgress from 'nprogress';

import Config from './config';

// 全局配置错误码、错误信息
const CODE = Config.CODE;
const MSG = Config.MSG;
const MSG_ERR_NOT_200 = Config.MSG_ERR_NOT_200;
const MSG_ERR_NO_RES = Config.MSG_ERR_NO_RES;

/*** axios 取消请求 相关 ***/
const CancelToken = axios.CancelToken;
window.RGLSPA.AxiosCancelList = [];
window.RGLSPA.AxiosCancelCount = 0;
window.RGLSPA.AxiosCancelText = '中断成功';

/******* 进度条相关 *******/
window.RGLSPA.showProgress = false;

const calculatePercentage = (loaded = 0, total = 1) => (Math.floor(loaded * 1.0) / total);
const updatePercentage = (e) => {
    window.RGLSPA.showProgress && NProgress.inc(calculatePercentage(e.loaded, e.total));
};
// 初始化进度条
NProgress.configure(Config.NProgressConfig);
// 进度监控
axios.defaults.onDownloadProgress = updatePercentage;
axios.defaults.onUploadProgress = updatePercentage;

// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        return config;
    },
    error => Promise.reject(error)
);

// 全局非 200 报错处理
axios.interceptors.response.use(
    (response) => {
        const res = response.data || {};

        if(res[CODE] !== 200) {
            Notify.error(res[MSG] || MSG_ERR_NOT_200);
        }

        return response;
    },
    (error) => {
        console.log(error);

        // 取消请求，会执行此分支，根据 err.message 来判断是 cancle
        if(error.message == window.RGLSPA.AxiosCancelText) {
            return false;
        }

        Notify.error(MSG_ERR_NO_RES);
        // 取消加载状态
        _u.loadingHandler({}, false);

        return _u.errorHandler(error);
    }
);

// 发起请求
export const $request = async (url, options) => {
    let {
        method = 'GET',
        norest = false,
        data = {}
    } = options;

    method = method.toLowerCase();

    let config = { url, method, data };

    // 设置 路由切换 取消 请求
    config.cancelToken = new CancelToken((c) => {
        window.RGLSPA.AxiosCancelList[window.RGLSPA.AxiosCancelCount++] = c;
    });

    // get 情况下，转换要发送数据对象名称
    if(method === 'get') {
        config.params = data;
    }

    // noreset
    if(method === 'post' && norest) {
        config.headers = {};
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config.transformRequest = [(data) => {
            if(!data) {
                return data;
            }
            return _u.transform(data);
        }];
    }

    // 设置加载状态
    _u.loadingHandler(options, true);

    try {
        const json = await axios(config);
        const res = json.data || {};

        // 取消加载状态
        _u.loadingHandler(options, false);

        if(res[CODE] && res[CODE] == 200) {
            return _u.successHandler(res);
        }

        return _u.errorHandler(res);

    } catch(err) {
        // 取消加载状态
        _u.loadingHandler(options, false);

        return _u.errorHandler(err);
    }
};

export const $get = (url, options = {}) => $request(url, options);

export const $post = (url, options = {}) => {
    _.extend(options, { method: 'POST' });
    return $request(url, options);
};

export const $form = (url, options = {}) => {
    _.extend(options, { method: 'POST', norest: true });
    return $request(url, options);
};