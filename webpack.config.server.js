const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd();

const config = {
    name: "server",
    entry: [
        path.join(CURRENT_WORKING_DIR, './server/server.js')
    ],
    target: "node",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "server.generated.js",
        publicPath: '/dist',
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader",],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
}

module.exports = config;