const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const baseConfig = {
    devtool: false,
    mode: process.env.NODE_ENV,

    output: {
        path: path.join(__dirname, '../build'),
        filename: '[name].js',
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
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
        })
    ]
};

const client = {
    ...baseConfig,

    entry: path.join(__dirname, '../src/root-client.js'),

    output: {
        ...baseConfig.output,
        filename: 'bundle.js'
    }
};

const server = {
    ...baseConfig,

    target: 'node',

    entry: path.join(__dirname, '../server', 'index.js'),

    output: {
        ...baseConfig.output,
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },

    externals: [nodeExternals()]
};

module.exports = [client, server];
