const {merge} = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin=require('copy-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils.js')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool:false,
  // 集中配置 webpack 内部的优化功能
  optimization: {
    //输出结果中只导出外部使用的成员（未被引用的模块代码打包时候将会被移除） 
    usedExports:true,
    // 压缩输出结果
    minimize:true,
    // 尽可能将所有模块合并并输出到到一个函数中（提高运行效率，减少代码体积）
    // concatenateModules: true,
    // 实现公共模块提取
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          name: 'vendor',
          // 自动提取所有公共模块到单独 bundle
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 传入 数组参数，用于指定需要去拷贝的文件路径(上线钱打包时候会使用，开发环境中不会使用，开发中会频繁重复的打包,开销大，速度低)
    new CopyWebpackPlugin({
      patterns: [{ 
        from: utils.resolve('../public/'),
        to: utils.resolve('../dist/public'),
        toType: 'dir'
      }]
    }),
    new OptimizeCSSPlugin({
      safe: true 
    })
  ]
})
