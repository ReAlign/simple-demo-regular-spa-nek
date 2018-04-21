/* eslint-disable */
var path = require('path');

module.exports = {
    /* Listen port for moky server, OPTIONAL */
    localPort: 9999,
    /* Asnyc menu mock data, OPTIONAL */
    asyncMockPath: path.join(__dirname, 'mock', 'async'),
    /* Path of favicon.ico, OPTIONAL */
    // TODO: 暂时屏蔽
    faviconPath: path.join(__dirname, '../favicon.ico'),
    /* Static router, OPTIONAL but usually required */
    /* Default mock data, OPTIONAL */
    defaultMock: null,
    /* Not show logs if url is in the list, OPTIONAL */
    filteredUrls: [],
    /* Custom middlewares for moky, OPTIONAL */
    middlewares: path.resolve(__dirname, 'moky.middleware.js'),
    /* Settings for proxy, OPTIONAL */
    // hostName: 'ms.kaola.com',
    proxyMaps: {
        local: 'http://localhost:8080'
    }
}
