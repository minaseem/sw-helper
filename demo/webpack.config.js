/**
 * Created by imamudinnaseem on 6/12/17.
 */
'use strict'

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 3001
module.exports = {
    mode: 'development',
    entry: {
        'app': './index',
        'sw': './serviceWorker/sw.js'/*,
        'test': './test'*/
    },
    devServer: {
        port: PORT
    },
    output: {
        path: path.resolve(__dirname + '/dist/'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            /*{test: /\.css$/, use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})},*/
            {test: /\.css$/, use: [ExtractTextPlugin.loader, "css-loader"]}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('index.html'),
        }),
        new ExtractTextPlugin("styles.css")
    ]

}
