import _ from './../mixins/hooks';

const Index = require('page/index/index/index');

export default {
    'app.index': _({
        url: '/',
        view: (option, resolve) => {
            require.ensure([], () => {
                resolve(Index.default);
            });
        }
    })
};