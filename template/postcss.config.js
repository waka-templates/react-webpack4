/**
 * Created by ximing on 2018/5/27.
 */
'use strict';
module.exports = ({ file, options, env }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
        autoprefixer: env === 'production' ? options.autoprefixer : false
    }
});
