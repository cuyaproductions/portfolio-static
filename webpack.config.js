module.exports = {
  entry: "./_scripts/main.js",
  output: {
    path: "./_build/scripts",
    filename: "main.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  }
}
