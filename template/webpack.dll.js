/**
 * Created by ximing on 2018/5/27.
 */
'use strict';
const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        dll: ['react', 'mobx', 'mobx-react', 'react-dom', 'react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist','dll'),
        filename: '[name].dll.js', //输出动态连接库的文件名称
        library: '_dll_[name]' //全局变量名称
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]', //和output.library中一致，也就是输出的manifest.json中的 name值
            path: path.join(__dirname, 'dist', 'dll','manifest.json')
        })
    ]
};
