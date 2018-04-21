import _ from './../mixins/hooks';

const Index = require('page/unauthorized/index');

const Access = {
    'app.unauthorized': _({
        url: '/app/unauthorized',
        view: (option, resolve) => {
            require.ensure([], () => {
                resolve(Index.default);
            });
        }
    })
};

export default Access;