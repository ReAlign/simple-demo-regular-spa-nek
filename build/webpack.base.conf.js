const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV;
const PROD = env === 'production' ? true : false;
const OUTPUT_PATH = path.resolve(__dirname, '../static');
const online = process.env.online;

const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
    entry: {
        main: resolve('src/javascript/main.js')
    },
    output: {
        path: OUTPUT_PATH,
        filename: PROD ? 'javascript/[name].[hash].js' : 'javascript/[name].js',
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['.js', '.less', '.json'],
        alias: {
            '@': resolve('src/javascript'),
            common: resolve('src/javascript/common'),
            widget: resolve('src/javascript/common/widget'),
            extend: resolve('src/javascript/common/extend'),
            page: resolve('src/javascript/page'),
            less: resolve('src/less')
        }
    },
    plugins: [
        new CleanWebpackPlugin(['static'], {
            root: path.resolve(__dirname, '../')
        }),
        new webpack.DefinePlugin({
            IS_ONLINE: JSON.stringify(online)
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
                options: {
                    presets: ['es2015', 'stage-2'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    }
};