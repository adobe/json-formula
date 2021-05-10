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

export default function InputStream(stream) {
	this._stream = stream;
  // delegate most processing to the normal stream
  ["mark", "LA", "reset", "consume", "LT", "release", "seek", "toString"].forEach(method => this[method] = stream[method].bind(stream));

  this.getText = function(start, stop) {
    const text = stream.getText(start, stop);
    // We want to process a reference to $ without the quotes that JMESPath would normally require.
    return text === "$" ? "\"$\"" : text;
  };
}

Object.defineProperty(InputStream.prototype, "index", {
	get: function() {
		return this._stream.index;
	}
});

Object.defineProperty(InputStream.prototype, "size", {
	get: function() {
		return this._stream.size;
	}
});
