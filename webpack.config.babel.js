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
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlInlineScriptPlugin from "html-inline-script-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const dist = path.resolve(".", "dist");
const defn = {
  mode: "production",
  entry: {
    "json-formula": "./src/index.js"
  },
  devtool: "source-map",
  optimization: {
    minimize: false
  },
  resolve: { fallback: { fs: false } },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              {
                "plugins": ["@babel/plugin-proposal-class-properties"]
              }
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "url-loader",
        options: {
          esModule: false,
        },
      }
    ]
  },
  output: {
    path: dist,
    filename: "[name].bundle.js",
    libraryTarget: "var",
    library: "JSONFormula"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html"
    }),
    new HtmlInlineScriptPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./doc", to: path.resolve(dist, "doc") },
      ],
    }),
  ]
};
export default defn;