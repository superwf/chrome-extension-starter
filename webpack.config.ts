import { resolve } from 'path'

import { Configuration } from 'webpack'
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const resolveRoot = (relativePath: string): string => resolve(__dirname, relativePath)

const config: Configuration = {
  // experiments: { outputModule: true, mjs: true },
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

export default config
