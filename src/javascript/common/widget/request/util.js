import { KLLoading } from 'nek-ui';
import NProgress from 'nprogress';
import _ from 'widget/util.js';

const _u = {
    transform(data) {
        let fd = [];

        Object.keys(data).map((key) => {
            const _flag = _.typeOf(data[key]) === 'object';

            let item = _flag
                        ? JSON.stringify(data[key])
                        : data[key];

            item = encodeURIComponent(item);

            fd.push(`${key}=${item}`);
        });

        return fd.join('&');
    },

    loadingHandler(options, loading) {
        const {
            mask,
            btn,
            noProgress = false
        } = options;

        if(loading) {
            mask && KLLoading.show();
            btn && btn.$update('loading', true);

            if(!noProgress) {
                window.RGLSPA.showProgress = true;
                NProgress.start();
            }
        } else {
            mask && KLLoading.hide();
            btn && btn.$update('loading', false);

            if(!noProgress) {
                window.RGLSPA.showProgress = false;
                NProgress.done();
                NProgress.remove();
            }
        }
    },

    successHandler(res = {}) {
        return Promise.resolve(res);
    },

    errorHandler(res = {}) {
        return Promise.reject(res);
    }
};

export default _u;