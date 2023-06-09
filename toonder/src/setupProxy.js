const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/toonder',
    createProxyMiddleware({
        target: 'http://ec2-15-164-55-83.ap-northeast-2.compute.amazonaws.com:8080',
      changeOrigin: true,
    })
  );
};