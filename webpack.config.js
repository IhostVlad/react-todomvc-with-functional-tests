var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
        path: "./dist",
        filename: "client.js",
        publicPath: '/client.js',
        devtoolModuleFilenameTemplate: "[resource-path]",
        devtoolFallbackModuleFilenameTemplate: "[resource-path]?[hash]"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: "./node_modules/",
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    },
    resolve: {
        extensions: ['','.js']
    },
    plugins : [
        new ExtractTextPlugin('style.css', { allChunks: true, publicPath : '/style.css'})
    ]
};
