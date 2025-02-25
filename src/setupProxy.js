const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware(["/getMountainWeather", "/api2"], {
//       //   target: "https://apihub.kma.go.kr/api/typ08/getMountainWeather",
//       target: "http://localhost:5000",
//       changeOrigin: true,
//     })
//   );
// };

// module.exports = function (app) {
//   app.use(
//     "/getMountainWeather",
//     createProxyMiddleware({
//       target: "https://apihub.kma.go.kr/api/typ08/getMountainWeather",
//       changeOrigin: true,
//       pathRewrite: {
//         "^/getMountainWeather": "",
//       },
//     })
//   );
// };

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/getMountainWeather", {
      target: "http://apihub.kma.go.kr/api/typ08/getMountainWeather", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    })
  );
};
