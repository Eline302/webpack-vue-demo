const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const utils = require('./utils.js')

const PORT = 2001
const HOST ='localhost'
module.exports= merge(baseWebpackConfig ,{
    mode:'development',
    // devTool配置开发中的辅助工具，与source map相关的功能配置
    devtool:'eval-cheap-module-source-map',
    //webpack5中热更新不触发，需要加上target:'web'就是将构建目标要设置为 web，具体配置参考https://webpack.js.org/configuration/target/#root
    target:'web',
    // 专门为 webpack-dev-server 指定的配置选项, 开发阶段的配置
    devServer:{
        clientLogLevel: 'warning',
        hot:true,
        // 额外为开发服务器指定查找静态资源目录，可以是字符串或数组，配置一个或多个
        contentBase:utils.resolve('../public'),
        port: PORT,
        host: HOST,
        // 启动服务时，自动打开浏览器
        open: true,
        publicPath:'/',
        overlay: { warnings: false, errors: true },
        // proxy属性，用来添加代理服务配置
        proxy:{
            /**
             * 每一个属性就是一个代理规则的配置
             * 属性名: 需要被代理的请求路径前缀，
             *        即请求以哪一个地址开始，就会走对应的代理请求
             * 属性值: 为这个前缀所匹配到的代理规则配置 
             */ 
            // https:localhost:8080/api/users => https://api.github.com/api/users
            '/api':{
                target:'https://api.github.com', //代理目标
                // https:localhost:8080/api/users => https://api.github.com/users
                // 如果代理目标地址中没有‘/api’,则需要重写代理目标地址
                pathRewrite:{
                    '^/api':'' // 以正则的形式进行匹配.^ 匹配输入的开始(匹配以/api开头)
                },
                //默认代理服务器会以实际在浏览器中请求的主机名
                // 不能使用 localhost:8080 作为请求 GitHub 的主机名
                // 设置改变主机名
                changeOrigin:true //以实际代理请求中的主机名去请求
            }
        }
    },
    plugins:[
        // 载入 webpack 的内置插件
        new webpack.HotModuleReplacementPlugin()
    ]
})