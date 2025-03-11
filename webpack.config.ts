const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$|\.ts?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      forms: path.resolve(__dirname, 'src/forms/'),
      '@/*': path.resolve(__dirname, 'src/*'),
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
