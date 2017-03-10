const path = require('path');
const confLoaders = require('./conf/webpack.loaders');
const confPlugins = require('./conf/webpack.plugins');
const PORT = process.env.PORT || 8080;
const config = {
  devtool: 'source-map',

  devServer: {
    port: PORT,
    contentBase: './dist',
    hot: process.env.NODE_ENV === 'development' ? true : false
  },

  entry: {
    app: ['./src/scripts/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}/dist/` : ''
  },

  module: {
    loaders: confLoaders
  },

  plugins: [
    confPlugins.definePlugin,
    confPlugins.extractSass,
    confPlugins.hotModuleReplacement,
    confPlugins.htmlWebpack,
    confPlugins.namedModules,
    confPlugins.uglifyJs
  ],

  target: 'electron-renderer'

};

module.exports = config;
