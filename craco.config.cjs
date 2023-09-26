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
const { getPlugin, pluginByName, whenProd } = require('@craco/craco')
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

    configure: (webpackConfig, { paths }) => {
      // 修改打包输出文件目录
      paths.appBuild = path.resolve(__dirname, 'dist')
      webpackConfig.output = {
        ...webpackConfig.output,
        clean: true, // 自动将上次打包目录资源清空
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', //资源名
      }

      // 生产环境 才会下面配置

      whenProd(() => {
        // 删除log
        const TerserPlugin = webpackConfig.optimization.minimizer.find(i => i.constructor.name === 'TerserPlugin')
        if (TerserPlugin) {
          // TerserPlugin.options.minimizer.options.compress['drop_console'] = true // 删除所有console语句
          TerserPlugin.options.minimizer.options.compress['drop_debugger'] = true
          TerserPlugin.options.minimizer.options.compress['pure_funcs'] = ['console.log'] //删除打印语句
        }

        // webpack添加插件
        webpackConfig.plugins.push(
          // 配置完以后，暂时还不能使用，还需要后端做一下配置，这里后端以nginx为例
          // 使用gzip压缩超过1M的js和css文件
          new CompressionPlugin({
            // filename: "[path][base].gz", // 这种方式是默认的，多个文件压缩就有多个.gz文件
            algorithm: 'gzip', // 官方默认压缩算法也是gzip
            test: /\.(js|css)$/, // 使用正则给匹配到的文件做压缩，这里是给css、js
            threshold: 10240, //以字节为单位压缩超过此大小的文件，小于10KB就不进行压缩
            minRatio: 0.8, // 最小压缩比率，官方默认0.8
            //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
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
      })

      whenProd(() => {
        // 只有生产环境才配置
        webpackConfig.externals = {
          // 线上替换cdn key:value key为库的名字 value为umd模块导出到global对象的key名
          react: 'React',
          'react-dom': 'ReactDOM',
          axios: 'axios',
        }
      })

      // 根据插件名获取插件 返回是否找到和匹配的插件
      const { isFound: isHtmlWebpackPluginFound, match: htmlWebpackPlugin } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin'),
      )

      if (isHtmlWebpackPluginFound) {
        // cdn url要按照库的相互依赖优先级填写 被依赖的写前面优先加载
        htmlWebpackPlugin.userOptions.cdn = whenProd(
          () => ({
            // 配置现成的cdn 资源数组 现在是公共为了测试、实际开发的时候 用公司自己花钱买的cdn服务器
            js: [
              'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
              'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
              'https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.0/axios.min.js',
            ],
            css: ['https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css'],
          }),
          // 本地环境设为空 防止页面遍历报错
          {
            js: [],
            css: [],
          },
        )
      }

      return webpackConfig
    },
  },
}
