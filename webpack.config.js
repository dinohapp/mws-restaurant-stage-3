var path = require('path');

module.exports = {
  entry: {
  	App: "./app/assets/scripts/App.js",
  	Vendor: "./app/assets/scripts/Vendor.js"
  },
  output: {
    path: path.resolve(__dirname, "./test/js"),
    filename: "[name].js"
  },
  module: {
  	loaders: [
  	{
  		loader: 'babel-loader',
  		query: {
  			presets: ['es2015']
  		},
  		test: /\.js$/,
  		exclude: /node_modules/
  		}
  	]
  }
}