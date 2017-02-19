module.exports = {
  entry: "./_scripts/app.js",
  output: {
    path: "./_build/scripts",
    filename: "app.bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  }
}
