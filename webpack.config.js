/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

/* eslint-enable @typescript-eslint/no-var-requires */

const resolveRoot = relativePath => resolve(__dirname, relativePath)

const config = {
  experiments: { outputModule: true, mjs: true },
  entry: {
    background: [resolveRoot('src/background.ts')],
    content: [resolveRoot('src/content.ts')],
    injected: [resolveRoot('src/injected.ts')],
    hotReload: [resolveRoot('src/hotReload.ts')],
  },
  output: {
    publicPath: '/',
    filename: `[name].js`,
    chunkFilename: `[name]-chunk-[chunkhash:5].js`,
    module: true,
    libraryTarget: 'module',
    ecmaVersion: 10,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        include: [resolveRoot('src')],
        exclude: [resolveRoot('node_modules')],
        sideEffects: false,
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src/**/*.{ts,tsx}'],
    }),
  ],
}

module.exports = config
