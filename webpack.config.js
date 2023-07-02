const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

function plugins() {
  let plugins = [
    new ExtractTextPlugin("[name].[chunkhash].css"),
      new HtmlWebpackPlugin({
        template: 'index.template.ejs',
        inject: 'body',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'debug': false,
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }
      }),
  ];

  if(process.env.NODE_ENV === 'production') {
    plugins.push(
      new WebpackShellPlugin({
        onBuildEnd: [
          'ts-node scripts/copy-index-to-404.ts',
          'ts-node scripts/copy-assets.ts',
        ]
      })
    );
  }
  return plugins;
}

const common = merge([
  {
    entry: {
      app: ['babel-polyfill', path.resolve(__dirname, 'src/app/app.tsx')]
    },
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? 'prod' : 'dev'),
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    plugins: plugins(),
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    // 모듈
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts', '.es6', '.toml'],

      // Hierarchy of directories for Webpack to look for module.
      // First is the site directory.
      // Then in the special directory of isomorphic modules ssg ships with.
      // Then the site's node_modules directory

      // Alias for typescript, see: https://github.com/gaearon/react-hot-loader/issues/417#issuecomment-261548082
      alias: { 'react/lib/ReactMount': 'react-dom/lib/ReactMount' },
      modules: [
        path.resolve(__dirname, 'src/app'),
        'node_modules'
      ],
    },
    // 로더
    resolveLoader: {
      // Hierarchy of directories for Webpack to look for loaders.
      modules: [
        path.resolve(__dirname, 'node_modules'),
      ],
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          // react-hot is like browser sync and babel loads jsx and es6-7
          loaders: ['react-hot-loader/webpack', 'babel-loader'],
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
        },
        {
          test: /\.css$/,
          // loader: 'style-loader!css-loader',
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [{loader: 'css-loader', options: {minimize: true}}]}),
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            {
              loader: 'img-loader',
              options: {
                enabled: process.env.NODE_ENV === 'production',
                gifsicle: {
                  interlaced: false
                },
                mozjpeg: {
                  progressive: true,
                  arithmetic: false
                },
                optipng: false, // disabled
                pngquant: false,
                svgo: {
                  plugins: [
                    { removeTitle: true },
                    { convertPathData: false }
                  ]
                }
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader?name=public/fonts/[name].[ext]'
        },
      ],
    },
  },
  {
    devServer: {
      /* historyApiFallback: {
        index: "/tools"
      }, */
      historyApiFallback: true,
      contentBase: 'src/www',
      // publicPath: '/tools',
      hot: true,
      stats: 'errors-only',
      host: '0.0.0.0',
      port: '4000'
    },
  },
]);

function production(env) {
  return merge([
    common,
    {
      plugins: [
        // https://github.com/webpack-contrib/uglifyjs-webpack-plugin
        new ParallelUglifyPlugin({
          cacheDir: "cache", // Optional absolute path to use as a cache. If not provided, caching will not be used.
          workerCount: 12, // Optional int. Number of workers to run uglify. Defaults to num of cpus - 1 or asset count (whichever is smaller)
          uglify: {
            beautify: false,
            mangle: {
              screw_ie8: true,
              keep_fnames:true
            },
            compress: {
              screw_ie8: true,
              drop_console: true,
            },
            //comments: false,
          },
          exclude: /crypto|node-rsa/,
        }),
      ],
    },
  ])
}

function development(env) {
  return merge([
    common,
    {
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
      ],
    },
    {
      //devtool: 'eval'
      devtool: '#sourcemap'
    }
  ])
}

module.exports = function(env) {
  if(env === 'prod')
    return production(env);
  else
    return development(env);
};