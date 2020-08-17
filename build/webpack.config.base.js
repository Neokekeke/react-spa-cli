const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV == 'production';

// 根据环境使用不同loader
const generateLinkOrStyleLoader = () => {
    if (isProd) {
        return {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: !isProd,   // hmr热更新
            }
        };
    } 
    return 'style-loader'; // creates style nodes from JS strings
};

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.js'),
        // vendor: []
    },
    output: {
        filename: 'js/[name].[contenthash:8].js', // contenthash 针对文件内容级别的修改，只有文件模块内容改变，hash值才会改变
        path: path.resolve(__dirname, '../dist'),
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@util': path.resolve(__dirname, '../src/utils'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    /**
                     * MiniCssExtractPlugin.loader 和 style-loader 取决于当前环境，
                     * production 需要把css -> <link>标签插入到html中用 MiniCssExtractPlugin.loader
                     * development 需要把css -> <style>标签插入到html中用 style-loader
                     */
                    generateLinkOrStyleLoader(), // style-loader creates style nodes from JS strings
                    'css-loader',   // translates CSS into CommonJS
                    'less-loader',  // compiles Less to CSS
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'), // 打包生成的文件名
            template: path.resolve(__dirname, '../src/template/index.html'), // 打包的html模板
            inject: true, // body的底部注入js
            minify: process.env.NODE_ENV == 'production', // 最紧凑的输出
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[contentHash:8].css',
        })
    ],
};
