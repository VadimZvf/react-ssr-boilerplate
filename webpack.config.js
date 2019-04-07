const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-module-eval-source-map',
    mode: process.env.NODE_ENV,

    entry: path.join(__dirname, './src/root-client.js'),

    output: {
        path: path.join(__dirname, '../build'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
        })
    ]
};
