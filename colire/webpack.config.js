const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const myIP = (process.platform === 'darwin' && '192.168.1.44') || (process.platform === 'win32' && '192.168.1.51') || 'localhost'
const port = '8000'

module.exports = (env, { mode }) => {
  return {
    entry: {
      index: './src/index.js'
    },
    devtool: mode === 'production' ? false : 'inline-source-map',

    resolve: {
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
        '@app': path.resolve(__dirname, 'src/app'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      }
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
      ]
    },

    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html'
      })
    ],

    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].js',
      chunkFilename:'[id].vendor.js'
    },

    devServer: {
      historyApiFallback: true,
      client: {
        logging: 'none',
      },
      allowedHosts: 'auto',
      hot: true,
      open: true,
      host: myIP,
      port: port
    }
  }
}
