/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
//配置less
const CracoLessPlugin = require('craco-less')
//配置全局less
const cracoPluginStyleResourcesLoader = require('craco-plugin-stylus-resources-loader')
//引入gzip压缩插件
const CompressionPlugin = require('compression-webpack-plugin')
// 多线程打包
const HappyPack = require('happypack')
// 系统信息
const os = require('os')
// 开辟一个线程池，拿到系统CPU的核数，happypack 将编译工作利用所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
// 打包后的文件体积分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 具体配置见官网：https://craco.js.org/docs/
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
    plugins: {
      add: [
        // 分析打包后的文件大小
        // new BundleAnalyzerPlugin({
        //   openAnalyzer: false, // 在默认浏览器中是否自动打开报告，默认 true
        // }),
      ],
      // 设置工程的路径
      configure: (webpackConfig, { env, paths }) => {
        webpackConfig.output.clean = true // 自动将上次打包目录资源清空
        // 更改build打包文件名称为dist
        paths.appBuild = path.resolve(__dirname, 'dist')
        webpackConfig.output.path = path.resolve(__dirname, 'dist')

        if (env !== 'production') return webpackConfig

        // 生产环境 才会下面配置

        // webpack添加插件
        webpackConfig.plugins.push(
          // 配置完以后，暂时还不能使用，还需要后端做一下配置，这里后端以nginx为例
          // 使用gzip压缩超过1M的js和css文件
          new CompressionPlugin({
            // filename: "[path][base].gz", // 这种方式是默认的，多个文件压缩就有多个.gz文件，建议使用下方的写法
            filename: '[path].gz[query]', //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
            algorithm: 'gzip', // 官方默认压缩算法也是gzip
            test: /\.(js|css)$/, // 使用正则给匹配到的文件做压缩，这里是给css、js
            threshold: 1024, //以字节为单位压缩超过此大小的文件，使用默认值10240吧
            minRatio: 0.8, // 最小压缩比率，官方默认0.8
            //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
            // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
            deleteOriginalAssets: false,
          }),

          // 使用多线程打包
          new HappyPack({
            // id标识happyPack处理那一类文件
            id: 'babel',
            loaders: ['babel-loader'],
            // 共享进程池
            threadPool: happyThreadPool,
          }),

          // 打包体积分析插件
          new BundleAnalyzerPlugin({
            openAnalyzer: true, // 在默认浏览器中是否自动打开报告，默认 true
          }),
        )
        return webpackConfig
      },
    },
  },
}
