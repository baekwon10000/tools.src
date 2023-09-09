const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const common = merge([
  {
    entry: path.resolve(__dirname, "/src/app/App.tsx"),
    mode: process.env.NODE_ENV, // development, production
    output: {
      publicPath: "/",
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? 'prod' : 'dev'),
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
        inject: 'body',
      }),
      new webpack.ProvidePlugin({
        React: "react",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "/src/app"),
      },
      extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    },
  },
]);

function production() {
  return merge([
    common,
    {
      devtool: "cheap-module-source-map",
      module: {
        rules: [
          {
            test: /\.(sa|sc|c)ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
            ],
          },
        ],
      },
      plugins: [
        // new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin(),
        new WebpackShellPluginNext({
          onBuildEnd: {
            scripts: [
              'ts-node scripts/copy-index-to-404.ts',
              'ts-node scripts/copy-assets.ts',
            ]
          }
        })
      ],
      optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
          new CssMinimizerPlugin(),
        ],
        splitChunks: {
          chunks: "all",
        },
      },
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      },
    }
  ])
}

function development() {
  return merge([
    common,
    {
      devtool: "inline-source-map",
      module: {
        rules: [
          {
            test: /\.(sa|sc|c)ss$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      devServer: {
        historyApiFallback: true,
        // contentBase: 'src/www',
        static: 'src/www',
        // open: true,
        compress: true,
        hot: true,
        liveReload: true,
        // stats: 'errors-only',
        // devMiddleware: {
        //   stats: 'errors-only',
        // },
        host: '0.0.0.0',
        port: 4000,
      },
    }
  ])
}

module.exports = function() {
  if(process.env.NODE_ENV === 'production')
    return production();
  else
    return development();
};