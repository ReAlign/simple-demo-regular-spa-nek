import _ from './../mixins/hooks';

const Page1 = require('page/page/page1/index');
const Page2 = require('page/page/page2/index');

export default {
    'app.page1': _({
        url: '/app/page1',
        view: (option, resolve) => {
            require.ensure([], () => {
                resolve(Page1.default);
            });
        }
    }),
    'app.page2': _({
        url: '/app/page2',
        view: (option, resolve) => {
            require.ensure([], () => {
                resolve(Page2.default);
            });
        }
    })
};