/**
 * Created by imamudinnaseem on 6/21/17.
 */

'use strict'

const webpack = require('webpack');
module.exports = {
    entry: {
        'index': './main.js'
    },
    output: {
        filename: 'index.js',
        library: 'sw-helper',
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
}
