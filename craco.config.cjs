/* eslint-disable @typescript-eslint/no-var-requires */
//配置less
const CracoLessPlugin = require('craco-less')
//配置全局less
const cracoPluginStyleResourcesLoader = require('craco-plugin-stylus-resources-loader')
// 具体配置见官网：https://craco.js.org/docs/
const path = require('path')
module.exports = {
  // 插件配置
  plugins: [
    { plugin: CracoLessPlugin }, // 配置less
    {
      plugin: cracoPluginStyleResourcesLoader, //配置全局less
      options: {
        patterns: [path.join(__dirname, 'src/assets/styles/less/global.less')],
        styleType: 'less',
      },
    },
  ],
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
