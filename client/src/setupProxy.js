const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
   app.use(
      "/api",
      createProxyMiddleware({
         target:
            !process.env.NODE_ENV || process.env.NODE_ENV === "development"
               ? process.env.BASE_URL
               : process.env.BASE_URL_PROD,
         changeOrigin: true,
      })
   );
};

 