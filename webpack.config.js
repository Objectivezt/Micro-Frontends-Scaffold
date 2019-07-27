const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = {
  mode:'development',
  entry: {
    'root-application': 'src/root-application/root-application.js',
    'common-dependencies': [
      // We want just one version of angular, so we put it into the common dependencies
      'core-js/client/shim.min.js',
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      'reflect-metadata',
      /* Just one version of react, too. react-router is fine to have multiple versions of,
       * though, so no need to put it in common dependencies
       */
      'react',
      'react-dom',
      'vue',
      'vue-router',
    ],
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.vue?$/,
        loader: ['vue-loader','vue-style-loader'],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },{
        test: /\.css$/,
        use:[ 'style-loader','css-loader' ]
      }
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
    ],
    alias: {
      vue: 'vue/dist/vue.esm.js',
    },
    // extensions:['js','ts','vue']s
  },
  optimization: {
    splitChunks: {
      name: 'common-dependencies.js',
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(__dirname, '../src')
    ),
    new VueLoaderPlugin()
  ],
  devtool: 'source-map', 
  externals: [],
  devServer: {
    historyApiFallback: true
  }
};