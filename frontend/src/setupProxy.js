const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/users",
    proxy({
      target: "http://localhost:8080",
      changeOrigin: true,
      pathRewrite: {
        "^/users": "/users/v1"
      }
    })
  );
};