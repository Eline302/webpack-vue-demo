const {merge} = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin=require('copy-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils.js')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool:false,
  optimization: {
    usedExports:true,
    minimize:true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
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
