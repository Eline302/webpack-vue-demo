// 用于生成 index.html 文件（html-webpack-plugin 默认导出的就是一个类型，无需解构其内部成员）
const HtmlWebpackPlugin =require('html-webpack-plugin')
const webpack = require('webpack')
// 配合vue-loader 使用，用于编译转换.vue文件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const utils = require('./utils.js')
const devMode = process.env.NODE_ENV !== 'production';
module.exports={
    entry:utils.resolve('../src/main.js'),
    output:{
        filename:'js/[name].[hash:6].js',
        path:utils.resolve('../dist')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': utils.resolve('../src'),
          '@assets': utils.resolve('../src/assets'),
          '@pages': utils.resolve('../src/pages'),
          '@public': utils.resolve('../public'),
          '@components': utils.resolve('../src/components')
        }
    },
    module:{
        rules:[
            // {
            //     test:/\.html$/,
            //     loader:'html-loader',
            //     // attrs:['img:src','a:href']  0.5.5版本写法
            //     // ^1.3.2之后写法
            //     options:{
            //         attributes:{
            //             list:[
            //                 {
            //                     tag:'img',
            //                     attribute:'src',
            //                     type:'src'
            //                 },{
            //                     tag:'a',
            //                     attribute:'href',
            //                     type:'src'
            //                 }
            //             ]
                      
            //         }
            //     }
            // },
            // 它会应用到普通的 `.js` 文件以及 `.vue` 文件中的 `<script>` 块
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude: /node_modules/,
                options:{
                    presets:['@babel/preset-env']
                }
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    // 单位字节
                    limit:10*1024,
                    name:'[name].[ext]',
                    /*解决图片加载异常问题（直接在HTML中通路径方式引入图片）
                      未指定esmodule: false，模块被打包成module.exports = {}是一个对象。
                      指定之后打包成exports = '路径 / dataUrl'，是一个字符串。
                      vue模板需要在运行前编译，去拿这个路径的时候拿到一个对象作为路径就会报错，所以需要指定esmodule: false
                    */
                    esModule: false
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            // production模式使用MiniCssExtractPlugin插件，将 CSS 代码从打包结果中提取出来的插件，通过这个插件，可以实现 CSS 的按需加载。
            // development 加打包在js文件中
            // 它会应用到普通的 `.css` 文件,以及 `.vue` 文件中的 `<style>` 块
            // style-loader：将样式通过style标签形式注入
            // MiniCssExtractPlugin.loader：样式文件通过link方式引入css
            // 建议css文件体积超过150KB在提取到单个文件中
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader']
            },
             // 配置 less-loader ，应用到 .less 文件，转换成 css 代码
            {
                test:/\.less$/,
                use: [{
                    loader: "style-loader" 
                  }, {
                    loader: "css-loader"
                  }, {
                    loader: "less-loader"
                  }]
            },
            // 配置 eslint-loader 检查代码规范，应用到 .js 和 .vue 文件
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                options: {
                    // 默认的错误提示方式
                    formatter: require('eslint-friendly-formatter') 
                },
                // 编译前检查(elint-loader优先级设置为最高)
                enforce: 'pre', 
                // 不检查的文件
                exclude: /node_modules/,
                // 要检查的目录
                include: [utils.resolve('/src')], 
            },
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        // 用于自定义生成index.html
        new HtmlWebpackPlugin({
            title:'vue-webpack',
            filename: 'index.html',
             // 模板
            template:'./src/index.html',
            inject: true,
        }),
        //DefinePlugin是 webpack 的内置插件，构造函数接收一个对象，对象中的每一个键值都会被注入到代码中
        new webpack.DefinePlugin({
             // 值要求的是一个 JS代码片段
            BASE_URL: JSON.stringify(''),
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
              }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]-[chunkhash].css'
          }),
    ]
}