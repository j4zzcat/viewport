const path = require('path');

module.exports = {
    entry: './src/player.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        // path: path.resolve(__dirname, 'dist'),
        path: "DIST_DIR" in process.env ? process.env.DIST_DIR : path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'viewport'
    },
};