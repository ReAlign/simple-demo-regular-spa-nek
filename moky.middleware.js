const path = require('path');
const webpack = require('webpack');
// const { existsSync } = require('fs-extra');

let historyApiFallback = (options) => {
    const middleware = require('connect-history-api-fallback')(options);
    const noop = () => {
        //
    };

    return (ctx, next) => {
        const url = require('url');
        let parseUrl = url.parse(ctx.req.url);

        if(ctx.req.url == '/' || parseUrl.pathname.match(options.path[0])) {
            middleware(ctx, null, noop);
            return next();
        }

        return next();
    };
};

module.exports = (app, options, render, async) => {
    const absPath = path.resolve('build/webpack.dev.conf.js');
    const webpackConfig = require(absPath);
    const compiler = webpack(webpackConfig);

    let devMiddleware = require('koa-webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: false
    });

    let hotMiddleware = require('koa-webpack-hot-middleware')(compiler, {
        log: () => {
            //
        }
    });

    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
            hotMiddleware.publish({action: 'reload'});
            cb();
        });
    });


    // handle fallback for HTML5 history API
    // only works with proxy mode
    app.use(historyApiFallback({
        index: `${webpackConfig.output.publicPath}index.html`,
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        disableDotRule: true,
        verbose: true,
        path: ['/app']
    }));

    // serve webpack bundle output
    app.use(devMiddleware);

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware);

    // moky async middleware, includes proxy and mock server
    app.use(async(options));
};

