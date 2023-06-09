const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/toonder',
    createProxyMiddleware({
        target: 'http://15.164.55.83:8080',
      changeOrigin: true,
    })
  );
};