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
import CopyPlugin from "copy-webpack-plugin";

const DIST = path.resolve(".", "dist");
const CJS = path.resolve(DIST, "cjs");
const UMD = path.resolve(DIST, "umd");

const cjs = {
  mode: "production",
  entry: {
    "json-formula": "./src/json-formula.js"
  },
  devtool: "source-map",
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
      }
    ]
  },
  output: {
    path: CJS,
    filename: "[name].js",
    library: {
      type: "commonjs2"
    }
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/index.cjs", to: path.resolve(DIST, "index.js") }
      ],
    })
  ]
};

const umd = Object.assign({}, cjs, {
  output: {
    path: UMD,
    filename: "[name].js",
    library: {
      type: "umd"
    }
  }
});

export default [cjs, umd];