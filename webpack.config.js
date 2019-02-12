const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env, options) => {
  const LIBRARY_NAME = 'promjs'

  const plugins = []
  let mode
  let outputFile

  if (options.mode === 'production') {
    plugins.push(new UglifyJsPlugin())
    outputFile = `${LIBRARY_NAME}.min.js`
    mode = 'production'
  } else {
    outputFile = `${LIBRARY_NAME}.js`
    mode = 'development'
  }
  return  {
    entry: __dirname + './src/index.js',
    entry: './src',
    mode,
    output: {
      path: __dirname + '/lib/dist',
      filename: outputFile,
      library: LIBRARY_NAME,
      libraryTarget: 'var'
    },
    optimization: {
      minimize: options.mode === 'production'
    },
    module: {
      rules: [{
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          plugins: ['lodash', 'transform-object-rest-spread'],
          presets: ['es2015']
        }
      }]
    },
    plugins
  }
}
