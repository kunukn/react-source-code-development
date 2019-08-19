const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const webpack = require('webpack');

const devReactFile = 'react.development.js';
const devReactDOMFile = 'react-dom.development.js';
const prodReactFile = 'react.production.min.js';
const prodReactDOMFile = 'react-dom.production.min.js';

const useDev = false;
const pathToReact = `../react/build/node_modules/react/umd/${useDev ? devReactFile : prodReactFile}`;
const pathToReactDOM = `../react/build/node_modules/react-dom/umd/${useDev ? devReactDOMFile : prodReactDOMFile}`;

// const IsWebpackDevServer = /webpack-dev-server/.test(process.env.npm_lifecycle_script);

module.exports = (env = {}, argv = {}) => {
  //console.log('***', 'env', env, 'argv', argv, '***');

  //process.env.NODE_ENV = 'production';
  process.env.NODE_ENV = 'development';

  const PRODUCTION = 'production';
  const DEVELOPMENT = 'development';
  const entries = {
    [PRODUCTION]: './src/bootstrap',
    [DEVELOPMENT]: './src/bootstrap'
  };

  let type = argv.mode === PRODUCTION ? PRODUCTION : DEVELOPMENT;

  let port;
  if (env.PORT) {
    port = env.PORT;
  } else {
    port = 5555;
  }

  const isProd = argv.mode === PRODUCTION;
  let entry = entries[type];

  console.log('***', type, entry, '***');

  let config = {
    //devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    devtool: 'nosources-source-map',
    mode: isProd ? PRODUCTION : DEVELOPMENT,
    optimization: {
      minimizer: [].filter(Boolean)
    },
    entry: {
      DEV: entry
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].js',
      filename: '[name].js',
      library: 'DEV',
      libraryTarget: 'umd',
      publicPath: '/'
    },
    devServer: {
      //https: true,
      port,
      contentBase: path.join(__dirname, ''),
      publicPath: '/',
      open: true,
      hot: true,
      disableHostCheck: true,
      watchContentBase: true,
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: isProd
              }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: path.join(__dirname),
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          include: path.join(__dirname),
          use: [
            {
              loader: 'style-loader',
              options: {}
            },
            {
              loader: 'css-loader',
              options: {}
            },
            {
              loader: 'postcss-loader',
              options: {}
            }
          ]
        }
      ].filter(Boolean)
    },
    plugins: [
      new HtmlWebpackPlugin({
        compile: false,
        inject: true,
        hash: true,
        template: 'src/index.html',
        filename: 'index.html'
      }),
      !isProd && new webpack.HotModuleReplacementPlugin(),
      new WebpackMd5Hash()
    ].filter(Boolean),
    resolve: {
      modules: [path.resolve(__dirname), 'node_modules'],
      extensions: ['.js', '.jsx'],
      alias: {
        root: __dirname,
        src: path.resolve(__dirname, 'src'),
        components: path.resolve(__dirname, 'src/components'),
        react: path.resolve(__dirname, pathToReact),
        'react-dom': path.resolve(__dirname, pathToReactDOM)
      }
    },
    externals: {}
  };

  // if applied, then React, ReactDOM should be loaded from script url in html
  if (0) {
    config.externals['react'] = {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react'
    };
  }
  // if applied, then React, ReactDOM should be loaded from script url in html
  if (0) {
    config.externals['react-dom'] = {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom'
    };
  }

  return config;
};
