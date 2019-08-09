const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const postcss = require('./postcss.config');

module.exports = {
  mode: 'development',
  entry: {
    'single-spa.config': './src/main.js',
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,//开启
              // localIndexName: "[name]__[local]___[hash:base64:5]"//配置class的名字
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              // plugins: postcss.plugins,
              // sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: 'css-loader',
            options: {
              importLoaders:1,
              modules: true,//开启
              // localIndexName: "[name]__[local]___[hash:base64:5]"//配置class的名字
            },
          },
          {
            loader: require.resolve('less-loader'), // compiles Less to CSS
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              // plugins: postcss.plugins,
              // sourceMap: true,
            },
          }
        ],
      },
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif|ico)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
      }
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      mock: path.resolve(__dirname, 'mock/'),
      '@': path.resolve(__dirname, 'src/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@common': path.resolve(__dirname, 'src/common/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      "@components": path.resolve(__dirname, "src/components/"),
    },
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  devtool: 'source-map',
  externals: [],
  devServer: {
    historyApiFallback: true
  }
};
