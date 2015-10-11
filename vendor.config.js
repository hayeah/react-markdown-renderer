module.exports = {
  entry: "./vendor.js",

  output: {
    // path: __dirname,
    filename: "./public/vendor.js"
  },

  // node: {
  //   console: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty'
  // },

  devtool: "source-map",

  module: {
    loaders: [
        // { test: /\.css$/, loader: "style!css" }
      {
        test: /\.json$/,
        loader: "json"
      },

      {
        test: /\.jsx?$/,
        // exclude: /(node_modules|bower_components)/,
        exclude: /node_modules/,
        loader: "babel"
      },
    ]
  }
};
