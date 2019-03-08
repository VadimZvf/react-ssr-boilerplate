const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: false,
    mode: process.env.NODE_ENV,

    entry: path.join(__dirname, '../src/root-client.js'),

    output: {
        path: path.join(__dirname, '../build'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
        })
    ],

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
