const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/xiaomi-tts-vue/'
    : '/',
  devServer: {
    port: 80
  }
})
