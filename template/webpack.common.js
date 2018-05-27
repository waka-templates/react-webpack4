/**
 * Created by ximing on 2018/5/27.
 */
'use strict';
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'production';
const isPro = NODE_ENV === 'production';
module.exports = {
    entry: {
        app: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'es2015',
                                {
                                    modules: false
                                }
                            ],
                            'stage-0',
                            'react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    // process.env.NODE_ENV !== 'production'
                    //     ? 'style-loader'
                    //     : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // process.env.NODE_ENV !== 'production'
                    //     ? 'style-loader'
                    //     : MiniCssExtractPlugin.loader,
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: []
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        minimizer: isPro
            ? [
                  new UglifyJsPlugin({
                      cache: true,
                      parallel: true,
                      sourceMap: true // set to true if you want JS source maps
                  }),
                  new OptimizeCSSAssetsPlugin({})
              ]
            : [],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                }
                // styles: {
                //     name: 'styles',
                //     test: /\.(scss|css)$/,
                //     chunks: 'all',
                //     minChunks: 1,
                //     reuseExistingChunk: true,
                //     enforce: true
                // }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     title: 'Hot Module Replacement'
        // }),
        new webpack.NamedModulesPlugin(),
        new MiniCssExtractPlugin({
            filename: !isPro ? '[name].css' : '[name].[hash].css',
            chunkFilename: !isPro ? '[id].css' : '[id].[hash].css'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(`${NODE_ENV}`)
        }){{#webpackDll}},
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, "dist", "dll"),
            context: __dirname,
            manifest: require("./dist/dll/manifest.json")
        }){{/webpackDll}}
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};
