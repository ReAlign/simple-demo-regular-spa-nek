const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');

const config = require('../config/index')[process.argv[2] || 'default'];

const app = new Koa();

app.use(mount('/', serve(path.resolve(__dirname, '../static'))));

app.use(mount('/static', serve(path.resolve(__dirname, '../static'))));

app.on('error', (err) => {
    console.error(err);
});

const PORT = config.port || 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
});
