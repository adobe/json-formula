/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import CopyPlugin from 'copy-webpack-plugin';
// eslint-disable-next-line import/no-extraneous-dependencies
import HtmlWebpackPlugin from 'html-webpack-plugin';

const DIST = path.resolve('.', 'dist');

export default {
  mode: 'production',
  entry: {
    tutorial: './src/tutorial.js',
  },
  devtool: 'source-map',
  resolve: { fallback: { fs: false } },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              {
                plugins: [
                  ['@babel/plugin-proposal-class-properties', { loose: true }],
                  ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
                  ['@babel/plugin-proposal-private-methods', { loose: true }],
                ],
              },
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          esModule: false,
        },
      },
    ],
  },
  output: {
    path: DIST,
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'JSONFormula',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './doc', to: path.resolve(DIST, 'doc') },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};
