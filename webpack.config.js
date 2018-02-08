const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
     filename: './build/bundle.js'
  },
  module: {
    rules: [
    // ...other loaders...
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file?name=public/fonts/[name].[ext]'
        }]
      },
      {
      test: /\.(jpg|png|jpeg)$/,
      use: [{
        loader: 'file?name=public/images/[name].[ext]'
      }]
    }
   ]
 },
 plugins:[new HtmlWebpackPlugin({
   inject: true,
   template: "index.html"
 }),
 new ExtractTextPlugin("./build/main.css")],
 devServer:{
    contentBase:".",
    open: true
  }
};