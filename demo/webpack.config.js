/**
 * Created by imamudinnaseem on 6/12/17.
 */
'use strict'

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 3001
module.exports = {
    watch: true,
    devtool: 'eval',
    entry: {
        'app': [
            './index'
        ],
        'serviceWorker': './sw'
    },
    devServer: {
        port: PORT
    },
    output: {
        filename: '[name].js',
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('', 'index.html'),
        })
    ]

}
