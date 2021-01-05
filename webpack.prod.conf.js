  
const {merge} = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin=require('copy-webpack-plugin')
const common = require('./webpack.base.conf')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "" },
      ],
    }
    )
  ]
})
