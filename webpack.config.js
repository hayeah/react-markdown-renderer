module.exports = {
  entry: "./client.jsx",

  output: {
    // path: __dirname,
    filename: "./public/app.js"
  },
  
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
  },

  // node: {
  //   console: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty'
  // },

  // devtool: "cheap-eval-source-map",
  devtool: "source-map",

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
      
      {
        test: /\.tsx?$/,
        // exclude: /(node_modules|bower_components)/,
        exclude: /node_modules/,
        loader: "babel!ts?transpileOnly=true"
      },
    ]
  }
};
