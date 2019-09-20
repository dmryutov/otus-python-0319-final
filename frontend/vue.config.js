/* eslint-disable */
const {DefinePlugin} = require('webpack');


module.exports = {
    devServer: {
        hot: true,
        hotOnly: true,
        disableHostCheck: true,
        historyApiFallback: true,
        port: 8001,
    },
    chainWebpack: config => {
        config.optimization.splitChunks({
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\\/]node_modules[\\\\/]/,
                    priority: -10,
                    chunks: 'initial',
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true,
                },
            },
        });
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true;
                return options;
            });
    },
    configureWebpack: {
        output: {
            filename: process.env.NODE_ENV === 'production'
                ? 'js/[name].[chunkhash].js'
                : 'js/[name].[hash].js',
            chunkFilename: process.env.NODE_ENV === 'production'
                ? 'js/[name].[chunkhash].js'
                : 'js/[name].[hash].js',
        },
        plugins: [
            new DefinePlugin({
                'process.env': {
                    APP_VERSION: JSON.stringify(require('./package.json').version),
                },
            }),
        ],
    },
    pluginOptions: {
      lintStyleOnBuild: false,
      stylelint: {}
    }
};
