const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pages = ['index','photos']


module.exports = {
    mode : 'development',
    entry : pages.reduce((config, page) => {
      config[page] = `./src/scripts/${page}.ts`;
      return config;
    }, {}),
    output : {
        filename : '[name].js',
        path : path.resolve(__dirname, 'dist')
    },
    plugins : [new MiniCssExtractPlugin()].concat(
      pages.map(
        (page) =>
          new HtmlWebpackPlugin({
            inject: true,
            template: `./src/${page}.html`,
            filename: `${page}.html`,
            chunks: [page],
          })
      )
    ),
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    module: {
        rules: [
          { test: /\.tsx?$/, loader: "ts-loader" },
          { test: /\.txt$/, use: 'raw-loader' },
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
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
      resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
}