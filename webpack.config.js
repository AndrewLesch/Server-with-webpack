const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode : 'development',
    entry : {
        main :'./src/scripts.js',
    },
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname, 'dist')
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : './src/index.html'
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
      },
      devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        hot: true,
        port: 8080,
      },
}