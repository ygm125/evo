const webpack = require('webpack')

let config = {
    entry: './src/evo.js',
    output: {
        path: './dist',
        libraryTarget: 'this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', { modules: false }], 'stage-1']
                }
            }
        ]
    },
    plugins: []
}

let NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'development') {
    config.watch = true
    config.output.filename = 'evo.js'

} else if (NODE_ENV === 'production') {
    config.output.filename = 'evo.min.js'
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))

}

module.exports = config