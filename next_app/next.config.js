// module.exports = {
//   reactStrictMode: true,
// }

// module.exports = {
//   reactStrictMode: true,
//   watchers: {
//     webpack: {
//       poll: true
//     }
//   }
// }

module.exports = {
  reactStrictMode: true,
// ここから
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    }
    return config
  },
// ここまで
}