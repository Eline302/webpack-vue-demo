const HtmlWebpackPlugin =require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path =require('path')
module.exports={
    entry:'./src/main.js',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-env']
                }
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.png$/,
                loader:'url-loader',
                options:{
                    limit:10*1024,
                    name:'[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
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
                use: {
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter') // 默认的错误提示方式
                }
                },
                enforce: 'pre', // 编译前检查
                exclude: /node_modules/, // 不检查的文件
                include: [__dirname + '/src'], // 要检查的目录
            },
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify('')
          }),
          new VueLoaderPlugin(),
          new HtmlWebpackPlugin({
            title:'vue-webpack',
            template:'./public/index.html'
        })
    ]
}