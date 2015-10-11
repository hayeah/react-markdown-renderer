module.exports = {
  entry: "./client.js",

  output: {
    // path: __dirname,
    filename: "./public/app.js"
  },

  // node: {
  //   console: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty'
  // },

  // devtool: "cheap-eval-source-map",
  devtool: "cheap-module-eval-source-map",

  externals: [
    {
      "react": "React",
      "react-dom": "ReactDOM",
      "babel-core/browser": "babel",
      "babel": "babel",
      "lodash": "lodash",
    }
  ],

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