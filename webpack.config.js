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
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// Build directory. Ignored from github
const BUILD = path.resolve('.', 'build');

// Library to be distributed on npm
const LIB = path.resolve('.', 'lib');

export default {
  mode: 'production',
  entry: {
    'json-formula': './src/json-formula.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  target: 'web',
  output: {
    path: LIB,
    filename: '[name].js',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(BUILD, 'bundle-analyzer.html'),
      generateStatsFile: true,
      statsFilename: path.resolve(BUILD, 'stats.json'),
      openAnalyzer: false,
      defaultSizes: 'stat',
    }),
  ],
};
