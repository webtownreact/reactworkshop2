const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const isProductionMode = env.production;
  return {
    entry: './src/index.js',
    devtool: isProductionMode ? false : 'inline-source-map',
    mode: isProductionMode ? 'production' : 'development',
    output: {
      filename: '[name].[contenthash].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            // {
            //   loader: 'postcss-loader',
            // },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|jpe?g|png|gif|svg|xml)$/,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html' }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new FaviconsWebpackPlugin('./assets/images/hyperplane.svg'),
      new CompressionPlugin(),
      // new BundleAnalyzerPlugin()

    ],
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      open: false,
      hot: true,
    },
  };
};
