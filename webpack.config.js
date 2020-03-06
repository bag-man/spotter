const path = require('path')

module.exports = {
  entry: './src/assets/js/index.ts',
  output: {
    path: path.join(__dirname, 'build', 'assets', 'js'),
    filename: 'index.js',
    publicPath: '/build/assets/js/',
  },
  resolve: {
    extensions: [ '.ts' ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        include: path.join(__dirname, 'src', 'assets', 'js')
      }
    ]
  }
}
