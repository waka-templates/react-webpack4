/**
 * Created by ximing on 2018/5/27.
 */
'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const port = {{port}};
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        port: port
    },
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
                            publicPath: `http:///127.0.0.1:${port}/dist/assets/`
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
});
