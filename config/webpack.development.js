const path = require("path");
const SSICompileWebpackPlugin = require('ssi-webpack-plugin');
module.exports = {
    mode:'development',
    output:{
        publicPath:'/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    limit: 8192,
                    outputPath: 'static/images'
                }
            },
        ]
    },
    devServer: {
        inline: true, //检测文件变化，实时构建并刷新浏览器
        port: "9908",
        proxy: {
            '/': {
                target: 'http://admin.nec.lenovouat.cn',
                // target: 'http://10.112.7.253:8080/',
                // pathRewrite: {
                //     "^/paymentAPI": ""
                // },
                secure: false,
                changeOrigin: true
            },
           
        },
        //404 页面返回 index.html
        historyApiFallback: true,
    },
    plugins:[
        new SSICompileWebpackPlugin({
            localBaseDir: path.resolve(__dirname, '../src'),
            publicPath: ''
        })
    ],
    devtool:'eval-source-map'
}