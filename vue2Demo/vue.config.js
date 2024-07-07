const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: './', // 基本路径
  productionSourceMap: true, // 是否生成.map

  // devServer: {
  //   host: '0.0.0.0', // 允许外部ip访问
  //   // host: 'localhost',
  //   port: 8084,
  //   open: true,
  //   https: false,
  //   proxy: {
  //     '/api': {
  //       target: process.env.VUE_APP_BASEURL + '/api',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // },
})
