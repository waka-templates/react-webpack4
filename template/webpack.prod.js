/**
 * Created by ximing on 2018/5/27.
 */
'use strict';
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const NODE_ENV = process.env.NODE_ENV || 'production';
module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            name: '[name][hash].[ext]',
                            outputPath: 'dist/assets/',
                            publicPath: 'http:///127.0.0.1:7898/dist/assets/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: []
});
