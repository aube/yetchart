// Webpack v4
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  devServer: {
    host: '0.0.0.0',//your ip address
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['env']
          // }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
      }
    ]
  },
  plugins: [ 
    new CleanWebpackPlugin(),
    new MinifyPlugin(),
    new ExtractTextPlugin(
      {filename: 'style.[chunkhash].css', disable: false, allChunks: true}
    ),
    new CopyWebpackPlugin([{
        from: './src/assets',
        to: './assets'
      },
    ]),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
  ],
  // optimization: {
  //   noEmitOnErrors: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       terserOptions: {
  //         ecma: 5,
  //         warnings: false,
  //         parse: {},
  //         compress: {},
  //         mangle: true, // Note `mangle.properties` is `false` by default.
  //         module: false,
  //         output: null,
  //         toplevel: false,
  //         nameCache: null,
  //         ie8: false,
  //         keep_classnames: undefined,
  //         keep_fnames: false,
  //         safari10: false,
  //       },
  //     }),
  //   ],
  // }
};