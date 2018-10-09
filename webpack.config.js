const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/build"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}