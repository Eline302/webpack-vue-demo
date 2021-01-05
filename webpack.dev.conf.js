const webpack = require('webpack')
const {merge} = require('webpack-merge')
const webpackCommon = require('./webpack.base.conf')
module.exports= merge(webpackCommon ,{
    mode:'development',
    devtool:'eval-cheap-module-source-map',
    devServer:{
        hotOnly:true,
        contentBase: './public',
        port: '2001',
        // 启动服务时，自动打开浏览器
        open: true
    },
    plugins:[
        // 载入 webpack 的内置插件
        new webpack.HotModuleReplacementPlugin()
    ]
})