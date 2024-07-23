const path = require('path');

module.exports = {
    entry: './src/components/leaderboard.js', // Adjust this to your main entry file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'leaderboard-react.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};