let path = require('path');
let webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(['dist']),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BundleAnalyzerPlugin()
])

module.exports =  {
    mode:"production",
    entry: './commonUtil.js',//入口
    output: {
        path: path.resolve(__dirname, './dist'),//输出结果
        filename: "mwutil.min.js",
        library:"mwutil",
        libraryTarget : "umd",
        // libraryExport:"default"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    limit: 8192,
                    outputPath: 'static/images/'
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader:'url-loader',options:{name:'fonts/[name].[hash:8].[ext]'}//项目设置打包到dist下的fonts文件夹下
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            "@util":path.resolve(__dirname,"./commonUtil.js"),
            "@tool":path.resolve(__dirname,"./"),
        }
    },
    performance: {
        hints: false
    },
    devtool: 'cheap-module-eval-source-map',
    plugins:plugins
}
