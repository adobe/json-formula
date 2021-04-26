var JSONFormula;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 89:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Token} = __webpack_require__(994);
const Lexer = __webpack_require__(126);
const {Interval} = __webpack_require__(909);

// this is just to keep meaningful parameter types to Parser
class TokenStream {}

/**
 * This implementation of {@link TokenStream} loads tokens from a
 * {@link TokenSource} on-demand, and places the tokens in a buffer to provide
 * access to any previous token by index.
 *
 * <p>
 * This token stream ignores the value of {@link Token//getChannel}. If your
 * parser requires the token stream filter tokens to only those on a particular
 * channel, such as {@link Token//DEFAULT_CHANNEL} or
 * {@link Token//HIDDEN_CHANNEL}, use a filtering token stream such a
 * {@link CommonTokenStream}.</p>
 */
class BufferedTokenStream extends TokenStream {
	constructor(tokenSource) {

		super();
		// The {@link TokenSource} from which tokens for this stream are fetched.
		this.tokenSource = tokenSource;
		/**
		 * A collection of all tokens fetched from the token source. The list is
		 * considered a complete view of the input once {@link //fetchedEOF} is set
		 * to {@code true}.
		 */
		this.tokens = [];

		/**
		 * The index into {@link //tokens} of the current token (next token to
		 * {@link //consume}). {@link //tokens}{@code [}{@link //p}{@code ]} should
		 * be
		 * {@link //LT LT(1)}.
		 *
		 * <p>This field is set to -1 when the stream is first constructed or when
		 * {@link //setTokenSource} is called, indicating that the first token has
		 * not yet been fetched from the token source. For additional information,
		 * see the documentation of {@link IntStream} for a description of
		 * Initializing Methods.</p>
		 */
		this.index = -1;

		/**
		 * Indicates whether the {@link Token//EOF} token has been fetched from
		 * {@link //tokenSource} and added to {@link //tokens}. This field improves
		 * performance for the following cases:
		 *
		 * <ul>
		 * <li>{@link //consume}: The lookahead check in {@link //consume} to
		 * prevent
		 * consuming the EOF symbol is optimized by checking the values of
		 * {@link //fetchedEOF} and {@link //p} instead of calling {@link
		 * //LA}.</li>
		 * <li>{@link //fetch}: The check to prevent adding multiple EOF symbols
		 * into
		 * {@link //tokens} is trivial with this field.</li>
		 * <ul>
		 */
		this.fetchedEOF = false;
	}

	mark() {
		return 0;
	}

	release(marker) {
		// no resources to release
	}

	reset() {
		this.seek(0);
	}

	seek(index) {
		this.lazyInit();
		this.index = this.adjustSeekIndex(index);
	}

	get(index) {
		this.lazyInit();
		return this.tokens[index];
	}

	consume() {
		let skipEofCheck = false;
		if (this.index >= 0) {
			if (this.fetchedEOF) {
				// the last token in tokens is EOF. skip check if p indexes any
				// fetched token except the last.
				skipEofCheck = this.index < this.tokens.length - 1;
			} else {
				// no EOF token in tokens. skip check if p indexes a fetched token.
				skipEofCheck = this.index < this.tokens.length;
			}
		} else {
			// not yet initialized
			skipEofCheck = false;
		}
		if (!skipEofCheck && this.LA(1) === Token.EOF) {
			throw "cannot consume EOF";
		}
		if (this.sync(this.index + 1)) {
			this.index = this.adjustSeekIndex(this.index + 1);
		}
	}

	/**
	 * Make sure index {@code i} in tokens has a token.
	 *
	 * @return {Boolean} {@code true} if a token is located at index {@code i}, otherwise
	 * {@code false}.
	 * @see //get(int i)
	 */
	sync(i) {
		const n = i - this.tokens.length + 1; // how many more elements we need?
		if (n > 0) {
			const fetched = this.fetch(n);
			return fetched >= n;
		}
		return true;
	}

	/**
	 * Add {@code n} elements to buffer.
	 *
	 * @return {Number} The actual number of elements added to the buffer.
	 */
	fetch(n) {
		if (this.fetchedEOF) {
			return 0;
		}
		for (let i = 0; i < n; i++) {
			const t = this.tokenSource.nextToken();
			t.tokenIndex = this.tokens.length;
			this.tokens.push(t);
			if (t.type === Token.EOF) {
				this.fetchedEOF = true;
				return i + 1;
			}
		}
		return n;
	}

// Get all tokens from start..stop inclusively///
	getTokens(start, stop, types) {
		if (types === undefined) {
			types = null;
		}
		if (start < 0 || stop < 0) {
			return null;
		}
		this.lazyInit();
		const subset = [];
		if (stop >= this.tokens.length) {
			stop = this.tokens.length - 1;
		}
		for (let i = start; i < stop; i++) {
			const t = this.tokens[i];
			if (t.type === Token.EOF) {
				break;
			}
			if (types === null || types.contains(t.type)) {
				subset.push(t);
			}
		}
		return subset;
	}

	LA(i) {
		return this.LT(i).type;
	}

	LB(k) {
		if (this.index - k < 0) {
			return null;
		}
		return this.tokens[this.index - k];
	}

	LT(k) {
		this.lazyInit();
		if (k === 0) {
			return null;
		}
		if (k < 0) {
			return this.LB(-k);
		}
		const i = this.index + k - 1;
		this.sync(i);
		if (i >= this.tokens.length) { // return EOF token
			// EOF must be last token
			return this.tokens[this.tokens.length - 1];
		}
		return this.tokens[i];
	}

	/**
	 * Allowed derived classes to modify the behavior of operations which change
	 * the current stream position by adjusting the target token index of a seek
	 * operation. The default implementation simply returns {@code i}. If an
	 * exception is thrown in this method, the current stream index should not be
	 * changed.
	 *
	 * <p>For example, {@link CommonTokenStream} overrides this method to ensure
	 * that
	 * the seek target is always an on-channel token.</p>
	 *
	 * @param {Number} i The target token index.
	 * @return {Number} The adjusted target token index.
	 */
	adjustSeekIndex(i) {
		return i;
	}

	lazyInit() {
		if (this.index === -1) {
			this.setup();
		}
	}

	setup() {
		this.sync(0);
		this.index = this.adjustSeekIndex(0);
	}

// Reset this token stream by setting its token source.///
	setTokenSource(tokenSource) {
		this.tokenSource = tokenSource;
		this.tokens = [];
		this.index = -1;
		this.fetchedEOF = false;
	}

	/**
	 * Given a starting index, return the index of the next token on channel.
	 * Return i if tokens[i] is on channel. Return -1 if there are no tokens
	 * on channel between i and EOF.
	 */
	nextTokenOnChannel(i, channel) {
		this.sync(i);
		if (i >= this.tokens.length) {
			return -1;
		}
		let token = this.tokens[i];
		while (token.channel !== this.channel) {
			if (token.type === Token.EOF) {
				return -1;
			}
			i += 1;
			this.sync(i);
			token = this.tokens[i];
		}
		return i;
	}

	/**
	 * Given a starting index, return the index of the previous token on channel.
	 * Return i if tokens[i] is on channel. Return -1 if there are no tokens
	 * on channel between i and 0.
	 */
	previousTokenOnChannel(i, channel) {
		while (i >= 0 && this.tokens[i].channel !== channel) {
			i -= 1;
		}
		return i;
	}

	/**
	 * Collect all tokens on specified channel to the right of
	 * the current token up until we see a token on DEFAULT_TOKEN_CHANNEL or
	 * EOF. If channel is -1, find any non default channel token.
	 */
	getHiddenTokensToRight(tokenIndex,
			channel) {
		if (channel === undefined) {
			channel = -1;
		}
		this.lazyInit();
		if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
			throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
		}
		const nextOnChannel = this.nextTokenOnChannel(tokenIndex + 1, Lexer.DEFAULT_TOKEN_CHANNEL);
		const from_ = tokenIndex + 1;
		// if none onchannel to right, nextOnChannel=-1 so set to = last token
		const to = nextOnChannel === -1 ? this.tokens.length - 1 : nextOnChannel;
		return this.filterForChannel(from_, to, channel);
	}

	/**
	 * Collect all tokens on specified channel to the left of
	 * the current token up until we see a token on DEFAULT_TOKEN_CHANNEL.
	 * If channel is -1, find any non default channel token.
	 */
	getHiddenTokensToLeft(tokenIndex,
			channel) {
		if (channel === undefined) {
			channel = -1;
		}
		this.lazyInit();
		if (tokenIndex < 0 || tokenIndex >= this.tokens.length) {
			throw "" + tokenIndex + " not in 0.." + this.tokens.length - 1;
		}
		const prevOnChannel = this.previousTokenOnChannel(tokenIndex - 1, Lexer.DEFAULT_TOKEN_CHANNEL);
		if (prevOnChannel === tokenIndex - 1) {
			return null;
		}
		// if none on channel to left, prevOnChannel=-1 then from=0
		const from_ = prevOnChannel + 1;
		const to = tokenIndex - 1;
		return this.filterForChannel(from_, to, channel);
	}

	filterForChannel(left, right, channel) {
		const hidden = [];
		for (let i = left; i < right + 1; i++) {
			const t = this.tokens[i];
			if (channel === -1) {
				if (t.channel !== Lexer.DEFAULT_TOKEN_CHANNEL) {
					hidden.push(t);
				}
			} else if (t.channel === channel) {
				hidden.push(t);
			}
		}
		if (hidden.length === 0) {
			return null;
		}
		return hidden;
	}

	getSourceName() {
		return this.tokenSource.getSourceName();
	}

// Get the text of all tokens in this buffer.///
	getText(interval) {
		this.lazyInit();
		this.fill();
		if (interval === undefined || interval === null) {
			interval = new Interval(0, this.tokens.length - 1);
		}
		let start = interval.start;
		if (start instanceof Token) {
			start = start.tokenIndex;
		}
		let stop = interval.stop;
		if (stop instanceof Token) {
			stop = stop.tokenIndex;
		}
		if (start === null || stop === null || start < 0 || stop < 0) {
			return "";
		}
		if (stop >= this.tokens.length) {
			stop = this.tokens.length - 1;
		}
		let s = "";
		for (let i = start; i < stop + 1; i++) {
			const t = this.tokens[i];
			if (t.type === Token.EOF) {
				break;
			}
			s = s + t.text;
		}
		return s;
	}

// Get all tokens from lexer until EOF///
	fill() {
		this.lazyInit();
		while (this.fetch(1000) === 1000) {
			continue;
		}
	}
}


module.exports = BufferedTokenStream;


/***/ }),

/***/ 443:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const InputStream = __webpack_require__(796);
const fs = __webpack_require__(654);

/**
 * Utility functions to create InputStreams from various sources.
 *
 * All returned InputStreams support the full range of Unicode
 * up to U+10FFFF (the default behavior of InputStream only supports
 * code points up to U+FFFF).
 */
const CharStreams = {
  // Creates an InputStream from a string.
  fromString: function(str) {
    return new InputStream(str, true);
  },

  /**
   * Asynchronously creates an InputStream from a blob given the
   * encoding of the bytes in that blob (defaults to 'utf8' if
   * encoding is null).
   *
   * Invokes onLoad(result) on success, onError(error) on
   * failure.
   */
  fromBlob: function(blob, encoding, onLoad, onError) {
    const reader = new window.FileReader();
    reader.onload = function(e) {
      const is = new InputStream(e.target.result, true);
      onLoad(is);
    };
    reader.onerror = onError;
    reader.readAsText(blob, encoding);
  },

  /**
   * Creates an InputStream from a Buffer given the
   * encoding of the bytes in that buffer (defaults to 'utf8' if
   * encoding is null).
   */
  fromBuffer: function(buffer, encoding) {
    return new InputStream(buffer.toString(encoding), true);
  },

  /** Asynchronously creates an InputStream from a file on disk given
   * the encoding of the bytes in that file (defaults to 'utf8' if
   * encoding is null).
   *
   * Invokes callback(error, result) on completion.
   */
  fromPath: function(path, encoding, callback) {
    fs.readFile(path, encoding, function(err, data) {
      let is = null;
      if (data !== null) {
        is = new InputStream(data, true);
      }
      callback(err, is);
    });
  },

  /**
   * Synchronously creates an InputStream given a path to a file
   * on disk and the encoding of the bytes in that file (defaults to
   * 'utf8' if encoding is null).
   */
  fromPathSync: function(path, encoding) {
    const data = fs.readFileSync(path, encoding);
    return new InputStream(data, true);
  }
};

module.exports = CharStreams;


/***/ }),

/***/ 60:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const CommonToken = __webpack_require__(994).CommonToken;

class TokenFactory {}

/**
 * This default implementation of {@link TokenFactory} creates
 * {@link CommonToken} objects.
 */
class CommonTokenFactory extends TokenFactory {
    constructor(copyText) {
        super();
        /**
         * Indicates whether {@link CommonToken//setText} should be called after
         * constructing tokens to explicitly set the text. This is useful for cases
         * where the input stream might not be able to provide arbitrary substrings
         * of text from the input after the lexer creates a token (e.g. the
         * implementation of {@link CharStream//getText} in
         * {@link UnbufferedCharStream} throws an
         * {@link UnsupportedOperationException}). Explicitly setting the token text
         * allows {@link Token//getText} to be called at any time regardless of the
         * input stream implementation.
         *
         * <p>
         * The default value is {@code false} to avoid the performance and memory
         * overhead of copying text for every token unless explicitly requested.</p>
         */
        this.copyText = copyText===undefined ? false : copyText;
    }

    create(source, type, text, channel, start, stop, line, column) {
        const t = new CommonToken(source, type, channel, start, stop);
        t.line = line;
        t.column = column;
        if (text !==null) {
            t.text = text;
        } else if (this.copyText && source[1] !==null) {
            t.text = source[1].getText(start,stop);
        }
        return t;
    }

    createThin(type, text) {
        const t = new CommonToken(null, type);
        t.text = text;
        return t;
    }
}

/**
 * The default {@link CommonTokenFactory} instance.
 *
 * <p>
 * This token factory does not explicitly copy token text when constructing
 * tokens.</p>
 */
CommonTokenFactory.DEFAULT = new CommonTokenFactory();

module.exports = CommonTokenFactory;


/***/ }),

/***/ 850:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */


const Token = __webpack_require__(994).Token;
const BufferedTokenStream = __webpack_require__(89);

/**
 * This class extends {@link BufferedTokenStream} with functionality to filter
 * token streams to tokens on a particular channel (tokens where
 * {@link Token//getChannel} returns a particular value).
 *
 * <p>
 * This token stream provides access to all tokens by index or when calling
 * methods like {@link //getText}. The channel filtering is only used for code
 * accessing tokens via the lookahead methods {@link //LA}, {@link //LT}, and
 * {@link //LB}.</p>
 *
 * <p>
 * By default, tokens are placed on the default channel
 * ({@link Token//DEFAULT_CHANNEL}), but may be reassigned by using the
 * {@code ->channel(HIDDEN)} lexer command, or by using an embedded action to
 * call {@link Lexer//setChannel}.
 * </p>
 *
 * <p>
 * Note: lexer rules which use the {@code ->skip} lexer command or call
 * {@link Lexer//skip} do not produce tokens at all, so input text matched by
 * such a rule will not be available as part of the token stream, regardless of
 * channel.</p>
 */
class CommonTokenStream extends BufferedTokenStream {
    constructor(lexer, channel) {
        super(lexer);
        this.channel = channel===undefined ? Token.DEFAULT_CHANNEL : channel;
    }

    adjustSeekIndex(i) {
        return this.nextTokenOnChannel(i, this.channel);
    }

    LB(k) {
        if (k===0 || this.index-k<0) {
            return null;
        }
        let i = this.index;
        let n = 1;
        // find k good tokens looking backwards
        while (n <= k) {
            // skip off-channel tokens
            i = this.previousTokenOnChannel(i - 1, this.channel);
            n += 1;
        }
        if (i < 0) {
            return null;
        }
        return this.tokens[i];
    }

    LT(k) {
        this.lazyInit();
        if (k === 0) {
            return null;
        }
        if (k < 0) {
            return this.LB(-k);
        }
        let i = this.index;
        let n = 1; // we know tokens[pos] is a good one
        // find k good tokens
        while (n < k) {
            // skip off-channel tokens, but make sure to not look past EOF
            if (this.sync(i + 1)) {
                i = this.nextTokenOnChannel(i + 1, this.channel);
            }
            n += 1;
        }
        return this.tokens[i];
    }

    // Count EOF just once.
    getNumberOfOnChannelTokens() {
        let n = 0;
        this.fill();
        for (let i =0; i< this.tokens.length;i++) {
            const t = this.tokens[i];
            if( t.channel===this.channel) {
                n += 1;
            }
            if( t.type===Token.EOF) {
                break;
            }
        }
        return n;
    }
}

module.exports = CommonTokenStream;


/***/ }),

/***/ 661:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const InputStream = __webpack_require__(796);
const fs = __webpack_require__(654);

/**
 * This is an InputStream that is loaded from a file all at once
 * when you construct the object.
 */
class FileStream extends InputStream {
	constructor(fileName, decodeToUnicodeCodePoints) {
		const data = fs.readFileSync(fileName, "utf8");
		super(data, decodeToUnicodeCodePoints);
		this.fileName = fileName;
	}
}

module.exports = FileStream


/***/ }),

/***/ 796:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Token} = __webpack_require__(994);
__webpack_require__(879);
__webpack_require__(414);

/**
 * If decodeToUnicodeCodePoints is true, the input is treated
 * as a series of Unicode code points.
 *
 * Otherwise, the input is treated as a series of 16-bit UTF-16 code
 * units.
 */
class InputStream {
	constructor(data, decodeToUnicodeCodePoints) {
		this.name = "<empty>";
		this.strdata = data;
		this.decodeToUnicodeCodePoints = decodeToUnicodeCodePoints || false;
		// _loadString - Vacuum all input from a string and then treat it like a buffer.
		this._index = 0;
		this.data = [];
		if (this.decodeToUnicodeCodePoints) {
			for (let i = 0; i < this.strdata.length; ) {
				const codePoint = this.strdata.codePointAt(i);
				this.data.push(codePoint);
				i += codePoint <= 0xFFFF ? 1 : 2;
			}
		} else {
			for (let i = 0; i < this.strdata.length; i++) {
				const codeUnit = this.strdata.charCodeAt(i);
				this.data.push(codeUnit);
			}
		}
		this._size = this.data.length;
	}

	/**
	 * Reset the stream so that it's in the same state it was
	 * when the object was created *except* the data array is not
	 * touched.
	 */
	reset() {
		this._index = 0;
	}

	consume() {
		if (this._index >= this._size) {
			// assert this.LA(1) == Token.EOF
			throw ("cannot consume EOF");
		}
		this._index += 1;
	}

	LA(offset) {
		if (offset === 0) {
			return 0; // undefined
		}
		if (offset < 0) {
			offset += 1; // e.g., translate LA(-1) to use offset=0
		}
		const pos = this._index + offset - 1;
		if (pos < 0 || pos >= this._size) { // invalid
			return Token.EOF;
		}
		return this.data[pos];
	}

	LT(offset) {
		return this.LA(offset);
	}

// mark/release do nothing; we have entire buffer
	mark() {
		return -1;
	}

	release(marker) {
	}

	/**
	 * consume() ahead until p==_index; can't just set p=_index as we must
	 * update line and column. If we seek backwards, just set p
	 */
	seek(_index) {
		if (_index <= this._index) {
			this._index = _index; // just jump; don't update stream state (line,
									// ...)
			return;
		}
		// seek forward
		this._index = Math.min(_index, this._size);
	}

	getText(start, stop) {
		if (stop >= this._size) {
			stop = this._size - 1;
		}
		if (start >= this._size) {
			return "";
		} else {
			if (this.decodeToUnicodeCodePoints) {
				let result = "";
				for (let i = start; i <= stop; i++) {
					result += String.fromCodePoint(this.data[i]);
				}
				return result;
			} else {
				return this.strdata.slice(start, stop + 1);
			}
		}
	}

	toString() {
		return this.strdata;
	}

	get index(){
		return this._index;
	}

	get size(){
		return this._size;
	}
}


module.exports = InputStream;


/***/ }),

/***/ 909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Token} = __webpack_require__(994);

/* stop is not included! */
class Interval {
	constructor(start, stop) {
		this.start = start;
		this.stop = stop;
	}

	contains(item) {
		return item >= this.start && item < this.stop;
	}

	toString() {
		if(this.start===this.stop-1) {
			return this.start.toString();
		} else {
			return this.start.toString() + ".." + (this.stop-1).toString();
		}
	}

	get length(){
		return this.stop - this.start;
	}
}


class IntervalSet {
	constructor() {
		this.intervals = null;
		this.readOnly = false;
	}

	first(v) {
		if (this.intervals === null || this.intervals.length===0) {
			return Token.INVALID_TYPE;
		} else {
			return this.intervals[0].start;
		}
	}

	addOne(v) {
		this.addInterval(new Interval(v, v + 1));
	}

	addRange(l, h) {
		this.addInterval(new Interval(l, h + 1));
	}

	addInterval(toAdd) {
		if (this.intervals === null) {
			this.intervals = [];
			this.intervals.push(toAdd);
		} else {
			// find insert pos
			for (let pos = 0; pos < this.intervals.length; pos++) {
				const existing = this.intervals[pos];
				// distinct range -> insert
				if (toAdd.stop < existing.start) {
					this.intervals.splice(pos, 0, toAdd);
					return;
				}
				// contiguous range -> adjust
				else if (toAdd.stop === existing.start) {
					this.intervals[pos].start = toAdd.start;
					return;
				}
				// overlapping range -> adjust and reduce
				else if (toAdd.start <= existing.stop) {
					this.intervals[pos] = new Interval(Math.min(existing.start, toAdd.start), Math.max(existing.stop, toAdd.stop));
					this.reduce(pos);
					return;
				}
			}
			// greater than any existing
			this.intervals.push(toAdd);
		}
	}

	addSet(other) {
		if (other.intervals !== null) {
			other.intervals.forEach( toAdd => this.addInterval(toAdd), this);
		}
		return this;
	}

	reduce(pos) {
		// only need to reduce if pos is not the last
		if (pos < this.intervals.length - 1) {
			const current = this.intervals[pos];
			const next = this.intervals[pos + 1];
			// if next contained in current
			if (current.stop >= next.stop) {
				this.intervals.splice(pos + 1, 1);
				this.reduce(pos);
			} else if (current.stop >= next.start) {
				this.intervals[pos] = new Interval(current.start, next.stop);
				this.intervals.splice(pos + 1, 1);
			}
		}
	}

	complement(start, stop) {
		const result = new IntervalSet();
		result.addInterval(new Interval(start,stop+1));
		if(this.intervals !== null)
			this.intervals.forEach(toRemove => result.removeRange(toRemove));
		return result;
	}

	contains(item) {
		if (this.intervals === null) {
			return false;
		} else {
			for (let k = 0; k < this.intervals.length; k++) {
				if(this.intervals[k].contains(item)) {
					return true;
				}
			}
			return false;
		}
	}

	removeRange(toRemove) {
		if(toRemove.start===toRemove.stop-1) {
			this.removeOne(toRemove.start);
		} else if (this.intervals !== null) {
			let pos = 0;
			for(let n=0; n<this.intervals.length; n++) {
				const existing = this.intervals[pos];
				// intervals are ordered
				if (toRemove.stop<=existing.start) {
					return;
				}
				// check for including range, split it
				else if(toRemove.start>existing.start && toRemove.stop<existing.stop) {
					this.intervals[pos] = new Interval(existing.start, toRemove.start);
					const x = new Interval(toRemove.stop, existing.stop);
					this.intervals.splice(pos, 0, x);
					return;
				}
				// check for included range, remove it
				else if(toRemove.start<=existing.start && toRemove.stop>=existing.stop) {
					this.intervals.splice(pos, 1);
					pos = pos - 1; // need another pass
				}
				// check for lower boundary
				else if(toRemove.start<existing.stop) {
					this.intervals[pos] = new Interval(existing.start, toRemove.start);
				}
				// check for upper boundary
				else if(toRemove.stop<existing.stop) {
					this.intervals[pos] = new Interval(toRemove.stop, existing.stop);
				}
				pos += 1;
			}
		}
	}

	removeOne(value) {
		if (this.intervals !== null) {
			for (let i = 0; i < this.intervals.length; i++) {
				const existing = this.intervals[i];
				// intervals are ordered
				if (value < existing.start) {
					return;
				}
				// check for single value range
				else if (value === existing.start && value === existing.stop - 1) {
					this.intervals.splice(i, 1);
					return;
				}
				// check for lower boundary
				else if (value === existing.start) {
					this.intervals[i] = new Interval(existing.start + 1, existing.stop);
					return;
				}
				// check for upper boundary
				else if (value === existing.stop - 1) {
					this.intervals[i] = new Interval(existing.start, existing.stop - 1);
					return;
				}
				// split existing range
				else if (value < existing.stop - 1) {
					const replace = new Interval(existing.start, value);
					existing.start = value + 1;
					this.intervals.splice(i, 0, replace);
					return;
				}
			}
		}
	}

	toString(literalNames, symbolicNames, elemsAreChar) {
		literalNames = literalNames || null;
		symbolicNames = symbolicNames || null;
		elemsAreChar = elemsAreChar || false;
		if (this.intervals === null) {
			return "{}";
		} else if(literalNames!==null || symbolicNames!==null) {
			return this.toTokenString(literalNames, symbolicNames);
		} else if(elemsAreChar) {
			return this.toCharString();
		} else {
			return this.toIndexString();
		}
	}

	toCharString() {
		const names = [];
		for (let i = 0; i < this.intervals.length; i++) {
			const existing = this.intervals[i];
			if(existing.stop===existing.start+1) {
				if ( existing.start===Token.EOF ) {
					names.push("<EOF>");
				} else {
					names.push("'" + String.fromCharCode(existing.start) + "'");
				}
			} else {
				names.push("'" + String.fromCharCode(existing.start) + "'..'" + String.fromCharCode(existing.stop-1) + "'");
			}
		}
		if (names.length > 1) {
			return "{" + names.join(", ") + "}";
		} else {
			return names[0];
		}
	}

	toIndexString() {
		const names = [];
		for (let i = 0; i < this.intervals.length; i++) {
			const existing = this.intervals[i];
			if(existing.stop===existing.start+1) {
				if ( existing.start===Token.EOF ) {
					names.push("<EOF>");
				} else {
					names.push(existing.start.toString());
				}
			} else {
				names.push(existing.start.toString() + ".." + (existing.stop-1).toString());
			}
		}
		if (names.length > 1) {
			return "{" + names.join(", ") + "}";
		} else {
			return names[0];
		}
	}

	toTokenString(literalNames, symbolicNames) {
		const names = [];
		for (let i = 0; i < this.intervals.length; i++) {
			const existing = this.intervals[i];
			for (let j = existing.start; j < existing.stop; j++) {
				names.push(this.elementName(literalNames, symbolicNames, j));
			}
		}
		if (names.length > 1) {
			return "{" + names.join(", ") + "}";
		} else {
			return names[0];
		}
	}

	elementName(literalNames, symbolicNames, token) {
		if (token === Token.EOF) {
			return "<EOF>";
		} else if (token === Token.EPSILON) {
			return "<EPSILON>";
		} else {
			return literalNames[token] || symbolicNames[token];
		}
	}

	get length(){
		return this.intervals.map( interval => interval.length ).reduce((acc, val) => acc + val);
	}
}

module.exports = {
	Interval,
	IntervalSet
};


/***/ }),

/***/ 723:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Set, BitSet} = __webpack_require__(785);
const {Token} = __webpack_require__(994);
const {ATNConfig} = __webpack_require__(961);
const {IntervalSet} = __webpack_require__(909);
const {RuleStopState} = __webpack_require__(290);
const {RuleTransition, NotSetTransition, WildcardTransition, AbstractPredicateTransition} = __webpack_require__(68);
const {predictionContextFromRuleContext, PredictionContext, SingletonPredictionContext} = __webpack_require__(259);

class LL1Analyzer {
    constructor(atn) {
        this.atn = atn;
    }

    /**
     * Calculates the SLL(1) expected lookahead set for each outgoing transition
     * of an {@link ATNState}. The returned array has one element for each
     * outgoing transition in {@code s}. If the closure from transition
     * <em>i</em> leads to a semantic predicate before matching a symbol, the
     * element at index <em>i</em> of the result will be {@code null}.
     *
     * @param s the ATN state
     * @return the expected symbols for each outgoing transition of {@code s}.
     */
    getDecisionLookahead(s) {
        if (s === null) {
            return null;
        }
        const count = s.transitions.length;
        const look = [];
        for(let alt=0; alt< count; alt++) {
            look[alt] = new IntervalSet();
            const lookBusy = new Set();
            const seeThruPreds = false; // fail to get lookahead upon pred
            this._LOOK(s.transition(alt).target, null, PredictionContext.EMPTY,
                  look[alt], lookBusy, new BitSet(), seeThruPreds, false);
            // Wipe out lookahead for this alternative if we found nothing
            // or we had a predicate when we !seeThruPreds
            if (look[alt].length===0 || look[alt].contains(LL1Analyzer.HIT_PRED)) {
                look[alt] = null;
            }
        }
        return look;
    }

    /**
     * Compute set of tokens that can follow {@code s} in the ATN in the
     * specified {@code ctx}.
     *
     * <p>If {@code ctx} is {@code null} and the end of the rule containing
     * {@code s} is reached, {@link Token//EPSILON} is added to the result set.
     * If {@code ctx} is not {@code null} and the end of the outermost rule is
     * reached, {@link Token//EOF} is added to the result set.</p>
     *
     * @param s the ATN state
     * @param stopState the ATN state to stop at. This can be a
     * {@link BlockEndState} to detect epsilon paths through a closure.
     * @param ctx the complete parser context, or {@code null} if the context
     * should be ignored
     *
     * @return The set of tokens that can follow {@code s} in the ATN in the
     * specified {@code ctx}.
     */
    LOOK(s, stopState, ctx) {
        const r = new IntervalSet();
        const seeThruPreds = true; // ignore preds; get all lookahead
        ctx = ctx || null;
        const lookContext = ctx!==null ? predictionContextFromRuleContext(s.atn, ctx) : null;
        this._LOOK(s, stopState, lookContext, r, new Set(), new BitSet(), seeThruPreds, true);
        return r;
    }

    /**
     * Compute set of tokens that can follow {@code s} in the ATN in the
     * specified {@code ctx}.
     *
     * <p>If {@code ctx} is {@code null} and {@code stopState} or the end of the
     * rule containing {@code s} is reached, {@link Token//EPSILON} is added to
     * the result set. If {@code ctx} is not {@code null} and {@code addEOF} is
     * {@code true} and {@code stopState} or the end of the outermost rule is
     * reached, {@link Token//EOF} is added to the result set.</p>
     *
     * @param s the ATN state.
     * @param stopState the ATN state to stop at. This can be a
     * {@link BlockEndState} to detect epsilon paths through a closure.
     * @param ctx The outer context, or {@code null} if the outer context should
     * not be used.
     * @param look The result lookahead set.
     * @param lookBusy A set used for preventing epsilon closures in the ATN
     * from causing a stack overflow. Outside code should pass
     * {@code new Set<ATNConfig>} for this argument.
     * @param calledRuleStack A set used for preventing left recursion in the
     * ATN from causing a stack overflow. Outside code should pass
     * {@code new BitSet()} for this argument.
     * @param seeThruPreds {@code true} to true semantic predicates as
     * implicitly {@code true} and "see through them", otherwise {@code false}
     * to treat semantic predicates as opaque and add {@link //HIT_PRED} to the
     * result if one is encountered.
     * @param addEOF Add {@link Token//EOF} to the result if the end of the
     * outermost context is reached. This parameter has no effect if {@code ctx}
     * is {@code null}.
     */
    _LOOK(s, stopState , ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF) {
        const c = new ATNConfig({state:s, alt:0, context: ctx}, null);
        if (lookBusy.contains(c)) {
            return;
        }
        lookBusy.add(c);
        if (s === stopState) {
            if (ctx ===null) {
                look.addOne(Token.EPSILON);
                return;
            } else if (ctx.isEmpty() && addEOF) {
                look.addOne(Token.EOF);
                return;
            }
        }
        if (s instanceof RuleStopState ) {
            if (ctx ===null) {
                look.addOne(Token.EPSILON);
                return;
            } else if (ctx.isEmpty() && addEOF) {
                look.addOne(Token.EOF);
                return;
            }
            if (ctx !== PredictionContext.EMPTY) {
                const removed = calledRuleStack.contains(s.ruleIndex);
                try {
                    calledRuleStack.remove(s.ruleIndex);
                    // run thru all possible stack tops in ctx
                    for (let i = 0; i < ctx.length; i++) {
                        const returnState = this.atn.states[ctx.getReturnState(i)];
                        this._LOOK(returnState, stopState, ctx.getParent(i), look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
                    }
                }finally {
                    if (removed) {
                        calledRuleStack.add(s.ruleIndex);
                    }
                }
                return;
            }
        }
        for(let j=0; j<s.transitions.length; j++) {
            const t = s.transitions[j];
            if (t.constructor === RuleTransition) {
                if (calledRuleStack.contains(t.target.ruleIndex)) {
                    continue;
                }
                const newContext = SingletonPredictionContext.create(ctx, t.followState.stateNumber);
                try {
                    calledRuleStack.add(t.target.ruleIndex);
                    this._LOOK(t.target, stopState, newContext, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
                } finally {
                    calledRuleStack.remove(t.target.ruleIndex);
                }
            } else if (t instanceof AbstractPredicateTransition ) {
                if (seeThruPreds) {
                    this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
                } else {
                    look.addOne(LL1Analyzer.HIT_PRED);
                }
            } else if( t.isEpsilon) {
                this._LOOK(t.target, stopState, ctx, look, lookBusy, calledRuleStack, seeThruPreds, addEOF);
            } else if (t.constructor === WildcardTransition) {
                look.addRange( Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType );
            } else {
                let set = t.label;
                if (set !== null) {
                    if (t instanceof NotSetTransition) {
                        set = set.complement(Token.MIN_USER_TOKEN_TYPE, this.atn.maxTokenType);
                    }
                    look.addSet(set);
                }
            }
        }
    }
}

/**
 * Special value added to the lookahead sets to indicate that we hit
 * a predicate during analysis if {@code seeThruPreds==false}.
 */
LL1Analyzer.HIT_PRED = Token.INVALID_TYPE;

module.exports = LL1Analyzer;



/***/ }),

/***/ 126:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Token} = __webpack_require__(994);
const Recognizer = __webpack_require__(438);
const CommonTokenFactory = __webpack_require__(60);
const {RecognitionException} = __webpack_require__(337);
const {LexerNoViableAltException} = __webpack_require__(337);

class TokenSource {}

/**
 * A lexer is recognizer that draws input symbols from a character stream.
 * lexer grammars result in a subclass of this object. A Lexer object
 * uses simplified match() and error recovery mechanisms in the interest of speed.
 */
class Lexer extends Recognizer {
	constructor(input) {
		super();
		this._input = input;
		this._factory = CommonTokenFactory.DEFAULT;
		this._tokenFactorySourcePair = [ this, input ];

		this._interp = null; // child classes must populate this

		/**
		 * The goal of all lexer rules/methods is to create a token object.
		 * this is an instance variable as multiple rules may collaborate to
		 * create a single token. nextToken will return this object after
		 * matching lexer rule(s). If you subclass to allow multiple token
		 * emissions, then set this to the last token to be matched or
		 * something nonnull so that the auto token emit mechanism will not
		 * emit another token.
		 */
		this._token = null;

		/**
		 * What character index in the stream did the current token start at?
		 * Needed, for example, to get the text for current token. Set at
		 * the start of nextToken.
		 */
		this._tokenStartCharIndex = -1;

		// The line on which the first character of the token resides///
		this._tokenStartLine = -1;

		// The character position of first character within the line///
		this._tokenStartColumn = -1;

		// Once we see EOF on char stream, next token will be EOF.
		// If you have DONE : EOF ; then you see DONE EOF.
		this._hitEOF = false;

		// The channel number for the current token///
		this._channel = Token.DEFAULT_CHANNEL;

		// The token type for the current token///
		this._type = Token.INVALID_TYPE;

		this._modeStack = [];
		this._mode = Lexer.DEFAULT_MODE;

		/**
		 * You can set the text for the current token to override what is in
		 * the input char buffer. Use setText() or can set this instance var.
		 */
		this._text = null;
	}

	reset() {
		// wack Lexer state variables
		if (this._input !== null) {
			this._input.seek(0); // rewind the input
		}
		this._token = null;
		this._type = Token.INVALID_TYPE;
		this._channel = Token.DEFAULT_CHANNEL;
		this._tokenStartCharIndex = -1;
		this._tokenStartColumn = -1;
		this._tokenStartLine = -1;
		this._text = null;

		this._hitEOF = false;
		this._mode = Lexer.DEFAULT_MODE;
		this._modeStack = [];

		this._interp.reset();
	}

// Return a token from this source; i.e., match a token on the char stream.
	nextToken() {
		if (this._input === null) {
			throw "nextToken requires a non-null input stream.";
		}

		/**
		 * Mark start location in char stream so unbuffered streams are
		 * guaranteed at least have text of current token
		 */
		const tokenStartMarker = this._input.mark();
		try {
			while (true) {
				if (this._hitEOF) {
					this.emitEOF();
					return this._token;
				}
				this._token = null;
				this._channel = Token.DEFAULT_CHANNEL;
				this._tokenStartCharIndex = this._input.index;
				this._tokenStartColumn = this._interp.column;
				this._tokenStartLine = this._interp.line;
				this._text = null;
				let continueOuter = false;
				while (true) {
					this._type = Token.INVALID_TYPE;
					let ttype = Lexer.SKIP;
					try {
						ttype = this._interp.match(this._input, this._mode);
					} catch (e) {
						if(e instanceof RecognitionException) {
							this.notifyListeners(e); // report error
							this.recover(e);
						} else {
							console.log(e.stack);
							throw e;
						}
					}
					if (this._input.LA(1) === Token.EOF) {
						this._hitEOF = true;
					}
					if (this._type === Token.INVALID_TYPE) {
						this._type = ttype;
					}
					if (this._type === Lexer.SKIP) {
						continueOuter = true;
						break;
					}
					if (this._type !== Lexer.MORE) {
						break;
					}
				}
				if (continueOuter) {
					continue;
				}
				if (this._token === null) {
					this.emit();
				}
				return this._token;
			}
		} finally {
			// make sure we release marker after match or
			// unbuffered char stream will keep buffering
			this._input.release(tokenStartMarker);
		}
	}

	/**
	 * Instruct the lexer to skip creating a token for current lexer rule
	 * and look for another token. nextToken() knows to keep looking when
	 * a lexer rule finishes with token set to SKIP_TOKEN. Recall that
	 * if token==null at end of any token rule, it creates one for you
	 * and emits it.
	 */
	skip() {
		this._type = Lexer.SKIP;
	}

	more() {
		this._type = Lexer.MORE;
	}

	mode(m) {
		this._mode = m;
	}

	pushMode(m) {
		if (this._interp.debug) {
			console.log("pushMode " + m);
		}
		this._modeStack.push(this._mode);
		this.mode(m);
	}

	popMode() {
		if (this._modeStack.length === 0) {
			throw "Empty Stack";
		}
		if (this._interp.debug) {
			console.log("popMode back to " + this._modeStack.slice(0, -1));
		}
		this.mode(this._modeStack.pop());
		return this._mode;
	}

	/**
	 * By default does not support multiple emits per nextToken invocation
	 * for efficiency reasons. Subclass and override this method, nextToken,
	 * and getToken (to push tokens into a list and pull from that list
	 * rather than a single variable as this implementation does).
	 */
	emitToken(token) {
		this._token = token;
	}

	/**
	 * The standard method called to automatically emit a token at the
	 * outermost lexical rule. The token object should point into the
	 * char buffer start..stop. If there is a text override in 'text',
	 * use that to set the token's text. Override this method to emit
	 * custom Token objects or provide a new factory.
	 */
	emit() {
		const t = this._factory.create(this._tokenFactorySourcePair, this._type,
				this._text, this._channel, this._tokenStartCharIndex, this
						.getCharIndex() - 1, this._tokenStartLine,
				this._tokenStartColumn);
		this.emitToken(t);
		return t;
	}

	emitEOF() {
		const cpos = this.column;
		const lpos = this.line;
		const eof = this._factory.create(this._tokenFactorySourcePair, Token.EOF,
				null, Token.DEFAULT_CHANNEL, this._input.index,
				this._input.index - 1, lpos, cpos);
		this.emitToken(eof);
		return eof;
	}

// What is the index of the current character of lookahead?///
	getCharIndex() {
		return this._input.index;
	}

	/**
	 * Return a list of all Token objects in input char stream.
	 * Forces load of all tokens. Does not include EOF token.
	 */
	getAllTokens() {
		const tokens = [];
		let t = this.nextToken();
		while (t.type !== Token.EOF) {
			tokens.push(t);
			t = this.nextToken();
		}
		return tokens;
	}

	notifyListeners(e) {
		const start = this._tokenStartCharIndex;
		const stop = this._input.index;
		const text = this._input.getText(start, stop);
		const msg = "token recognition error at: '" + this.getErrorDisplay(text) + "'";
		const listener = this.getErrorListenerDispatch();
		listener.syntaxError(this, null, this._tokenStartLine,
				this._tokenStartColumn, msg, e);
	}

	getErrorDisplay(s) {
		const d = [];
		for (let i = 0; i < s.length; i++) {
			d.push(s[i]);
		}
		return d.join('');
	}

	getErrorDisplayForChar(c) {
		if (c.charCodeAt(0) === Token.EOF) {
			return "<EOF>";
		} else if (c === '\n') {
			return "\\n";
		} else if (c === '\t') {
			return "\\t";
		} else if (c === '\r') {
			return "\\r";
		} else {
			return c;
		}
	}

	getCharErrorDisplay(c) {
		return "'" + this.getErrorDisplayForChar(c) + "'";
	}

	/**
	 * Lexers can normally match any char in it's vocabulary after matching
	 * a token, so do the easy thing and just kill a character and hope
	 * it all works out. You can instead use the rule invocation stack
	 * to do sophisticated error recovery if you are in a fragment rule.
	 */
	recover(re) {
		if (this._input.LA(1) !== Token.EOF) {
			if (re instanceof LexerNoViableAltException) {
				// skip a char and try again
				this._interp.consume(this._input);
			} else {
				// TODO: Do we lose character or line position information?
				this._input.consume();
			}
		}
	}

	get inputStream(){
		return this._input;
	}

	set inputStream(input) {
		this._input = null;
		this._tokenFactorySourcePair = [ this, this._input ];
		this.reset();
		this._input = input;
		this._tokenFactorySourcePair = [ this, this._input ];
	}

	get sourceName(){
		return this._input.sourceName;
	}

	get type(){
		return this.type;
	}

	set type(type) {
		this._type = type;
	}

	get line(){
		return this._interp.line;
	}

	set line(line) {
		this._interp.line = line;
	}

	get column(){
		return this._interp.column;
	}

	set column(column) {
		this._interp.column = column;
	}

	get text(){
		if (this._text !== null) {
			return this._text;
		} else {
			return this._interp.getText(this._input);
		}
	}

	set text(text) {
		this._text = text;
	}
}




Lexer.DEFAULT_MODE = 0;
Lexer.MORE = -2;
Lexer.SKIP = -3;

Lexer.DEFAULT_TOKEN_CHANNEL = Token.DEFAULT_CHANNEL;
Lexer.HIDDEN = Token.HIDDEN_CHANNEL;
Lexer.MIN_CHAR_VALUE = 0x0000;
Lexer.MAX_CHAR_VALUE = 0x10FFFF;

// Set the char stream and reset the lexer


module.exports = Lexer;


/***/ }),

/***/ 63:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Token} = __webpack_require__(994);
const {ParseTreeListener, TerminalNode, ErrorNode} = __webpack_require__(828);
const Recognizer = __webpack_require__(438);
const {DefaultErrorStrategy} = __webpack_require__(390);
const ATNDeserializer = __webpack_require__(369);
const ATNDeserializationOptions = __webpack_require__(962);
const Lexer = __webpack_require__(126);

class TraceListener extends ParseTreeListener {
	constructor(parser) {
		super();
		this.parser = parser;
	}

	enterEveryRule(ctx) {
		console.log("enter   " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
	}

	visitTerminal(node) {
		console.log("consume " + node.symbol + " rule " + this.parser.ruleNames[this.parser._ctx.ruleIndex]);
	}

	exitEveryRule(ctx) {
		console.log("exit    " + this.parser.ruleNames[ctx.ruleIndex] + ", LT(1)=" + this.parser._input.LT(1).text);
	}
}

class Parser extends Recognizer {
	/**
	 * this is all the parsing support code essentially; most of it is error
	 * recovery stuff.
	 */
	constructor(input) {
		super();
		// The input stream.
		this._input = null;
		/**
		 * The error handling strategy for the parser. The default value is a new
		 * instance of {@link DefaultErrorStrategy}.
		 */
		this._errHandler = new DefaultErrorStrategy();
		this._precedenceStack = [];
		this._precedenceStack.push(0);
		/**
		 * The {@link ParserRuleContext} object for the currently executing rule.
		 * this is always non-null during the parsing process.
		 */
		this._ctx = null;
		/**
		 * Specifies whether or not the parser should construct a parse tree during
		 * the parsing process. The default value is {@code true}.
		 */
		this.buildParseTrees = true;
		/**
		 * When {@link //setTrace}{@code (true)} is called, a reference to the
		 * {@link TraceListener} is stored here so it can be easily removed in a
		 * later call to {@link //setTrace}{@code (false)}. The listener itself is
		 * implemented as a parser listener so this field is not directly used by
		 * other parser methods.
		 */
		this._tracer = null;
		/**
		 * The list of {@link ParseTreeListener} listeners registered to receive
		 * events during the parse.
		 */
		this._parseListeners = null;
		/**
		 * The number of syntax errors reported during parsing. this value is
		 * incremented each time {@link //notifyErrorListeners} is called.
		 */
		this._syntaxErrors = 0;
		this.setInputStream(input);
	}

	// reset the parser's state
	reset() {
		if (this._input !== null) {
			this._input.seek(0);
		}
		this._errHandler.reset(this);
		this._ctx = null;
		this._syntaxErrors = 0;
		this.setTrace(false);
		this._precedenceStack = [];
		this._precedenceStack.push(0);
		if (this._interp !== null) {
			this._interp.reset();
		}
	}

	/**
	 * Match current input symbol against {@code ttype}. If the symbol type
	 * matches, {@link ANTLRErrorStrategy//reportMatch} and {@link //consume} are
	 * called to complete the match process.
	 *
	 * <p>If the symbol type does not match,
	 * {@link ANTLRErrorStrategy//recoverInline} is called on the current error
	 * strategy to attempt recovery. If {@link //getBuildParseTree} is
	 * {@code true} and the token index of the symbol returned by
	 * {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
	 * the parse tree by calling {@link ParserRuleContext//addErrorNode}.</p>
	 *
	 * @param ttype the token type to match
	 * @return the matched symbol
	 * @throws RecognitionException if the current input symbol did not match
	 * {@code ttype} and the error strategy could not recover from the
	 * mismatched symbol
	 */
	match(ttype) {
		let t = this.getCurrentToken();
		if (t.type === ttype) {
			this._errHandler.reportMatch(this);
			this.consume();
		} else {
			t = this._errHandler.recoverInline(this);
			if (this.buildParseTrees && t.tokenIndex === -1) {
				// we must have conjured up a new token during single token
				// insertion
				// if it's not the current symbol
				this._ctx.addErrorNode(t);
			}
		}
		return t;
	}

	/**
	 * Match current input symbol as a wildcard. If the symbol type matches
	 * (i.e. has a value greater than 0), {@link ANTLRErrorStrategy//reportMatch}
	 * and {@link //consume} are called to complete the match process.
	 *
	 * <p>If the symbol type does not match,
	 * {@link ANTLRErrorStrategy//recoverInline} is called on the current error
	 * strategy to attempt recovery. If {@link //getBuildParseTree} is
	 * {@code true} and the token index of the symbol returned by
	 * {@link ANTLRErrorStrategy//recoverInline} is -1, the symbol is added to
	 * the parse tree by calling {@link ParserRuleContext//addErrorNode}.</p>
	 *
	 * @return the matched symbol
	 * @throws RecognitionException if the current input symbol did not match
	 * a wildcard and the error strategy could not recover from the mismatched
	 * symbol
	 */
	matchWildcard() {
		let t = this.getCurrentToken();
		if (t.type > 0) {
			this._errHandler.reportMatch(this);
			this.consume();
		} else {
			t = this._errHandler.recoverInline(this);
			if (this._buildParseTrees && t.tokenIndex === -1) {
				// we must have conjured up a new token during single token
				// insertion
				// if it's not the current symbol
				this._ctx.addErrorNode(t);
			}
		}
		return t;
	}

	getParseListeners() {
		return this._parseListeners || [];
	}

	/**
	 * Registers {@code listener} to receive events during the parsing process.
	 *
	 * <p>To support output-preserving grammar transformations (including but not
	 * limited to left-recursion removal, automated left-factoring, and
	 * optimized code generation), calls to listener methods during the parse
	 * may differ substantially from calls made by
	 * {@link ParseTreeWalker//DEFAULT} used after the parse is complete. In
	 * particular, rule entry and exit events may occur in a different order
	 * during the parse than after the parser. In addition, calls to certain
	 * rule entry methods may be omitted.</p>
	 *
	 * <p>With the following specific exceptions, calls to listener events are
	 * <em>deterministic</em>, i.e. for identical input the calls to listener
	 * methods will be the same.</p>
	 *
	 * <ul>
	 * <li>Alterations to the grammar used to generate code may change the
	 * behavior of the listener calls.</li>
	 * <li>Alterations to the command line options passed to ANTLR 4 when
	 * generating the parser may change the behavior of the listener calls.</li>
	 * <li>Changing the version of the ANTLR Tool used to generate the parser
	 * may change the behavior of the listener calls.</li>
	 * </ul>
	 *
	 * @param listener the listener to add
	 *
	 * @throws NullPointerException if {@code} listener is {@code null}
	 */
	addParseListener(listener) {
		if (listener === null) {
			throw "listener";
		}
		if (this._parseListeners === null) {
			this._parseListeners = [];
		}
		this._parseListeners.push(listener);
	}

	/**
	 * Remove {@code listener} from the list of parse listeners.
	 *
	 * <p>If {@code listener} is {@code null} or has not been added as a parse
	 * listener, this method does nothing.</p>
	 * @param listener the listener to remove
	 */
	removeParseListener(listener) {
		if (this._parseListeners !== null) {
			const idx = this._parseListeners.indexOf(listener);
			if (idx >= 0) {
				this._parseListeners.splice(idx, 1);
			}
			if (this._parseListeners.length === 0) {
				this._parseListeners = null;
			}
		}
	}

// Remove all parse listeners.
	removeParseListeners() {
		this._parseListeners = null;
	}

// Notify any parse listeners of an enter rule event.
	triggerEnterRuleEvent() {
		if (this._parseListeners !== null) {
			const ctx = this._ctx;
			this._parseListeners.map(function(listener) {
				listener.enterEveryRule(ctx);
				ctx.enterRule(listener);
			});
		}
	}

	/**
	 * Notify any parse listeners of an exit rule event.
	 * @see //addParseListener
	 */
	triggerExitRuleEvent() {
		if (this._parseListeners !== null) {
			// reverse order walk of listeners
			const ctx = this._ctx;
			this._parseListeners.slice(0).reverse().map(function(listener) {
				ctx.exitRule(listener);
				listener.exitEveryRule(ctx);
			});
		}
	}

	getTokenFactory() {
		return this._input.tokenSource._factory;
	}

	// Tell our token source and error strategy about a new way to create tokens.
	setTokenFactory(factory) {
		this._input.tokenSource._factory = factory;
	}

	/**
	 * The ATN with bypass alternatives is expensive to create so we create it
	 * lazily.
	 *
	 * @throws UnsupportedOperationException if the current parser does not
	 * implement the {@link //getSerializedATN()} method.
	 */
	getATNWithBypassAlts() {
		const serializedAtn = this.getSerializedATN();
		if (serializedAtn === null) {
			throw "The current parser does not support an ATN with bypass alternatives.";
		}
		let result = this.bypassAltsAtnCache[serializedAtn];
		if (result === null) {
			const deserializationOptions = new ATNDeserializationOptions();
			deserializationOptions.generateRuleBypassTransitions = true;
			result = new ATNDeserializer(deserializationOptions)
					.deserialize(serializedAtn);
			this.bypassAltsAtnCache[serializedAtn] = result;
		}
		return result;
	}

	/**
	 * The preferred method of getting a tree pattern. For example, here's a
	 * sample use:
	 *
	 * <pre>
	 * ParseTree t = parser.expr();
	 * ParseTreePattern p = parser.compileParseTreePattern("&lt;ID&gt;+0",
	 * MyParser.RULE_expr);
	 * ParseTreeMatch m = p.match(t);
	 * String id = m.get("ID");
	 * </pre>
	 */
	compileParseTreePattern(pattern, patternRuleIndex, lexer) {
		lexer = lexer || null;
		if (lexer === null) {
			if (this.getTokenStream() !== null) {
				const tokenSource = this.getTokenStream().tokenSource;
				if (tokenSource instanceof Lexer) {
					lexer = tokenSource;
				}
			}
		}
		if (lexer === null) {
			throw "Parser can't discover a lexer to use";
		}
		const m = new ParseTreePatternMatcher(lexer, this);
		return m.compile(pattern, patternRuleIndex);
	}

	getInputStream() {
		return this.getTokenStream();
	}

	setInputStream(input) {
		this.setTokenStream(input);
	}

	getTokenStream() {
		return this._input;
	}

	// Set the token stream and reset the parser.
	setTokenStream(input) {
		this._input = null;
		this.reset();
		this._input = input;
	}

	/**
	 * Match needs to return the current input symbol, which gets put
	 * into the label for the associated token ref; e.g., x=ID.
	 */
	getCurrentToken() {
		return this._input.LT(1);
	}

	notifyErrorListeners(msg, offendingToken, err) {
		offendingToken = offendingToken || null;
		err = err || null;
		if (offendingToken === null) {
			offendingToken = this.getCurrentToken();
		}
		this._syntaxErrors += 1;
		const line = offendingToken.line;
		const column = offendingToken.column;
		const listener = this.getErrorListenerDispatch();
		listener.syntaxError(this, offendingToken, line, column, msg, err);
	}

	/**
	 * Consume and return the {@linkplain //getCurrentToken current symbol}.
	 *
	 * <p>E.g., given the following input with {@code A} being the current
	 * lookahead symbol, this function moves the cursor to {@code B} and returns
	 * {@code A}.</p>
	 *
	 * <pre>
	 * A B
	 * ^
	 * </pre>
	 *
	 * If the parser is not in error recovery mode, the consumed symbol is added
	 * to the parse tree using {@link ParserRuleContext//addChild(Token)}, and
	 * {@link ParseTreeListener//visitTerminal} is called on any parse listeners.
	 * If the parser <em>is</em> in error recovery mode, the consumed symbol is
	 * added to the parse tree using
	 * {@link ParserRuleContext//addErrorNode(Token)}, and
	 * {@link ParseTreeListener//visitErrorNode} is called on any parse
	 * listeners.
	 */
	consume() {
		const o = this.getCurrentToken();
		if (o.type !== Token.EOF) {
			this.getInputStream().consume();
		}
		const hasListener = this._parseListeners !== null && this._parseListeners.length > 0;
		if (this.buildParseTrees || hasListener) {
			let node;
			if (this._errHandler.inErrorRecoveryMode(this)) {
				node = this._ctx.addErrorNode(o);
			} else {
				node = this._ctx.addTokenNode(o);
			}
			node.invokingState = this.state;
			if (hasListener) {
				this._parseListeners.map(function(listener) {
					if (node instanceof ErrorNode || (node.isErrorNode !== undefined && node.isErrorNode())) {
						listener.visitErrorNode(node);
					} else if (node instanceof TerminalNode) {
						listener.visitTerminal(node);
					}
				});
			}
		}
		return o;
	}

	addContextToParseTree() {
		// add current context to parent if we have a parent
		if (this._ctx.parentCtx !== null) {
			this._ctx.parentCtx.addChild(this._ctx);
		}
	}

	/**
	 * Always called by generated parsers upon entry to a rule. Access field
	 * {@link //_ctx} get the current context.
	 */
	enterRule(localctx, state, ruleIndex) {
		this.state = state;
		this._ctx = localctx;
		this._ctx.start = this._input.LT(1);
		if (this.buildParseTrees) {
			this.addContextToParseTree();
		}
		if (this._parseListeners !== null) {
			this.triggerEnterRuleEvent();
		}
	}

	exitRule() {
		this._ctx.stop = this._input.LT(-1);
		// trigger event on _ctx, before it reverts to parent
		if (this._parseListeners !== null) {
			this.triggerExitRuleEvent();
		}
		this.state = this._ctx.invokingState;
		this._ctx = this._ctx.parentCtx;
	}

	enterOuterAlt(localctx, altNum) {
		localctx.setAltNumber(altNum);
		// if we have new localctx, make sure we replace existing ctx
		// that is previous child of parse tree
		if (this.buildParseTrees && this._ctx !== localctx) {
			if (this._ctx.parentCtx !== null) {
				this._ctx.parentCtx.removeLastChild();
				this._ctx.parentCtx.addChild(localctx);
			}
		}
		this._ctx = localctx;
	}

	/**
	 * Get the precedence level for the top-most precedence rule.
	 *
	 * @return The precedence level for the top-most precedence rule, or -1 if
	 * the parser context is not nested within a precedence rule.
	 */
	getPrecedence() {
		if (this._precedenceStack.length === 0) {
			return -1;
		} else {
			return this._precedenceStack[this._precedenceStack.length-1];
		}
	}

	enterRecursionRule(localctx, state, ruleIndex, precedence) {
	   this.state = state;
	   this._precedenceStack.push(precedence);
	   this._ctx = localctx;
	   this._ctx.start = this._input.LT(1);
	   if (this._parseListeners !== null) {
		   this.triggerEnterRuleEvent(); // simulates rule entry for
		   									// left-recursive rules
	   }
   }

	// Like {@link //enterRule} but for recursive rules.
	pushNewRecursionContext(localctx, state, ruleIndex) {
		const previous = this._ctx;
		previous.parentCtx = localctx;
		previous.invokingState = state;
		previous.stop = this._input.LT(-1);

		this._ctx = localctx;
		this._ctx.start = previous.start;
		if (this.buildParseTrees) {
			this._ctx.addChild(previous);
		}
		if (this._parseListeners !== null) {
			this.triggerEnterRuleEvent(); // simulates rule entry for
											// left-recursive rules
		}
	}

	unrollRecursionContexts(parentCtx) {
		this._precedenceStack.pop();
		this._ctx.stop = this._input.LT(-1);
		const retCtx = this._ctx; // save current ctx (return value)
		// unroll so _ctx is as it was before call to recursive method
		if (this._parseListeners !== null) {
			while (this._ctx !== parentCtx) {
				this.triggerExitRuleEvent();
				this._ctx = this._ctx.parentCtx;
			}
		} else {
			this._ctx = parentCtx;
		}
		// hook into tree
		retCtx.parentCtx = parentCtx;
		if (this.buildParseTrees && parentCtx !== null) {
			// add return ctx into invoking rule's tree
			parentCtx.addChild(retCtx);
		}
	}

	getInvokingContext(ruleIndex) {
		let ctx = this._ctx;
		while (ctx !== null) {
			if (ctx.ruleIndex === ruleIndex) {
				return ctx;
			}
			ctx = ctx.parentCtx;
		}
		return null;
	}

	precpred(localctx, precedence) {
		return precedence >= this._precedenceStack[this._precedenceStack.length-1];
	}

	inContext(context) {
		// TODO: useful in parser?
		return false;
	}

	/**
	 * Checks whether or not {@code symbol} can follow the current state in the
	 * ATN. The behavior of this method is equivalent to the following, but is
	 * implemented such that the complete context-sensitive follow set does not
	 * need to be explicitly constructed.
	 *
	 * <pre>
	 * return getExpectedTokens().contains(symbol);
	 * </pre>
	 *
	 * @param symbol the symbol type to check
	 * @return {@code true} if {@code symbol} can follow the current state in
	 * the ATN, otherwise {@code false}.
	 */
	isExpectedToken(symbol) {
		const atn = this._interp.atn;
		let ctx = this._ctx;
		const s = atn.states[this.state];
		let following = atn.nextTokens(s);
		if (following.contains(symbol)) {
			return true;
		}
		if (!following.contains(Token.EPSILON)) {
			return false;
		}
		while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
			const invokingState = atn.states[ctx.invokingState];
			const rt = invokingState.transitions[0];
			following = atn.nextTokens(rt.followState);
			if (following.contains(symbol)) {
				return true;
			}
			ctx = ctx.parentCtx;
		}
		if (following.contains(Token.EPSILON) && symbol === Token.EOF) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Computes the set of input symbols which could follow the current parser
	 * state and context, as given by {@link //getState} and {@link //getContext},
	 * respectively.
	 *
	 * @see ATN//getExpectedTokens(int, RuleContext)
	 */
	getExpectedTokens() {
		return this._interp.atn.getExpectedTokens(this.state, this._ctx);
	}

	getExpectedTokensWithinCurrentRule() {
		const atn = this._interp.atn;
		const s = atn.states[this.state];
		return atn.nextTokens(s);
	}

	// Get a rule's index (i.e., {@code RULE_ruleName} field) or -1 if not found.
	getRuleIndex(ruleName) {
		const ruleIndex = this.getRuleIndexMap()[ruleName];
		if (ruleIndex !== null) {
			return ruleIndex;
		} else {
			return -1;
		}
	}

	/**
	 * Return List&lt;String&gt; of the rule names in your parser instance
	 * leading up to a call to the current rule. You could override if
	 * you want more details such as the file/line info of where
	 * in the ATN a rule is invoked.
	 *
	 * this is very useful for error messages.
	 */
	getRuleInvocationStack(p) {
		p = p || null;
		if (p === null) {
			p = this._ctx;
		}
		const stack = [];
		while (p !== null) {
			// compute what follows who invoked us
			const ruleIndex = p.ruleIndex;
			if (ruleIndex < 0) {
				stack.push("n/a");
			} else {
				stack.push(this.ruleNames[ruleIndex]);
			}
			p = p.parentCtx;
		}
		return stack;
	}

	// For debugging and other purposes.
	getDFAStrings() {
		return this._interp.decisionToDFA.toString();
	}

	// For debugging and other purposes.
	dumpDFA() {
		let seenOne = false;
		for (let i = 0; i < this._interp.decisionToDFA.length; i++) {
			const dfa = this._interp.decisionToDFA[i];
			if (dfa.states.length > 0) {
				if (seenOne) {
					console.log();
				}
				this.printer.println("Decision " + dfa.decision + ":");
				this.printer.print(dfa.toString(this.literalNames, this.symbolicNames));
				seenOne = true;
			}
		}
	}

	/*
		"			printer = function() {\r\n" +
		"				this.println = function(s) { document.getElementById('output') += s + '\\n'; }\r\n" +
		"				this.print = function(s) { document.getElementById('output') += s; }\r\n" +
		"			};\r\n" +
		*/
	getSourceName() {
		return this._input.sourceName;
	}

	/**
	 * During a parse is sometimes useful to listen in on the rule entry and exit
	 * events as well as token matches. this is for quick and dirty debugging.
	 */
	setTrace(trace) {
		if (!trace) {
			this.removeParseListener(this._tracer);
			this._tracer = null;
		} else {
			if (this._tracer !== null) {
				this.removeParseListener(this._tracer);
			}
			this._tracer = new TraceListener(this);
			this.addParseListener(this._tracer);
		}
	}
}

/**
 * this field maps from the serialized ATN string to the deserialized {@link
 * ATN} with
 * bypass alternatives.
 *
 * @see ATNDeserializationOptions//isGenerateRuleBypassTransitions()
 */
Parser.bypassAltsAtnCache = {};

module.exports = Parser;


/***/ }),

/***/ 449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const RuleContext = __webpack_require__(302);
const Tree = __webpack_require__(828);
const INVALID_INTERVAL = Tree.INVALID_INTERVAL;
const TerminalNode = Tree.TerminalNode;
const TerminalNodeImpl = Tree.TerminalNodeImpl;
const ErrorNodeImpl = Tree.ErrorNodeImpl;
const Interval = __webpack_require__(909).Interval;

/**
 * A rule invocation record for parsing.
 *
 *  Contains all of the information about the current rule not stored in the
 *  RuleContext. It handles parse tree children list, Any ATN state
 *  tracing, and the default values available for rule indications:
 *  start, stop, rule index, current alt number, current
 *  ATN state.
 *
 *  Subclasses made for each rule and grammar track the parameters,
 *  return values, locals, and labels specific to that rule. These
 *  are the objects that are returned from rules.
 *
 *  Note text is not an actual field of a rule return value; it is computed
 *  from start and stop using the input stream's toString() method.  I
 *  could add a ctor to this so that we can pass in and store the input
 *  stream, but I'm not sure we want to do that.  It would seem to be undefined
 *  to get the .text property anyway if the rule matches tokens from multiple
 *  input streams.
 *
 *  I do not use getters for fields of objects that are used simply to
 *  group values such as this aggregate.  The getters/setters are there to
 *  satisfy the superclass interface.
 */
class ParserRuleContext extends RuleContext {
	constructor(parent, invokingStateNumber) {
		parent = parent || null;
		invokingStateNumber = invokingStateNumber || null;
		super(parent, invokingStateNumber);
		this.ruleIndex = -1;
		/**
		 * If we are debugging or building a parse tree for a visitor,
		 * we need to track all of the tokens and rule invocations associated
		 * with this rule's context. This is empty for parsing w/o tree constr.
		 * operation because we don't the need to track the details about
		 * how we parse this rule.
		 */
		this.children = null;
		this.start = null;
		this.stop = null;
		/**
		 * The exception that forced this rule to return. If the rule successfully
		 * completed, this is {@code null}.
		 */
		this.exception = null;
	}

	// COPY a ctx (I'm deliberately not using copy constructor)
	copyFrom(ctx) {
		// from RuleContext
		this.parentCtx = ctx.parentCtx;
		this.invokingState = ctx.invokingState;
		this.children = null;
		this.start = ctx.start;
		this.stop = ctx.stop;
		// copy any error nodes to alt label node
		if(ctx.children) {
			this.children = [];
			// reset parent pointer for any error nodes
			ctx.children.map(function(child) {
				if (child instanceof ErrorNodeImpl) {
					this.children.push(child);
					child.parentCtx = this;
				}
			}, this);
		}
	}

	// Double dispatch methods for listeners
	enterRule(listener) {
	}

	exitRule(listener) {
	}

	// Does not set parent link; other add methods do that
	addChild(child) {
		if (this.children === null) {
			this.children = [];
		}
		this.children.push(child);
		return child;
	}

	/** Used by enterOuterAlt to toss out a RuleContext previously added as
	 * we entered a rule. If we have // label, we will need to remove
	 * generic ruleContext object.
	 */
	removeLastChild() {
		if (this.children !== null) {
			this.children.pop();
		}
	}

	addTokenNode(token) {
		const node = new TerminalNodeImpl(token);
		this.addChild(node);
		node.parentCtx = this;
		return node;
	}

	addErrorNode(badToken) {
		const node = new ErrorNodeImpl(badToken);
		this.addChild(node);
		node.parentCtx = this;
		return node;
	}

	getChild(i, type) {
		type = type || null;
		if (this.children === null || i < 0 || i >= this.children.length) {
			return null;
		}
		if (type === null) {
			return this.children[i];
		} else {
			for(let j=0; j<this.children.length; j++) {
				const child = this.children[j];
				if(child instanceof type) {
					if(i===0) {
						return child;
					} else {
						i -= 1;
					}
				}
			}
			return null;
		}
	}

	getToken(ttype, i) {
		if (this.children === null || i < 0 || i >= this.children.length) {
			return null;
		}
		for(let j=0; j<this.children.length; j++) {
			const child = this.children[j];
			if (child instanceof TerminalNode) {
				if (child.symbol.type === ttype) {
					if(i===0) {
						return child;
					} else {
						i -= 1;
					}
				}
			}
		}
		return null;
	}

	getTokens(ttype ) {
		if (this.children=== null) {
			return [];
		} else {
			const tokens = [];
			for(let j=0; j<this.children.length; j++) {
				const child = this.children[j];
				if (child instanceof TerminalNode) {
					if (child.symbol.type === ttype) {
						tokens.push(child);
					}
				}
			}
			return tokens;
		}
	}

	getTypedRuleContext(ctxType, i) {
		return this.getChild(i, ctxType);
	}

	getTypedRuleContexts(ctxType) {
		if (this.children=== null) {
			return [];
		} else {
			const contexts = [];
			for(let j=0; j<this.children.length; j++) {
				const child = this.children[j];
				if (child instanceof ctxType) {
					contexts.push(child);
				}
			}
			return contexts;
		}
	}

	getChildCount() {
		if (this.children=== null) {
			return 0;
		} else {
			return this.children.length;
		}
	}

	getSourceInterval() {
		if( this.start === null || this.stop === null) {
			return INVALID_INTERVAL;
		} else {
			return new Interval(this.start.tokenIndex, this.stop.tokenIndex);
		}
	}
}

RuleContext.EMPTY = new ParserRuleContext();

class InterpreterRuleContext extends (/* unused pure expression or super */ null && (ParserRuleContext)) {
	constructor(parent, invokingStateNumber, ruleIndex) {
		super(parent, invokingStateNumber);
		this.ruleIndex = ruleIndex;
	}
}

module.exports = ParserRuleContext;


/***/ }),

/***/ 259:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const RuleContext = __webpack_require__(302);
const {Hash, Map, equalArrays} = __webpack_require__(785);

class PredictionContext {

	constructor(cachedHashCode) {
		this.cachedHashCode = cachedHashCode;
	}

	/**
	 * Stores the computed hash code of this {@link PredictionContext}. The hash
	 * code is computed in parts to match the following reference algorithm.
	 *
	 * <pre>
	 * private int referenceHashCode() {
	 * int hash = {@link MurmurHash//initialize MurmurHash.initialize}({@link
	 * //INITIAL_HASH});
	 *
	 * for (int i = 0; i &lt; {@link //size()}; i++) {
	 * hash = {@link MurmurHash//update MurmurHash.update}(hash, {@link //getParent
	 * getParent}(i));
	 * }
	 *
	 * for (int i = 0; i &lt; {@link //size()}; i++) {
	 * hash = {@link MurmurHash//update MurmurHash.update}(hash, {@link
	 * //getReturnState getReturnState}(i));
	 * }
	 *
	 * hash = {@link MurmurHash//finish MurmurHash.finish}(hash, 2// {@link
	 * //size()});
	 * return hash;
	 * }
	 * </pre>
	 * This means only the {@link //EMPTY} context is in set.
	 */
	isEmpty() {
		return this === PredictionContext.EMPTY;
	}

	hasEmptyPath() {
		return this.getReturnState(this.length - 1) === PredictionContext.EMPTY_RETURN_STATE;
	}

	hashCode() {
		return this.cachedHashCode;
	}

	updateHashCode(hash) {
		hash.update(this.cachedHashCode);
	}
}

/**
 * Represents {@code $} in local context prediction, which means wildcard.
 * {@code//+x =//}.
 */
PredictionContext.EMPTY = null;

/**
 * Represents {@code $} in an array in full context mode, when {@code $}
 * doesn't mean wildcard: {@code $ + x = [$,x]}. Here,
 * {@code $} = {@link //EMPTY_RETURN_STATE}.
 */
PredictionContext.EMPTY_RETURN_STATE = 0x7FFFFFFF;

PredictionContext.globalNodeCount = 1;
PredictionContext.id = PredictionContext.globalNodeCount;


/*
function calculateHashString(parent, returnState) {
	return "" + parent + returnState;
}
*/

/**
 * Used to cache {@link PredictionContext} objects. Its used for the shared
 * context cash associated with contexts in DFA states. This cache
 * can be used for both lexers and parsers.
 */
class PredictionContextCache {

	constructor() {
		this.cache = new Map();
	}

	/**
	 * Add a context to the cache and return it. If the context already exists,
	 * return that one instead and do not add a new context to the cache.
	 * Protect shared cache from unsafe thread access.
	 */
	add(ctx) {
		if (ctx === PredictionContext.EMPTY) {
			return PredictionContext.EMPTY;
		}
		const existing = this.cache.get(ctx) || null;
		if (existing !== null) {
			return existing;
		}
		this.cache.put(ctx, ctx);
		return ctx;
	}

	get(ctx) {
		return this.cache.get(ctx) || null;
	}

	get length(){
		return this.cache.length;
	}
}


class SingletonPredictionContext extends PredictionContext {

	constructor(parent, returnState) {
		let hashCode = 0;
		const hash = new Hash();
		if(parent !== null) {
			hash.update(parent, returnState);
		} else {
			hash.update(1);
		}
		hashCode = hash.finish();
		super(hashCode);
		this.parentCtx = parent;
		this.returnState = returnState;
	}

	getParent(index) {
		return this.parentCtx;
	}

	getReturnState(index) {
		return this.returnState;
	}

	equals(other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof SingletonPredictionContext)) {
			return false;
		} else if (this.hashCode() !== other.hashCode()) {
			return false; // can't be same if hash is different
		} else {
			if(this.returnState !== other.returnState)
				return false;
			else if(this.parentCtx==null)
				return other.parentCtx==null
			else
				return this.parentCtx.equals(other.parentCtx);
		}
	}

	toString() {
		const up = this.parentCtx === null ? "" : this.parentCtx.toString();
		if (up.length === 0) {
			if (this.returnState === PredictionContext.EMPTY_RETURN_STATE) {
				return "$";
			} else {
				return "" + this.returnState;
			}
		} else {
			return "" + this.returnState + " " + up;
		}
	}

	get length(){
		return 1;
	}

	static create(parent, returnState) {
		if (returnState === PredictionContext.EMPTY_RETURN_STATE && parent === null) {
			// someone can pass in the bits of an array ctx that mean $
			return PredictionContext.EMPTY;
		} else {
			return new SingletonPredictionContext(parent, returnState);
		}
	}
}

class EmptyPredictionContext extends SingletonPredictionContext {

	constructor() {
		super(null, PredictionContext.EMPTY_RETURN_STATE);
	}

	isEmpty() {
		return true;
	}

	getParent(index) {
		return null;
	}

	getReturnState(index) {
		return this.returnState;
	}

	equals(other) {
		return this === other;
	}

	toString() {
		return "$";
	}
}


PredictionContext.EMPTY = new EmptyPredictionContext();

class ArrayPredictionContext extends PredictionContext {

	constructor(parents, returnStates) {
		/**
		 * Parent can be null only if full ctx mode and we make an array
		 * from {@link //EMPTY} and non-empty. We merge {@link //EMPTY} by using
		 * null parent and
		 * returnState == {@link //EMPTY_RETURN_STATE}.
		 */
		const h = new Hash();
		h.update(parents, returnStates);
		const hashCode = h.finish();
		super(hashCode);
		this.parents = parents;
		this.returnStates = returnStates;
		return this;
	}

	isEmpty() {
		// since EMPTY_RETURN_STATE can only appear in the last position, we
		// don't need to verify that size==1
		return this.returnStates[0] === PredictionContext.EMPTY_RETURN_STATE;
	}

	getParent(index) {
		return this.parents[index];
	}

	getReturnState(index) {
		return this.returnStates[index];
	}

	equals(other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof ArrayPredictionContext)) {
			return false;
		} else if (this.hashCode() !== other.hashCode()) {
			return false; // can't be same if hash is different
		} else {
			return equalArrays(this.returnStates, other.returnStates) &&
				equalArrays(this.parents, other.parents);
		}
	}

	toString() {
		if (this.isEmpty()) {
			return "[]";
		} else {
			let s = "[";
			for (let i = 0; i < this.returnStates.length; i++) {
				if (i > 0) {
					s = s + ", ";
				}
				if (this.returnStates[i] === PredictionContext.EMPTY_RETURN_STATE) {
					s = s + "$";
					continue;
				}
				s = s + this.returnStates[i];
				if (this.parents[i] !== null) {
					s = s + " " + this.parents[i];
				} else {
					s = s + "null";
				}
			}
			return s + "]";
		}
	}

	get length(){
		return this.returnStates.length;
	}
}


/**
 * Convert a {@link RuleContext} tree to a {@link PredictionContext} graph.
 * Return {@link //EMPTY} if {@code outerContext} is empty or null.
 */
function predictionContextFromRuleContext(atn, outerContext) {
	if (outerContext === undefined || outerContext === null) {
		outerContext = RuleContext.EMPTY;
	}
	// if we are in RuleContext of start rule, s, then PredictionContext
	// is EMPTY. Nobody called us. (if we are empty, return empty)
	if (outerContext.parentCtx === null || outerContext === RuleContext.EMPTY) {
		return PredictionContext.EMPTY;
	}
	// If we have a parent, convert it to a PredictionContext graph
	const parent = predictionContextFromRuleContext(atn, outerContext.parentCtx);
	const state = atn.states[outerContext.invokingState];
	const transition = state.transitions[0];
	return SingletonPredictionContext.create(parent, transition.followState.stateNumber);
}
/*
function calculateListsHashString(parents, returnStates) {
	const s = "";
	parents.map(function(p) {
		s = s + p;
	});
	returnStates.map(function(r) {
		s = s + r;
	});
	return s;
}
*/
function merge(a, b, rootIsWildcard, mergeCache) {
	// share same graph if both same
	if (a === b) {
		return a;
	}
	if (a instanceof SingletonPredictionContext && b instanceof SingletonPredictionContext) {
		return mergeSingletons(a, b, rootIsWildcard, mergeCache);
	}
	// At least one of a or b is array
	// If one is $ and rootIsWildcard, return $ as// wildcard
	if (rootIsWildcard) {
		if (a instanceof EmptyPredictionContext) {
			return a;
		}
		if (b instanceof EmptyPredictionContext) {
			return b;
		}
	}
	// convert singleton so both are arrays to normalize
	if (a instanceof SingletonPredictionContext) {
		a = new ArrayPredictionContext([a.getParent()], [a.returnState]);
	}
	if (b instanceof SingletonPredictionContext) {
		b = new ArrayPredictionContext([b.getParent()], [b.returnState]);
	}
	return mergeArrays(a, b, rootIsWildcard, mergeCache);
}

/**
 * Merge two {@link SingletonPredictionContext} instances.
 *
 * <p>Stack tops equal, parents merge is same; return left graph.<br>
 * <embed src="images/SingletonMerge_SameRootSamePar.svg"
 * type="image/svg+xml"/></p>
 *
 * <p>Same stack top, parents differ; merge parents giving array node, then
 * remainders of those graphs. A new root node is created to point to the
 * merged parents.<br>
 * <embed src="images/SingletonMerge_SameRootDiffPar.svg"
 * type="image/svg+xml"/></p>
 *
 * <p>Different stack tops pointing to same parent. Make array node for the
 * root where both element in the root point to the same (original)
 * parent.<br>
 * <embed src="images/SingletonMerge_DiffRootSamePar.svg"
 * type="image/svg+xml"/></p>
 *
 * <p>Different stack tops pointing to different parents. Make array node for
 * the root where each element points to the corresponding original
 * parent.<br>
 * <embed src="images/SingletonMerge_DiffRootDiffPar.svg"
 * type="image/svg+xml"/></p>
 *
 * @param a the first {@link SingletonPredictionContext}
 * @param b the second {@link SingletonPredictionContext}
 * @param rootIsWildcard {@code true} if this is a local-context merge,
 * otherwise false to indicate a full-context merge
 * @param mergeCache
 */
function mergeSingletons(a, b, rootIsWildcard, mergeCache) {
	if (mergeCache !== null) {
		let previous = mergeCache.get(a, b);
		if (previous !== null) {
			return previous;
		}
		previous = mergeCache.get(b, a);
		if (previous !== null) {
			return previous;
		}
	}

	const rootMerge = mergeRoot(a, b, rootIsWildcard);
	if (rootMerge !== null) {
		if (mergeCache !== null) {
			mergeCache.set(a, b, rootMerge);
		}
		return rootMerge;
	}
	if (a.returnState === b.returnState) {
		const parent = merge(a.parentCtx, b.parentCtx, rootIsWildcard, mergeCache);
		// if parent is same as existing a or b parent or reduced to a parent,
		// return it
		if (parent === a.parentCtx) {
			return a; // ax + bx = ax, if a=b
		}
		if (parent === b.parentCtx) {
			return b; // ax + bx = bx, if a=b
		}
		// else: ax + ay = a'[x,y]
		// merge parents x and y, giving array node with x,y then remainders
		// of those graphs. dup a, a' points at merged array
		// new joined parent so create new singleton pointing to it, a'
		const spc = SingletonPredictionContext.create(parent, a.returnState);
		if (mergeCache !== null) {
			mergeCache.set(a, b, spc);
		}
		return spc;
	} else { // a != b payloads differ
		// see if we can collapse parents due to $+x parents if local ctx
		let singleParent = null;
		if (a === b || (a.parentCtx !== null && a.parentCtx === b.parentCtx)) { // ax +
																				// bx =
																				// [a,b]x
			singleParent = a.parentCtx;
		}
		if (singleParent !== null) { // parents are same
			// sort payloads and use same parent
			const payloads = [ a.returnState, b.returnState ];
			if (a.returnState > b.returnState) {
				payloads[0] = b.returnState;
				payloads[1] = a.returnState;
			}
			const parents = [ singleParent, singleParent ];
			const apc = new ArrayPredictionContext(parents, payloads);
			if (mergeCache !== null) {
				mergeCache.set(a, b, apc);
			}
			return apc;
		}
		// parents differ and can't merge them. Just pack together
		// into array; can't merge.
		// ax + by = [ax,by]
		const payloads = [ a.returnState, b.returnState ];
		let parents = [ a.parentCtx, b.parentCtx ];
		if (a.returnState > b.returnState) { // sort by payload
			payloads[0] = b.returnState;
			payloads[1] = a.returnState;
			parents = [ b.parentCtx, a.parentCtx ];
		}
		const a_ = new ArrayPredictionContext(parents, payloads);
		if (mergeCache !== null) {
			mergeCache.set(a, b, a_);
		}
		return a_;
	}
}

/**
 * Handle case where at least one of {@code a} or {@code b} is
 * {@link //EMPTY}. In the following diagrams, the symbol {@code $} is used
 * to represent {@link //EMPTY}.
 *
 * <h2>Local-Context Merges</h2>
 *
 * <p>These local-context merge operations are used when {@code rootIsWildcard}
 * is true.</p>
 *
 * <p>{@link //EMPTY} is superset of any graph; return {@link //EMPTY}.<br>
 * <embed src="images/LocalMerge_EmptyRoot.svg" type="image/svg+xml"/></p>
 *
 * <p>{@link //EMPTY} and anything is {@code //EMPTY}, so merged parent is
 * {@code //EMPTY}; return left graph.<br>
 * <embed src="images/LocalMerge_EmptyParent.svg" type="image/svg+xml"/></p>
 *
 * <p>Special case of last merge if local context.<br>
 * <embed src="images/LocalMerge_DiffRoots.svg" type="image/svg+xml"/></p>
 *
 * <h2>Full-Context Merges</h2>
 *
 * <p>These full-context merge operations are used when {@code rootIsWildcard}
 * is false.</p>
 *
 * <p><embed src="images/FullMerge_EmptyRoots.svg" type="image/svg+xml"/></p>
 *
 * <p>Must keep all contexts; {@link //EMPTY} in array is a special value (and
 * null parent).<br>
 * <embed src="images/FullMerge_EmptyRoot.svg" type="image/svg+xml"/></p>
 *
 * <p><embed src="images/FullMerge_SameRoot.svg" type="image/svg+xml"/></p>
 *
 * @param a the first {@link SingletonPredictionContext}
 * @param b the second {@link SingletonPredictionContext}
 * @param rootIsWildcard {@code true} if this is a local-context merge,
 * otherwise false to indicate a full-context merge
 */
function mergeRoot(a, b, rootIsWildcard) {
	if (rootIsWildcard) {
		if (a === PredictionContext.EMPTY) {
			return PredictionContext.EMPTY; // // + b =//
		}
		if (b === PredictionContext.EMPTY) {
			return PredictionContext.EMPTY; // a +// =//
		}
	} else {
		if (a === PredictionContext.EMPTY && b === PredictionContext.EMPTY) {
			return PredictionContext.EMPTY; // $ + $ = $
		} else if (a === PredictionContext.EMPTY) { // $ + x = [$,x]
			const payloads = [ b.returnState,
					PredictionContext.EMPTY_RETURN_STATE ];
			const parents = [ b.parentCtx, null ];
			return new ArrayPredictionContext(parents, payloads);
		} else if (b === PredictionContext.EMPTY) { // x + $ = [$,x] ($ is always first if present)
			const payloads = [ a.returnState, PredictionContext.EMPTY_RETURN_STATE ];
			const parents = [ a.parentCtx, null ];
			return new ArrayPredictionContext(parents, payloads);
		}
	}
	return null;
}

/**
 * Merge two {@link ArrayPredictionContext} instances.
 *
 * <p>Different tops, different parents.<br>
 * <embed src="images/ArrayMerge_DiffTopDiffPar.svg" type="image/svg+xml"/></p>
 *
 * <p>Shared top, same parents.<br>
 * <embed src="images/ArrayMerge_ShareTopSamePar.svg" type="image/svg+xml"/></p>
 *
 * <p>Shared top, different parents.<br>
 * <embed src="images/ArrayMerge_ShareTopDiffPar.svg" type="image/svg+xml"/></p>
 *
 * <p>Shared top, all shared parents.<br>
 * <embed src="images/ArrayMerge_ShareTopSharePar.svg"
 * type="image/svg+xml"/></p>
 *
 * <p>Equal tops, merge parents and reduce top to
 * {@link SingletonPredictionContext}.<br>
 * <embed src="images/ArrayMerge_EqualTop.svg" type="image/svg+xml"/></p>
 */
function mergeArrays(a, b, rootIsWildcard, mergeCache) {
	if (mergeCache !== null) {
		let previous = mergeCache.get(a, b);
		if (previous !== null) {
			return previous;
		}
		previous = mergeCache.get(b, a);
		if (previous !== null) {
			return previous;
		}
	}
	// merge sorted payloads a + b => M
	let i = 0; // walks a
	let j = 0; // walks b
	let k = 0; // walks target M array

	let mergedReturnStates = [];
	let mergedParents = [];
	// walk and merge to yield mergedParents, mergedReturnStates
	while (i < a.returnStates.length && j < b.returnStates.length) {
		const a_parent = a.parents[i];
		const b_parent = b.parents[j];
		if (a.returnStates[i] === b.returnStates[j]) {
			// same payload (stack tops are equal), must yield merged singleton
			const payload = a.returnStates[i];
			// $+$ = $
			const bothDollars = payload === PredictionContext.EMPTY_RETURN_STATE &&
					a_parent === null && b_parent === null;
			const ax_ax = (a_parent !== null && b_parent !== null && a_parent === b_parent); // ax+ax
																							// ->
																							// ax
			if (bothDollars || ax_ax) {
				mergedParents[k] = a_parent; // choose left
				mergedReturnStates[k] = payload;
			} else { // ax+ay -> a'[x,y]
				mergedParents[k] = merge(a_parent, b_parent, rootIsWildcard, mergeCache);
				mergedReturnStates[k] = payload;
			}
			i += 1; // hop over left one as usual
			j += 1; // but also skip one in right side since we merge
		} else if (a.returnStates[i] < b.returnStates[j]) { // copy a[i] to M
			mergedParents[k] = a_parent;
			mergedReturnStates[k] = a.returnStates[i];
			i += 1;
		} else { // b > a, copy b[j] to M
			mergedParents[k] = b_parent;
			mergedReturnStates[k] = b.returnStates[j];
			j += 1;
		}
		k += 1;
	}
	// copy over any payloads remaining in either array
	if (i < a.returnStates.length) {
		for (let p = i; p < a.returnStates.length; p++) {
			mergedParents[k] = a.parents[p];
			mergedReturnStates[k] = a.returnStates[p];
			k += 1;
		}
	} else {
		for (let p = j; p < b.returnStates.length; p++) {
			mergedParents[k] = b.parents[p];
			mergedReturnStates[k] = b.returnStates[p];
			k += 1;
		}
	}
	// trim merged if we combined a few that had same stack tops
	if (k < mergedParents.length) { // write index < last position; trim
		if (k === 1) { // for just one merged element, return singleton top
			const a_ = SingletonPredictionContext.create(mergedParents[0],
					mergedReturnStates[0]);
			if (mergeCache !== null) {
				mergeCache.set(a, b, a_);
			}
			return a_;
		}
		mergedParents = mergedParents.slice(0, k);
		mergedReturnStates = mergedReturnStates.slice(0, k);
	}

	const M = new ArrayPredictionContext(mergedParents, mergedReturnStates);

	// if we created same array as a or b, return that instead
	// TODO: track whether this is possible above during merge sort for speed
	if (M === a) {
		if (mergeCache !== null) {
			mergeCache.set(a, b, a);
		}
		return a;
	}
	if (M === b) {
		if (mergeCache !== null) {
			mergeCache.set(a, b, b);
		}
		return b;
	}
	combineCommonParents(mergedParents);

	if (mergeCache !== null) {
		mergeCache.set(a, b, M);
	}
	return M;
}

/**
 * Make pass over all <em>M</em> {@code parents}; merge any {@code equals()}
 * ones.
 */
function combineCommonParents(parents) {
	const uniqueParents = new Map();

	for (let p = 0; p < parents.length; p++) {
		const parent = parents[p];
		if (!(uniqueParents.containsKey(parent))) {
			uniqueParents.put(parent, parent);
		}
	}
	for (let q = 0; q < parents.length; q++) {
		parents[q] = uniqueParents.get(parents[q]);
	}
}

function getCachedPredictionContext(context, contextCache, visited) {
	if (context.isEmpty()) {
		return context;
	}
	let existing = visited.get(context) || null;
	if (existing !== null) {
		return existing;
	}
	existing = contextCache.get(context);
	if (existing !== null) {
		visited.put(context, existing);
		return existing;
	}
	let changed = false;
	let parents = [];
	for (let i = 0; i < parents.length; i++) {
		const parent = getCachedPredictionContext(context.getParent(i), contextCache, visited);
		if (changed || parent !== context.getParent(i)) {
			if (!changed) {
				parents = [];
				for (let j = 0; j < context.length; j++) {
					parents[j] = context.getParent(j);
				}
				changed = true;
			}
			parents[i] = parent;
		}
	}
	if (!changed) {
		contextCache.add(context);
		visited.put(context, context);
		return context;
	}
	let updated = null;
	if (parents.length === 0) {
		updated = PredictionContext.EMPTY;
	} else if (parents.length === 1) {
		updated = SingletonPredictionContext.create(parents[0], context
				.getReturnState(0));
	} else {
		updated = new ArrayPredictionContext(parents, context.returnStates);
	}
	contextCache.add(updated);
	visited.put(updated, updated);
	visited.put(context, updated);

	return updated;
}

// ter's recursive version of Sam's getAllNodes()
function getAllContextNodes(context, nodes, visited) {
	if (nodes === null) {
		nodes = [];
		return getAllContextNodes(context, nodes, visited);
	} else if (visited === null) {
		visited = new Map();
		return getAllContextNodes(context, nodes, visited);
	} else {
		if (context === null || visited.containsKey(context)) {
			return nodes;
		}
		visited.put(context, context);
		nodes.push(context);
		for (let i = 0; i < context.length; i++) {
			getAllContextNodes(context.getParent(i), nodes, visited);
		}
		return nodes;
	}
}

module.exports = {
	merge,
	PredictionContext,
	PredictionContextCache,
	SingletonPredictionContext,
	predictionContextFromRuleContext,
	getCachedPredictionContext
}


/***/ }),

/***/ 438:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Token} = __webpack_require__(994);
const {ConsoleErrorListener} = __webpack_require__(553);
const {ProxyErrorListener} = __webpack_require__(553);

class Recognizer {
    constructor() {
        this._listeners = [ ConsoleErrorListener.INSTANCE ];
        this._interp = null;
        this._stateNumber = -1;
    }

    checkVersion(toolVersion) {
        const runtimeVersion = "4.9.2";
        if (runtimeVersion!==toolVersion) {
            console.log("ANTLR runtime and generated code versions disagree: "+runtimeVersion+"!="+toolVersion);
        }
    }

    addErrorListener(listener) {
        this._listeners.push(listener);
    }

    removeErrorListeners() {
        this._listeners = [];
    }

    getTokenTypeMap() {
        const tokenNames = this.getTokenNames();
        if (tokenNames===null) {
            throw("The current recognizer does not provide a list of token names.");
        }
        let result = this.tokenTypeMapCache[tokenNames];
        if(result===undefined) {
            result = tokenNames.reduce(function(o, k, i) { o[k] = i; });
            result.EOF = Token.EOF;
            this.tokenTypeMapCache[tokenNames] = result;
        }
        return result;
    }

    /**
     * Get a map from rule names to rule indexes.
     * <p>Used for XPath and tree pattern compilation.</p>
     */
    getRuleIndexMap() {
        const ruleNames = this.ruleNames;
        if (ruleNames===null) {
            throw("The current recognizer does not provide a list of rule names.");
        }
        let result = this.ruleIndexMapCache[ruleNames]; // todo: should it be Recognizer.ruleIndexMapCache ?
        if(result===undefined) {
            result = ruleNames.reduce(function(o, k, i) { o[k] = i; });
            this.ruleIndexMapCache[ruleNames] = result;
        }
        return result;
    }

    getTokenType(tokenName) {
        const ttype = this.getTokenTypeMap()[tokenName];
        if (ttype !==undefined) {
            return ttype;
        } else {
            return Token.INVALID_TYPE;
        }
    }

    // What is the error header, normally line/character position information?
    getErrorHeader(e) {
        const line = e.getOffendingToken().line;
        const column = e.getOffendingToken().column;
        return "line " + line + ":" + column;
    }

    /**
     * How should a token be displayed in an error message? The default
     * is to display just the text, but during development you might
     * want to have a lot of information spit out.  Override in that case
     * to use t.toString() (which, for CommonToken, dumps everything about
     * the token). This is better than forcing you to override a method in
     * your token objects because you don't have to go modify your lexer
     * so that it creates a new Java type.
     *
     * @deprecated This method is not called by the ANTLR 4 Runtime. Specific
     * implementations of {@link ANTLRErrorStrategy} may provide a similar
     * feature when necessary. For example, see
     * {@link DefaultErrorStrategy//getTokenErrorDisplay}.*/
    getTokenErrorDisplay(t) {
        if (t===null) {
            return "<no token>";
        }
        let s = t.text;
        if (s===null) {
            if (t.type===Token.EOF) {
                s = "<EOF>";
            } else {
                s = "<" + t.type + ">";
            }
        }
        s = s.replace("\n","\\n").replace("\r","\\r").replace("\t","\\t");
        return "'" + s + "'";
    }

    getErrorListenerDispatch() {
        return new ProxyErrorListener(this._listeners);
    }

    /**
     * subclass needs to override these if there are sempreds or actions
     * that the ATN interp needs to execute
     */
    sempred(localctx, ruleIndex, actionIndex) {
        return true;
    }

    precpred(localctx , precedence) {
        return true;
    }

    get state(){
        return this._stateNumber;
    }

    set state(state) {
        this._stateNumber = state;
    }
}

Recognizer.tokenTypeMapCache = {};
Recognizer.ruleIndexMapCache = {};

module.exports = Recognizer;


/***/ }),

/***/ 302:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {RuleNode} = __webpack_require__(828);
const {INVALID_INTERVAL} = __webpack_require__(828);
const Trees = __webpack_require__(30);

class RuleContext extends RuleNode {
	/** A rule context is a record of a single rule invocation. It knows
	 * which context invoked it, if any. If there is no parent context, then
	 * naturally the invoking state is not valid.  The parent link
	 * provides a chain upwards from the current rule invocation to the root
	 * of the invocation tree, forming a stack. We actually carry no
	 * information about the rule associated with this context (except
	 * when parsing). We keep only the state number of the invoking state from
	 * the ATN submachine that invoked this. Contrast this with the s
	 * pointer inside ParserRuleContext that tracks the current state
	 * being "executed" for the current rule.
	 *
	 * The parent contexts are useful for computing lookahead sets and
	 * getting error information.
	 *
	 * These objects are used during parsing and prediction.
	 * For the special case of parsers, we use the subclass
	 * ParserRuleContext.
	 *
	 * @see ParserRuleContext
	 */
	constructor(parent, invokingState) {
		// What context invoked this rule?
		super();
		this.parentCtx = parent || null;
		/**
		 * What state invoked the rule associated with this context?
		 * The "return address" is the followState of invokingState
		 * If parent is null, this should be -1.
		 */
		this.invokingState = invokingState || -1;
	}

	depth() {
		let n = 0;
		let p = this;
		while (p !== null) {
			p = p.parentCtx;
			n += 1;
		}
		return n;
	}

	/**
	 * A context is empty if there is no invoking state; meaning nobody call
	 * current context.
	 */
	isEmpty() {
		return this.invokingState === -1;
	}

// satisfy the ParseTree / SyntaxTree interface
	getSourceInterval() {
		return INVALID_INTERVAL;
	}

	getRuleContext() {
		return this;
	}

	getPayload() {
		return this;
	}

	/**
	 * Return the combined text of all child nodes. This method only considers
	 * tokens which have been added to the parse tree.
	 * <p>
	 * Since tokens on hidden channels (e.g. whitespace or comments) are not
	 * added to the parse trees, they will not appear in the output of this
	 * method.
	 */
	getText() {
		if (this.getChildCount() === 0) {
			return "";
		} else {
			return this.children.map(function(child) {
				return child.getText();
			}).join("");
		}
	}

	/**
	 * For rule associated with this parse tree internal node, return
	 * the outer alternative number used to match the input. Default
	 * implementation does not compute nor store this alt num. Create
	 * a subclass of ParserRuleContext with backing field and set
	 * option contextSuperClass.
	 * to set it.
	 */
	getAltNumber() {
	    // use constant value of ATN.INVALID_ALT_NUMBER to avoid circular dependency
	    return 0;
    }

	/**
	 * Set the outer alternative number for this context node. Default
	 * implementation does nothing to avoid backing field overhead for
	 * trees that don't need it.  Create
	 * a subclass of ParserRuleContext with backing field and set
	 * option contextSuperClass.
	 */
	setAltNumber(altNumber) { }

	getChild(i) {
		return null;
	}

	getChildCount() {
		return 0;
	}

	accept(visitor) {
		return visitor.visitChildren(this);
	}

	/**
	 * Print out a whole tree, not just a node, in LISP format
	 * (root child1 .. childN). Print just a node if this is a leaf.
	 */
	toStringTree(ruleNames, recog) {
		return Trees.toStringTree(this, ruleNames, recog);
	}

	toString(ruleNames, stop) {
		ruleNames = ruleNames || null;
		stop = stop || null;
		let p = this;
		let s = "[";
		while (p !== null && p !== stop) {
			if (ruleNames === null) {
				if (!p.isEmpty()) {
					s += p.invokingState;
				}
			} else {
				const ri = p.ruleIndex;
				const ruleName = (ri >= 0 && ri < ruleNames.length) ? ruleNames[ri]
						: "" + ri;
				s += ruleName;
			}
			if (p.parentCtx !== null && (ruleNames !== null || !p.parentCtx.isEmpty())) {
				s += " ";
			}
			p = p.parentCtx;
		}
		s += "]";
		return s;
	}
}

module.exports = RuleContext;


/***/ }),

/***/ 994:
/***/ ((module) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/**
 * A token has properties: text, type, line, character position in the line
 * (so we can ignore tabs), token channel, index, and source from which
 * we obtained this token.
 */
class Token {
	constructor() {
		this.source = null;
		this.type = null; // token type of the token
		this.channel = null; // The parser ignores everything not on DEFAULT_CHANNEL
		this.start = null; // optional; return -1 if not implemented.
		this.stop = null; // optional; return -1 if not implemented.
		this.tokenIndex = null; // from 0..n-1 of the token object in the input stream
		this.line = null; // line=1..n of the 1st character
		this.column = null; // beginning of the line at which it occurs, 0..n-1
		this._text = null; // text of the token.
	}

	getTokenSource() {
		return this.source[0];
	}

	getInputStream() {
		return this.source[1];
	}

	get text(){
		return this._text;
	}

	set text(text) {
		this._text = text;
	}
}

Token.INVALID_TYPE = 0;

/**
 * During lookahead operations, this "token" signifies we hit rule end ATN state
 * and did not follow it despite needing to.
 */
Token.EPSILON = -2;

Token.MIN_USER_TOKEN_TYPE = 1;

Token.EOF = -1;

/**
 * All tokens go to the parser (unless skip() is called in that rule)
 * on a particular "channel". The parser tunes to a particular channel
 * so that whitespace etc... can go to the parser on a "hidden" channel.
 */
Token.DEFAULT_CHANNEL = 0;

/**
 * Anything on different channel than DEFAULT_CHANNEL is not parsed
 * by parser.
 */
Token.HIDDEN_CHANNEL = 1;


class CommonToken extends Token {
	constructor(source, type, channel, start, stop) {
		super();
		this.source = source !== undefined ? source : CommonToken.EMPTY_SOURCE;
		this.type = type !== undefined ? type : null;
		this.channel = channel !== undefined ? channel : Token.DEFAULT_CHANNEL;
		this.start = start !== undefined ? start : -1;
		this.stop = stop !== undefined ? stop : -1;
		this.tokenIndex = -1;
		if (this.source[0] !== null) {
			this.line = source[0].line;
			this.column = source[0].column;
		} else {
			this.column = -1;
		}
	}

	/**
	 * Constructs a new {@link CommonToken} as a copy of another {@link Token}.
	 *
	 * <p>
	 * If {@code oldToken} is also a {@link CommonToken} instance, the newly
	 * constructed token will share a reference to the {@link //text} field and
	 * the {@link Pair} stored in {@link //source}. Otherwise, {@link //text} will
	 * be assigned the result of calling {@link //getText}, and {@link //source}
	 * will be constructed from the result of {@link Token//getTokenSource} and
	 * {@link Token//getInputStream}.</p>
	 *
	 * @param oldToken The token to copy.
	 */
	clone() {
		const t = new CommonToken(this.source, this.type, this.channel, this.start, this.stop);
		t.tokenIndex = this.tokenIndex;
		t.line = this.line;
		t.column = this.column;
		t.text = this.text;
		return t;
	}

	toString() {
		let txt = this.text;
		if (txt !== null) {
			txt = txt.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
		} else {
			txt = "<no text>";
		}
		return "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" +
				txt + "',<" + this.type + ">" +
				(this.channel > 0 ? ",channel=" + this.channel : "") + "," +
				this.line + ":" + this.column + "]";
	}

	get text(){
		if (this._text !== null) {
			return this._text;
		}
		const input = this.getInputStream();
		if (input === null) {
			return null;
		}
		const n = input.size;
		if (this.start < n && this.stop < n) {
			return input.getText(this.start, this.stop);
		} else {
			return "<EOF>";
		}
	}

	set text(text) {
		this._text = text;
	}
}

/**
 * An empty {@link Pair} which is used as the default value of
 * {@link //source} for tokens that do not have a source.
 */
CommonToken.EMPTY_SOURCE = [ null, null ];

module.exports = {
	Token,
	CommonToken
}


/***/ }),

/***/ 785:
/***/ ((module) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

function arrayToString(a) {
    return Array.isArray(a) ? ("[" + a.join(", ") + "]") : "null";
}

String.prototype.seed = String.prototype.seed || Math.round(Math.random() * Math.pow(2, 32));

String.prototype.hashCode = function () {
    const key = this.toString();
    let h1b, k1;

    const remainder = key.length & 3; // key.length % 4
    const bytes = key.length - remainder;
    let h1 = String.prototype.seed;
    const c1 = 0xcc9e2d51;
    const c2 = 0x1b873593;
    let i = 0;

    while (i < bytes) {
        k1 =
            ((key.charCodeAt(i) & 0xff)) |
            ((key.charCodeAt(++i) & 0xff) << 8) |
            ((key.charCodeAt(++i) & 0xff) << 16) |
            ((key.charCodeAt(++i) & 0xff) << 24);
        ++i;

        k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
        h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
    }

    k1 = 0;

    switch (remainder) {
        case 3:
            k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
        case 2:
            k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
        case 1:
            k1 ^= (key.charCodeAt(i) & 0xff);

            k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= k1;
    }

    h1 ^= key.length;

    h1 ^= h1 >>> 16;
    h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
    h1 ^= h1 >>> 13;
    h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
    h1 ^= h1 >>> 16;

    return h1 >>> 0;
};

function standardEqualsFunction(a, b) {
    return a ? a.equals(b) : a==b;
}

function standardHashCodeFunction(a) {
    return a ? a.hashCode() : -1;
}

class Set {
    constructor(hashFunction, equalsFunction) {
        this.data = {};
        this.hashFunction = hashFunction || standardHashCodeFunction;
        this.equalsFunction = equalsFunction || standardEqualsFunction;
    }

    add(value) {
        const hash = this.hashFunction(value);
        const key = "hash_" + hash;
        if (key in this.data) {
            const values = this.data[key];
            for (let i = 0; i < values.length; i++) {
                if (this.equalsFunction(value, values[i])) {
                    return values[i];
                }
            }
            values.push(value);
            return value;
        } else {
            this.data[key] = [value];
            return value;
        }
    }

    contains(value) {
        return this.get(value) != null;
    }

    get(value) {
        const hash = this.hashFunction(value);
        const key = "hash_" + hash;
        if (key in this.data) {
            const values = this.data[key];
            for (let i = 0; i < values.length; i++) {
                if (this.equalsFunction(value, values[i])) {
                    return values[i];
                }
            }
        }
        return null;
    }

    values() {
        let l = [];
        for (const key in this.data) {
            if (key.indexOf("hash_") === 0) {
                l = l.concat(this.data[key]);
            }
        }
        return l;
    }

    toString() {
        return arrayToString(this.values());
    }

    get length(){
        let l = 0;
        for (const key in this.data) {
            if (key.indexOf("hash_") === 0) {
                l = l + this.data[key].length;
            }
        }
        return l;
    }
}


class BitSet {
    constructor() {
        this.data = [];
    }

    add(value) {
        this.data[value] = true;
    }

    or(set) {
        const bits = this;
        Object.keys(set.data).map(function (alt) {
            bits.add(alt);
        });
    }

    remove(value) {
        delete this.data[value];
    }

    contains(value) {
        return this.data[value] === true;
    }

    values() {
        return Object.keys(this.data);
    }

    minValue() {
        return Math.min.apply(null, this.values());
    }

    hashCode() {
        const hash = new Hash();
        hash.update(this.values());
        return hash.finish();
    }

    equals(other) {
        if (!(other instanceof BitSet)) {
            return false;
        }
        return this.hashCode() === other.hashCode();
    }

    toString() {
        return "{" + this.values().join(", ") + "}";
    }

    get length(){
        return this.values().length;
    }
}


class Map {
    constructor(hashFunction, equalsFunction) {
        this.data = {};
        this.hashFunction = hashFunction || standardHashCodeFunction;
        this.equalsFunction = equalsFunction || standardEqualsFunction;
    }

    put(key, value) {
        const hashKey = "hash_" + this.hashFunction(key);
        if (hashKey in this.data) {
            const entries = this.data[hashKey];
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (this.equalsFunction(key, entry.key)) {
                    const oldValue = entry.value;
                    entry.value = value;
                    return oldValue;
                }
            }
            entries.push({key:key, value:value});
            return value;
        } else {
            this.data[hashKey] = [{key:key, value:value}];
            return value;
        }
    }

    containsKey(key) {
        const hashKey = "hash_" + this.hashFunction(key);
        if(hashKey in this.data) {
            const entries = this.data[hashKey];
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (this.equalsFunction(key, entry.key))
                    return true;
            }
        }
        return false;
    }

    get(key) {
        const hashKey = "hash_" + this.hashFunction(key);
        if(hashKey in this.data) {
            const entries = this.data[hashKey];
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (this.equalsFunction(key, entry.key))
                    return entry.value;
            }
        }
        return null;
    }

    entries() {
        let l = [];
        for (const key in this.data) {
            if (key.indexOf("hash_") === 0) {
                l = l.concat(this.data[key]);
            }
        }
        return l;
    }

    getKeys() {
        return this.entries().map(function(e) {
            return e.key;
        });
    }

    getValues() {
        return this.entries().map(function(e) {
                return e.value;
        });
    }

    toString() {
        const ss = this.entries().map(function(entry) {
            return '{' + entry.key + ':' + entry.value + '}';
        });
        return '[' + ss.join(", ") + ']';
    }

    get length(){
        let l = 0;
        for (const hashKey in this.data) {
            if (hashKey.indexOf("hash_") === 0) {
                l = l + this.data[hashKey].length;
            }
        }
        return l;
    }
}


class AltDict {
    constructor() {
        this.data = {};
    }

    get(key) {
        key = "k-" + key;
        if (key in this.data) {
            return this.data[key];
        } else {
            return null;
        }
    }

    put(key, value) {
        key = "k-" + key;
        this.data[key] = value;
    }

    values() {
        const data = this.data;
        const keys = Object.keys(this.data);
        return keys.map(function (key) {
            return data[key];
        });
    }
}


class DoubleDict {
    constructor(defaultMapCtor) {
        this.defaultMapCtor = defaultMapCtor || Map;
        this.cacheMap = new this.defaultMapCtor();
    }

    get(a, b) {
        const d = this.cacheMap.get(a) || null;
        return d === null ? null : (d.get(b) || null);
    }

    set(a, b, o) {
        let d = this.cacheMap.get(a) || null;
        if (d === null) {
            d = new this.defaultMapCtor();
            this.cacheMap.put(a, d);
        }
        d.put(b, o);
    }
}

class Hash {
    constructor() {
        this.count = 0;
        this.hash = 0;
    }

    update() {
        for(let i=0;i<arguments.length;i++) {
            const value = arguments[i];
            if (value == null)
                continue;
            if(Array.isArray(value))
                this.update.apply(this, value);
            else {
                let k = 0;
                switch (typeof(value)) {
                    case 'undefined':
                    case 'function':
                        continue;
                    case 'number':
                    case 'boolean':
                        k = value;
                        break;
                    case 'string':
                        k = value.hashCode();
                        break;
                    default:
                        if(value.updateHashCode)
                            value.updateHashCode(this);
                        else
                            console.log("No updateHashCode for " + value.toString())
                        continue;
                }
                k = k * 0xCC9E2D51;
                k = (k << 15) | (k >>> (32 - 15));
                k = k * 0x1B873593;
                this.count = this.count + 1;
                let hash = this.hash ^ k;
                hash = (hash << 13) | (hash >>> (32 - 13));
                hash = hash * 5 + 0xE6546B64;
                this.hash = hash;
            }
        }
    }

    finish() {
        let hash = this.hash ^ (this.count * 4);
        hash = hash ^ (hash >>> 16);
        hash = hash * 0x85EBCA6B;
        hash = hash ^ (hash >>> 13);
        hash = hash * 0xC2B2AE35;
        hash = hash ^ (hash >>> 16);
        return hash;
    }
}

function hashStuff() {
    const hash = new Hash();
    hash.update.apply(hash, arguments);
    return hash.finish();
}


function escapeWhitespace(s, escapeSpaces) {
    s = s.replace(/\t/g, "\\t")
         .replace(/\n/g, "\\n")
         .replace(/\r/g, "\\r");
    if (escapeSpaces) {
        s = s.replace(/ /g, "\u00B7");
    }
    return s;
}

function titleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
}

function equalArrays(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b))
        return false;
    if (a === b)
        return true;
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] === b[i])
            continue;
        if (!a[i].equals || !a[i].equals(b[i]))
            return false;
    }
    return true;
}

module.exports = {
    Hash,
    Set,
    Map,
    BitSet,
    AltDict,
    DoubleDict,
    hashStuff,
    escapeWhitespace,
    arrayToString,
    titleCase,
    equalArrays
}


/***/ }),

/***/ 641:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const LL1Analyzer = __webpack_require__(723);
const {IntervalSet} = __webpack_require__(909);
const {Token} = __webpack_require__(994);

class ATN {

    constructor(grammarType , maxTokenType) {
        /**
         * Used for runtime deserialization of ATNs from strings
         * The type of the ATN.
        */
        this.grammarType = grammarType;
        // The maximum value for any symbol recognized by a transition in the ATN.
        this.maxTokenType = maxTokenType;
        this.states = [];
        /**
         * Each subrule/rule is a decision point and we must track them so we
         * can go back later and build DFA predictors for them.  This includes
         * all the rules, subrules, optional blocks, ()+, ()* etc...
         */
        this.decisionToState = [];
        // Maps from rule index to starting state number.
        this.ruleToStartState = [];
        // Maps from rule index to stop state number.
        this.ruleToStopState = null;
        this.modeNameToStartState = {};
        /**
         * For lexer ATNs, this maps the rule index to the resulting token type.
         * For parser ATNs, this maps the rule index to the generated bypass token
         * type if the {@link ATNDeserializationOptions//isGenerateRuleBypassTransitions}
         * deserialization option was specified; otherwise, this is {@code null}
         */
        this.ruleToTokenType = null;
        /**
         * For lexer ATNs, this is an array of {@link LexerAction} objects which may
         * be referenced by action transitions in the ATN
         */
        this.lexerActions = null;
        this.modeToStartState = [];
    }

    /**
     * Compute the set of valid tokens that can occur starting in state {@code s}.
     * If {@code ctx} is null, the set of tokens will not include what can follow
     * the rule surrounding {@code s}. In other words, the set will be
     * restricted to tokens reachable staying within {@code s}'s rule
     */
    nextTokensInContext(s, ctx) {
        const anal = new LL1Analyzer(this);
        return anal.LOOK(s, null, ctx);
    }

    /**
     * Compute the set of valid tokens that can occur starting in {@code s} and
     * staying in same rule. {@link Token//EPSILON} is in set if we reach end of
     * rule
     */
    nextTokensNoContext(s) {
        if (s.nextTokenWithinRule !== null ) {
            return s.nextTokenWithinRule;
        }
        s.nextTokenWithinRule = this.nextTokensInContext(s, null);
        s.nextTokenWithinRule.readOnly = true;
        return s.nextTokenWithinRule;
    }

    nextTokens(s, ctx) {
        if ( ctx===undefined ) {
            return this.nextTokensNoContext(s);
        } else {
            return this.nextTokensInContext(s, ctx);
        }
    }

    addState(state) {
        if ( state !== null ) {
            state.atn = this;
            state.stateNumber = this.states.length;
        }
        this.states.push(state);
    }

    removeState(state) {
        this.states[state.stateNumber] = null; // just free mem, don't shift states in list
    }

    defineDecisionState(s) {
        this.decisionToState.push(s);
        s.decision = this.decisionToState.length-1;
        return s.decision;
    }

    getDecisionState(decision) {
        if (this.decisionToState.length===0) {
            return null;
        } else {
            return this.decisionToState[decision];
        }
    }

    /**
     * Computes the set of input symbols which could follow ATN state number
     * {@code stateNumber} in the specified full {@code context}. This method
     * considers the complete parser context, but does not evaluate semantic
     * predicates (i.e. all predicates encountered during the calculation are
     * assumed true). If a path in the ATN exists from the starting state to the
     * {@link RuleStopState} of the outermost context without matching any
     * symbols, {@link Token//EOF} is added to the returned set.
     *
     * <p>If {@code context} is {@code null}, it is treated as
     * {@link ParserRuleContext//EMPTY}.</p>
     *
     * @param stateNumber the ATN state number
     * @param ctx the full parse context
     *
     * @return {IntervalSet} The set of potentially valid input symbols which could follow the
     * specified state in the specified context.
     *
     * @throws IllegalArgumentException if the ATN does not contain a state with
     * number {@code stateNumber}
     */
    getExpectedTokens(stateNumber, ctx ) {
        if ( stateNumber < 0 || stateNumber >= this.states.length ) {
            throw("Invalid state number.");
        }
        const s = this.states[stateNumber];
        let following = this.nextTokens(s);
        if (!following.contains(Token.EPSILON)) {
            return following;
        }
        const expected = new IntervalSet();
        expected.addSet(following);
        expected.removeOne(Token.EPSILON);
        while (ctx !== null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
            const invokingState = this.states[ctx.invokingState];
            const rt = invokingState.transitions[0];
            following = this.nextTokens(rt.followState);
            expected.addSet(following);
            expected.removeOne(Token.EPSILON);
            ctx = ctx.parentCtx;
        }
        if (following.contains(Token.EPSILON)) {
            expected.addOne(Token.EOF);
        }
        return expected;
    }
}

ATN.INVALID_ALT_NUMBER = 0;

module.exports = ATN;


/***/ }),

/***/ 961:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {DecisionState} = __webpack_require__(290);
const {SemanticContext} = __webpack_require__(660);
const {Hash} = __webpack_require__(785);


function checkParams(params, isCfg) {
	if(params===null) {
		const result = { state:null, alt:null, context:null, semanticContext:null };
		if(isCfg) {
			result.reachesIntoOuterContext = 0;
		}
		return result;
	} else {
		const props = {};
		props.state = params.state || null;
		props.alt = (params.alt === undefined) ? null : params.alt;
		props.context = params.context || null;
		props.semanticContext = params.semanticContext || null;
		if(isCfg) {
			props.reachesIntoOuterContext = params.reachesIntoOuterContext || 0;
			props.precedenceFilterSuppressed = params.precedenceFilterSuppressed || false;
		}
		return props;
	}
}

class ATNConfig {
    /**
     * @param {Object} params A tuple: (ATN state, predicted alt, syntactic, semantic context).
     * The syntactic context is a graph-structured stack node whose
     * path(s) to the root is the rule invocation(s)
     * chain used to arrive at the state.  The semantic context is
     * the tree of semantic predicates encountered before reaching
     * an ATN state
     */
    constructor(params, config) {
        this.checkContext(params, config);
        params = checkParams(params);
        config = checkParams(config, true);
        // The ATN state associated with this configuration///
        this.state = params.state!==null ? params.state : config.state;
        // What alt (or lexer rule) is predicted by this configuration///
        this.alt = params.alt!==null ? params.alt : config.alt;
        /**
         * The stack of invoking states leading to the rule/states associated
         * with this config.  We track only those contexts pushed during
         * execution of the ATN simulator
         */
        this.context = params.context!==null ? params.context : config.context;
        this.semanticContext = params.semanticContext!==null ? params.semanticContext :
            (config.semanticContext!==null ? config.semanticContext : SemanticContext.NONE);
        // TODO: make it a boolean then
        /**
         * We cannot execute predicates dependent upon local context unless
         * we know for sure we are in the correct context. Because there is
         * no way to do this efficiently, we simply cannot evaluate
         * dependent predicates unless we are in the rule that initially
         * invokes the ATN simulator.
         * closure() tracks the depth of how far we dip into the
         * outer context: depth &gt; 0.  Note that it may not be totally
         * accurate depth since I don't ever decrement
         */
        this.reachesIntoOuterContext = config.reachesIntoOuterContext;
        this.precedenceFilterSuppressed = config.precedenceFilterSuppressed;
    }

    checkContext(params, config) {
        if((params.context===null || params.context===undefined) &&
                (config===null || config.context===null || config.context===undefined)) {
            this.context = null;
        }
    }

    hashCode() {
        const hash = new Hash();
        this.updateHashCode(hash);
        return hash.finish();
    }

    updateHashCode(hash) {
        hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext);
    }

    /**
     * An ATN configuration is equal to another if both have
     * the same state, they predict the same alternative, and
     * syntactic/semantic contexts are the same
     */
    equals(other) {
        if (this === other) {
            return true;
        } else if (! (other instanceof ATNConfig)) {
            return false;
        } else {
            return this.state.stateNumber===other.state.stateNumber &&
                this.alt===other.alt &&
                (this.context===null ? other.context===null : this.context.equals(other.context)) &&
                this.semanticContext.equals(other.semanticContext) &&
                this.precedenceFilterSuppressed===other.precedenceFilterSuppressed;
        }
    }

    hashCodeForConfigSet() {
        const hash = new Hash();
        hash.update(this.state.stateNumber, this.alt, this.semanticContext);
        return hash.finish();
    }

    equalsForConfigSet(other) {
        if (this === other) {
            return true;
        } else if (! (other instanceof ATNConfig)) {
            return false;
        } else {
            return this.state.stateNumber===other.state.stateNumber &&
                this.alt===other.alt &&
                this.semanticContext.equals(other.semanticContext);
        }
    }

    toString() {
        return "(" + this.state + "," + this.alt +
            (this.context!==null ? ",[" + this.context.toString() + "]" : "") +
            (this.semanticContext !== SemanticContext.NONE ?
                    ("," + this.semanticContext.toString())
                    : "") +
            (this.reachesIntoOuterContext>0 ?
                    (",up=" + this.reachesIntoOuterContext)
                    : "") + ")";
    }
}


class LexerATNConfig extends ATNConfig {
    constructor(params, config) {
        super(params, config);

        // This is the backing field for {@link //getLexerActionExecutor}.
        const lexerActionExecutor = params.lexerActionExecutor || null;
        this.lexerActionExecutor = lexerActionExecutor || (config!==null ? config.lexerActionExecutor : null);
        this.passedThroughNonGreedyDecision = config!==null ? this.checkNonGreedyDecision(config, this.state) : false;
        this.hashCodeForConfigSet = LexerATNConfig.prototype.hashCode;
        this.equalsForConfigSet = LexerATNConfig.prototype.equals;
        return this;
    }

    updateHashCode(hash) {
        hash.update(this.state.stateNumber, this.alt, this.context, this.semanticContext, this.passedThroughNonGreedyDecision, this.lexerActionExecutor);
    }

    equals(other) {
        return this === other ||
                (other instanceof LexerATNConfig &&
                this.passedThroughNonGreedyDecision === other.passedThroughNonGreedyDecision &&
                (this.lexerActionExecutor ? this.lexerActionExecutor.equals(other.lexerActionExecutor) : !other.lexerActionExecutor) &&
                super.equals(other));
    }

    checkNonGreedyDecision(source, target) {
        return source.passedThroughNonGreedyDecision ||
            (target instanceof DecisionState) && target.nonGreedy;
    }
}


module.exports.ATNConfig = ATNConfig;
module.exports.LexerATNConfig = LexerATNConfig;


/***/ }),

/***/ 21:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const ATN = __webpack_require__(641);
const Utils = __webpack_require__(785);
const {SemanticContext} = __webpack_require__(660);
const {merge} = __webpack_require__(259);

function hashATNConfig(c) {
	return c.hashCodeForConfigSet();
}

function equalATNConfigs(a, b) {
	if ( a===b ) {
		return true;
	} else if ( a===null || b===null ) {
		return false;
	} else
       return a.equalsForConfigSet(b);
 }

/**
 * Specialized {@link Set}{@code <}{@link ATNConfig}{@code >} that can track
 * info about the set, with support for combining similar configurations using a
 * graph-structured stack
 */
class ATNConfigSet {
	constructor(fullCtx) {
		/**
		 * The reason that we need this is because we don't want the hash map to use
		 * the standard hash code and equals. We need all configurations with the
		 * same
		 * {@code (s,i,_,semctx)} to be equal. Unfortunately, this key effectively
		 * doubles
		 * the number of objects associated with ATNConfigs. The other solution is
		 * to
		 * use a hash table that lets us specify the equals/hashcode operation.
		 * All configs but hashed by (s, i, _, pi) not including context. Wiped out
		 * when we go readonly as this set becomes a DFA state
		 */
		this.configLookup = new Utils.Set(hashATNConfig, equalATNConfigs);
		/**
		 * Indicates that this configuration set is part of a full context
		 * LL prediction. It will be used to determine how to merge $. With SLL
		 * it's a wildcard whereas it is not for LL context merge
		 */
		this.fullCtx = fullCtx === undefined ? true : fullCtx;
		/**
		 * Indicates that the set of configurations is read-only. Do not
		 * allow any code to manipulate the set; DFA states will point at
		 * the sets and they must not change. This does not protect the other
		 * fields; in particular, conflictingAlts is set after
		 * we've made this readonly
		 */
		this.readOnly = false;
		// Track the elements as they are added to the set; supports get(i)///
		this.configs = [];

		// TODO: these fields make me pretty uncomfortable but nice to pack up info
		// together, saves recomputation
		// TODO: can we track conflicts as they are added to save scanning configs
		// later?
		this.uniqueAlt = 0;
		this.conflictingAlts = null;

		/**
		 * Used in parser and lexer. In lexer, it indicates we hit a pred
		 * while computing a closure operation. Don't make a DFA state from this
		 */
		this.hasSemanticContext = false;
		this.dipsIntoOuterContext = false;

		this.cachedHashCode = -1;
	}

	/**
	 * Adding a new config means merging contexts with existing configs for
	 * {@code (s, i, pi, _)}, where {@code s} is the
	 * {@link ATNConfig//state}, {@code i} is the {@link ATNConfig//alt}, and
	 * {@code pi} is the {@link ATNConfig//semanticContext}. We use
	 * {@code (s,i,pi)} as key.
	 *
	 * <p>This method updates {@link //dipsIntoOuterContext} and
	 * {@link //hasSemanticContext} when necessary.</p>
	 */
	add(config, mergeCache) {
		if (mergeCache === undefined) {
			mergeCache = null;
		}
		if (this.readOnly) {
			throw "This set is readonly";
		}
		if (config.semanticContext !== SemanticContext.NONE) {
			this.hasSemanticContext = true;
		}
		if (config.reachesIntoOuterContext > 0) {
			this.dipsIntoOuterContext = true;
		}
		const existing = this.configLookup.add(config);
		if (existing === config) {
			this.cachedHashCode = -1;
			this.configs.push(config); // track order here
			return true;
		}
		// a previous (s,i,pi,_), merge with it and save result
		const rootIsWildcard = !this.fullCtx;
		const merged = merge(existing.context, config.context, rootIsWildcard, mergeCache);
		/**
		 * no need to check for existing.context, config.context in cache
		 * since only way to create new graphs is "call rule" and here. We
		 * cache at both places
		 */
		existing.reachesIntoOuterContext = Math.max( existing.reachesIntoOuterContext, config.reachesIntoOuterContext);
		// make sure to preserve the precedence filter suppression during the merge
		if (config.precedenceFilterSuppressed) {
			existing.precedenceFilterSuppressed = true;
		}
		existing.context = merged; // replace context; no need to alt mapping
		return true;
	}

	getStates() {
		const states = new Utils.Set();
		for (let i = 0; i < this.configs.length; i++) {
			states.add(this.configs[i].state);
		}
		return states;
	}

	getPredicates() {
		const preds = [];
		for (let i = 0; i < this.configs.length; i++) {
			const c = this.configs[i].semanticContext;
			if (c !== SemanticContext.NONE) {
				preds.push(c.semanticContext);
			}
		}
		return preds;
	}

	optimizeConfigs(interpreter) {
		if (this.readOnly) {
			throw "This set is readonly";
		}
		if (this.configLookup.length === 0) {
			return;
		}
		for (let i = 0; i < this.configs.length; i++) {
			const config = this.configs[i];
			config.context = interpreter.getCachedContext(config.context);
		}
	}

	addAll(coll) {
		for (let i = 0; i < coll.length; i++) {
			this.add(coll[i]);
		}
		return false;
	}

	equals(other) {
		return this === other ||
			(other instanceof ATNConfigSet &&
			Utils.equalArrays(this.configs, other.configs) &&
			this.fullCtx === other.fullCtx &&
			this.uniqueAlt === other.uniqueAlt &&
			this.conflictingAlts === other.conflictingAlts &&
			this.hasSemanticContext === other.hasSemanticContext &&
			this.dipsIntoOuterContext === other.dipsIntoOuterContext);
	}

	hashCode() {
		const hash = new Utils.Hash();
		hash.update(this.configs);
		return hash.finish();
	}

	updateHashCode(hash) {
		if (this.readOnly) {
			if (this.cachedHashCode === -1) {
				this.cachedHashCode = this.hashCode();
			}
			hash.update(this.cachedHashCode);
		} else {
			hash.update(this.hashCode());
		}
	}

	isEmpty() {
		return this.configs.length === 0;
	}

	contains(item) {
		if (this.configLookup === null) {
			throw "This method is not implemented for readonly sets.";
		}
		return this.configLookup.contains(item);
	}

	containsFast(item) {
		if (this.configLookup === null) {
			throw "This method is not implemented for readonly sets.";
		}
		return this.configLookup.containsFast(item);
	}

	clear() {
		if (this.readOnly) {
			throw "This set is readonly";
		}
		this.configs = [];
		this.cachedHashCode = -1;
		this.configLookup = new Utils.Set();
	}

	setReadonly(readOnly) {
		this.readOnly = readOnly;
		if (readOnly) {
			this.configLookup = null; // can't mod, no need for lookup cache
		}
	}

	toString() {
		return Utils.arrayToString(this.configs) +
			(this.hasSemanticContext ? ",hasSemanticContext=" + this.hasSemanticContext : "") +
			(this.uniqueAlt !== ATN.INVALID_ALT_NUMBER ? ",uniqueAlt=" + this.uniqueAlt : "") +
			(this.conflictingAlts !== null ? ",conflictingAlts=" + this.conflictingAlts : "") +
			(this.dipsIntoOuterContext ? ",dipsIntoOuterContext" : "");
	}

	get items(){
		return this.configs;
	}

	get length(){
		return this.configs.length;
	}
}


class OrderedATNConfigSet extends ATNConfigSet {
	constructor() {
		super();
		this.configLookup = new Utils.Set();
	}
}

module.exports = {
	ATNConfigSet,
	OrderedATNConfigSet
}


/***/ }),

/***/ 962:
/***/ ((module) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

class ATNDeserializationOptions {
	constructor(copyFrom) {
		if(copyFrom===undefined) {
			copyFrom = null;
		}
		this.readOnly = false;
		this.verifyATN = copyFrom===null ? true : copyFrom.verifyATN;
		this.generateRuleBypassTransitions = copyFrom===null ? false : copyFrom.generateRuleBypassTransitions;
	}
}

ATNDeserializationOptions.defaultOptions = new ATNDeserializationOptions();
ATNDeserializationOptions.defaultOptions.readOnly = true;

//    def __setattr__(self, key, value):
//        if key!="readOnly" and self.readOnly:
//            raise Exception("The object is read only.")
//        super(type(self), self).__setattr__(key,value)

module.exports = ATNDeserializationOptions


/***/ }),

/***/ 369:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Token} = __webpack_require__(994);
const ATN = __webpack_require__(641);
const ATNType = __webpack_require__(456);

const {
    ATNState,
    BasicState,
    DecisionState,
    BlockStartState,
    BlockEndState,
    LoopEndState,
    RuleStartState,
    RuleStopState,
    TokensStartState,
    PlusLoopbackState,
    StarLoopbackState,
    StarLoopEntryState,
    PlusBlockStartState,
    StarBlockStartState,
    BasicBlockStartState
} = __webpack_require__(290);

const {
    Transition,
    AtomTransition,
    SetTransition,
    NotSetTransition,
    RuleTransition,
    RangeTransition,
    ActionTransition,
    EpsilonTransition,
    WildcardTransition,
    PredicateTransition,
    PrecedencePredicateTransition
} = __webpack_require__(68)

const {IntervalSet} = __webpack_require__(909);
const ATNDeserializationOptions = __webpack_require__(962);

const {
    LexerActionType,
    LexerSkipAction,
    LexerChannelAction,
    LexerCustomAction,
    LexerMoreAction,
    LexerTypeAction,
    LexerPushModeAction,
    LexerPopModeAction,
    LexerModeAction,
} = __webpack_require__(294);

// This is the earliest supported serialized UUID.
// stick to serialized version for now, we don't need a UUID instance
const BASE_SERIALIZED_UUID = "AADB8D7E-AEEF-4415-AD2B-8204D6CF042E";

//
// This UUID indicates the serialized ATN contains two sets of
// IntervalSets, where the second set's values are encoded as
// 32-bit integers to support the full Unicode SMP range up to U+10FFFF.
//
const ADDED_UNICODE_SMP = "59627784-3BE5-417A-B9EB-8131A7286089";

// This list contains all of the currently supported UUIDs, ordered by when
// the feature first appeared in this branch.
const SUPPORTED_UUIDS = [ BASE_SERIALIZED_UUID, ADDED_UNICODE_SMP ];

const SERIALIZED_VERSION = 3;

// This is the current serialized UUID.
const SERIALIZED_UUID = ADDED_UNICODE_SMP;

function initArray( length, value) {
	const tmp = [];
	tmp[length-1] = value;
	return tmp.map(function(i) {return value;});
}

class ATNDeserializer {
    constructor(options) {

        if ( options=== undefined || options === null ) {
            options = ATNDeserializationOptions.defaultOptions;
        }
        this.deserializationOptions = options;
        this.stateFactories = null;
        this.actionFactories = null;
    }

    /**
     * Determines if a particular serialized representation of an ATN supports
     * a particular feature, identified by the {@link UUID} used for serializing
     * the ATN at the time the feature was first introduced.
     *
     * @param feature The {@link UUID} marking the first time the feature was
     * supported in the serialized ATN.
     * @param actualUuid The {@link UUID} of the actual serialized ATN which is
     * currently being deserialized.
     * @return {@code true} if the {@code actualUuid} value represents a
     * serialized ATN at or after the feature identified by {@code feature} was
     * introduced; otherwise, {@code false}.
    */
    isFeatureSupported(feature, actualUuid) {
        const idx1 = SUPPORTED_UUIDS.indexOf(feature);
        if (idx1<0) {
            return false;
        }
        const idx2 = SUPPORTED_UUIDS.indexOf(actualUuid);
        return idx2 >= idx1;
    }

    deserialize(data) {
        this.reset(data);
        this.checkVersion();
        this.checkUUID();
        const atn = this.readATN();
        this.readStates(atn);
        this.readRules(atn);
        this.readModes(atn);
        const sets = [];
        // First, deserialize sets with 16-bit arguments <= U+FFFF.
        this.readSets(atn, sets, this.readInt.bind(this));
        // Next, if the ATN was serialized with the Unicode SMP feature,
        // deserialize sets with 32-bit arguments <= U+10FFFF.
        if (this.isFeatureSupported(ADDED_UNICODE_SMP, this.uuid)) {
            this.readSets(atn, sets, this.readInt32.bind(this));
        }
        this.readEdges(atn, sets);
        this.readDecisions(atn);
        this.readLexerActions(atn);
        this.markPrecedenceDecisions(atn);
        this.verifyATN(atn);
        if (this.deserializationOptions.generateRuleBypassTransitions && atn.grammarType === ATNType.PARSER ) {
            this.generateRuleBypassTransitions(atn);
            // re-verify after modification
            this.verifyATN(atn);
        }
        return atn;
    }

    reset(data) {
        const adjust = function(c) {
            const v = c.charCodeAt(0);
            return v>1  ? v-2 : v + 65534;
        };
        const temp = data.split("").map(adjust);
        // don't adjust the first value since that's the version number
        temp[0] = data.charCodeAt(0);
        this.data = temp;
        this.pos = 0;
    }

    checkVersion() {
        const version = this.readInt();
        if ( version !== SERIALIZED_VERSION ) {
            throw ("Could not deserialize ATN with version " + version + " (expected " + SERIALIZED_VERSION + ").");
        }
    }

    checkUUID() {
        const uuid = this.readUUID();
        if (SUPPORTED_UUIDS.indexOf(uuid)<0) {
            throw ("Could not deserialize ATN with UUID: " + uuid +
                            " (expected " + SERIALIZED_UUID + " or a legacy UUID).", uuid, SERIALIZED_UUID);
        }
        this.uuid = uuid;
    }

    readATN() {
        const grammarType = this.readInt();
        const maxTokenType = this.readInt();
        return new ATN(grammarType, maxTokenType);
    }

    readStates(atn) {
        let j, pair, stateNumber;
        const  loopBackStateNumbers = [];
        const  endStateNumbers = [];
        const  nstates = this.readInt();
        for(let i=0; i<nstates; i++) {
            const  stype = this.readInt();
            // ignore bad type of states
            if (stype===ATNState.INVALID_TYPE) {
                atn.addState(null);
                continue;
            }
            let ruleIndex = this.readInt();
            if (ruleIndex === 0xFFFF) {
                ruleIndex = -1;
            }
            const  s = this.stateFactory(stype, ruleIndex);
            if (stype === ATNState.LOOP_END) { // special case
                const  loopBackStateNumber = this.readInt();
                loopBackStateNumbers.push([s, loopBackStateNumber]);
            } else if(s instanceof BlockStartState) {
                const  endStateNumber = this.readInt();
                endStateNumbers.push([s, endStateNumber]);
            }
            atn.addState(s);
        }
        // delay the assignment of loop back and end states until we know all the
        // state instances have been initialized
        for (j=0; j<loopBackStateNumbers.length; j++) {
            pair = loopBackStateNumbers[j];
            pair[0].loopBackState = atn.states[pair[1]];
        }

        for (j=0; j<endStateNumbers.length; j++) {
            pair = endStateNumbers[j];
            pair[0].endState = atn.states[pair[1]];
        }

        let numNonGreedyStates = this.readInt();
        for (j=0; j<numNonGreedyStates; j++) {
            stateNumber = this.readInt();
            atn.states[stateNumber].nonGreedy = true;
        }

        let numPrecedenceStates = this.readInt();
        for (j=0; j<numPrecedenceStates; j++) {
            stateNumber = this.readInt();
            atn.states[stateNumber].isPrecedenceRule = true;
        }
    }

    readRules(atn) {
        let i;
        const nrules = this.readInt();
        if (atn.grammarType === ATNType.LEXER ) {
            atn.ruleToTokenType = initArray(nrules, 0);
        }
        atn.ruleToStartState = initArray(nrules, 0);
        for (i=0; i<nrules; i++) {
            const s = this.readInt();
            atn.ruleToStartState[i] = atn.states[s];
            if ( atn.grammarType === ATNType.LEXER ) {
                let tokenType = this.readInt();
                if (tokenType === 0xFFFF) {
                    tokenType = Token.EOF;
                }
                atn.ruleToTokenType[i] = tokenType;
            }
        }
        atn.ruleToStopState = initArray(nrules, 0);
        for (i=0; i<atn.states.length; i++) {
            const state = atn.states[i];
            if (!(state instanceof RuleStopState)) {
                continue;
            }
            atn.ruleToStopState[state.ruleIndex] = state;
            atn.ruleToStartState[state.ruleIndex].stopState = state;
        }
    }

    readModes(atn) {
        const nmodes = this.readInt();
        for (let i=0; i<nmodes; i++) {
            let s = this.readInt();
            atn.modeToStartState.push(atn.states[s]);
        }
    }

    readSets(atn, sets, readUnicode) {
        const m = this.readInt();
        for (let i=0; i<m; i++) {
            const iset = new IntervalSet();
            sets.push(iset);
            const n = this.readInt();
            const containsEof = this.readInt();
            if (containsEof!==0) {
                iset.addOne(-1);
            }
            for (let j=0; j<n; j++) {
                const i1 = readUnicode();
                const i2 = readUnicode();
                iset.addRange(i1, i2);
            }
        }
    }

    readEdges(atn, sets) {
        let i, j, state, trans, target;
        const nedges = this.readInt();
        for (i=0; i<nedges; i++) {
            const src = this.readInt();
            const trg = this.readInt();
            const ttype = this.readInt();
            const arg1 = this.readInt();
            const arg2 = this.readInt();
            const arg3 = this.readInt();
            trans = this.edgeFactory(atn, ttype, src, trg, arg1, arg2, arg3, sets);
            const srcState = atn.states[src];
            srcState.addTransition(trans);
        }
        // edges for rule stop states can be derived, so they aren't serialized
        for (i=0; i<atn.states.length; i++) {
            state = atn.states[i];
            for (j=0; j<state.transitions.length; j++) {
                const t = state.transitions[j];
                if (!(t instanceof RuleTransition)) {
                    continue;
                }
                let outermostPrecedenceReturn = -1;
                if (atn.ruleToStartState[t.target.ruleIndex].isPrecedenceRule) {
                    if (t.precedence === 0) {
                        outermostPrecedenceReturn = t.target.ruleIndex;
                    }
                }

                trans = new EpsilonTransition(t.followState, outermostPrecedenceReturn);
                atn.ruleToStopState[t.target.ruleIndex].addTransition(trans);
            }
        }

        for (i=0; i<atn.states.length; i++) {
            state = atn.states[i];
            if (state instanceof BlockStartState) {
                // we need to know the end state to set its start state
                if (state.endState === null) {
                    throw ("IllegalState");
                }
                // block end states can only be associated to a single block start
                // state
                if ( state.endState.startState !== null) {
                    throw ("IllegalState");
                }
                state.endState.startState = state;
            }
            if (state instanceof PlusLoopbackState) {
                for (j=0; j<state.transitions.length; j++) {
                    target = state.transitions[j].target;
                    if (target instanceof PlusBlockStartState) {
                        target.loopBackState = state;
                    }
                }
            } else if (state instanceof StarLoopbackState) {
                for (j=0; j<state.transitions.length; j++) {
                    target = state.transitions[j].target;
                    if (target instanceof StarLoopEntryState) {
                        target.loopBackState = state;
                    }
                }
            }
        }
    }

    readDecisions(atn) {
        const ndecisions = this.readInt();
        for (let i=0; i<ndecisions; i++) {
            const s = this.readInt();
            const decState = atn.states[s];
            atn.decisionToState.push(decState);
            decState.decision = i;
        }
    }

    readLexerActions(atn) {
        if (atn.grammarType === ATNType.LEXER) {
            const count = this.readInt();
            atn.lexerActions = initArray(count, null);
            for (let i=0; i<count; i++) {
                const actionType = this.readInt();
                let data1 = this.readInt();
                if (data1 === 0xFFFF) {
                    data1 = -1;
                }
                let data2 = this.readInt();
                if (data2 === 0xFFFF) {
                    data2 = -1;
                }

                atn.lexerActions[i] = this.lexerActionFactory(actionType, data1, data2);
            }
        }
    }

    generateRuleBypassTransitions(atn) {
        let i;
        const count = atn.ruleToStartState.length;
        for(i=0; i<count; i++) {
            atn.ruleToTokenType[i] = atn.maxTokenType + i + 1;
        }
        for(i=0; i<count; i++) {
            this.generateRuleBypassTransition(atn, i);
        }
    }

    generateRuleBypassTransition(atn, idx) {
        let i, state;
        const bypassStart = new BasicBlockStartState();
        bypassStart.ruleIndex = idx;
        atn.addState(bypassStart);

        const bypassStop = new BlockEndState();
        bypassStop.ruleIndex = idx;
        atn.addState(bypassStop);

        bypassStart.endState = bypassStop;
        atn.defineDecisionState(bypassStart);

        bypassStop.startState = bypassStart;

        let excludeTransition = null;
        let endState = null;

        if (atn.ruleToStartState[idx].isPrecedenceRule) {
            // wrap from the beginning of the rule to the StarLoopEntryState
            endState = null;
            for(i=0; i<atn.states.length; i++) {
                state = atn.states[i];
                if (this.stateIsEndStateFor(state, idx)) {
                    endState = state;
                    excludeTransition = state.loopBackState.transitions[0];
                    break;
                }
            }
            if (excludeTransition === null) {
                throw ("Couldn't identify final state of the precedence rule prefix section.");
            }
        } else {
            endState = atn.ruleToStopState[idx];
        }

        // all non-excluded transitions that currently target end state need to
        // target blockEnd instead
        for(i=0; i<atn.states.length; i++) {
            state = atn.states[i];
            for(let j=0; j<state.transitions.length; j++) {
                const transition = state.transitions[j];
                if (transition === excludeTransition) {
                    continue;
                }
                if (transition.target === endState) {
                    transition.target = bypassStop;
                }
            }
        }

        // all transitions leaving the rule start state need to leave blockStart
        // instead
        const ruleToStartState = atn.ruleToStartState[idx];
        const count = ruleToStartState.transitions.length;
        while ( count > 0) {
            bypassStart.addTransition(ruleToStartState.transitions[count-1]);
            ruleToStartState.transitions = ruleToStartState.transitions.slice(-1);
        }
        // link the new states
        atn.ruleToStartState[idx].addTransition(new EpsilonTransition(bypassStart));
        bypassStop.addTransition(new EpsilonTransition(endState));

        const matchState = new BasicState();
        atn.addState(matchState);
        matchState.addTransition(new AtomTransition(bypassStop, atn.ruleToTokenType[idx]));
        bypassStart.addTransition(new EpsilonTransition(matchState));
    }

    stateIsEndStateFor(state, idx) {
        if ( state.ruleIndex !== idx) {
            return null;
        }
        if (!( state instanceof StarLoopEntryState)) {
            return null;
        }
        const maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
        if (!( maybeLoopEndState instanceof LoopEndState)) {
            return null;
        }
        if (maybeLoopEndState.epsilonOnlyTransitions &&
            (maybeLoopEndState.transitions[0].target instanceof RuleStopState)) {
            return state;
        } else {
            return null;
        }
    }

    /**
     * Analyze the {@link StarLoopEntryState} states in the specified ATN to set
     * the {@link StarLoopEntryState//isPrecedenceDecision} field to the
     * correct value.
     * @param atn The ATN.
     */
    markPrecedenceDecisions(atn) {
        for(let i=0; i<atn.states.length; i++) {
            const state = atn.states[i];
            if (!( state instanceof StarLoopEntryState)) {
                continue;
            }
            // We analyze the ATN to determine if this ATN decision state is the
            // decision for the closure block that determines whether a
            // precedence rule should continue or complete.
            if ( atn.ruleToStartState[state.ruleIndex].isPrecedenceRule) {
                const maybeLoopEndState = state.transitions[state.transitions.length - 1].target;
                if (maybeLoopEndState instanceof LoopEndState) {
                    if ( maybeLoopEndState.epsilonOnlyTransitions &&
                            (maybeLoopEndState.transitions[0].target instanceof RuleStopState)) {
                        state.isPrecedenceDecision = true;
                    }
                }
            }
        }
    }

    verifyATN(atn) {
        if (!this.deserializationOptions.verifyATN) {
            return;
        }
        // verify assumptions
        for(let i=0; i<atn.states.length; i++) {
            const state = atn.states[i];
            if (state === null) {
                continue;
            }
            this.checkCondition(state.epsilonOnlyTransitions || state.transitions.length <= 1);
            if (state instanceof PlusBlockStartState) {
                this.checkCondition(state.loopBackState !== null);
            } else  if (state instanceof StarLoopEntryState) {
                this.checkCondition(state.loopBackState !== null);
                this.checkCondition(state.transitions.length === 2);
                if (state.transitions[0].target instanceof StarBlockStartState) {
                    this.checkCondition(state.transitions[1].target instanceof LoopEndState);
                    this.checkCondition(!state.nonGreedy);
                } else if (state.transitions[0].target instanceof LoopEndState) {
                    this.checkCondition(state.transitions[1].target instanceof StarBlockStartState);
                    this.checkCondition(state.nonGreedy);
                } else {
                    throw("IllegalState");
                }
            } else if (state instanceof StarLoopbackState) {
                this.checkCondition(state.transitions.length === 1);
                this.checkCondition(state.transitions[0].target instanceof StarLoopEntryState);
            } else if (state instanceof LoopEndState) {
                this.checkCondition(state.loopBackState !== null);
            } else if (state instanceof RuleStartState) {
                this.checkCondition(state.stopState !== null);
            } else if (state instanceof BlockStartState) {
                this.checkCondition(state.endState !== null);
            } else if (state instanceof BlockEndState) {
                this.checkCondition(state.startState !== null);
            } else if (state instanceof DecisionState) {
                this.checkCondition(state.transitions.length <= 1 || state.decision >= 0);
            } else {
                this.checkCondition(state.transitions.length <= 1 || (state instanceof RuleStopState));
            }
        }
    }

    checkCondition(condition, message) {
        if (!condition) {
            if (message === undefined || message===null) {
                message = "IllegalState";
            }
            throw (message);
        }
    }

    readInt() {
        return this.data[this.pos++];
    }

    readInt32() {
        const low = this.readInt();
        const high = this.readInt();
        return low | (high << 16);
    }

    readLong() {
        const low = this.readInt32();
        const high = this.readInt32();
        return (low & 0x00000000FFFFFFFF) | (high << 32);
    }

    readUUID() {
        const bb = [];
        for(let i=7;i>=0;i--) {
            const int = this.readInt();
            /* jshint bitwise: false */
            bb[(2*i)+1] = int & 0xFF;
            bb[2*i] = (int >> 8) & 0xFF;
        }
        return byteToHex[bb[0]] + byteToHex[bb[1]] +
        byteToHex[bb[2]] + byteToHex[bb[3]] + '-' +
        byteToHex[bb[4]] + byteToHex[bb[5]] + '-' +
        byteToHex[bb[6]] + byteToHex[bb[7]] + '-' +
        byteToHex[bb[8]] + byteToHex[bb[9]] + '-' +
        byteToHex[bb[10]] + byteToHex[bb[11]] +
        byteToHex[bb[12]] + byteToHex[bb[13]] +
        byteToHex[bb[14]] + byteToHex[bb[15]];
    }

    edgeFactory(atn, type, src, trg, arg1, arg2, arg3, sets) {
        const target = atn.states[trg];
        switch(type) {
        case Transition.EPSILON:
            return new EpsilonTransition(target);
        case Transition.RANGE:
            return arg3 !== 0 ? new RangeTransition(target, Token.EOF, arg2) : new RangeTransition(target, arg1, arg2);
        case Transition.RULE:
            return new RuleTransition(atn.states[arg1], arg2, arg3, target);
        case Transition.PREDICATE:
            return new PredicateTransition(target, arg1, arg2, arg3 !== 0);
        case Transition.PRECEDENCE:
            return new PrecedencePredicateTransition(target, arg1);
        case Transition.ATOM:
            return arg3 !== 0 ? new AtomTransition(target, Token.EOF) : new AtomTransition(target, arg1);
        case Transition.ACTION:
            return new ActionTransition(target, arg1, arg2, arg3 !== 0);
        case Transition.SET:
            return new SetTransition(target, sets[arg1]);
        case Transition.NOT_SET:
            return new NotSetTransition(target, sets[arg1]);
        case Transition.WILDCARD:
            return new WildcardTransition(target);
        default:
            throw "The specified transition type: " + type + " is not valid.";
        }
    }

    stateFactory(type, ruleIndex) {
        if (this.stateFactories === null) {
            const sf = [];
            sf[ATNState.INVALID_TYPE] = null;
            sf[ATNState.BASIC] = () => new BasicState();
            sf[ATNState.RULE_START] = () => new RuleStartState();
            sf[ATNState.BLOCK_START] = () => new BasicBlockStartState();
            sf[ATNState.PLUS_BLOCK_START] = () => new PlusBlockStartState();
            sf[ATNState.STAR_BLOCK_START] = () => new StarBlockStartState();
            sf[ATNState.TOKEN_START] = () => new TokensStartState();
            sf[ATNState.RULE_STOP] = () => new RuleStopState();
            sf[ATNState.BLOCK_END] = () => new BlockEndState();
            sf[ATNState.STAR_LOOP_BACK] = () => new StarLoopbackState();
            sf[ATNState.STAR_LOOP_ENTRY] = () => new StarLoopEntryState();
            sf[ATNState.PLUS_LOOP_BACK] = () => new PlusLoopbackState();
            sf[ATNState.LOOP_END] = () => new LoopEndState();
            this.stateFactories = sf;
        }
        if (type>this.stateFactories.length || this.stateFactories[type] === null) {
            throw("The specified state type " + type + " is not valid.");
        } else {
            const s = this.stateFactories[type]();
            if (s!==null) {
                s.ruleIndex = ruleIndex;
                return s;
            }
        }
    }

    lexerActionFactory(type, data1, data2) {
        if (this.actionFactories === null) {
            const af = [];
            af[LexerActionType.CHANNEL] = (data1, data2) => new LexerChannelAction(data1);
            af[LexerActionType.CUSTOM] = (data1, data2) => new LexerCustomAction(data1, data2);
            af[LexerActionType.MODE] = (data1, data2) => new LexerModeAction(data1);
            af[LexerActionType.MORE] = (data1, data2) => LexerMoreAction.INSTANCE;
            af[LexerActionType.POP_MODE] = (data1, data2) => LexerPopModeAction.INSTANCE;
            af[LexerActionType.PUSH_MODE] = (data1, data2) => new LexerPushModeAction(data1);
            af[LexerActionType.SKIP] = (data1, data2) => LexerSkipAction.INSTANCE;
            af[LexerActionType.TYPE] = (data1, data2) => new LexerTypeAction(data1);
            this.actionFactories = af;
        }
        if (type>this.actionFactories.length || this.actionFactories[type] === null) {
            throw("The specified lexer action type " + type + " is not valid.");
        } else {
            return this.actionFactories[type](data1, data2);
        }
    }
}

function createByteToHex() {
	const bth = [];
	for (let i = 0; i < 256; i++) {
		bth[i] = (i + 0x100).toString(16).substr(1).toUpperCase();
	}
	return bth;
}

const byteToHex = createByteToHex();


module.exports = ATNDeserializer;


/***/ }),

/***/ 380:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {DFAState} = __webpack_require__(254);
const {ATNConfigSet} = __webpack_require__(21);
const {getCachedPredictionContext} = __webpack_require__(259);
const {Map} = __webpack_require__(785);

class ATNSimulator {
    constructor(atn, sharedContextCache) {
        /**
         * The context cache maps all PredictionContext objects that are ==
         * to a single cached copy. This cache is shared across all contexts
         * in all ATNConfigs in all DFA states.  We rebuild each ATNConfigSet
         * to use only cached nodes/graphs in addDFAState(). We don't want to
         * fill this during closure() since there are lots of contexts that
         * pop up but are not used ever again. It also greatly slows down closure().
         *
         * <p>This cache makes a huge difference in memory and a little bit in speed.
         * For the Java grammar on java.*, it dropped the memory requirements
         * at the end from 25M to 16M. We don't store any of the full context
         * graphs in the DFA because they are limited to local context only,
         * but apparently there's a lot of repetition there as well. We optimize
         * the config contexts before storing the config set in the DFA states
         * by literally rebuilding them with cached subgraphs only.</p>
         *
         * <p>I tried a cache for use during closure operations, that was
         * whacked after each adaptivePredict(). It cost a little bit
         * more time I think and doesn't save on the overall footprint
         * so it's not worth the complexity.</p>
         */
        this.atn = atn;
        this.sharedContextCache = sharedContextCache;
        return this;
    }

    getCachedContext(context) {
        if (this.sharedContextCache ===null) {
            return context;
        }
        const visited = new Map();
        return getCachedPredictionContext(context, this.sharedContextCache, visited);
    }
}

// Must distinguish between missing edge and edge we know leads nowhere///
ATNSimulator.ERROR = new DFAState(0x7FFFFFFF, new ATNConfigSet());


module.exports = ATNSimulator;


/***/ }),

/***/ 290:
/***/ ((module) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const INITIAL_NUM_TRANSITIONS = 4;

/**
 * The following images show the relation of states and
 * {@link ATNState//transitions} for various grammar constructs.
 *
 * <ul>
 *
 * <li>Solid edges marked with an &//0949; indicate a required
 * {@link EpsilonTransition}.</li>
 *
 * <li>Dashed edges indicate locations where any transition derived from
 * {@link Transition} might appear.</li>
 *
 * <li>Dashed nodes are place holders for either a sequence of linked
 * {@link BasicState} states or the inclusion of a block representing a nested
 * construct in one of the forms below.</li>
 *
 * <li>Nodes showing multiple outgoing alternatives with a {@code ...} support
 * any number of alternatives (one or more). Nodes without the {@code ...} only
 * support the exact number of alternatives shown in the diagram.</li>
 *
 * </ul>
 *
 * <h2>Basic Blocks</h2>
 *
 * <h3>Rule</h3>
 *
 * <embed src="images/Rule.svg" type="image/svg+xml"/>
 *
 * <h3>Block of 1 or more alternatives</h3>
 *
 * <embed src="images/Block.svg" type="image/svg+xml"/>
 *
 * <h2>Greedy Loops</h2>
 *
 * <h3>Greedy Closure: {@code (...)*}</h3>
 *
 * <embed src="images/ClosureGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Greedy Positive Closure: {@code (...)+}</h3>
 *
 * <embed src="images/PositiveClosureGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Greedy Optional: {@code (...)?}</h3>
 *
 * <embed src="images/OptionalGreedy.svg" type="image/svg+xml"/>
 *
 * <h2>Non-Greedy Loops</h2>
 *
 * <h3>Non-Greedy Closure: {@code (...)*?}</h3>
 *
 * <embed src="images/ClosureNonGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Non-Greedy Positive Closure: {@code (...)+?}</h3>
 *
 * <embed src="images/PositiveClosureNonGreedy.svg" type="image/svg+xml"/>
 *
 * <h3>Non-Greedy Optional: {@code (...)??}</h3>
 *
 * <embed src="images/OptionalNonGreedy.svg" type="image/svg+xml"/>
 */
class ATNState {
    constructor() {
        // Which ATN are we in?
        this.atn = null;
        this.stateNumber = ATNState.INVALID_STATE_NUMBER;
        this.stateType = null;
        this.ruleIndex = 0; // at runtime, we don't have Rule objects
        this.epsilonOnlyTransitions = false;
        // Track the transitions emanating from this ATN state.
        this.transitions = [];
        // Used to cache lookahead during parsing, not used during construction
        this.nextTokenWithinRule = null;
    }

    toString() {
        return this.stateNumber;
    }

    equals(other) {
        if (other instanceof ATNState) {
            return this.stateNumber===other.stateNumber;
        } else {
            return false;
        }
    }

    isNonGreedyExitState() {
        return false;
    }

    addTransition(trans, index) {
        if(index===undefined) {
            index = -1;
        }
        if (this.transitions.length===0) {
            this.epsilonOnlyTransitions = trans.isEpsilon;
        } else if(this.epsilonOnlyTransitions !== trans.isEpsilon) {
            this.epsilonOnlyTransitions = false;
        }
        if (index===-1) {
            this.transitions.push(trans);
        } else {
            this.transitions.splice(index, 1, trans);
        }
    }
}

// constants for serialization
ATNState.INVALID_TYPE = 0;
ATNState.BASIC = 1;
ATNState.RULE_START = 2;
ATNState.BLOCK_START = 3;
ATNState.PLUS_BLOCK_START = 4;
ATNState.STAR_BLOCK_START = 5;
ATNState.TOKEN_START = 6;
ATNState.RULE_STOP = 7;
ATNState.BLOCK_END = 8;
ATNState.STAR_LOOP_BACK = 9;
ATNState.STAR_LOOP_ENTRY = 10;
ATNState.PLUS_LOOP_BACK = 11;
ATNState.LOOP_END = 12;

ATNState.serializationNames = [
            "INVALID",
            "BASIC",
            "RULE_START",
            "BLOCK_START",
            "PLUS_BLOCK_START",
            "STAR_BLOCK_START",
            "TOKEN_START",
            "RULE_STOP",
            "BLOCK_END",
            "STAR_LOOP_BACK",
            "STAR_LOOP_ENTRY",
            "PLUS_LOOP_BACK",
            "LOOP_END" ];

ATNState.INVALID_STATE_NUMBER = -1;


class BasicState extends ATNState {
    constructor() {
        super();
        this.stateType = ATNState.BASIC;
    }
}

class DecisionState extends ATNState {
    constructor() {
        super();
        this.decision = -1;
        this.nonGreedy = false;
        return this;
    }
}

/**
 *  The start of a regular {@code (...)} block
 */
class BlockStartState extends DecisionState {
    constructor() {
        super();
        this.endState = null;
        return this;
    }
}

class BasicBlockStartState extends BlockStartState {
    constructor() {
        super();
        this.stateType = ATNState.BLOCK_START;
        return this;
    }
}

/**
 * Terminal node of a simple {@code (a|b|c)} block
 */
class BlockEndState extends ATNState {
    constructor() {
        super();
        this.stateType = ATNState.BLOCK_END;
        this.startState = null;
        return this;
    }
}

/**
 * The last node in the ATN for a rule, unless that rule is the start symbol.
 * In that case, there is one transition to EOF. Later, we might encode
 * references to all calls to this rule to compute FOLLOW sets for
 * error handling
 */
class RuleStopState extends ATNState {
    constructor() {
        super();
        this.stateType = ATNState.RULE_STOP;
        return this;
    }
}

class RuleStartState extends ATNState {
    constructor() {
        super();
        this.stateType = ATNState.RULE_START;
        this.stopState = null;
        this.isPrecedenceRule = false;
        return this;
    }
}

/**
 * Decision state for {@code A+} and {@code (A|B)+}.  It has two transitions:
 * one to the loop back to start of the block and one to exit.
 */
class PlusLoopbackState extends DecisionState {
    constructor() {
        super();
        this.stateType = ATNState.PLUS_LOOP_BACK;
        return this;
    }
}

/**
 * Start of {@code (A|B|...)+} loop. Technically a decision state, but
 * we don't use for code generation; somebody might need it, so I'm defining
 * it for completeness. In reality, the {@link PlusLoopbackState} node is the
 * real decision-making note for {@code A+}
 */
class PlusBlockStartState extends BlockStartState {
    constructor() {
        super();
        this.stateType = ATNState.PLUS_BLOCK_START;
        this.loopBackState = null;
        return this;
    }
}

/**
 * The block that begins a closure loop
 */
class StarBlockStartState extends BlockStartState {
    constructor() {
        super();
        this.stateType = ATNState.STAR_BLOCK_START;
        return this;
    }
}

class StarLoopbackState extends ATNState {
    constructor() {
        super();
        this.stateType = ATNState.STAR_LOOP_BACK;
        return this;
    }
}

class StarLoopEntryState extends DecisionState {
    constructor() {
        super();
        this.stateType = ATNState.STAR_LOOP_ENTRY;
        this.loopBackState = null;
        // Indicates whether this state can benefit from a precedence DFA during SLL decision making.
        this.isPrecedenceDecision = null;
        return this;
    }
}

/**
 * Mark the end of a * or + loop
 */
class LoopEndState extends ATNState {
    constructor() {
        super();
        this.stateType = ATNState.LOOP_END;
        this.loopBackState = null;
        return this;
    }
}

/**
 * The Tokens rule start state linking to each lexer rule start state
 */
class TokensStartState extends DecisionState {
    constructor() {
        super();
        this.stateType = ATNState.TOKEN_START;
        return this;
    }
}

module.exports = {
    ATNState,
    BasicState,
    DecisionState,
    BlockStartState,
    BlockEndState,
    LoopEndState,
    RuleStartState,
    RuleStopState,
    TokensStartState,
    PlusLoopbackState,
    StarLoopbackState,
    StarLoopEntryState,
    PlusBlockStartState,
    StarBlockStartState,
    BasicBlockStartState
}


/***/ }),

/***/ 456:
/***/ ((module) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/**
 * Represents the type of recognizer an ATN applies to
 */
module.exports = {
    LEXER: 0,
    PARSER: 1
};



/***/ }),

/***/ 205:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Token} = __webpack_require__(994);
const Lexer = __webpack_require__(126);
const ATN = __webpack_require__(641);
const ATNSimulator = __webpack_require__(380);
const {DFAState} = __webpack_require__(254);
const {OrderedATNConfigSet} = __webpack_require__(21);
const {PredictionContext} = __webpack_require__(259);
const {SingletonPredictionContext} = __webpack_require__(259);
const {RuleStopState} = __webpack_require__(290);
const {LexerATNConfig} = __webpack_require__(961);
const {Transition} = __webpack_require__(68);
const LexerActionExecutor = __webpack_require__(366);
const {LexerNoViableAltException} = __webpack_require__(337);

function resetSimState(sim) {
	sim.index = -1;
	sim.line = 0;
	sim.column = -1;
	sim.dfaState = null;
}

class SimState {
	constructor() {
		resetSimState(this);
	}

	reset() {
		resetSimState(this);
	}
}

class LexerATNSimulator extends ATNSimulator {
	/**
	 * When we hit an accept state in either the DFA or the ATN, we
	 * have to notify the character stream to start buffering characters
	 * via {@link IntStream//mark} and record the current state. The current sim state
	 * includes the current index into the input, the current line,
	 * and current character position in that line. Note that the Lexer is
	 * tracking the starting line and characterization of the token. These
	 * variables track the "state" of the simulator when it hits an accept state.
	 *
	 * <p>We track these variables separately for the DFA and ATN simulation
	 * because the DFA simulation often has to fail over to the ATN
	 * simulation. If the ATN simulation fails, we need the DFA to fall
	 * back to its previously accepted state, if any. If the ATN succeeds,
	 * then the ATN does the accept and the DFA simulator that invoked it
	 * can simply return the predicted token type.</p>
	 */
	constructor(recog, atn, decisionToDFA, sharedContextCache) {
		super(atn, sharedContextCache);
		this.decisionToDFA = decisionToDFA;
		this.recog = recog;
		/**
		 * The current token's starting index into the character stream.
		 * Shared across DFA to ATN simulation in case the ATN fails and the
		 * DFA did not have a previous accept state. In this case, we use the
		 * ATN-generated exception object
		 */
		this.startIndex = -1;
		// line number 1..n within the input///
		this.line = 1;
		/**
		 * The index of the character relative to the beginning of the line
		 * 0..n-1
		 */
		this.column = 0;
		this.mode = Lexer.DEFAULT_MODE;
		/**
		 * Used during DFA/ATN exec to record the most recent accept configuration
		 * info
		 */
		this.prevAccept = new SimState();
	}

	copyState(simulator) {
		this.column = simulator.column;
		this.line = simulator.line;
		this.mode = simulator.mode;
		this.startIndex = simulator.startIndex;
	}

	match(input, mode) {
		this.match_calls += 1;
		this.mode = mode;
		const mark = input.mark();
		try {
			this.startIndex = input.index;
			this.prevAccept.reset();
			const dfa = this.decisionToDFA[mode];
			if (dfa.s0 === null) {
				return this.matchATN(input);
			} else {
				return this.execATN(input, dfa.s0);
			}
		} finally {
			input.release(mark);
		}
	}

	reset() {
		this.prevAccept.reset();
		this.startIndex = -1;
		this.line = 1;
		this.column = 0;
		this.mode = Lexer.DEFAULT_MODE;
	}

	matchATN(input) {
		const startState = this.atn.modeToStartState[this.mode];

		if (LexerATNSimulator.debug) {
			console.log("matchATN mode " + this.mode + " start: " + startState);
		}
		const old_mode = this.mode;
		const s0_closure = this.computeStartState(input, startState);
		const suppressEdge = s0_closure.hasSemanticContext;
		s0_closure.hasSemanticContext = false;

		const next = this.addDFAState(s0_closure);
		if (!suppressEdge) {
			this.decisionToDFA[this.mode].s0 = next;
		}

		const predict = this.execATN(input, next);

		if (LexerATNSimulator.debug) {
			console.log("DFA after matchATN: " + this.decisionToDFA[old_mode].toLexerString());
		}
		return predict;
	}

	execATN(input, ds0) {
		if (LexerATNSimulator.debug) {
			console.log("start state closure=" + ds0.configs);
		}
		if (ds0.isAcceptState) {
			// allow zero-length tokens
			this.captureSimState(this.prevAccept, input, ds0);
		}
		let t = input.LA(1);
		let s = ds0; // s is current/from DFA state

		while (true) { // while more work
			if (LexerATNSimulator.debug) {
				console.log("execATN loop starting closure: " + s.configs);
			}

			/**
			 * As we move src->trg, src->trg, we keep track of the previous trg to
			 * avoid looking up the DFA state again, which is expensive.
			 * If the previous target was already part of the DFA, we might
			 * be able to avoid doing a reach operation upon t. If s!=null,
			 * it means that semantic predicates didn't prevent us from
			 * creating a DFA state. Once we know s!=null, we check to see if
			 * the DFA state has an edge already for t. If so, we can just reuse
			 * it's configuration set; there's no point in re-computing it.
			 * This is kind of like doing DFA simulation within the ATN
			 * simulation because DFA simulation is really just a way to avoid
			 * computing reach/closure sets. Technically, once we know that
			 * we have a previously added DFA state, we could jump over to
			 * the DFA simulator. But, that would mean popping back and forth
			 * a lot and making things more complicated algorithmically.
			 * This optimization makes a lot of sense for loops within DFA.
			 * A character will take us back to an existing DFA state
			 * that already has lots of edges out of it. e.g., .* in comments.
			 * print("Target for:" + str(s) + " and:" + str(t))
			 */
			let target = this.getExistingTargetState(s, t);
			// print("Existing:" + str(target))
			if (target === null) {
				target = this.computeTargetState(input, s, t);
				// print("Computed:" + str(target))
			}
			if (target === ATNSimulator.ERROR) {
				break;
			}
			// If this is a consumable input element, make sure to consume before
			// capturing the accept state so the input index, line, and char
			// position accurately reflect the state of the interpreter at the
			// end of the token.
			if (t !== Token.EOF) {
				this.consume(input);
			}
			if (target.isAcceptState) {
				this.captureSimState(this.prevAccept, input, target);
				if (t === Token.EOF) {
					break;
				}
			}
			t = input.LA(1);
			s = target; // flip; current DFA target becomes new src/from state
		}
		return this.failOrAccept(this.prevAccept, input, s.configs, t);
	}

	/**
	 * Get an existing target state for an edge in the DFA. If the target state
	 * for the edge has not yet been computed or is otherwise not available,
	 * this method returns {@code null}.
	 *
	 * @param s The current DFA state
	 * @param t The next input symbol
	 * @return The existing target DFA state for the given input symbol
	 * {@code t}, or {@code null} if the target state for this edge is not
	 * already cached
	 */
	getExistingTargetState(s, t) {
		if (s.edges === null || t < LexerATNSimulator.MIN_DFA_EDGE || t > LexerATNSimulator.MAX_DFA_EDGE) {
			return null;
		}

		let target = s.edges[t - LexerATNSimulator.MIN_DFA_EDGE];
		if(target===undefined) {
			target = null;
		}
		if (LexerATNSimulator.debug && target !== null) {
			console.log("reuse state " + s.stateNumber + " edge to " + target.stateNumber);
		}
		return target;
	}

	/**
	 * Compute a target state for an edge in the DFA, and attempt to add the
	 * computed state and corresponding edge to the DFA.
	 *
	 * @param input The input stream
	 * @param s The current DFA state
	 * @param t The next input symbol
	 *
	 * @return The computed target DFA state for the given input symbol
	 * {@code t}. If {@code t} does not lead to a valid DFA state, this method
	 * returns {@link //ERROR}.
	 */
	computeTargetState(input, s, t) {
		const reach = new OrderedATNConfigSet();
		// if we don't find an existing DFA state
		// Fill reach starting from closure, following t transitions
		this.getReachableConfigSet(input, s.configs, reach, t);

		if (reach.items.length === 0) { // we got nowhere on t from s
			if (!reach.hasSemanticContext) {
				// we got nowhere on t, don't throw out this knowledge; it'd
				// cause a failover from DFA later.
				this.addDFAEdge(s, t, ATNSimulator.ERROR);
			}
			// stop when we can't match any more char
			return ATNSimulator.ERROR;
		}
		// Add an edge from s to target DFA found/created for reach
		return this.addDFAEdge(s, t, null, reach);
	}

	failOrAccept(prevAccept, input, reach, t) {
		if (this.prevAccept.dfaState !== null) {
			const lexerActionExecutor = prevAccept.dfaState.lexerActionExecutor;
			this.accept(input, lexerActionExecutor, this.startIndex,
					prevAccept.index, prevAccept.line, prevAccept.column);
			return prevAccept.dfaState.prediction;
		} else {
			// if no accept and EOF is first char, return EOF
			if (t === Token.EOF && input.index === this.startIndex) {
				return Token.EOF;
			}
			throw new LexerNoViableAltException(this.recog, input, this.startIndex, reach);
		}
	}

	/**
	 * Given a starting configuration set, figure out all ATN configurations
	 * we can reach upon input {@code t}. Parameter {@code reach} is a return
	 * parameter.
	 */
	getReachableConfigSet(input, closure,
			reach, t) {
		// this is used to skip processing for configs which have a lower priority
		// than a config that already reached an accept state for the same rule
		let skipAlt = ATN.INVALID_ALT_NUMBER;
		for (let i = 0; i < closure.items.length; i++) {
			const cfg = closure.items[i];
			const currentAltReachedAcceptState = (cfg.alt === skipAlt);
			if (currentAltReachedAcceptState && cfg.passedThroughNonGreedyDecision) {
				continue;
			}
			if (LexerATNSimulator.debug) {
				console.log("testing %s at %s\n", this.getTokenName(t), cfg
						.toString(this.recog, true));
			}
			for (let j = 0; j < cfg.state.transitions.length; j++) {
				const trans = cfg.state.transitions[j]; // for each transition
				const target = this.getReachableTarget(trans, t);
				if (target !== null) {
					let lexerActionExecutor = cfg.lexerActionExecutor;
					if (lexerActionExecutor !== null) {
						lexerActionExecutor = lexerActionExecutor.fixOffsetBeforeMatch(input.index - this.startIndex);
					}
					const treatEofAsEpsilon = (t === Token.EOF);
					const config = new LexerATNConfig({state:target, lexerActionExecutor:lexerActionExecutor}, cfg);
					if (this.closure(input, config, reach,
							currentAltReachedAcceptState, true, treatEofAsEpsilon)) {
						// any remaining configs for this alt have a lower priority
						// than the one that just reached an accept state.
						skipAlt = cfg.alt;
					}
				}
			}
		}
	}

	accept(input, lexerActionExecutor,
			   startIndex, index, line, charPos) {
		   if (LexerATNSimulator.debug) {
			   console.log("ACTION %s\n", lexerActionExecutor);
		   }
		   // seek to after last char in token
		   input.seek(index);
		   this.line = line;
		   this.column = charPos;
		   if (lexerActionExecutor !== null && this.recog !== null) {
			   lexerActionExecutor.execute(this.recog, input, startIndex);
		   }
	   }

	getReachableTarget(trans, t) {
		if (trans.matches(t, 0, Lexer.MAX_CHAR_VALUE)) {
			return trans.target;
		} else {
			return null;
		}
	}

	computeStartState(input, p) {
		const initialContext = PredictionContext.EMPTY;
		const configs = new OrderedATNConfigSet();
		for (let i = 0; i < p.transitions.length; i++) {
			const target = p.transitions[i].target;
			const cfg = new LexerATNConfig({state:target, alt:i+1, context:initialContext}, null);
			this.closure(input, cfg, configs, false, false, false);
		}
		return configs;
	}

	/**
	 * Since the alternatives within any lexer decision are ordered by
	 * preference, this method stops pursuing the closure as soon as an accept
	 * state is reached. After the first accept state is reached by depth-first
	 * search from {@code config}, all other (potentially reachable) states for
	 * this rule would have a lower priority.
	 *
	 * @return {Boolean} {@code true} if an accept state is reached, otherwise
	 * {@code false}.
	 */
	closure(input, config, configs,
			currentAltReachedAcceptState, speculative, treatEofAsEpsilon) {
		let cfg = null;
		if (LexerATNSimulator.debug) {
			console.log("closure(" + config.toString(this.recog, true) + ")");
		}
		if (config.state instanceof RuleStopState) {
			if (LexerATNSimulator.debug) {
				if (this.recog !== null) {
					console.log("closure at %s rule stop %s\n", this.recog.ruleNames[config.state.ruleIndex], config);
				} else {
					console.log("closure at rule stop %s\n", config);
				}
			}
			if (config.context === null || config.context.hasEmptyPath()) {
				if (config.context === null || config.context.isEmpty()) {
					configs.add(config);
					return true;
				} else {
					configs.add(new LexerATNConfig({ state:config.state, context:PredictionContext.EMPTY}, config));
					currentAltReachedAcceptState = true;
				}
			}
			if (config.context !== null && !config.context.isEmpty()) {
				for (let i = 0; i < config.context.length; i++) {
					if (config.context.getReturnState(i) !== PredictionContext.EMPTY_RETURN_STATE) {
						const newContext = config.context.getParent(i); // "pop" return state
						const returnState = this.atn.states[config.context.getReturnState(i)];
						cfg = new LexerATNConfig({ state:returnState, context:newContext }, config);
						currentAltReachedAcceptState = this.closure(input, cfg,
								configs, currentAltReachedAcceptState, speculative,
								treatEofAsEpsilon);
					}
				}
			}
			return currentAltReachedAcceptState;
		}
		// optimization
		if (!config.state.epsilonOnlyTransitions) {
			if (!currentAltReachedAcceptState || !config.passedThroughNonGreedyDecision) {
				configs.add(config);
			}
		}
		for (let j = 0; j < config.state.transitions.length; j++) {
			const trans = config.state.transitions[j];
			cfg = this.getEpsilonTarget(input, config, trans, configs, speculative, treatEofAsEpsilon);
			if (cfg !== null) {
				currentAltReachedAcceptState = this.closure(input, cfg, configs,
						currentAltReachedAcceptState, speculative, treatEofAsEpsilon);
			}
		}
		return currentAltReachedAcceptState;
	}

	// side-effect: can alter configs.hasSemanticContext
	getEpsilonTarget(input, config, trans,
			configs, speculative, treatEofAsEpsilon) {
		let cfg = null;
		if (trans.serializationType === Transition.RULE) {
			const newContext = SingletonPredictionContext.create(config.context, trans.followState.stateNumber);
			cfg = new LexerATNConfig( { state:trans.target, context:newContext}, config);
		} else if (trans.serializationType === Transition.PRECEDENCE) {
			throw "Precedence predicates are not supported in lexers.";
		} else if (trans.serializationType === Transition.PREDICATE) {
			// Track traversing semantic predicates. If we traverse,
			// we cannot add a DFA state for this "reach" computation
			// because the DFA would not test the predicate again in the
			// future. Rather than creating collections of semantic predicates
			// like v3 and testing them on prediction, v4 will test them on the
			// fly all the time using the ATN not the DFA. This is slower but
			// semantically it's not used that often. One of the key elements to
			// this predicate mechanism is not adding DFA states that see
			// predicates immediately afterwards in the ATN. For example,

			// a : ID {p1}? | ID {p2}? ;

			// should create the start state for rule 'a' (to save start state
			// competition), but should not create target of ID state. The
			// collection of ATN states the following ID references includes
			// states reached by traversing predicates. Since this is when we
			// test them, we cannot cash the DFA state target of ID.

			if (LexerATNSimulator.debug) {
				console.log("EVAL rule " + trans.ruleIndex + ":" + trans.predIndex);
			}
			configs.hasSemanticContext = true;
			if (this.evaluatePredicate(input, trans.ruleIndex, trans.predIndex, speculative)) {
				cfg = new LexerATNConfig({ state:trans.target}, config);
			}
		} else if (trans.serializationType === Transition.ACTION) {
			if (config.context === null || config.context.hasEmptyPath()) {
				// execute actions anywhere in the start rule for a token.
				//
				// TODO: if the entry rule is invoked recursively, some
				// actions may be executed during the recursive call. The
				// problem can appear when hasEmptyPath() is true but
				// isEmpty() is false. In this case, the config needs to be
				// split into two contexts - one with just the empty path
				// and another with everything but the empty path.
				// Unfortunately, the current algorithm does not allow
				// getEpsilonTarget to return two configurations, so
				// additional modifications are needed before we can support
				// the split operation.
				const lexerActionExecutor = LexerActionExecutor.append(config.lexerActionExecutor,
						this.atn.lexerActions[trans.actionIndex]);
				cfg = new LexerATNConfig({ state:trans.target, lexerActionExecutor:lexerActionExecutor }, config);
			} else {
				// ignore actions in referenced rules
				cfg = new LexerATNConfig( { state:trans.target}, config);
			}
		} else if (trans.serializationType === Transition.EPSILON) {
			cfg = new LexerATNConfig({ state:trans.target}, config);
		} else if (trans.serializationType === Transition.ATOM ||
					trans.serializationType === Transition.RANGE ||
					trans.serializationType === Transition.SET) {
			if (treatEofAsEpsilon) {
				if (trans.matches(Token.EOF, 0, Lexer.MAX_CHAR_VALUE)) {
					cfg = new LexerATNConfig( { state:trans.target }, config);
				}
			}
		}
		return cfg;
	}

	/**
	 * Evaluate a predicate specified in the lexer.
	 *
	 * <p>If {@code speculative} is {@code true}, this method was called before
	 * {@link //consume} for the matched character. This method should call
	 * {@link //consume} before evaluating the predicate to ensure position
	 * sensitive values, including {@link Lexer//getText}, {@link Lexer//getLine},
	 * and {@link Lexer//getcolumn}, properly reflect the current
	 * lexer state. This method should restore {@code input} and the simulator
	 * to the original state before returning (i.e. undo the actions made by the
	 * call to {@link //consume}.</p>
	 *
	 * @param input The input stream.
	 * @param ruleIndex The rule containing the predicate.
	 * @param predIndex The index of the predicate within the rule.
	 * @param speculative {@code true} if the current index in {@code input} is
	 * one character before the predicate's location.
	 *
	 * @return {@code true} if the specified predicate evaluates to
	 * {@code true}.
	 */
	evaluatePredicate(input, ruleIndex,
			predIndex, speculative) {
		// assume true if no recognizer was provided
		if (this.recog === null) {
			return true;
		}
		if (!speculative) {
			return this.recog.sempred(null, ruleIndex, predIndex);
		}
		const savedcolumn = this.column;
		const savedLine = this.line;
		const index = input.index;
		const marker = input.mark();
		try {
			this.consume(input);
			return this.recog.sempred(null, ruleIndex, predIndex);
		} finally {
			this.column = savedcolumn;
			this.line = savedLine;
			input.seek(index);
			input.release(marker);
		}
	}

	captureSimState(settings, input, dfaState) {
		settings.index = input.index;
		settings.line = this.line;
		settings.column = this.column;
		settings.dfaState = dfaState;
	}

	addDFAEdge(from_, tk, to, cfgs) {
		if (to === undefined) {
			to = null;
		}
		if (cfgs === undefined) {
			cfgs = null;
		}
		if (to === null && cfgs !== null) {
			// leading to this call, ATNConfigSet.hasSemanticContext is used as a
			// marker indicating dynamic predicate evaluation makes this edge
			// dependent on the specific input sequence, so the static edge in the
			// DFA should be omitted. The target DFAState is still created since
			// execATN has the ability to resynchronize with the DFA state cache
			// following the predicate evaluation step.
			//
			// TJP notes: next time through the DFA, we see a pred again and eval.
			// If that gets us to a previously created (but dangling) DFA
			// state, we can continue in pure DFA mode from there.
			// /
			const suppressEdge = cfgs.hasSemanticContext;
			cfgs.hasSemanticContext = false;

			to = this.addDFAState(cfgs);

			if (suppressEdge) {
				return to;
			}
		}
		// add the edge
		if (tk < LexerATNSimulator.MIN_DFA_EDGE || tk > LexerATNSimulator.MAX_DFA_EDGE) {
			// Only track edges within the DFA bounds
			return to;
		}
		if (LexerATNSimulator.debug) {
			console.log("EDGE " + from_ + " -> " + to + " upon " + tk);
		}
		if (from_.edges === null) {
			// make room for tokens 1..n and -1 masquerading as index 0
			from_.edges = [];
		}
		from_.edges[tk - LexerATNSimulator.MIN_DFA_EDGE] = to; // connect

		return to;
	}

	/**
	 * Add a new DFA state if there isn't one with this set of
	 * configurations already. This method also detects the first
	 * configuration containing an ATN rule stop state. Later, when
	 * traversing the DFA, we will know which rule to accept.
	 */
	addDFAState(configs) {
		const proposed = new DFAState(null, configs);
		let firstConfigWithRuleStopState = null;
		for (let i = 0; i < configs.items.length; i++) {
			const cfg = configs.items[i];
			if (cfg.state instanceof RuleStopState) {
				firstConfigWithRuleStopState = cfg;
				break;
			}
		}
		if (firstConfigWithRuleStopState !== null) {
			proposed.isAcceptState = true;
			proposed.lexerActionExecutor = firstConfigWithRuleStopState.lexerActionExecutor;
			proposed.prediction = this.atn.ruleToTokenType[firstConfigWithRuleStopState.state.ruleIndex];
		}
		const dfa = this.decisionToDFA[this.mode];
		const existing = dfa.states.get(proposed);
		if (existing!==null) {
			return existing;
		}
		const newState = proposed;
		newState.stateNumber = dfa.states.length;
		configs.setReadonly(true);
		newState.configs = configs;
		dfa.states.add(newState);
		return newState;
	}

	getDFA(mode) {
		return this.decisionToDFA[mode];
	}

// Get the text matched so far for the current token.
	getText(input) {
		// index is first lookahead char, don't include.
		return input.getText(this.startIndex, input.index - 1);
	}

	consume(input) {
		const curChar = input.LA(1);
		if (curChar === "\n".charCodeAt(0)) {
			this.line += 1;
			this.column = 0;
		} else {
			this.column += 1;
		}
		input.consume();
	}

	getTokenName(tt) {
		if (tt === -1) {
			return "EOF";
		} else {
			return "'" + String.fromCharCode(tt) + "'";
		}
	}
}

LexerATNSimulator.debug = false;
LexerATNSimulator.dfa_debug = false;

LexerATNSimulator.MIN_DFA_EDGE = 0;
LexerATNSimulator.MAX_DFA_EDGE = 127; // forces unicode to stay in ATN

LexerATNSimulator.match_calls = 0;

module.exports = LexerATNSimulator;


/***/ }),

/***/ 294:
/***/ ((module) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const LexerActionType = {
    // The type of a {@link LexerChannelAction} action.
    CHANNEL: 0,
    // The type of a {@link LexerCustomAction} action
    CUSTOM: 1,
    // The type of a {@link LexerModeAction} action.
    MODE: 2,
    //The type of a {@link LexerMoreAction} action.
    MORE: 3,
    //The type of a {@link LexerPopModeAction} action.
    POP_MODE: 4,
    //The type of a {@link LexerPushModeAction} action.
    PUSH_MODE: 5,
    //The type of a {@link LexerSkipAction} action.
    SKIP: 6,
    //The type of a {@link LexerTypeAction} action.
    TYPE: 7
}

class LexerAction {
    constructor(action) {
        this.actionType = action;
        this.isPositionDependent = false;
    }

    hashCode() {
        const hash = new Hash();
        this.updateHashCode(hash);
        return hash.finish()
    }

    updateHashCode(hash) {
        hash.update(this.actionType);
    }

    equals(other) {
        return this === other;
    }
}


/**
 * Implements the {@code skip} lexer action by calling {@link Lexer//skip}.
 *
 * <p>The {@code skip} command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
 */
class LexerSkipAction extends LexerAction {
    constructor() {
        super(LexerActionType.SKIP);
    }

    execute(lexer) {
        lexer.skip();
    }

    toString() {
        return "skip";
    }
}

// Provides a singleton instance of this parameterless lexer action.
LexerSkipAction.INSTANCE = new LexerSkipAction();

/**
 * Implements the {@code type} lexer action by calling {@link Lexer//setType}
 * with the assigned type
 */
class LexerTypeAction extends LexerAction {
    constructor(type) {
        super(LexerActionType.TYPE);
        this.type = type;
    }

    execute(lexer) {
        lexer.type = this.type;
    }

    updateHashCode(hash) {
        hash.update(this.actionType, this.type);
    }

    equals(other) {
        if(this === other) {
            return true;
        } else if (! (other instanceof LexerTypeAction)) {
            return false;
        } else {
            return this.type === other.type;
        }
    }

    toString() {
        return "type(" + this.type + ")";
    }
}


/**
 * Implements the {@code pushMode} lexer action by calling
 * {@link Lexer//pushMode} with the assigned mode
 */
class LexerPushModeAction extends LexerAction {
    constructor(mode) {
        super(LexerActionType.PUSH_MODE);
        this.mode = mode;
    }

    /**
     * <p>This action is implemented by calling {@link Lexer//pushMode} with the
     * value provided by {@link //getMode}.</p>
     */
    execute(lexer) {
        lexer.pushMode(this.mode);
    }

    updateHashCode(hash) {
        hash.update(this.actionType, this.mode);
    }

    equals(other) {
        if (this === other) {
            return true;
        } else if (! (other instanceof LexerPushModeAction)) {
            return false;
        } else {
            return this.mode === other.mode;
        }
    }

    toString() {
        return "pushMode(" + this.mode + ")";
    }
}

/**
 * Implements the {@code popMode} lexer action by calling {@link Lexer//popMode}.
 *
 * <p>The {@code popMode} command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
 */
class LexerPopModeAction extends LexerAction {
    constructor() {
        super(LexerActionType.POP_MODE);
    }

    /**
     * <p>This action is implemented by calling {@link Lexer//popMode}.</p>
     */
    execute(lexer) {
        lexer.popMode();
    }

    toString() {
        return "popMode";
    }
}

LexerPopModeAction.INSTANCE = new LexerPopModeAction();

/**
 * Implements the {@code more} lexer action by calling {@link Lexer//more}.
 *
 * <p>The {@code more} command does not have any parameters, so this action is
 * implemented as a singleton instance exposed by {@link //INSTANCE}.</p>
 */
class LexerMoreAction extends LexerAction {
    constructor() {
        super(LexerActionType.MORE);
    }

    /**
     * <p>This action is implemented by calling {@link Lexer//popMode}.</p>
     */
    execute(lexer) {
        lexer.more();
    }

    toString() {
        return "more";
    }
}

LexerMoreAction.INSTANCE = new LexerMoreAction();


/**
 * Implements the {@code mode} lexer action by calling {@link Lexer//mode} with
 * the assigned mode
 */
class LexerModeAction extends LexerAction {
    constructor(mode) {
        super(LexerActionType.MODE);
        this.mode = mode;
    }

    /**
     * <p>This action is implemented by calling {@link Lexer//mode} with the
     * value provided by {@link //getMode}.</p>
     */
    execute(lexer) {
        lexer.mode(this.mode);
    }

    updateHashCode(hash) {
        hash.update(this.actionType, this.mode);
    }

    equals(other) {
        if (this === other) {
            return true;
        } else if (! (other instanceof LexerModeAction)) {
            return false;
        } else {
            return this.mode === other.mode;
        }
    }

    toString() {
        return "mode(" + this.mode + ")";
    }
}

/**
 * Executes a custom lexer action by calling {@link Recognizer//action} with the
 * rule and action indexes assigned to the custom action. The implementation of
 * a custom action is added to the generated code for the lexer in an override
 * of {@link Recognizer//action} when the grammar is compiled.
 *
 * <p>This class may represent embedded actions created with the <code>{...}</code>
 * syntax in ANTLR 4, as well as actions created for lexer commands where the
 * command argument could not be evaluated when the grammar was compiled.</p>
 */
class LexerCustomAction extends LexerAction {
    /**
     * Constructs a custom lexer action with the specified rule and action
     * indexes.
     *
     * @param ruleIndex The rule index to use for calls to
     * {@link Recognizer//action}.
     * @param actionIndex The action index to use for calls to
     * {@link Recognizer//action}.
     */
    constructor(ruleIndex, actionIndex) {
        super(LexerActionType.CUSTOM);
        this.ruleIndex = ruleIndex;
        this.actionIndex = actionIndex;
        this.isPositionDependent = true;
    }

    /**
     * <p>Custom actions are implemented by calling {@link Lexer//action} with the
     * appropriate rule and action indexes.</p>
     */
    execute(lexer) {
        lexer.action(null, this.ruleIndex, this.actionIndex);
    }

    updateHashCode(hash) {
        hash.update(this.actionType, this.ruleIndex, this.actionIndex);
    }

    equals(other) {
        if (this === other) {
            return true;
        } else if (! (other instanceof LexerCustomAction)) {
            return false;
        } else {
            return this.ruleIndex === other.ruleIndex && this.actionIndex === other.actionIndex;
        }
    }
}

/**
 * Implements the {@code channel} lexer action by calling
 * {@link Lexer//setChannel} with the assigned channel.
 * Constructs a new {@code channel} action with the specified channel value.
 * @param channel The channel value to pass to {@link Lexer//setChannel}
 */
class LexerChannelAction extends LexerAction {
    constructor(channel) {
        super(LexerActionType.CHANNEL);
        this.channel = channel;
    }

    /**
     * <p>This action is implemented by calling {@link Lexer//setChannel} with the
     * value provided by {@link //getChannel}.</p>
     */
    execute(lexer) {
        lexer._channel = this.channel;
    }

    updateHashCode(hash) {
        hash.update(this.actionType, this.channel);
    }

    equals(other) {
        if (this === other) {
            return true;
        } else if (! (other instanceof LexerChannelAction)) {
            return false;
        } else {
            return this.channel === other.channel;
        }
    }

    toString() {
        return "channel(" + this.channel + ")";
    }
}


/**
 * This implementation of {@link LexerAction} is used for tracking input offsets
 * for position-dependent actions within a {@link LexerActionExecutor}.
 *
 * <p>This action is not serialized as part of the ATN, and is only required for
 * position-dependent lexer actions which appear at a location other than the
 * end of a rule. For more information about DFA optimizations employed for
 * lexer actions, see {@link LexerActionExecutor//append} and
 * {@link LexerActionExecutor//fixOffsetBeforeMatch}.</p>
 *
 * Constructs a new indexed custom action by associating a character offset
 * with a {@link LexerAction}.
 *
 * <p>Note: This class is only required for lexer actions for which
 * {@link LexerAction//isPositionDependent} returns {@code true}.</p>
 *
 * @param offset The offset into the input {@link CharStream}, relative to
 * the token start index, at which the specified lexer action should be
 * executed.
 * @param action The lexer action to execute at a particular offset in the
 * input {@link CharStream}.
 */
class LexerIndexedCustomAction extends LexerAction {
    constructor(offset, action) {
        super(action.actionType);
        this.offset = offset;
        this.action = action;
        this.isPositionDependent = true;
    }

    /**
     * <p>This method calls {@link //execute} on the result of {@link //getAction}
     * using the provided {@code lexer}.</p>
     */
    execute(lexer) {
        // assume the input stream position was properly set by the calling code
        this.action.execute(lexer);
    }

    updateHashCode(hash) {
        hash.update(this.actionType, this.offset, this.action);
    }

    equals(other) {
        if (this === other) {
            return true;
        } else if (! (other instanceof LexerIndexedCustomAction)) {
            return false;
        } else {
            return this.offset === other.offset && this.action === other.action;
        }
    }
}

module.exports = {
    LexerActionType,
    LexerSkipAction,
    LexerChannelAction,
    LexerCustomAction,
    LexerIndexedCustomAction,
    LexerMoreAction,
    LexerTypeAction,
    LexerPushModeAction,
    LexerPopModeAction,
    LexerModeAction
}


/***/ }),

/***/ 366:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {hashStuff} = __webpack_require__(785);
const {LexerIndexedCustomAction} = __webpack_require__(294);

class LexerActionExecutor {
	/**
	 * Represents an executor for a sequence of lexer actions which traversed during
	 * the matching operation of a lexer rule (token).
	 *
	 * <p>The executor tracks position information for position-dependent lexer actions
	 * efficiently, ensuring that actions appearing only at the end of the rule do
	 * not cause bloating of the {@link DFA} created for the lexer.</p>
	 */
	constructor(lexerActions) {
		this.lexerActions = lexerActions === null ? [] : lexerActions;
		/**
		 * Caches the result of {@link //hashCode} since the hash code is an element
		 * of the performance-critical {@link LexerATNConfig//hashCode} operation
		 */
		this.cachedHashCode = hashStuff(lexerActions); // "".join([str(la) for la in
		// lexerActions]))
		return this;
	}

	/**
	 * Creates a {@link LexerActionExecutor} which encodes the current offset
	 * for position-dependent lexer actions.
	 *
	 * <p>Normally, when the executor encounters lexer actions where
	 * {@link LexerAction//isPositionDependent} returns {@code true}, it calls
	 * {@link IntStream//seek} on the input {@link CharStream} to set the input
	 * position to the <em>end</em> of the current token. This behavior provides
	 * for efficient DFA representation of lexer actions which appear at the end
	 * of a lexer rule, even when the lexer rule matches a variable number of
	 * characters.</p>
	 *
	 * <p>Prior to traversing a match transition in the ATN, the current offset
	 * from the token start index is assigned to all position-dependent lexer
	 * actions which have not already been assigned a fixed offset. By storing
	 * the offsets relative to the token start index, the DFA representation of
	 * lexer actions which appear in the middle of tokens remains efficient due
	 * to sharing among tokens of the same length, regardless of their absolute
	 * position in the input stream.</p>
	 *
	 * <p>If the current executor already has offsets assigned to all
	 * position-dependent lexer actions, the method returns {@code this}.</p>
	 *
	 * @param offset The current offset to assign to all position-dependent
	 * lexer actions which do not already have offsets assigned.
	 *
	 * @return {LexerActionExecutor} A {@link LexerActionExecutor} which stores input stream offsets
	 * for all position-dependent lexer actions.
	 */
	fixOffsetBeforeMatch(offset) {
		let updatedLexerActions = null;
		for (let i = 0; i < this.lexerActions.length; i++) {
			if (this.lexerActions[i].isPositionDependent &&
					!(this.lexerActions[i] instanceof LexerIndexedCustomAction)) {
				if (updatedLexerActions === null) {
					updatedLexerActions = this.lexerActions.concat([]);
				}
				updatedLexerActions[i] = new LexerIndexedCustomAction(offset,
						this.lexerActions[i]);
			}
		}
		if (updatedLexerActions === null) {
			return this;
		} else {
			return new LexerActionExecutor(updatedLexerActions);
		}
	}

	/**
	 * Execute the actions encapsulated by this executor within the context of a
	 * particular {@link Lexer}.
	 *
	 * <p>This method calls {@link IntStream//seek} to set the position of the
	 * {@code input} {@link CharStream} prior to calling
	 * {@link LexerAction//execute} on a position-dependent action. Before the
	 * method returns, the input position will be restored to the same position
	 * it was in when the method was invoked.</p>
	 *
	 * @param lexer The lexer instance.
	 * @param input The input stream which is the source for the current token.
	 * When this method is called, the current {@link IntStream//index} for
	 * {@code input} should be the start of the following token, i.e. 1
	 * character past the end of the current token.
	 * @param startIndex The token start index. This value may be passed to
	 * {@link IntStream//seek} to set the {@code input} position to the beginning
	 * of the token.
	 */
	execute(lexer, input, startIndex) {
		let requiresSeek = false;
		const stopIndex = input.index;
		try {
			for (let i = 0; i < this.lexerActions.length; i++) {
				let lexerAction = this.lexerActions[i];
				if (lexerAction instanceof LexerIndexedCustomAction) {
					const offset = lexerAction.offset;
					input.seek(startIndex + offset);
					lexerAction = lexerAction.action;
					requiresSeek = (startIndex + offset) !== stopIndex;
				} else if (lexerAction.isPositionDependent) {
					input.seek(stopIndex);
					requiresSeek = false;
				}
				lexerAction.execute(lexer);
			}
		} finally {
			if (requiresSeek) {
				input.seek(stopIndex);
			}
		}
	}

	hashCode() {
		return this.cachedHashCode;
	}

	updateHashCode(hash) {
		hash.update(this.cachedHashCode);
	}

	equals(other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof LexerActionExecutor)) {
			return false;
		} else if (this.cachedHashCode != other.cachedHashCode) {
			return false;
		} else if (this.lexerActions.length != other.lexerActions.length) {
			return false;
		} else {
			const numActions = this.lexerActions.length
			for (let idx = 0; idx < numActions; ++idx) {
				if (!this.lexerActions[idx].equals(other.lexerActions[idx])) {
					return false;
				}
			}
			return true;
		}
	}

	/**
	 * Creates a {@link LexerActionExecutor} which executes the actions for
	 * the input {@code lexerActionExecutor} followed by a specified
	 * {@code lexerAction}.
	 *
	 * @param lexerActionExecutor The executor for actions already traversed by
	 * the lexer while matching a token within a particular
	 * {@link LexerATNConfig}. If this is {@code null}, the method behaves as
	 * though it were an empty executor.
	 * @param lexerAction The lexer action to execute after the actions
	 * specified in {@code lexerActionExecutor}.
	 *
	 * @return {LexerActionExecutor} A {@link LexerActionExecutor} for executing the combine actions
	 * of {@code lexerActionExecutor} and {@code lexerAction}.
	 */
	static append(lexerActionExecutor, lexerAction) {
		if (lexerActionExecutor === null) {
			return new LexerActionExecutor([ lexerAction ]);
		}
		const lexerActions = lexerActionExecutor.lexerActions.concat([ lexerAction ]);
		return new LexerActionExecutor(lexerActions);
	}
}


module.exports = LexerActionExecutor;


/***/ }),

/***/ 355:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const Utils = __webpack_require__(785);
const {Set, BitSet, DoubleDict} = Utils;

const ATN = __webpack_require__(641);
const {ATNState, RuleStopState} = __webpack_require__(290);

const {ATNConfig} = __webpack_require__(961);
const {ATNConfigSet} = __webpack_require__(21);
const {Token} = __webpack_require__(994);
const {DFAState, PredPrediction} = __webpack_require__(254);
const ATNSimulator = __webpack_require__(380);
const PredictionMode = __webpack_require__(505);
const RuleContext = __webpack_require__(302);
const ParserRuleContext = __webpack_require__(449);
const {SemanticContext} = __webpack_require__(660);
const {PredictionContext} = __webpack_require__(259);
const {Interval} = __webpack_require__(909);
const {Transition, SetTransition, NotSetTransition, RuleTransition, ActionTransition} = __webpack_require__(68);
const {NoViableAltException} = __webpack_require__(337);
const {SingletonPredictionContext, predictionContextFromRuleContext} = __webpack_require__(259);


/**
 * The embodiment of the adaptive LL(*), ALL(*), parsing strategy.
 *
 * <p>
 * The basic complexity of the adaptive strategy makes it harder to understand.
 * We begin with ATN simulation to build paths in a DFA. Subsequent prediction
 * requests go through the DFA first. If they reach a state without an edge for
 * the current symbol, the algorithm fails over to the ATN simulation to
 * complete the DFA path for the current input (until it finds a conflict state
 * or uniquely predicting state).</p>
 *
 * <p>
 * All of that is done without using the outer context because we want to create
 * a DFA that is not dependent upon the rule invocation stack when we do a
 * prediction. One DFA works in all contexts. We avoid using context not
 * necessarily because it's slower, although it can be, but because of the DFA
 * caching problem. The closure routine only considers the rule invocation stack
 * created during prediction beginning in the decision rule. For example, if
 * prediction occurs without invoking another rule's ATN, there are no context
 * stacks in the configurations. When lack of context leads to a conflict, we
 * don't know if it's an ambiguity or a weakness in the strong LL(*) parsing
 * strategy (versus full LL(*)).</p>
 *
 * <p>
 * When SLL yields a configuration set with conflict, we rewind the input and
 * retry the ATN simulation, this time using full outer context without adding
 * to the DFA. Configuration context stacks will be the full invocation stacks
 * from the start rule. If we get a conflict using full context, then we can
 * definitively say we have a true ambiguity for that input sequence. If we
 * don't get a conflict, it implies that the decision is sensitive to the outer
 * context. (It is not context-sensitive in the sense of context-sensitive
 * grammars.)</p>
 *
 * <p>
 * The next time we reach this DFA state with an SLL conflict, through DFA
 * simulation, we will again retry the ATN simulation using full context mode.
 * This is slow because we can't save the results and have to "interpret" the
 * ATN each time we get that input.</p>
 *
 * <p>
 * <strong>CACHING FULL CONTEXT PREDICTIONS</strong></p>
 *
 * <p>
 * We could cache results from full context to predicted alternative easily and
 * that saves a lot of time but doesn't work in presence of predicates. The set
 * of visible predicates from the ATN start state changes depending on the
 * context, because closure can fall off the end of a rule. I tried to cache
 * tuples (stack context, semantic context, predicted alt) but it was slower
 * than interpreting and much more complicated. Also required a huge amount of
 * memory. The goal is not to create the world's fastest parser anyway. I'd like
 * to keep this algorithm simple. By launching multiple threads, we can improve
 * the speed of parsing across a large number of files.</p>
 *
 * <p>
 * There is no strict ordering between the amount of input used by SLL vs LL,
 * which makes it really hard to build a cache for full context. Let's say that
 * we have input A B C that leads to an SLL conflict with full context X. That
 * implies that using X we might only use A B but we could also use A B C D to
 * resolve conflict. Input A B C D could predict alternative 1 in one position
 * in the input and A B C E could predict alternative 2 in another position in
 * input. The conflicting SLL configurations could still be non-unique in the
 * full context prediction, which would lead us to requiring more input than the
 * original A B C.	To make a	prediction cache work, we have to track	the exact
 * input	used during the previous prediction. That amounts to a cache that maps
 * X to a specific DFA for that context.</p>
 *
 * <p>
 * Something should be done for left-recursive expression predictions. They are
 * likely LL(1) + pred eval. Easier to do the whole SLL unless error and retry
 * with full LL thing Sam does.</p>
 *
 * <p>
 * <strong>AVOIDING FULL CONTEXT PREDICTION</strong></p>
 *
 * <p>
 * We avoid doing full context retry when the outer context is empty, we did not
 * dip into the outer context by falling off the end of the decision state rule,
 * or when we force SLL mode.</p>
 *
 * <p>
 * As an example of the not dip into outer context case, consider as super
 * constructor calls versus function calls. One grammar might look like
 * this:</p>
 *
 * <pre>
 * ctorBody
 *   : '{' superCall? stat* '}'
 *   ;
 * </pre>
 *
 * <p>
 * Or, you might see something like</p>
 *
 * <pre>
 * stat
 *   : superCall ';'
 *   | expression ';'
 *   | ...
 *   ;
 * </pre>
 *
 * <p>
 * In both cases I believe that no closure operations will dip into the outer
 * context. In the first case ctorBody in the worst case will stop at the '}'.
 * In the 2nd case it should stop at the ';'. Both cases should stay within the
 * entry rule and not dip into the outer context.</p>
 *
 * <p>
 * <strong>PREDICATES</strong></p>
 *
 * <p>
 * Predicates are always evaluated if present in either SLL or LL both. SLL and
 * LL simulation deals with predicates differently. SLL collects predicates as
 * it performs closure operations like ANTLR v3 did. It delays predicate
 * evaluation until it reaches and accept state. This allows us to cache the SLL
 * ATN simulation whereas, if we had evaluated predicates on-the-fly during
 * closure, the DFA state configuration sets would be different and we couldn't
 * build up a suitable DFA.</p>
 *
 * <p>
 * When building a DFA accept state during ATN simulation, we evaluate any
 * predicates and return the sole semantically valid alternative. If there is
 * more than 1 alternative, we report an ambiguity. If there are 0 alternatives,
 * we throw an exception. Alternatives without predicates act like they have
 * true predicates. The simple way to think about it is to strip away all
 * alternatives with false predicates and choose the minimum alternative that
 * remains.</p>
 *
 * <p>
 * When we start in the DFA and reach an accept state that's predicated, we test
 * those and return the minimum semantically viable alternative. If no
 * alternatives are viable, we throw an exception.</p>
 *
 * <p>
 * During full LL ATN simulation, closure always evaluates predicates and
 * on-the-fly. This is crucial to reducing the configuration set size during
 * closure. It hits a landmine when parsing with the Java grammar, for example,
 * without this on-the-fly evaluation.</p>
 *
 * <p>
 * <strong>SHARING DFA</strong></p>
 *
 * <p>
 * All instances of the same parser share the same decision DFAs through a
 * static field. Each instance gets its own ATN simulator but they share the
 * same {@link //decisionToDFA} field. They also share a
 * {@link PredictionContextCache} object that makes sure that all
 * {@link PredictionContext} objects are shared among the DFA states. This makes
 * a big size difference.</p>
 *
 * <p>
 * <strong>THREAD SAFETY</strong></p>
 *
 * <p>
 * The {@link ParserATNSimulator} locks on the {@link //decisionToDFA} field when
 * it adds a new DFA object to that array. {@link //addDFAEdge}
 * locks on the DFA for the current decision when setting the
 * {@link DFAState//edges} field. {@link //addDFAState} locks on
 * the DFA for the current decision when looking up a DFA state to see if it
 * already exists. We must make sure that all requests to add DFA states that
 * are equivalent result in the same shared DFA object. This is because lots of
 * threads will be trying to update the DFA at once. The
 * {@link //addDFAState} method also locks inside the DFA lock
 * but this time on the shared context cache when it rebuilds the
 * configurations' {@link PredictionContext} objects using cached
 * subgraphs/nodes. No other locking occurs, even during DFA simulation. This is
 * safe as long as we can guarantee that all threads referencing
 * {@code s.edge[t]} get the same physical target {@link DFAState}, or
 * {@code null}. Once into the DFA, the DFA simulation does not reference the
 * {@link DFA//states} map. It follows the {@link DFAState//edges} field to new
 * targets. The DFA simulator will either find {@link DFAState//edges} to be
 * {@code null}, to be non-{@code null} and {@code dfa.edges[t]} null, or
 * {@code dfa.edges[t]} to be non-null. The
 * {@link //addDFAEdge} method could be racing to set the field
 * but in either case the DFA simulator works; if {@code null}, and requests ATN
 * simulation. It could also race trying to get {@code dfa.edges[t]}, but either
 * way it will work because it's not doing a test and set operation.</p>
 *
 * <p>
 * <strong>Starting with SLL then failing to combined SLL/LL (Two-Stage
 * Parsing)</strong></p>
 *
 * <p>
 * Sam pointed out that if SLL does not give a syntax error, then there is no
 * point in doing full LL, which is slower. We only have to try LL if we get a
 * syntax error. For maximum speed, Sam starts the parser set to pure SLL
 * mode with the {@link BailErrorStrategy}:</p>
 *
 * <pre>
 * parser.{@link Parser//getInterpreter() getInterpreter()}.{@link //setPredictionMode setPredictionMode}{@code (}{@link PredictionMode//SLL}{@code )};
 * parser.{@link Parser//setErrorHandler setErrorHandler}(new {@link BailErrorStrategy}());
 * </pre>
 *
 * <p>
 * If it does not get a syntax error, then we're done. If it does get a syntax
 * error, we need to retry with the combined SLL/LL strategy.</p>
 *
 * <p>
 * The reason this works is as follows. If there are no SLL conflicts, then the
 * grammar is SLL (at least for that input set). If there is an SLL conflict,
 * the full LL analysis must yield a set of viable alternatives which is a
 * subset of the alternatives reported by SLL. If the LL set is a singleton,
 * then the grammar is LL but not SLL. If the LL set is the same size as the SLL
 * set, the decision is SLL. If the LL set has size &gt; 1, then that decision
 * is truly ambiguous on the current input. If the LL set is smaller, then the
 * SLL conflict resolution might choose an alternative that the full LL would
 * rule out as a possibility based upon better context information. If that's
 * the case, then the SLL parse will definitely get an error because the full LL
 * analysis says it's not viable. If SLL conflict resolution chooses an
 * alternative within the LL set, them both SLL and LL would choose the same
 * alternative because they both choose the minimum of multiple conflicting
 * alternatives.</p>
 *
 * <p>
 * Let's say we have a set of SLL conflicting alternatives {@code {1, 2, 3}} and
 * a smaller LL set called <em>s</em>. If <em>s</em> is {@code {2, 3}}, then SLL
 * parsing will get an error because SLL will pursue alternative 1. If
 * <em>s</em> is {@code {1, 2}} or {@code {1, 3}} then both SLL and LL will
 * choose the same alternative because alternative one is the minimum of either
 * set. If <em>s</em> is {@code {2}} or {@code {3}} then SLL will get a syntax
 * error. If <em>s</em> is {@code {1}} then SLL will succeed.</p>
 *
 * <p>
 * Of course, if the input is invalid, then we will get an error for sure in
 * both SLL and LL parsing. Erroneous input will therefore require 2 passes over
 * the input.</p>
 */
class ParserATNSimulator extends ATNSimulator {
    constructor(parser, atn, decisionToDFA, sharedContextCache) {
        super(atn, sharedContextCache);
        this.parser = parser;
        this.decisionToDFA = decisionToDFA;
        // SLL, LL, or LL + exact ambig detection?//
        this.predictionMode = PredictionMode.LL;
        // LAME globals to avoid parameters!!!!! I need these down deep in predTransition
        this._input = null;
        this._startIndex = 0;
        this._outerContext = null;
        this._dfa = null;
        /**
         * Each prediction operation uses a cache for merge of prediction contexts.
         *  Don't keep around as it wastes huge amounts of memory. DoubleKeyMap
         *  isn't synchronized but we're ok since two threads shouldn't reuse same
         *  parser/atnsim object because it can only handle one input at a time.
         *  This maps graphs a and b to merged result c. (a,b)&rarr;c. We can avoid
         *  the merge if we ever see a and b again.  Note that (b,a)&rarr;c should
         *  also be examined during cache lookup.
         */
        this.mergeCache = null;
        this.debug = false;
        this.debug_closure = false;
        this.debug_add = false;
        this.debug_list_atn_decisions = false;
        this.dfa_debug = false;
        this.retry_debug = false;
    }

    reset() {}

    adaptivePredict(input, decision, outerContext) {
        if (this.debug || this.debug_list_atn_decisions) {
            console.log("adaptivePredict decision " + decision +
                                   " exec LA(1)==" + this.getLookaheadName(input) +
                                   " line " + input.LT(1).line + ":" +
                                   input.LT(1).column);
        }
        this._input = input;
        this._startIndex = input.index;
        this._outerContext = outerContext;

        const dfa = this.decisionToDFA[decision];
        this._dfa = dfa;
        const m = input.mark();
        const index = input.index;

        // Now we are certain to have a specific decision's DFA
        // But, do we still need an initial state?
        try {
            let s0;
            if (dfa.precedenceDfa) {
                // the start state for a precedence DFA depends on the current
                // parser precedence, and is provided by a DFA method.
                s0 = dfa.getPrecedenceStartState(this.parser.getPrecedence());
            } else {
                // the start state for a "regular" DFA is just s0
                s0 = dfa.s0;
            }
            if (s0===null) {
                if (outerContext===null) {
                    outerContext = RuleContext.EMPTY;
                }
                if (this.debug || this.debug_list_atn_decisions) {
                    console.log("predictATN decision " + dfa.decision +
                                       " exec LA(1)==" + this.getLookaheadName(input) +
                                       ", outerContext=" + outerContext.toString(this.parser.ruleNames));
                }

                const fullCtx = false;
                let s0_closure = this.computeStartState(dfa.atnStartState, RuleContext.EMPTY, fullCtx);

                if( dfa.precedenceDfa) {
                    // If this is a precedence DFA, we use applyPrecedenceFilter
                    // to convert the computed start state to a precedence start
                    // state. We then use DFA.setPrecedenceStartState to set the
                    // appropriate start state for the precedence level rather
                    // than simply setting DFA.s0.
                    //
                    dfa.s0.configs = s0_closure; // not used for prediction but useful to know start configs anyway
                    s0_closure = this.applyPrecedenceFilter(s0_closure);
                    s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
                    dfa.setPrecedenceStartState(this.parser.getPrecedence(), s0);
                } else {
                    s0 = this.addDFAState(dfa, new DFAState(null, s0_closure));
                    dfa.s0 = s0;
                }
            }
            const alt = this.execATN(dfa, s0, input, index, outerContext);
            if (this.debug) {
                console.log("DFA after predictATN: " + dfa.toString(this.parser.literalNames));
            }
            return alt;
        } finally {
            this._dfa = null;
            this.mergeCache = null; // wack cache after each prediction
            input.seek(index);
            input.release(m);
        }
    }

    /**
     * Performs ATN simulation to compute a predicted alternative based
     *  upon the remaining input, but also updates the DFA cache to avoid
     *  having to traverse the ATN again for the same input sequence.
     *
     * There are some key conditions we're looking for after computing a new
     * set of ATN configs (proposed DFA state):
     *       if the set is empty, there is no viable alternative for current symbol
     *       does the state uniquely predict an alternative?
     *       does the state have a conflict that would prevent us from
     *         putting it on the work list?
     *
     * We also have some key operations to do:
     *       add an edge from previous DFA state to potentially new DFA state, D,
     *         upon current symbol but only if adding to work list, which means in all
     *         cases except no viable alternative (and possibly non-greedy decisions?)
     *       collecting predicates and adding semantic context to DFA accept states
     *       adding rule context to context-sensitive DFA accept states
     *       consuming an input symbol
     *       reporting a conflict
     *       reporting an ambiguity
     *       reporting a context sensitivity
     *       reporting insufficient predicates
     *
     * cover these cases:
     *    dead end
     *    single alt
     *    single alt + preds
     *    conflict
     *    conflict + preds
     *
     */
    execATN(dfa, s0, input, startIndex, outerContext ) {
        if (this.debug || this.debug_list_atn_decisions) {
            console.log("execATN decision " + dfa.decision +
                    " exec LA(1)==" + this.getLookaheadName(input) +
                    " line " + input.LT(1).line + ":" + input.LT(1).column);
        }
        let alt;
        let previousD = s0;

        if (this.debug) {
            console.log("s0 = " + s0);
        }
        let t = input.LA(1);
        while(true) { // while more work
            let D = this.getExistingTargetState(previousD, t);
            if(D===null) {
                D = this.computeTargetState(dfa, previousD, t);
            }
            if(D===ATNSimulator.ERROR) {
                // if any configs in previous dipped into outer context, that
                // means that input up to t actually finished entry rule
                // at least for SLL decision. Full LL doesn't dip into outer
                // so don't need special case.
                // We will get an error no matter what so delay until after
                // decision; better error message. Also, no reachable target
                // ATN states in SLL implies LL will also get nowhere.
                // If conflict in states that dip out, choose min since we
                // will get error no matter what.
                const e = this.noViableAlt(input, outerContext, previousD.configs, startIndex);
                input.seek(startIndex);
                alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previousD.configs, outerContext);
                if(alt!==ATN.INVALID_ALT_NUMBER) {
                    return alt;
                } else {
                    throw e;
                }
            }
            if(D.requiresFullContext && this.predictionMode !== PredictionMode.SLL) {
                // IF PREDS, MIGHT RESOLVE TO SINGLE ALT => SLL (or syntax error)
                let conflictingAlts = null;
                if (D.predicates!==null) {
                    if (this.debug) {
                        console.log("DFA state has preds in DFA sim LL failover");
                    }
                    const conflictIndex = input.index;
                    if(conflictIndex !== startIndex) {
                        input.seek(startIndex);
                    }
                    conflictingAlts = this.evalSemanticContext(D.predicates, outerContext, true);
                    if (conflictingAlts.length===1) {
                        if(this.debug) {
                            console.log("Full LL avoided");
                        }
                        return conflictingAlts.minValue();
                    }
                    if (conflictIndex !== startIndex) {
                        // restore the index so reporting the fallback to full
                        // context occurs with the index at the correct spot
                        input.seek(conflictIndex);
                    }
                }
                if (this.dfa_debug) {
                    console.log("ctx sensitive state " + outerContext +" in " + D);
                }
                const fullCtx = true;
                const s0_closure = this.computeStartState(dfa.atnStartState, outerContext, fullCtx);
                this.reportAttemptingFullContext(dfa, conflictingAlts, D.configs, startIndex, input.index);
                alt = this.execATNWithFullContext(dfa, D, s0_closure, input, startIndex, outerContext);
                return alt;
            }
            if (D.isAcceptState) {
                if (D.predicates===null) {
                    return D.prediction;
                }
                const stopIndex = input.index;
                input.seek(startIndex);
                const alts = this.evalSemanticContext(D.predicates, outerContext, true);
                if (alts.length===0) {
                    throw this.noViableAlt(input, outerContext, D.configs, startIndex);
                } else if (alts.length===1) {
                    return alts.minValue();
                } else {
                    // report ambiguity after predicate evaluation to make sure the correct set of ambig alts is reported.
                    this.reportAmbiguity(dfa, D, startIndex, stopIndex, false, alts, D.configs);
                    return alts.minValue();
                }
            }
            previousD = D;

            if (t !== Token.EOF) {
                input.consume();
                t = input.LA(1);
            }
        }
    }

    /**
     * Get an existing target state for an edge in the DFA. If the target state
     * for the edge has not yet been computed or is otherwise not available,
     * this method returns {@code null}.
     *
     * @param previousD The current DFA state
     * @param t The next input symbol
     * @return The existing target DFA state for the given input symbol
     * {@code t}, or {@code null} if the target state for this edge is not
     * already cached
     */
    getExistingTargetState(previousD, t) {
        const edges = previousD.edges;
        if (edges===null) {
            return null;
        } else {
            return edges[t + 1] || null;
        }
    }

    /**
     * Compute a target state for an edge in the DFA, and attempt to add the
     * computed state and corresponding edge to the DFA.
     *
     * @param dfa The DFA
     * @param previousD The current DFA state
     * @param t The next input symbol
     *
     * @return The computed target DFA state for the given input symbol
     * {@code t}. If {@code t} does not lead to a valid DFA state, this method
     * returns {@link //ERROR
     */
    computeTargetState(dfa, previousD, t) {
       const reach = this.computeReachSet(previousD.configs, t, false);
        if(reach===null) {
            this.addDFAEdge(dfa, previousD, t, ATNSimulator.ERROR);
            return ATNSimulator.ERROR;
        }
        // create new target state; we'll add to DFA after it's complete
        let D = new DFAState(null, reach);

        const predictedAlt = this.getUniqueAlt(reach);

        if (this.debug) {
            const altSubSets = PredictionMode.getConflictingAltSubsets(reach);
            console.log("SLL altSubSets=" + Utils.arrayToString(altSubSets) +
                        ", previous=" + previousD.configs +
                        ", configs=" + reach +
                        ", predict=" + predictedAlt +
                        ", allSubsetsConflict=" +
                        PredictionMode.allSubsetsConflict(altSubSets) + ", conflictingAlts=" +
                        this.getConflictingAlts(reach));
        }
        if (predictedAlt!==ATN.INVALID_ALT_NUMBER) {
            // NO CONFLICT, UNIQUELY PREDICTED ALT
            D.isAcceptState = true;
            D.configs.uniqueAlt = predictedAlt;
            D.prediction = predictedAlt;
        } else if (PredictionMode.hasSLLConflictTerminatingPrediction(this.predictionMode, reach)) {
            // MORE THAN ONE VIABLE ALTERNATIVE
            D.configs.conflictingAlts = this.getConflictingAlts(reach);
            D.requiresFullContext = true;
            // in SLL-only mode, we will stop at this state and return the minimum alt
            D.isAcceptState = true;
            D.prediction = D.configs.conflictingAlts.minValue();
        }
        if (D.isAcceptState && D.configs.hasSemanticContext) {
            this.predicateDFAState(D, this.atn.getDecisionState(dfa.decision));
            if( D.predicates!==null) {
                D.prediction = ATN.INVALID_ALT_NUMBER;
            }
        }
        // all adds to dfa are done after we've created full D state
        D = this.addDFAEdge(dfa, previousD, t, D);
        return D;
    }

    predicateDFAState(dfaState, decisionState) {
        // We need to test all predicates, even in DFA states that
        // uniquely predict alternative.
        const nalts = decisionState.transitions.length;
        // Update DFA so reach becomes accept state with (predicate,alt)
        // pairs if preds found for conflicting alts
        const altsToCollectPredsFrom = this.getConflictingAltsOrUniqueAlt(dfaState.configs);
        const altToPred = this.getPredsForAmbigAlts(altsToCollectPredsFrom, dfaState.configs, nalts);
        if (altToPred!==null) {
            dfaState.predicates = this.getPredicatePredictions(altsToCollectPredsFrom, altToPred);
            dfaState.prediction = ATN.INVALID_ALT_NUMBER; // make sure we use preds
        } else {
            // There are preds in configs but they might go away
            // when OR'd together like {p}? || NONE == NONE. If neither
            // alt has preds, resolve to min alt
            dfaState.prediction = altsToCollectPredsFrom.minValue();
        }
    }

// comes back with reach.uniqueAlt set to a valid alt
    execATNWithFullContext(dfa, D, // how far we got before failing over
                                         s0,
                                         input,
                                         startIndex,
                                         outerContext) {
        if (this.debug || this.debug_list_atn_decisions) {
            console.log("execATNWithFullContext "+s0);
        }
        const fullCtx = true;
        let foundExactAmbig = false;
        let reach;
        let previous = s0;
        input.seek(startIndex);
        let t = input.LA(1);
        let predictedAlt = -1;
        while (true) { // while more work
            reach = this.computeReachSet(previous, t, fullCtx);
            if (reach===null) {
                // if any configs in previous dipped into outer context, that
                // means that input up to t actually finished entry rule
                // at least for LL decision. Full LL doesn't dip into outer
                // so don't need special case.
                // We will get an error no matter what so delay until after
                // decision; better error message. Also, no reachable target
                // ATN states in SLL implies LL will also get nowhere.
                // If conflict in states that dip out, choose min since we
                // will get error no matter what.
                const e = this.noViableAlt(input, outerContext, previous, startIndex);
                input.seek(startIndex);
                const alt = this.getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(previous, outerContext);
                if(alt!==ATN.INVALID_ALT_NUMBER) {
                    return alt;
                } else {
                    throw e;
                }
            }
            const altSubSets = PredictionMode.getConflictingAltSubsets(reach);
            if(this.debug) {
                console.log("LL altSubSets=" + altSubSets + ", predict=" +
                      PredictionMode.getUniqueAlt(altSubSets) + ", resolvesToJustOneViableAlt=" +
                      PredictionMode.resolvesToJustOneViableAlt(altSubSets));
            }
            reach.uniqueAlt = this.getUniqueAlt(reach);
            // unique prediction?
            if(reach.uniqueAlt!==ATN.INVALID_ALT_NUMBER) {
                predictedAlt = reach.uniqueAlt;
                break;
            } else if (this.predictionMode !== PredictionMode.LL_EXACT_AMBIG_DETECTION) {
                predictedAlt = PredictionMode.resolvesToJustOneViableAlt(altSubSets);
                if(predictedAlt !== ATN.INVALID_ALT_NUMBER) {
                    break;
                }
            } else {
                // In exact ambiguity mode, we never try to terminate early.
                // Just keeps scarfing until we know what the conflict is
                if (PredictionMode.allSubsetsConflict(altSubSets) && PredictionMode.allSubsetsEqual(altSubSets)) {
                    foundExactAmbig = true;
                    predictedAlt = PredictionMode.getSingleViableAlt(altSubSets);
                    break;
                }
                // else there are multiple non-conflicting subsets or
                // we're not sure what the ambiguity is yet.
                // So, keep going.
            }
            previous = reach;
            if( t !== Token.EOF) {
                input.consume();
                t = input.LA(1);
            }
        }
        // If the configuration set uniquely predicts an alternative,
        // without conflict, then we know that it's a full LL decision
        // not SLL.
        if (reach.uniqueAlt !== ATN.INVALID_ALT_NUMBER ) {
            this.reportContextSensitivity(dfa, predictedAlt, reach, startIndex, input.index);
            return predictedAlt;
        }
        // We do not check predicates here because we have checked them
        // on-the-fly when doing full context prediction.

        //
        // In non-exact ambiguity detection mode, we might	actually be able to
        // detect an exact ambiguity, but I'm not going to spend the cycles
        // needed to check. We only emit ambiguity warnings in exact ambiguity
        // mode.
        //
        // For example, we might know that we have conflicting configurations.
        // But, that does not mean that there is no way forward without a
        // conflict. It's possible to have nonconflicting alt subsets as in:

        // altSubSets=[{1, 2}, {1, 2}, {1}, {1, 2}]

        // from
        //
        //    [(17,1,[5 $]), (13,1,[5 10 $]), (21,1,[5 10 $]), (11,1,[$]),
        //     (13,2,[5 10 $]), (21,2,[5 10 $]), (11,2,[$])]
        //
        // In this case, (17,1,[5 $]) indicates there is some next sequence that
        // would resolve this without conflict to alternative 1. Any other viable
        // next sequence, however, is associated with a conflict.  We stop
        // looking for input because no amount of further lookahead will alter
        // the fact that we should predict alternative 1.  We just can't say for
        // sure that there is an ambiguity without looking further.

        this.reportAmbiguity(dfa, D, startIndex, input.index, foundExactAmbig, null, reach);

        return predictedAlt;
    }

    computeReachSet(closure, t, fullCtx) {
        if (this.debug) {
            console.log("in computeReachSet, starting closure: " + closure);
        }
        if( this.mergeCache===null) {
            this.mergeCache = new DoubleDict();
        }
        const intermediate = new ATNConfigSet(fullCtx);

        // Configurations already in a rule stop state indicate reaching the end
        // of the decision rule (local context) or end of the start rule (full
        // context). Once reached, these configurations are never updated by a
        // closure operation, so they are handled separately for the performance
        // advantage of having a smaller intermediate set when calling closure.
        //
        // For full-context reach operations, separate handling is required to
        // ensure that the alternative matching the longest overall sequence is
        // chosen when multiple such configurations can match the input.

        let skippedStopStates = null;

        // First figure out where we can reach on input t
        for (let i=0; i<closure.items.length;i++) {
            const c = closure.items[i];
            if(this.debug) {
                console.log("testing " + this.getTokenName(t) + " at " + c);
            }
            if (c.state instanceof RuleStopState) {
                if (fullCtx || t === Token.EOF) {
                    if (skippedStopStates===null) {
                        skippedStopStates = [];
                    }
                    skippedStopStates.push(c);
                    if(this.debug_add) {
                        console.log("added " + c + " to skippedStopStates");
                    }
                }
                continue;
            }
            for(let j=0;j<c.state.transitions.length;j++) {
                const trans = c.state.transitions[j];
                const target = this.getReachableTarget(trans, t);
                if (target!==null) {
                    const cfg = new ATNConfig({state:target}, c);
                    intermediate.add(cfg, this.mergeCache);
                    if(this.debug_add) {
                        console.log("added " + cfg + " to intermediate");
                    }
                }
            }
        }
        // Now figure out where the reach operation can take us...
        let reach = null;

        // This block optimizes the reach operation for intermediate sets which
        // trivially indicate a termination state for the overall
        // adaptivePredict operation.
        //
        // The conditions assume that intermediate
        // contains all configurations relevant to the reach set, but this
        // condition is not true when one or more configurations have been
        // withheld in skippedStopStates, or when the current symbol is EOF.
        //
        if (skippedStopStates===null && t!==Token.EOF) {
            if (intermediate.items.length===1) {
                // Don't pursue the closure if there is just one state.
                // It can only have one alternative; just add to result
                // Also don't pursue the closure if there is unique alternative
                // among the configurations.
                reach = intermediate;
            } else if (this.getUniqueAlt(intermediate)!==ATN.INVALID_ALT_NUMBER) {
                // Also don't pursue the closure if there is unique alternative
                // among the configurations.
                reach = intermediate;
            }
        }
        // If the reach set could not be trivially determined, perform a closure
        // operation on the intermediate set to compute its initial value.
        //
        if (reach===null) {
            reach = new ATNConfigSet(fullCtx);
            const closureBusy = new Set();
            const treatEofAsEpsilon = t === Token.EOF;
            for (let k=0; k<intermediate.items.length;k++) {
                this.closure(intermediate.items[k], reach, closureBusy, false, fullCtx, treatEofAsEpsilon);
            }
        }
        if (t === Token.EOF) {
            // After consuming EOF no additional input is possible, so we are
            // only interested in configurations which reached the end of the
            // decision rule (local context) or end of the start rule (full
            // context). Update reach to contain only these configurations. This
            // handles both explicit EOF transitions in the grammar and implicit
            // EOF transitions following the end of the decision or start rule.
            //
            // When reach==intermediate, no closure operation was performed. In
            // this case, removeAllConfigsNotInRuleStopState needs to check for
            // reachable rule stop states as well as configurations already in
            // a rule stop state.
            //
            // This is handled before the configurations in skippedStopStates,
            // because any configurations potentially added from that list are
            // already guaranteed to meet this condition whether or not it's
            // required.
            //
            reach = this.removeAllConfigsNotInRuleStopState(reach, reach === intermediate);
        }
        // If skippedStopStates!==null, then it contains at least one
        // configuration. For full-context reach operations, these
        // configurations reached the end of the start rule, in which case we
        // only add them back to reach if no configuration during the current
        // closure operation reached such a state. This ensures adaptivePredict
        // chooses an alternative matching the longest overall sequence when
        // multiple alternatives are viable.
        //
        if (skippedStopStates!==null && ( (! fullCtx) || (! PredictionMode.hasConfigInRuleStopState(reach)))) {
            for (let l=0; l<skippedStopStates.length;l++) {
                reach.add(skippedStopStates[l], this.mergeCache);
            }
        }
        if (reach.items.length===0) {
            return null;
        } else {
            return reach;
        }
    }

    /**
     * Return a configuration set containing only the configurations from
     * {@code configs} which are in a {@link RuleStopState}. If all
     * configurations in {@code configs} are already in a rule stop state, this
     * method simply returns {@code configs}.
     *
     * <p>When {@code lookToEndOfRule} is true, this method uses
     * {@link ATN//nextTokens} for each configuration in {@code configs} which is
     * not already in a rule stop state to see if a rule stop state is reachable
     * from the configuration via epsilon-only transitions.</p>
     *
     * @param configs the configuration set to update
     * @param lookToEndOfRule when true, this method checks for rule stop states
     * reachable by epsilon-only transitions from each configuration in
     * {@code configs}.
     *
     * @return {@code configs} if all configurations in {@code configs} are in a
     * rule stop state, otherwise return a new configuration set containing only
     * the configurations from {@code configs} which are in a rule stop state
     */
    removeAllConfigsNotInRuleStopState(configs, lookToEndOfRule) {
        if (PredictionMode.allConfigsInRuleStopStates(configs)) {
            return configs;
        }
        const result = new ATNConfigSet(configs.fullCtx);
        for(let i=0; i<configs.items.length;i++) {
            const config = configs.items[i];
            if (config.state instanceof RuleStopState) {
                result.add(config, this.mergeCache);
                continue;
            }
            if (lookToEndOfRule && config.state.epsilonOnlyTransitions) {
                const nextTokens = this.atn.nextTokens(config.state);
                if (nextTokens.contains(Token.EPSILON)) {
                    const endOfRuleState = this.atn.ruleToStopState[config.state.ruleIndex];
                    result.add(new ATNConfig({state:endOfRuleState}, config), this.mergeCache);
                }
            }
        }
        return result;
    }

    computeStartState(p, ctx, fullCtx) {
        // always at least the implicit call to start rule
        const initialContext = predictionContextFromRuleContext(this.atn, ctx);
        const configs = new ATNConfigSet(fullCtx);
        for(let i=0;i<p.transitions.length;i++) {
            const target = p.transitions[i].target;
            const c = new ATNConfig({ state:target, alt:i+1, context:initialContext }, null);
            const closureBusy = new Set();
            this.closure(c, configs, closureBusy, true, fullCtx, false);
        }
        return configs;
    }

    /**
     * This method transforms the start state computed by
     * {@link //computeStartState} to the special start state used by a
     * precedence DFA for a particular precedence value. The transformation
     * process applies the following changes to the start state's configuration
     * set.
     *
     * <ol>
     * <li>Evaluate the precedence predicates for each configuration using
     * {@link SemanticContext//evalPrecedence}.</li>
     * <li>Remove all configurations which predict an alternative greater than
     * 1, for which another configuration that predicts alternative 1 is in the
     * same ATN state with the same prediction context. This transformation is
     * valid for the following reasons:
     * <ul>
     * <li>The closure block cannot contain any epsilon transitions which bypass
     * the body of the closure, so all states reachable via alternative 1 are
     * part of the precedence alternatives of the transformed left-recursive
     * rule.</li>
     * <li>The "primary" portion of a left recursive rule cannot contain an
     * epsilon transition, so the only way an alternative other than 1 can exist
     * in a state that is also reachable via alternative 1 is by nesting calls
     * to the left-recursive rule, with the outer calls not being at the
     * preferred precedence level.</li>
     * </ul>
     * </li>
     * </ol>
     *
     * <p>
     * The prediction context must be considered by this filter to address
     * situations like the following.
     * </p>
     * <code>
     * <pre>
     * grammar TA;
     * prog: statement* EOF;
     * statement: letterA | statement letterA 'b' ;
     * letterA: 'a';
     * </pre>
     * </code>
     * <p>
     * If the above grammar, the ATN state immediately before the token
     * reference {@code 'a'} in {@code letterA} is reachable from the left edge
     * of both the primary and closure blocks of the left-recursive rule
     * {@code statement}. The prediction context associated with each of these
     * configurations distinguishes between them, and prevents the alternative
     * which stepped out to {@code prog} (and then back in to {@code statement}
     * from being eliminated by the filter.
     * </p>
     *
     * @param configs The configuration set computed by
     * {@link //computeStartState} as the start state for the DFA.
     * @return The transformed configuration set representing the start state
     * for a precedence DFA at a particular precedence level (determined by
     * calling {@link Parser//getPrecedence})
     */
    applyPrecedenceFilter(configs) {
        let config;
        const statesFromAlt1 = [];
        const configSet = new ATNConfigSet(configs.fullCtx);
        for(let i=0; i<configs.items.length; i++) {
            config = configs.items[i];
            // handle alt 1 first
            if (config.alt !== 1) {
                continue;
            }
            const updatedContext = config.semanticContext.evalPrecedence(this.parser, this._outerContext);
            if (updatedContext===null) {
                // the configuration was eliminated
                continue;
            }
            statesFromAlt1[config.state.stateNumber] = config.context;
            if (updatedContext !== config.semanticContext) {
                configSet.add(new ATNConfig({semanticContext:updatedContext}, config), this.mergeCache);
            } else {
                configSet.add(config, this.mergeCache);
            }
        }
        for(let i=0; i<configs.items.length; i++) {
            config = configs.items[i];
            if (config.alt === 1) {
                // already handled
                continue;
            }
            // In the future, this elimination step could be updated to also
            // filter the prediction context for alternatives predicting alt>1
            // (basically a graph subtraction algorithm).
            if (!config.precedenceFilterSuppressed) {
                const context = statesFromAlt1[config.state.stateNumber] || null;
                if (context!==null && context.equals(config.context)) {
                    // eliminated
                    continue;
                }
            }
            configSet.add(config, this.mergeCache);
        }
        return configSet;
    }

    getReachableTarget(trans, ttype) {
        if (trans.matches(ttype, 0, this.atn.maxTokenType)) {
            return trans.target;
        } else {
            return null;
        }
    }

    getPredsForAmbigAlts(ambigAlts, configs, nalts) {
        // REACH=[1|1|[]|0:0, 1|2|[]|0:1]
        // altToPred starts as an array of all null contexts. The entry at index i
        // corresponds to alternative i. altToPred[i] may have one of three values:
        //   1. null: no ATNConfig c is found such that c.alt==i
        //   2. SemanticContext.NONE: At least one ATNConfig c exists such that
        //      c.alt==i and c.semanticContext==SemanticContext.NONE. In other words,
        //      alt i has at least one unpredicated config.
        //   3. Non-NONE Semantic Context: There exists at least one, and for all
        //      ATNConfig c such that c.alt==i, c.semanticContext!=SemanticContext.NONE.
        //
        // From this, it is clear that NONE||anything==NONE.
        //
        let altToPred = [];
        for(let i=0;i<configs.items.length;i++) {
            const c = configs.items[i];
            if(ambigAlts.contains( c.alt )) {
                altToPred[c.alt] = SemanticContext.orContext(altToPred[c.alt] || null, c.semanticContext);
            }
        }
        let nPredAlts = 0;
        for (let i =1;i< nalts+1;i++) {
            const pred = altToPred[i] || null;
            if (pred===null) {
                altToPred[i] = SemanticContext.NONE;
            } else if (pred !== SemanticContext.NONE) {
                nPredAlts += 1;
            }
        }
        // nonambig alts are null in altToPred
        if (nPredAlts===0) {
            altToPred = null;
        }
        if (this.debug) {
            console.log("getPredsForAmbigAlts result " + Utils.arrayToString(altToPred));
        }
        return altToPred;
    }

    getPredicatePredictions(ambigAlts, altToPred) {
        const pairs = [];
        let containsPredicate = false;
        for (let i=1; i<altToPred.length;i++) {
            const pred = altToPred[i];
            // unpredicated is indicated by SemanticContext.NONE
            if( ambigAlts!==null && ambigAlts.contains( i )) {
                pairs.push(new PredPrediction(pred, i));
            }
            if (pred !== SemanticContext.NONE) {
                containsPredicate = true;
            }
        }
        if (! containsPredicate) {
            return null;
        }
        return pairs;
    }

    /**
     * This method is used to improve the localization of error messages by
     * choosing an alternative rather than throwing a
     * {@link NoViableAltException} in particular prediction scenarios where the
     * {@link //ERROR} state was reached during ATN simulation.
     *
     * <p>
     * The default implementation of this method uses the following
     * algorithm to identify an ATN configuration which successfully parsed the
     * decision entry rule. Choosing such an alternative ensures that the
     * {@link ParserRuleContext} returned by the calling rule will be complete
     * and valid, and the syntax error will be reported later at a more
     * localized location.</p>
     *
     * <ul>
     * <li>If a syntactically valid path or paths reach the end of the decision rule and
     * they are semantically valid if predicated, return the min associated alt.</li>
     * <li>Else, if a semantically invalid but syntactically valid path exist
     * or paths exist, return the minimum associated alt.
     * </li>
     * <li>Otherwise, return {@link ATN//INVALID_ALT_NUMBER}.</li>
     * </ul>
     *
     * <p>
     * In some scenarios, the algorithm described above could predict an
     * alternative which will result in a {@link FailedPredicateException} in
     * the parser. Specifically, this could occur if the <em>only</em> configuration
     * capable of successfully parsing to the end of the decision rule is
     * blocked by a semantic predicate. By choosing this alternative within
     * {@link //adaptivePredict} instead of throwing a
     * {@link NoViableAltException}, the resulting
     * {@link FailedPredicateException} in the parser will identify the specific
     * predicate which is preventing the parser from successfully parsing the
     * decision rule, which helps developers identify and correct logic errors
     * in semantic predicates.
     * </p>
     *
     * @param configs The ATN configurations which were valid immediately before
     * the {@link //ERROR} state was reached
     * @param outerContext The is the \gamma_0 initial parser context from the paper
     * or the parser stack at the instant before prediction commences.
     *
     * @return The value to return from {@link //adaptivePredict}, or
     * {@link ATN//INVALID_ALT_NUMBER} if a suitable alternative was not
     * identified and {@link //adaptivePredict} should report an error instead
     */
    getSynValidOrSemInvalidAltThatFinishedDecisionEntryRule(configs, outerContext) {
        const cfgs = this.splitAccordingToSemanticValidity(configs, outerContext);
        const semValidConfigs = cfgs[0];
        const semInvalidConfigs = cfgs[1];
        let alt = this.getAltThatFinishedDecisionEntryRule(semValidConfigs);
        if (alt!==ATN.INVALID_ALT_NUMBER) { // semantically/syntactically viable path exists
            return alt;
        }
        // Is there a syntactically valid path with a failed pred?
        if (semInvalidConfigs.items.length>0) {
            alt = this.getAltThatFinishedDecisionEntryRule(semInvalidConfigs);
            if (alt!==ATN.INVALID_ALT_NUMBER) { // syntactically viable path exists
                return alt;
            }
        }
        return ATN.INVALID_ALT_NUMBER;
    }

    getAltThatFinishedDecisionEntryRule(configs) {
        const alts = [];
        for(let i=0;i<configs.items.length; i++) {
            const c = configs.items[i];
            if (c.reachesIntoOuterContext>0 || ((c.state instanceof RuleStopState) && c.context.hasEmptyPath())) {
                if(alts.indexOf(c.alt)<0) {
                    alts.push(c.alt);
                }
            }
        }
        if (alts.length===0) {
            return ATN.INVALID_ALT_NUMBER;
        } else {
            return Math.min.apply(null, alts);
        }
    }

    /**
     * Walk the list of configurations and split them according to
     * those that have preds evaluating to true/false.  If no pred, assume
     * true pred and include in succeeded set.  Returns Pair of sets.
     *
     * Create a new set so as not to alter the incoming parameter.
     *
     * Assumption: the input stream has been restored to the starting point
     * prediction, which is where predicates need to evaluate.*/
    splitAccordingToSemanticValidity( configs, outerContext) {
        const succeeded = new ATNConfigSet(configs.fullCtx);
        const failed = new ATNConfigSet(configs.fullCtx);
        for(let i=0;i<configs.items.length; i++) {
            const c = configs.items[i];
            if (c.semanticContext !== SemanticContext.NONE) {
                const predicateEvaluationResult = c.semanticContext.evaluate(this.parser, outerContext);
                if (predicateEvaluationResult) {
                    succeeded.add(c);
                } else {
                    failed.add(c);
                }
            } else {
                succeeded.add(c);
            }
        }
        return [succeeded, failed];
    }

    /**
     * Look through a list of predicate/alt pairs, returning alts for the
     * pairs that win. A {@code NONE} predicate indicates an alt containing an
     * unpredicated config which behaves as "always true." If !complete
     * then we stop at the first predicate that evaluates to true. This
     * includes pairs with null predicates.
     */
    evalSemanticContext(predPredictions, outerContext, complete) {
        const predictions = new BitSet();
        for(let i=0;i<predPredictions.length;i++) {
            const pair = predPredictions[i];
            if (pair.pred === SemanticContext.NONE) {
                predictions.add(pair.alt);
                if (! complete) {
                    break;
                }
                continue;
            }
            const predicateEvaluationResult = pair.pred.evaluate(this.parser, outerContext);
            if (this.debug || this.dfa_debug) {
                console.log("eval pred " + pair + "=" + predicateEvaluationResult);
            }
            if (predicateEvaluationResult) {
                if (this.debug || this.dfa_debug) {
                    console.log("PREDICT " + pair.alt);
                }
                predictions.add(pair.alt);
                if (! complete) {
                    break;
                }
            }
        }
        return predictions;
    }

// TODO: If we are doing predicates, there is no point in pursuing
//     closure operations if we reach a DFA state that uniquely predicts
//     alternative. We will not be caching that DFA state and it is a
//     waste to pursue the closure. Might have to advance when we do
//     ambig detection thought :(
//
    closure(config, configs, closureBusy, collectPredicates, fullCtx, treatEofAsEpsilon) {
        const initialDepth = 0;
        this.closureCheckingStopState(config, configs, closureBusy, collectPredicates,
                                 fullCtx, initialDepth, treatEofAsEpsilon);
    }

    closureCheckingStopState(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
        if (this.debug || this.debug_closure) {
            console.log("closure(" + config.toString(this.parser,true) + ")");
            // console.log("configs(" + configs.toString() + ")");
            if(config.reachesIntoOuterContext>50) {
                throw "problem";
            }
        }
        if (config.state instanceof RuleStopState) {
            // We hit rule end. If we have context info, use it
            // run thru all possible stack tops in ctx
            if (! config.context.isEmpty()) {
                for (let i =0; i<config.context.length; i++) {
                    if (config.context.getReturnState(i) === PredictionContext.EMPTY_RETURN_STATE) {
                        if (fullCtx) {
                            configs.add(new ATNConfig({state:config.state, context:PredictionContext.EMPTY}, config), this.mergeCache);
                            continue;
                        } else {
                            // we have no context info, just chase follow links (if greedy)
                            if (this.debug) {
                                console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
                            }
                            this.closure_(config, configs, closureBusy, collectPredicates,
                                     fullCtx, depth, treatEofAsEpsilon);
                        }
                        continue;
                    }
                    const returnState = this.atn.states[config.context.getReturnState(i)];
                    const newContext = config.context.getParent(i); // "pop" return state
                    const parms = {state:returnState, alt:config.alt, context:newContext, semanticContext:config.semanticContext};
                    const c = new ATNConfig(parms, null);
                    // While we have context to pop back from, we may have
                    // gotten that context AFTER having falling off a rule.
                    // Make sure we track that we are now out of context.
                    c.reachesIntoOuterContext = config.reachesIntoOuterContext;
                    this.closureCheckingStopState(c, configs, closureBusy, collectPredicates, fullCtx, depth - 1, treatEofAsEpsilon);
                }
                return;
            } else if( fullCtx) {
                // reached end of start rule
                configs.add(config, this.mergeCache);
                return;
            } else {
                // else if we have no context info, just chase follow links (if greedy)
                if (this.debug) {
                    console.log("FALLING off rule " + this.getRuleName(config.state.ruleIndex));
                }
            }
        }
        this.closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon);
    }

    // Do the actual work of walking epsilon edges//
    closure_(config, configs, closureBusy, collectPredicates, fullCtx, depth, treatEofAsEpsilon) {
        const p = config.state;
        // optimization
        if (! p.epsilonOnlyTransitions) {
            configs.add(config, this.mergeCache);
            // make sure to not return here, because EOF transitions can act as
            // both epsilon transitions and non-epsilon transitions.
        }
        for(let i = 0;i<p.transitions.length; i++) {
            if(i === 0 && this.canDropLoopEntryEdgeInLeftRecursiveRule(config))
                continue;

            const t = p.transitions[i];
            const continueCollecting = collectPredicates && !(t instanceof ActionTransition);
            const c = this.getEpsilonTarget(config, t, continueCollecting, depth === 0, fullCtx, treatEofAsEpsilon);
            if (c!==null) {
                let newDepth = depth;
                if ( config.state instanceof RuleStopState) {
                    // target fell off end of rule; mark resulting c as having dipped into outer context
                    // We can't get here if incoming config was rule stop and we had context
                    // track how far we dip into outer context.  Might
                    // come in handy and we avoid evaluating context dependent
                    // preds if this is > 0.
                    if (this._dfa !== null && this._dfa.precedenceDfa) {
                        if (t.outermostPrecedenceReturn === this._dfa.atnStartState.ruleIndex) {
                            c.precedenceFilterSuppressed = true;
                        }
                    }

                    c.reachesIntoOuterContext += 1;
                    if (closureBusy.add(c)!==c) {
                        // avoid infinite recursion for right-recursive rules
                        continue;
                    }
                    configs.dipsIntoOuterContext = true; // TODO: can remove? only care when we add to set per middle of this method
                    newDepth -= 1;
                    if (this.debug) {
                        console.log("dips into outer ctx: " + c);
                    }
                } else {
                    if (!t.isEpsilon && closureBusy.add(c)!==c){
                        // avoid infinite recursion for EOF* and EOF+
                        continue;
                    }
                    if (t instanceof RuleTransition) {
                        // latch when newDepth goes negative - once we step out of the entry context we can't return
                        if (newDepth >= 0) {
                            newDepth += 1;
                        }
                    }
                }
                this.closureCheckingStopState(c, configs, closureBusy, continueCollecting, fullCtx, newDepth, treatEofAsEpsilon);
            }
        }
    }

    canDropLoopEntryEdgeInLeftRecursiveRule(config) {
        // return False
        const p = config.state;
        // First check to see if we are in StarLoopEntryState generated during
        // left-recursion elimination. For efficiency, also check if
        // the context has an empty stack case. If so, it would mean
        // global FOLLOW so we can't perform optimization
        // Are we the special loop entry/exit state? or SLL wildcard
        if(p.stateType !== ATNState.STAR_LOOP_ENTRY)
            return false;
        if(p.stateType !== ATNState.STAR_LOOP_ENTRY || !p.isPrecedenceDecision ||
               config.context.isEmpty() || config.context.hasEmptyPath())
            return false;

        // Require all return states to return back to the same rule that p is in.
        const numCtxs = config.context.length;
        for(let i=0; i<numCtxs; i++) { // for each stack context
            const returnState = this.atn.states[config.context.getReturnState(i)];
            if (returnState.ruleIndex !== p.ruleIndex)
                return false;
        }

        const decisionStartState = p.transitions[0].target;
        const blockEndStateNum = decisionStartState.endState.stateNumber;
        const blockEndState = this.atn.states[blockEndStateNum];

        // Verify that the top of each stack context leads to loop entry/exit
        // state through epsilon edges and w/o leaving rule.
        for(let i=0; i<numCtxs; i++) { // for each stack context
            const returnStateNumber = config.context.getReturnState(i);
            const returnState = this.atn.states[returnStateNumber];
            // all states must have single outgoing epsilon edge
            if (returnState.transitions.length !== 1 || !returnState.transitions[0].isEpsilon)
                return false;

            // Look for prefix op case like 'not expr', (' type ')' expr
            const returnStateTarget = returnState.transitions[0].target;
            if ( returnState.stateType === ATNState.BLOCK_END && returnStateTarget === p )
                continue;

            // Look for 'expr op expr' or case where expr's return state is block end
            // of (...)* internal block; the block end points to loop back
            // which points to p but we don't need to check that
            if ( returnState === blockEndState )
                continue;

            // Look for ternary expr ? expr : expr. The return state points at block end,
            // which points at loop entry state
            if ( returnStateTarget === blockEndState )
                continue;

            // Look for complex prefix 'between expr and expr' case where 2nd expr's
            // return state points at block end state of (...)* internal block
            if (returnStateTarget.stateType === ATNState.BLOCK_END && returnStateTarget.transitions.length === 1
                    && returnStateTarget.transitions[0].isEpsilon && returnStateTarget.transitions[0].target === p)
                continue;

            // anything else ain't conforming
            return false;
        }
        return true;
    }

    getRuleName(index) {
        if (this.parser!==null && index>=0) {
            return this.parser.ruleNames[index];
        } else {
            return "<rule " + index + ">";
        }
    }

    getEpsilonTarget(config, t, collectPredicates, inContext, fullCtx, treatEofAsEpsilon) {
        switch(t.serializationType) {
        case Transition.RULE:
            return this.ruleTransition(config, t);
        case Transition.PRECEDENCE:
            return this.precedenceTransition(config, t, collectPredicates, inContext, fullCtx);
        case Transition.PREDICATE:
            return this.predTransition(config, t, collectPredicates, inContext, fullCtx);
        case Transition.ACTION:
            return this.actionTransition(config, t);
        case Transition.EPSILON:
            return new ATNConfig({state:t.target}, config);
        case Transition.ATOM:
        case Transition.RANGE:
        case Transition.SET:
            // EOF transitions act like epsilon transitions after the first EOF
            // transition is traversed
            if (treatEofAsEpsilon) {
                if (t.matches(Token.EOF, 0, 1)) {
                    return new ATNConfig({state: t.target}, config);
                }
            }
            return null;
        default:
            return null;
        }
    }

    actionTransition(config, t) {
        if (this.debug) {
            const index = t.actionIndex === -1 ? 65535 : t.actionIndex;
            console.log("ACTION edge " + t.ruleIndex + ":" + index);
        }
        return new ATNConfig({state:t.target}, config);
    }

    precedenceTransition(config, pt, collectPredicates, inContext, fullCtx) {
        if (this.debug) {
            console.log("PRED (collectPredicates=" + collectPredicates + ") " +
                    pt.precedence + ">=_p, ctx dependent=true");
            if (this.parser!==null) {
                console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
            }
        }
        let c = null;
        if (collectPredicates && inContext) {
            if (fullCtx) {
                // In full context mode, we can evaluate predicates on-the-fly
                // during closure, which dramatically reduces the size of
                // the config sets. It also obviates the need to test predicates
                // later during conflict resolution.
                const currentPosition = this._input.index;
                this._input.seek(this._startIndex);
                const predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);
                this._input.seek(currentPosition);
                if (predSucceeds) {
                    c = new ATNConfig({state:pt.target}, config); // no pred context
                }
            } else {
                const newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
                c = new ATNConfig({state:pt.target, semanticContext:newSemCtx}, config);
            }
        } else {
            c = new ATNConfig({state:pt.target}, config);
        }
        if (this.debug) {
            console.log("config from pred transition=" + c);
        }
        return c;
    }

    predTransition(config, pt, collectPredicates, inContext, fullCtx) {
        if (this.debug) {
            console.log("PRED (collectPredicates=" + collectPredicates + ") " + pt.ruleIndex +
                    ":" + pt.predIndex + ", ctx dependent=" + pt.isCtxDependent);
            if (this.parser!==null) {
                console.log("context surrounding pred is " + Utils.arrayToString(this.parser.getRuleInvocationStack()));
            }
        }
        let c = null;
        if (collectPredicates && ((pt.isCtxDependent && inContext) || ! pt.isCtxDependent)) {
            if (fullCtx) {
                // In full context mode, we can evaluate predicates on-the-fly
                // during closure, which dramatically reduces the size of
                // the config sets. It also obviates the need to test predicates
                // later during conflict resolution.
                const currentPosition = this._input.index;
                this._input.seek(this._startIndex);
                const predSucceeds = pt.getPredicate().evaluate(this.parser, this._outerContext);
                this._input.seek(currentPosition);
                if (predSucceeds) {
                    c = new ATNConfig({state:pt.target}, config); // no pred context
                }
            } else {
                const newSemCtx = SemanticContext.andContext(config.semanticContext, pt.getPredicate());
                c = new ATNConfig({state:pt.target, semanticContext:newSemCtx}, config);
            }
        } else {
            c = new ATNConfig({state:pt.target}, config);
        }
        if (this.debug) {
            console.log("config from pred transition=" + c);
        }
        return c;
    }

    ruleTransition(config, t) {
        if (this.debug) {
            console.log("CALL rule " + this.getRuleName(t.target.ruleIndex) + ", ctx=" + config.context);
        }
        const returnState = t.followState;
        const newContext = SingletonPredictionContext.create(config.context, returnState.stateNumber);
        return new ATNConfig({state:t.target, context:newContext}, config );
    }

    getConflictingAlts(configs) {
        const altsets = PredictionMode.getConflictingAltSubsets(configs);
        return PredictionMode.getAlts(altsets);
    }

    /**
     * Sam pointed out a problem with the previous definition, v3, of
     * ambiguous states. If we have another state associated with conflicting
     * alternatives, we should keep going. For example, the following grammar
     *
     * s : (ID | ID ID?) ';' ;
     *
     * When the ATN simulation reaches the state before ';', it has a DFA
     * state that looks like: [12|1|[], 6|2|[], 12|2|[]]. Naturally
     * 12|1|[] and 12|2|[] conflict, but we cannot stop processing this node
     * because alternative to has another way to continue, via [6|2|[]].
     * The key is that we have a single state that has config's only associated
     * with a single alternative, 2, and crucially the state transitions
     * among the configurations are all non-epsilon transitions. That means
     * we don't consider any conflicts that include alternative 2. So, we
     * ignore the conflict between alts 1 and 2. We ignore a set of
     * conflicting alts when there is an intersection with an alternative
     * associated with a single alt state in the state&rarr;config-list map.
     *
     * It's also the case that we might have two conflicting configurations but
     * also a 3rd nonconflicting configuration for a different alternative:
     * [1|1|[], 1|2|[], 8|3|[]]. This can come about from grammar:
     *
     * a : A | A | A B ;
     *
     * After matching input A, we reach the stop state for rule A, state 1.
     * State 8 is the state right before B. Clearly alternatives 1 and 2
     * conflict and no amount of further lookahead will separate the two.
     * However, alternative 3 will be able to continue and so we do not
     * stop working on this state. In the previous example, we're concerned
     * with states associated with the conflicting alternatives. Here alt
     * 3 is not associated with the conflicting configs, but since we can continue
     * looking for input reasonably, I don't declare the state done. We
     * ignore a set of conflicting alts when we have an alternative
     * that we still need to pursue
     */
    getConflictingAltsOrUniqueAlt(configs) {
        let conflictingAlts = null;
        if (configs.uniqueAlt!== ATN.INVALID_ALT_NUMBER) {
            conflictingAlts = new BitSet();
            conflictingAlts.add(configs.uniqueAlt);
        } else {
            conflictingAlts = configs.conflictingAlts;
        }
        return conflictingAlts;
    }

    getTokenName(t) {
        if (t===Token.EOF) {
            return "EOF";
        }
        if( this.parser!==null && this.parser.literalNames!==null) {
            if (t >= this.parser.literalNames.length && t >= this.parser.symbolicNames.length) {
                console.log("" + t + " ttype out of range: " + this.parser.literalNames);
                console.log("" + this.parser.getInputStream().getTokens());
            } else {
                const name = this.parser.literalNames[t] || this.parser.symbolicNames[t];
                return name + "<" + t + ">";
            }
        }
        return "" + t;
    }

    getLookaheadName(input) {
        return this.getTokenName(input.LA(1));
    }

    /**
     * Used for debugging in adaptivePredict around execATN but I cut
     * it out for clarity now that alg. works well. We can leave this
     * "dead" code for a bit
     */
    dumpDeadEndConfigs(nvae) {
        console.log("dead end configs: ");
        const decs = nvae.getDeadEndConfigs();
        for(let i=0; i<decs.length; i++) {
            const c = decs[i];
            let trans = "no edges";
            if (c.state.transitions.length>0) {
                const t = c.state.transitions[0];
                if (t instanceof AtomTransition) {
                    trans = "Atom "+ this.getTokenName(t.label);
                } else if (t instanceof SetTransition) {
                    const neg = (t instanceof NotSetTransition);
                    trans = (neg ? "~" : "") + "Set " + t.set;
                }
            }
            console.error(c.toString(this.parser, true) + ":" + trans);
        }
    }

    noViableAlt(input, outerContext, configs, startIndex) {
        return new NoViableAltException(this.parser, input, input.get(startIndex), input.LT(1), configs, outerContext);
    }

    getUniqueAlt(configs) {
        let alt = ATN.INVALID_ALT_NUMBER;
        for(let i=0;i<configs.items.length;i++) {
            const c = configs.items[i];
            if (alt === ATN.INVALID_ALT_NUMBER) {
                alt = c.alt // found first alt
            } else if( c.alt!==alt) {
                return ATN.INVALID_ALT_NUMBER;
            }
        }
        return alt;
    }

    /**
     * Add an edge to the DFA, if possible. This method calls
     * {@link //addDFAState} to ensure the {@code to} state is present in the
     * DFA. If {@code from} is {@code null}, or if {@code t} is outside the
     * range of edges that can be represented in the DFA tables, this method
     * returns without adding the edge to the DFA.
     *
     * <p>If {@code to} is {@code null}, this method returns {@code null}.
     * Otherwise, this method returns the {@link DFAState} returned by calling
     * {@link //addDFAState} for the {@code to} state.</p>
     *
     * @param dfa The DFA
     * @param from_ The source state for the edge
     * @param t The input symbol
     * @param to The target state for the edge
     *
     * @return If {@code to} is {@code null}, this method returns {@code null};
     * otherwise this method returns the result of calling {@link //addDFAState}
     * on {@code to}
     */
    addDFAEdge(dfa, from_, t, to) {
        if( this.debug) {
            console.log("EDGE " + from_ + " -> " + to + " upon " + this.getTokenName(t));
        }
        if (to===null) {
            return null;
        }
        to = this.addDFAState(dfa, to); // used existing if possible not incoming
        if (from_===null || t < -1 || t > this.atn.maxTokenType) {
            return to;
        }
        if (from_.edges===null) {
            from_.edges = [];
        }
        from_.edges[t+1] = to; // connect

        if (this.debug) {
            const literalNames = this.parser===null ? null : this.parser.literalNames;
            const symbolicNames = this.parser===null ? null : this.parser.symbolicNames;
            console.log("DFA=\n" + dfa.toString(literalNames, symbolicNames));
        }
        return to;
    }

    /**
     * Add state {@code D} to the DFA if it is not already present, and return
     * the actual instance stored in the DFA. If a state equivalent to {@code D}
     * is already in the DFA, the existing state is returned. Otherwise this
     * method returns {@code D} after adding it to the DFA.
     *
     * <p>If {@code D} is {@link //ERROR}, this method returns {@link //ERROR} and
     * does not change the DFA.</p>
     *
     * @param dfa The dfa
     * @param D The DFA state to add
     * @return The state stored in the DFA. This will be either the existing
     * state if {@code D} is already in the DFA, or {@code D} itself if the
     * state was not already present
     */
    addDFAState(dfa, D) {
        if (D === ATNSimulator.ERROR) {
            return D;
        }
        const existing = dfa.states.get(D);
        if(existing!==null) {
            return existing;
        }
        D.stateNumber = dfa.states.length;
        if (! D.configs.readOnly) {
            D.configs.optimizeConfigs(this);
            D.configs.setReadonly(true);
        }
        dfa.states.add(D);
        if (this.debug) {
            console.log("adding new DFA state: " + D);
        }
        return D;
    }

    reportAttemptingFullContext(dfa, conflictingAlts, configs, startIndex, stopIndex) {
        if (this.debug || this.retry_debug) {
            const interval = new Interval(startIndex, stopIndex + 1);
            console.log("reportAttemptingFullContext decision=" + dfa.decision + ":" + configs +
                               ", input=" + this.parser.getTokenStream().getText(interval));
        }
        if (this.parser!==null) {
            this.parser.getErrorListenerDispatch().reportAttemptingFullContext(this.parser, dfa, startIndex, stopIndex, conflictingAlts, configs);
        }
    }

    reportContextSensitivity(dfa, prediction, configs, startIndex, stopIndex) {
        if (this.debug || this.retry_debug) {
            const interval = new Interval(startIndex, stopIndex + 1);
            console.log("reportContextSensitivity decision=" + dfa.decision + ":" + configs +
                               ", input=" + this.parser.getTokenStream().getText(interval));
        }
        if (this.parser!==null) {
            this.parser.getErrorListenerDispatch().reportContextSensitivity(this.parser, dfa, startIndex, stopIndex, prediction, configs);
        }
    }

    // If context sensitive parsing, we know it's ambiguity not conflict//
    reportAmbiguity(dfa, D, startIndex, stopIndex,
                                   exact, ambigAlts, configs ) {
        if (this.debug || this.retry_debug) {
            const interval = new Interval(startIndex, stopIndex + 1);
            console.log("reportAmbiguity " + ambigAlts + ":" + configs +
                               ", input=" + this.parser.getTokenStream().getText(interval));
        }
        if (this.parser!==null) {
            this.parser.getErrorListenerDispatch().reportAmbiguity(this.parser, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
        }
    }
}

module.exports = ParserATNSimulator;


/***/ }),

/***/ 505:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Map, BitSet, AltDict, hashStuff} = __webpack_require__(785);
const ATN = __webpack_require__(641);
const {RuleStopState} = __webpack_require__(290);
const {ATNConfigSet} = __webpack_require__(21);
const {ATNConfig} = __webpack_require__(961);
const {SemanticContext} = __webpack_require__(660);

/**
 * This enumeration defines the prediction modes available in ANTLR 4 along with
 * utility methods for analyzing configuration sets for conflicts and/or
 * ambiguities.
 */
const PredictionMode = {
    /**
     * The SLL(*) prediction mode. This prediction mode ignores the current
     * parser context when making predictions. This is the fastest prediction
     * mode, and provides correct results for many grammars. This prediction
     * mode is more powerful than the prediction mode provided by ANTLR 3, but
     * may result in syntax errors for grammar and input combinations which are
     * not SLL.
     *
     * <p>
     * When using this prediction mode, the parser will either return a correct
     * parse tree (i.e. the same parse tree that would be returned with the
     * {@link //LL} prediction mode), or it will report a syntax error. If a
     * syntax error is encountered when using the {@link //SLL} prediction mode,
     * it may be due to either an actual syntax error in the input or indicate
     * that the particular combination of grammar and input requires the more
     * powerful {@link //LL} prediction abilities to complete successfully.</p>
     *
     * <p>
     * This prediction mode does not provide any guarantees for prediction
     * behavior for syntactically-incorrect inputs.</p>
     */
    SLL: 0,

    /**
     * The LL(*) prediction mode. This prediction mode allows the current parser
     * context to be used for resolving SLL conflicts that occur during
     * prediction. This is the fastest prediction mode that guarantees correct
     * parse results for all combinations of grammars with syntactically correct
     * inputs.
     *
     * <p>
     * When using this prediction mode, the parser will make correct decisions
     * for all syntactically-correct grammar and input combinations. However, in
     * cases where the grammar is truly ambiguous this prediction mode might not
     * report a precise answer for <em>exactly which</em> alternatives are
     * ambiguous.</p>
     *
     * <p>
     * This prediction mode does not provide any guarantees for prediction
     * behavior for syntactically-incorrect inputs.</p>
     */
    LL: 1,

    /**
     *
     * The LL(*) prediction mode with exact ambiguity detection. In addition to
     * the correctness guarantees provided by the {@link //LL} prediction mode,
     * this prediction mode instructs the prediction algorithm to determine the
     * complete and exact set of ambiguous alternatives for every ambiguous
     * decision encountered while parsing.
     *
     * <p>
     * This prediction mode may be used for diagnosing ambiguities during
     * grammar development. Due to the performance overhead of calculating sets
     * of ambiguous alternatives, this prediction mode should be avoided when
     * the exact results are not necessary.</p>
     *
     * <p>
     * This prediction mode does not provide any guarantees for prediction
     * behavior for syntactically-incorrect inputs.</p>
     */
    LL_EXACT_AMBIG_DETECTION: 2,

    /**
     *
     * Computes the SLL prediction termination condition.
     *
     * <p>
     * This method computes the SLL prediction termination condition for both of
     * the following cases.</p>
     *
     * <ul>
     * <li>The usual SLL+LL fallback upon SLL conflict</li>
     * <li>Pure SLL without LL fallback</li>
     * </ul>
     *
     * <p><strong>COMBINED SLL+LL PARSING</strong></p>
     *
     * <p>When LL-fallback is enabled upon SLL conflict, correct predictions are
     * ensured regardless of how the termination condition is computed by this
     * method. Due to the substantially higher cost of LL prediction, the
     * prediction should only fall back to LL when the additional lookahead
     * cannot lead to a unique SLL prediction.</p>
     *
     * <p>Assuming combined SLL+LL parsing, an SLL configuration set with only
     * conflicting subsets should fall back to full LL, even if the
     * configuration sets don't resolve to the same alternative (e.g.
     * {@code {1,2}} and {@code {3,4}}. If there is at least one non-conflicting
     * configuration, SLL could continue with the hopes that more lookahead will
     * resolve via one of those non-conflicting configurations.</p>
     *
     * <p>Here's the prediction termination rule them: SLL (for SLL+LL parsing)
     * stops when it sees only conflicting configuration subsets. In contrast,
     * full LL keeps going when there is uncertainty.</p>
     *
     * <p><strong>HEURISTIC</strong></p>
     *
     * <p>As a heuristic, we stop prediction when we see any conflicting subset
     * unless we see a state that only has one alternative associated with it.
     * The single-alt-state thing lets prediction continue upon rules like
     * (otherwise, it would admit defeat too soon):</p>
     *
     * <p>{@code [12|1|[], 6|2|[], 12|2|[]]. s : (ID | ID ID?) ';' ;}</p>
     *
     * <p>When the ATN simulation reaches the state before {@code ';'}, it has a
     * DFA state that looks like: {@code [12|1|[], 6|2|[], 12|2|[]]}. Naturally
     * {@code 12|1|[]} and {@code 12|2|[]} conflict, but we cannot stop
     * processing this node because alternative to has another way to continue,
     * via {@code [6|2|[]]}.</p>
     *
     * <p>It also let's us continue for this rule:</p>
     *
     * <p>{@code [1|1|[], 1|2|[], 8|3|[]] a : A | A | A B ;}</p>
     *
     * <p>After matching input A, we reach the stop state for rule A, state 1.
     * State 8 is the state right before B. Clearly alternatives 1 and 2
     * conflict and no amount of further lookahead will separate the two.
     * However, alternative 3 will be able to continue and so we do not stop
     * working on this state. In the previous example, we're concerned with
     * states associated with the conflicting alternatives. Here alt 3 is not
     * associated with the conflicting configs, but since we can continue
     * looking for input reasonably, don't declare the state done.</p>
     *
     * <p><strong>PURE SLL PARSING</strong></p>
     *
     * <p>To handle pure SLL parsing, all we have to do is make sure that we
     * combine stack contexts for configurations that differ only by semantic
     * predicate. From there, we can do the usual SLL termination heuristic.</p>
     *
     * <p><strong>PREDICATES IN SLL+LL PARSING</strong></p>
     *
     * <p>SLL decisions don't evaluate predicates until after they reach DFA stop
     * states because they need to create the DFA cache that works in all
     * semantic situations. In contrast, full LL evaluates predicates collected
     * during start state computation so it can ignore predicates thereafter.
     * This means that SLL termination detection can totally ignore semantic
     * predicates.</p>
     *
     * <p>Implementation-wise, {@link ATNConfigSet} combines stack contexts but not
     * semantic predicate contexts so we might see two configurations like the
     * following.</p>
     *
     * <p>{@code (s, 1, x, {}), (s, 1, x', {p})}</p>
     *
     * <p>Before testing these configurations against others, we have to merge
     * {@code x} and {@code x'} (without modifying the existing configurations).
     * For example, we test {@code (x+x')==x''} when looking for conflicts in
     * the following configurations.</p>
     *
     * <p>{@code (s, 1, x, {}), (s, 1, x', {p}), (s, 2, x'', {})}</p>
     *
     * <p>If the configuration set has predicates (as indicated by
     * {@link ATNConfigSet//hasSemanticContext}), this algorithm makes a copy of
     * the configurations to strip out all of the predicates so that a standard
     * {@link ATNConfigSet} will merge everything ignoring predicates.</p>
     */
    hasSLLConflictTerminatingPrediction: function( mode, configs) {
        // Configs in rule stop states indicate reaching the end of the decision
        // rule (local context) or end of start rule (full context). If all
        // configs meet this condition, then none of the configurations is able
        // to match additional input so we terminate prediction.
        //
        if (PredictionMode.allConfigsInRuleStopStates(configs)) {
            return true;
        }
        // pure SLL mode parsing
        if (mode === PredictionMode.SLL) {
            // Don't bother with combining configs from different semantic
            // contexts if we can fail over to full LL; costs more time
            // since we'll often fail over anyway.
            if (configs.hasSemanticContext) {
                // dup configs, tossing out semantic predicates
                const dup = new ATNConfigSet();
                for(let i=0;i<configs.items.length;i++) {
                    let c = configs.items[i];
                    c = new ATNConfig({semanticContext:SemanticContext.NONE}, c);
                    dup.add(c);
                }
                configs = dup;
            }
            // now we have combined contexts for configs with dissimilar preds
        }
        // pure SLL or combined SLL+LL mode parsing
        const altsets = PredictionMode.getConflictingAltSubsets(configs);
        return PredictionMode.hasConflictingAltSet(altsets) && !PredictionMode.hasStateAssociatedWithOneAlt(configs);
    },

    /**
     * Checks if any configuration in {@code configs} is in a
     * {@link RuleStopState}. Configurations meeting this condition have reached
     * the end of the decision rule (local context) or end of start rule (full
     * context).
     *
     * @param configs the configuration set to test
     * @return {@code true} if any configuration in {@code configs} is in a
     * {@link RuleStopState}, otherwise {@code false}
     */
    hasConfigInRuleStopState: function(configs) {
        for(let i=0;i<configs.items.length;i++) {
            const c = configs.items[i];
            if (c.state instanceof RuleStopState) {
                return true;
            }
        }
        return false;
    },

    /**
     * Checks if all configurations in {@code configs} are in a
     * {@link RuleStopState}. Configurations meeting this condition have reached
     * the end of the decision rule (local context) or end of start rule (full
     * context).
     *
     * @param configs the configuration set to test
     * @return {@code true} if all configurations in {@code configs} are in a
     * {@link RuleStopState}, otherwise {@code false}
     */
    allConfigsInRuleStopStates: function(configs) {
        for(let i=0;i<configs.items.length;i++) {
            const c = configs.items[i];
            if (!(c.state instanceof RuleStopState)) {
                return false;
            }
        }
        return true;
    },

    /**
     *
     * Full LL prediction termination.
     *
     * <p>Can we stop looking ahead during ATN simulation or is there some
     * uncertainty as to which alternative we will ultimately pick, after
     * consuming more input? Even if there are partial conflicts, we might know
     * that everything is going to resolve to the same minimum alternative. That
     * means we can stop since no more lookahead will change that fact. On the
     * other hand, there might be multiple conflicts that resolve to different
     * minimums. That means we need more look ahead to decide which of those
     * alternatives we should predict.</p>
     *
     * <p>The basic idea is to split the set of configurations {@code C}, into
     * conflicting subsets {@code (s, _, ctx, _)} and singleton subsets with
     * non-conflicting configurations. Two configurations conflict if they have
     * identical {@link ATNConfig//state} and {@link ATNConfig//context} values
     * but different {@link ATNConfig//alt} value, e.g. {@code (s, i, ctx, _)}
     * and {@code (s, j, ctx, _)} for {@code i!=j}.</p>
     *
     * <p>Reduce these configuration subsets to the set of possible alternatives.
     * You can compute the alternative subsets in one pass as follows:</p>
     *
     * <p>{@code A_s,ctx = {i | (s, i, ctx, _)}} for each configuration in
     * {@code C} holding {@code s} and {@code ctx} fixed.</p>
     *
     * <p>Or in pseudo-code, for each configuration {@code c} in {@code C}:</p>
     *
     * <pre>
     * map[c] U= c.{@link ATNConfig//alt alt} // map hash/equals uses s and x, not
     * alt and not pred
     * </pre>
     *
     * <p>The values in {@code map} are the set of {@code A_s,ctx} sets.</p>
     *
     * <p>If {@code |A_s,ctx|=1} then there is no conflict associated with
     * {@code s} and {@code ctx}.</p>
     *
     * <p>Reduce the subsets to singletons by choosing a minimum of each subset. If
     * the union of these alternative subsets is a singleton, then no amount of
     * more lookahead will help us. We will always pick that alternative. If,
     * however, there is more than one alternative, then we are uncertain which
     * alternative to predict and must continue looking for resolution. We may
     * or may not discover an ambiguity in the future, even if there are no
     * conflicting subsets this round.</p>
     *
     * <p>The biggest sin is to terminate early because it means we've made a
     * decision but were uncertain as to the eventual outcome. We haven't used
     * enough lookahead. On the other hand, announcing a conflict too late is no
     * big deal; you will still have the conflict. It's just inefficient. It
     * might even look until the end of file.</p>
     *
     * <p>No special consideration for semantic predicates is required because
     * predicates are evaluated on-the-fly for full LL prediction, ensuring that
     * no configuration contains a semantic context during the termination
     * check.</p>
     *
     * <p><strong>CONFLICTING CONFIGS</strong></p>
     *
     * <p>Two configurations {@code (s, i, x)} and {@code (s, j, x')}, conflict
     * when {@code i!=j} but {@code x=x'}. Because we merge all
     * {@code (s, i, _)} configurations together, that means that there are at
     * most {@code n} configurations associated with state {@code s} for
     * {@code n} possible alternatives in the decision. The merged stacks
     * complicate the comparison of configuration contexts {@code x} and
     * {@code x'}. Sam checks to see if one is a subset of the other by calling
     * merge and checking to see if the merged result is either {@code x} or
     * {@code x'}. If the {@code x} associated with lowest alternative {@code i}
     * is the superset, then {@code i} is the only possible prediction since the
     * others resolve to {@code min(i)} as well. However, if {@code x} is
     * associated with {@code j>i} then at least one stack configuration for
     * {@code j} is not in conflict with alternative {@code i}. The algorithm
     * should keep going, looking for more lookahead due to the uncertainty.</p>
     *
     * <p>For simplicity, I'm doing a equality check between {@code x} and
     * {@code x'} that lets the algorithm continue to consume lookahead longer
     * than necessary. The reason I like the equality is of course the
     * simplicity but also because that is the test you need to detect the
     * alternatives that are actually in conflict.</p>
     *
     * <p><strong>CONTINUE/STOP RULE</strong></p>
     *
     * <p>Continue if union of resolved alternative sets from non-conflicting and
     * conflicting alternative subsets has more than one alternative. We are
     * uncertain about which alternative to predict.</p>
     *
     * <p>The complete set of alternatives, {@code [i for (_,i,_)]}, tells us which
     * alternatives are still in the running for the amount of input we've
     * consumed at this point. The conflicting sets let us to strip away
     * configurations that won't lead to more states because we resolve
     * conflicts to the configuration with a minimum alternate for the
     * conflicting set.</p>
     *
     * <p><strong>CASES</strong></p>
     *
     * <ul>
     *
     * <li>no conflicts and more than 1 alternative in set =&gt; continue</li>
     *
     * <li> {@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s, 3, z)},
     * {@code (s', 1, y)}, {@code (s', 2, y)} yields non-conflicting set
     * {@code {3}} U conflicting sets {@code min({1,2})} U {@code min({1,2})} =
     * {@code {1,3}} =&gt; continue
     * </li>
     *
     * <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 1, y)},
     * {@code (s', 2, y)}, {@code (s'', 1, z)} yields non-conflicting set
     * {@code {1}} U conflicting sets {@code min({1,2})} U {@code min({1,2})} =
     * {@code {1}} =&gt; stop and predict 1</li>
     *
     * <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 1, y)},
     * {@code (s', 2, y)} yields conflicting, reduced sets {@code {1}} U
     * {@code {1}} = {@code {1}} =&gt; stop and predict 1, can announce
     * ambiguity {@code {1,2}}</li>
     *
     * <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 2, y)},
     * {@code (s', 3, y)} yields conflicting, reduced sets {@code {1}} U
     * {@code {2}} = {@code {1,2}} =&gt; continue</li>
     *
     * <li>{@code (s, 1, x)}, {@code (s, 2, x)}, {@code (s', 3, y)},
     * {@code (s', 4, y)} yields conflicting, reduced sets {@code {1}} U
     * {@code {3}} = {@code {1,3}} =&gt; continue</li>
     *
     * </ul>
     *
     * <p><strong>EXACT AMBIGUITY DETECTION</strong></p>
     *
     * <p>If all states report the same conflicting set of alternatives, then we
     * know we have the exact ambiguity set.</p>
     *
     * <p><code>|A_<em>i</em>|&gt;1</code> and
     * <code>A_<em>i</em> = A_<em>j</em></code> for all <em>i</em>, <em>j</em>.</p>
     *
     * <p>In other words, we continue examining lookahead until all {@code A_i}
     * have more than one alternative and all {@code A_i} are the same. If
     * {@code A={{1,2}, {1,3}}}, then regular LL prediction would terminate
     * because the resolved set is {@code {1}}. To determine what the real
     * ambiguity is, we have to know whether the ambiguity is between one and
     * two or one and three so we keep going. We can only stop prediction when
     * we need exact ambiguity detection when the sets look like
     * {@code A={{1,2}}} or {@code {{1,2},{1,2}}}, etc...</p>
     */
    resolvesToJustOneViableAlt: function(altsets) {
        return PredictionMode.getSingleViableAlt(altsets);
    },

    /**
     * Determines if every alternative subset in {@code altsets} contains more
     * than one alternative.
     *
     * @param altsets a collection of alternative subsets
     * @return {@code true} if every {@link BitSet} in {@code altsets} has
     * {@link BitSet//cardinality cardinality} &gt; 1, otherwise {@code false}
     */
    allSubsetsConflict: function(altsets) {
        return ! PredictionMode.hasNonConflictingAltSet(altsets);
    },
    /**
     * Determines if any single alternative subset in {@code altsets} contains
     * exactly one alternative.
     *
     * @param altsets a collection of alternative subsets
     * @return {@code true} if {@code altsets} contains a {@link BitSet} with
     * {@link BitSet//cardinality cardinality} 1, otherwise {@code false}
     */
    hasNonConflictingAltSet: function(altsets) {
        for(let i=0;i<altsets.length;i++) {
            const alts = altsets[i];
            if (alts.length===1) {
                return true;
            }
        }
        return false;
    },


    /**
     * Determines if any single alternative subset in {@code altsets} contains
     * more than one alternative.
     *
     * @param altsets a collection of alternative subsets
     * @return {@code true} if {@code altsets} contains a {@link BitSet} with
     * {@link BitSet//cardinality cardinality} &gt; 1, otherwise {@code false}
     */
    hasConflictingAltSet: function(altsets) {
        for(let i=0;i<altsets.length;i++) {
            const alts = altsets[i];
            if (alts.length>1) {
                return true;
            }
        }
        return false;
    },


    /**
     * Determines if every alternative subset in {@code altsets} is equivalent.
     *
     * @param altsets a collection of alternative subsets
     * @return {@code true} if every member of {@code altsets} is equal to the
     * others, otherwise {@code false}
     */
    allSubsetsEqual: function(altsets) {
        let first = null;
        for(let i=0;i<altsets.length;i++) {
            const alts = altsets[i];
            if (first === null) {
                first = alts;
            } else if (alts!==first) {
                return false;
            }
        }
        return true;
    },


    /**
     * Returns the unique alternative predicted by all alternative subsets in
     * {@code altsets}. If no such alternative exists, this method returns
     * {@link ATN//INVALID_ALT_NUMBER}.
     *
     * @param altsets a collection of alternative subsets
     */
    getUniqueAlt: function(altsets) {
        const all = PredictionMode.getAlts(altsets);
        if (all.length===1) {
            return all.minValue();
        } else {
            return ATN.INVALID_ALT_NUMBER;
        }
    },

    /**
     * Gets the complete set of represented alternatives for a collection of
     * alternative subsets. This method returns the union of each {@link BitSet}
     * in {@code altsets}.
     *
     * @param altsets a collection of alternative subsets
     * @return the set of represented alternatives in {@code altsets}
     */
    getAlts: function(altsets) {
        const all = new BitSet();
        altsets.map( function(alts) { all.or(alts); });
        return all;
    },

    /**
     * This function gets the conflicting alt subsets from a configuration set.
     * For each configuration {@code c} in {@code configs}:
     *
     * <pre>
     * map[c] U= c.{@link ATNConfig//alt alt} // map hash/equals uses s and x, not
     * alt and not pred
     * </pre>
     */
    getConflictingAltSubsets: function(configs) {
        const configToAlts = new Map();
        configToAlts.hashFunction = function(cfg) { hashStuff(cfg.state.stateNumber, cfg.context); };
        configToAlts.equalsFunction = function(c1, c2) { return c1.state.stateNumber === c2.state.stateNumber && c1.context.equals(c2.context);};
        configs.items.map(function(cfg) {
            let alts = configToAlts.get(cfg);
            if (alts === null) {
                alts = new BitSet();
                configToAlts.put(cfg, alts);
            }
            alts.add(cfg.alt);
        });
        return configToAlts.getValues();
    },

    /**
     * Get a map from state to alt subset from a configuration set. For each
     * configuration {@code c} in {@code configs}:
     *
     * <pre>
     * map[c.{@link ATNConfig//state state}] U= c.{@link ATNConfig//alt alt}
     * </pre>
     */
    getStateToAltMap: function(configs) {
        const m = new AltDict();
        configs.items.map(function(c) {
            let alts = m.get(c.state);
            if (alts === null) {
                alts = new BitSet();
                m.put(c.state, alts);
            }
            alts.add(c.alt);
        });
        return m;
    },

    hasStateAssociatedWithOneAlt: function(configs) {
        const values = PredictionMode.getStateToAltMap(configs).values();
        for(let i=0;i<values.length;i++) {
            if (values[i].length===1) {
                return true;
            }
        }
        return false;
    },

    getSingleViableAlt: function(altsets) {
        let result = null;
        for(let i=0;i<altsets.length;i++) {
            const alts = altsets[i];
            const minAlt = alts.minValue();
            if(result===null) {
                result = minAlt;
            } else if(result!==minAlt) { // more than 1 viable alt
                return ATN.INVALID_ALT_NUMBER;
            }
        }
        return result;
    }
};

module.exports = PredictionMode;


/***/ }),

/***/ 660:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const { Set, Hash, equalArrays } = __webpack_require__(785);

/**
 * A tree structure used to record the semantic context in which
 * an ATN configuration is valid.  It's either a single predicate,
 * a conjunction {@code p1&&p2}, or a sum of products {@code p1||p2}.
 *
 * <p>I have scoped the {@link AND}, {@link OR}, and {@link Predicate} subclasses of
 * {@link SemanticContext} within the scope of this outer class.</p>
 */
class SemanticContext {

	hashCode() {
		const hash = new Hash();
		this.updateHashCode(hash);
		return hash.finish();
	}

	/**
	 * For context independent predicates, we evaluate them without a local
	 * context (i.e., null context). That way, we can evaluate them without
	 * having to create proper rule-specific context during prediction (as
	 * opposed to the parser, which creates them naturally). In a practical
	 * sense, this avoids a cast exception from RuleContext to myruleContext.
	 *
	 * <p>For context dependent predicates, we must pass in a local context so that
	 * references such as $arg evaluate properly as _localctx.arg. We only
	 * capture context dependent predicates in the context in which we begin
	 * prediction, so we passed in the outer context here in case of context
	 * dependent predicate evaluation.</p>
	 */
	evaluate(parser, outerContext) {}

	/**
	 * Evaluate the precedence predicates for the context and reduce the result.
	 *
	 * @param parser The parser instance.
	 * @param outerContext The current parser context object.
	 * @return The simplified semantic context after precedence predicates are
	 * evaluated, which will be one of the following values.
	 * <ul>
	 * <li>{@link //NONE}: if the predicate simplifies to {@code true} after
	 * precedence predicates are evaluated.</li>
	 * <li>{@code null}: if the predicate simplifies to {@code false} after
	 * precedence predicates are evaluated.</li>
	 * <li>{@code this}: if the semantic context is not changed as a result of
	 * precedence predicate evaluation.</li>
	 * <li>A non-{@code null} {@link SemanticContext}: the new simplified
	 * semantic context after precedence predicates are evaluated.</li>
	 * </ul>
	 */
	evalPrecedence(parser, outerContext) {
		return this;
	}

	static andContext(a, b) {
		if (a === null || a === SemanticContext.NONE) {
			return b;
		}
		if (b === null || b === SemanticContext.NONE) {
			return a;
		}
		const result = new AND(a, b);
		if (result.opnds.length === 1) {
			return result.opnds[0];
		} else {
			return result;
		}
	}

	static orContext(a, b) {
		if (a === null) {
			return b;
		}
		if (b === null) {
			return a;
		}
		if (a === SemanticContext.NONE || b === SemanticContext.NONE) {
			return SemanticContext.NONE;
		}
		const result = new OR(a, b);
		if (result.opnds.length === 1) {
			return result.opnds[0];
		} else {
			return result;
		}
	}
}


class Predicate extends SemanticContext {

	constructor(ruleIndex, predIndex, isCtxDependent) {
		super();
		this.ruleIndex = ruleIndex === undefined ? -1 : ruleIndex;
		this.predIndex = predIndex === undefined ? -1 : predIndex;
		this.isCtxDependent = isCtxDependent === undefined ? false : isCtxDependent; // e.g., $i ref in pred
	}

	evaluate(parser, outerContext) {
		const localctx = this.isCtxDependent ? outerContext : null;
		return parser.sempred(localctx, this.ruleIndex, this.predIndex);
	}

	updateHashCode(hash) {
		hash.update(this.ruleIndex, this.predIndex, this.isCtxDependent);
	}

	equals(other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof Predicate)) {
			return false;
		} else {
			return this.ruleIndex === other.ruleIndex &&
					this.predIndex === other.predIndex &&
					this.isCtxDependent === other.isCtxDependent;
		}
	}

	toString() {
		return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
	}
}

/**
 * The default {@link SemanticContext}, which is semantically equivalent to
 * a predicate of the form {@code {true}?}
 */
SemanticContext.NONE = new Predicate();


class PrecedencePredicate extends SemanticContext {

	constructor(precedence) {
		super();
		this.precedence = precedence === undefined ? 0 : precedence;
	}

	evaluate(parser, outerContext) {
		return parser.precpred(outerContext, this.precedence);
	}

	evalPrecedence(parser, outerContext) {
		if (parser.precpred(outerContext, this.precedence)) {
			return SemanticContext.NONE;
		} else {
			return null;
		}
	}

	compareTo(other) {
		return this.precedence - other.precedence;
	}

	updateHashCode(hash) {
		hash.update(this.precedence);
	}

	equals(other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof PrecedencePredicate)) {
			return false;
		} else {
			return this.precedence === other.precedence;
		}
	}

	toString() {
		return "{" + this.precedence + ">=prec}?";
	}

	static filterPrecedencePredicates(set) {
		const result = [];
		set.values().map( function(context) {
			if (context instanceof PrecedencePredicate) {
				result.push(context);
			}
		});
		return result;
	}
}

class AND extends SemanticContext {
	/**
	 * A semantic context which is true whenever none of the contained contexts
	 * is false
	 */
	constructor(a, b) {
		super();
		const operands = new Set();
		if (a instanceof AND) {
			a.opnds.map(function(o) {
				operands.add(o);
			});
		} else {
			operands.add(a);
		}
		if (b instanceof AND) {
			b.opnds.map(function(o) {
				operands.add(o);
			});
		} else {
			operands.add(b);
		}
		const precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);
		if (precedencePredicates.length > 0) {
			// interested in the transition with the lowest precedence
			let reduced = null;
			precedencePredicates.map( function(p) {
				if(reduced===null || p.precedence<reduced.precedence) {
					reduced = p;
				}
			});
			operands.add(reduced);
		}
		this.opnds = Array.from(operands.values());
	}

	equals(other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof AND)) {
			return false;
		} else {
			return equalArrays(this.opnds, other.opnds);
		}
	}

	updateHashCode(hash) {
		hash.update(this.opnds, "AND");
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>
	 * The evaluation of predicates by this context is short-circuiting, but
	 * unordered.</p>
	 */
	evaluate(parser, outerContext) {
		for (let i = 0; i < this.opnds.length; i++) {
			if (!this.opnds[i].evaluate(parser, outerContext)) {
				return false;
			}
		}
		return true;
	}

	evalPrecedence(parser, outerContext) {
		let differs = false;
		const operands = [];
		for (let i = 0; i < this.opnds.length; i++) {
			const context = this.opnds[i];
			const evaluated = context.evalPrecedence(parser, outerContext);
			differs |= (evaluated !== context);
			if (evaluated === null) {
				// The AND context is false if any element is false
				return null;
			} else if (evaluated !== SemanticContext.NONE) {
				// Reduce the result by skipping true elements
				operands.push(evaluated);
			}
		}
		if (!differs) {
			return this;
		}
		if (operands.length === 0) {
			// all elements were true, so the AND context is true
			return SemanticContext.NONE;
		}
		let result = null;
		operands.map(function(o) {
			result = result === null ? o : SemanticContext.andContext(result, o);
		});
		return result;
	}

	toString() {
		const s = this.opnds.map(o => o.toString());
		return (s.length > 3 ? s.slice(3) : s).join("&&");
	}
}


class OR extends SemanticContext {
	/**
	 * A semantic context which is true whenever at least one of the contained
	 * contexts is true
	 */
	constructor(a, b) {
		super();
		const operands = new Set();
		if (a instanceof OR) {
			a.opnds.map(function(o) {
				operands.add(o);
			});
		} else {
			operands.add(a);
		}
		if (b instanceof OR) {
			b.opnds.map(function(o) {
				operands.add(o);
			});
		} else {
			operands.add(b);
		}

		const precedencePredicates = PrecedencePredicate.filterPrecedencePredicates(operands);
		if (precedencePredicates.length > 0) {
			// interested in the transition with the highest precedence
			const s = precedencePredicates.sort(function(a, b) {
				return a.compareTo(b);
			});
			const reduced = s[s.length-1];
			operands.add(reduced);
		}
		this.opnds = Array.from(operands.values());
	}

	equals(other) {
		if (this === other) {
			return true;
		} else if (!(other instanceof OR)) {
			return false;
		} else {
			return equalArrays(this.opnds, other.opnds);
		}
	}

	updateHashCode(hash) {
		hash.update(this.opnds, "OR");
	}

	/**
	 * <p>
	 * The evaluation of predicates by this context is short-circuiting, but
	 * unordered.</p>
	 */
	evaluate(parser, outerContext) {
		for (let i = 0; i < this.opnds.length; i++) {
			if (this.opnds[i].evaluate(parser, outerContext)) {
				return true;
			}
		}
		return false;
	}

	evalPrecedence(parser, outerContext) {
		let differs = false;
		const operands = [];
		for (let i = 0; i < this.opnds.length; i++) {
			const context = this.opnds[i];
			const evaluated = context.evalPrecedence(parser, outerContext);
			differs |= (evaluated !== context);
			if (evaluated === SemanticContext.NONE) {
				// The OR context is true if any element is true
				return SemanticContext.NONE;
			} else if (evaluated !== null) {
				// Reduce the result by skipping false elements
				operands.push(evaluated);
			}
		}
		if (!differs) {
			return this;
		}
		if (operands.length === 0) {
			// all elements were false, so the OR context is false
			return null;
		}
		const result = null;
		operands.map(function(o) {
			return result === null ? o : SemanticContext.orContext(result, o);
		});
		return result;
	}

	toString() {
		const s = this.opnds.map(o => o.toString());
		return (s.length > 3 ? s.slice(3) : s).join("||");
	}
}

module.exports = {
	SemanticContext,
	PrecedencePredicate,
	Predicate
}


/***/ }),

/***/ 68:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Token} = __webpack_require__(994);
const {IntervalSet} = __webpack_require__(909);
const {Predicate, PrecedencePredicate} = __webpack_require__(660);

/**
 * An ATN transition between any two ATN states.  Subclasses define
 * atom, set, epsilon, action, predicate, rule transitions.
 *
 * <p>This is a one way link.  It emanates from a state (usually via a list of
 * transitions) and has a target state.</p>
 *
 * <p>Since we never have to change the ATN transitions once we construct it,
 * we can fix these transitions as specific classes. The DFA transitions
 * on the other hand need to update the labels as it adds transitions to
 * the states. We'll use the term Edge for the DFA to distinguish them from
 * ATN transitions.</p>
 */
class Transition {
    constructor(target) {
        // The target of this transition.
        if (target===undefined || target===null) {
            throw "target cannot be null.";
        }
        this.target = target;
        // Are we epsilon, action, sempred?
        this.isEpsilon = false;
        this.label = null;
    }
}

// constants for serialization

Transition.EPSILON = 1;
Transition.RANGE = 2;
Transition.RULE = 3;
// e.g., {isType(input.LT(1))}?
Transition.PREDICATE = 4;
Transition.ATOM = 5;
Transition.ACTION = 6;
// ~(A|B) or ~atom, wildcard, which convert to next 2
Transition.SET = 7;
Transition.NOT_SET = 8;
Transition.WILDCARD = 9;
Transition.PRECEDENCE = 10;

Transition.serializationNames = [
            "INVALID",
            "EPSILON",
            "RANGE",
            "RULE",
            "PREDICATE",
            "ATOM",
            "ACTION",
            "SET",
            "NOT_SET",
            "WILDCARD",
            "PRECEDENCE"
        ];

Transition.serializationTypes = {
        EpsilonTransition: Transition.EPSILON,
        RangeTransition: Transition.RANGE,
        RuleTransition: Transition.RULE,
        PredicateTransition: Transition.PREDICATE,
        AtomTransition: Transition.ATOM,
        ActionTransition: Transition.ACTION,
        SetTransition: Transition.SET,
        NotSetTransition: Transition.NOT_SET,
        WildcardTransition: Transition.WILDCARD,
        PrecedencePredicateTransition: Transition.PRECEDENCE
    };


// TODO: make all transitions sets? no, should remove set edges

class AtomTransition extends Transition {
    constructor(target, label) {
        super(target);
        // The token type or character value; or, signifies special label.
        this.label_ = label;
        this.label = this.makeLabel();
        this.serializationType = Transition.ATOM;
    }

    makeLabel() {
        const s = new IntervalSet();
        s.addOne(this.label_);
        return s;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return this.label_ === symbol;
    }

    toString() {
        return this.label_;
    }
}


class RuleTransition extends Transition {
    constructor(ruleStart, ruleIndex, precedence, followState) {
        super(ruleStart);
        // ptr to the rule definition object for this rule ref
        this.ruleIndex = ruleIndex;
        this.precedence = precedence;
        // what node to begin computations following ref to rule
        this.followState = followState;
        this.serializationType = Transition.RULE;
        this.isEpsilon = true;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    }
}

class EpsilonTransition extends Transition {
    constructor(target, outermostPrecedenceReturn) {
        super(target);
        this.serializationType = Transition.EPSILON;
        this.isEpsilon = true;
        this.outermostPrecedenceReturn = outermostPrecedenceReturn;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    }

    toString() {
        return "epsilon";
    }
}


class RangeTransition extends Transition {
    constructor(target, start, stop) {
        super(target);
        this.serializationType = Transition.RANGE;
        this.start = start;
        this.stop = stop;
        this.label = this.makeLabel();
    }

    makeLabel() {
        const s = new IntervalSet();
        s.addRange(this.start, this.stop);
        return s;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return symbol >= this.start && symbol <= this.stop;
    }

    toString() {
        return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
    }
}


class AbstractPredicateTransition extends Transition {
    constructor(target) {
        super(target);
    }
}

class PredicateTransition extends AbstractPredicateTransition {
    constructor(target, ruleIndex, predIndex, isCtxDependent) {
        super(target);
        this.serializationType = Transition.PREDICATE;
        this.ruleIndex = ruleIndex;
        this.predIndex = predIndex;
        this.isCtxDependent = isCtxDependent; // e.g., $i ref in pred
        this.isEpsilon = true;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    }

    getPredicate() {
        return new Predicate(this.ruleIndex, this.predIndex, this.isCtxDependent);
    }

    toString() {
        return "pred_" + this.ruleIndex + ":" + this.predIndex;
    }
}


class ActionTransition extends Transition {
    constructor(target, ruleIndex, actionIndex, isCtxDependent) {
        super(target);
        this.serializationType = Transition.ACTION;
        this.ruleIndex = ruleIndex;
        this.actionIndex = actionIndex===undefined ? -1 : actionIndex;
        this.isCtxDependent = isCtxDependent===undefined ? false : isCtxDependent; // e.g., $i ref in pred
        this.isEpsilon = true;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    }

    toString() {
        return "action_" + this.ruleIndex + ":" + this.actionIndex;
    }
}


// A transition containing a set of values.
class SetTransition extends Transition {
    constructor(target, set) {
        super(target);
        this.serializationType = Transition.SET;
        if (set !==undefined && set !==null) {
            this.label = set;
        } else {
            this.label = new IntervalSet();
            this.label.addOne(Token.INVALID_TYPE);
        }
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return this.label.contains(symbol);
    }

    toString() {
        return this.label.toString();
    }
}

class NotSetTransition extends SetTransition {
    constructor(target, set) {
        super(target, set);
        this.serializationType = Transition.NOT_SET;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return symbol >= minVocabSymbol && symbol <= maxVocabSymbol &&
                !super.matches(symbol, minVocabSymbol, maxVocabSymbol);
    }

    toString() {
        return '~' + super.toString();
    }
}

class WildcardTransition extends Transition {
    constructor(target) {
        super(target);
        this.serializationType = Transition.WILDCARD;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return symbol >= minVocabSymbol && symbol <= maxVocabSymbol;
    }

    toString() {
        return ".";
    }
}

class PrecedencePredicateTransition extends AbstractPredicateTransition {
    constructor(target, precedence) {
        super(target);
        this.serializationType = Transition.PRECEDENCE;
        this.precedence = precedence;
        this.isEpsilon = true;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    }

    getPredicate() {
        return new PrecedencePredicate(this.precedence);
    }

    toString() {
        return this.precedence + " >= _p";
    }
}

module.exports = {
    Transition,
    AtomTransition,
    SetTransition,
    NotSetTransition,
    RuleTransition,
    ActionTransition,
    EpsilonTransition,
    RangeTransition,
    WildcardTransition,
    PredicateTransition,
    PrecedencePredicateTransition,
    AbstractPredicateTransition
}


/***/ }),

/***/ 907:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

exports.ATN = __webpack_require__(641);
exports.ATNDeserializer = __webpack_require__(369);
exports.LexerATNSimulator = __webpack_require__(205);
exports.ParserATNSimulator = __webpack_require__(355);
/* unused reexport */ __webpack_require__(505);


/***/ }),

/***/ 178:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Set} = __webpack_require__(785);
const {DFAState} = __webpack_require__(254);
const {StarLoopEntryState} = __webpack_require__(290);
const {ATNConfigSet} = __webpack_require__(21);
const {DFASerializer} = __webpack_require__(999);
const {LexerDFASerializer} = __webpack_require__(999);

class DFA {
	constructor(atnStartState, decision) {
		if (decision === undefined) {
			decision = 0;
		}
		/**
		 * From which ATN state did we create this DFA?
		 */
		this.atnStartState = atnStartState;
		this.decision = decision;
		/**
		 * A set of all DFA states. Use {@link Map} so we can get old state back
		 * ({@link Set} only allows you to see if it's there).
		 */
		this._states = new Set();
		this.s0 = null;
		/**
		 * {@code true} if this DFA is for a precedence decision; otherwise,
		 * {@code false}. This is the backing field for {@link //isPrecedenceDfa},
		 * {@link //setPrecedenceDfa}
		 */
		this.precedenceDfa = false;
		if (atnStartState instanceof StarLoopEntryState)
		{
			if (atnStartState.isPrecedenceDecision) {
				this.precedenceDfa = true;
				const precedenceState = new DFAState(null, new ATNConfigSet());
				precedenceState.edges = [];
				precedenceState.isAcceptState = false;
				precedenceState.requiresFullContext = false;
				this.s0 = precedenceState;
			}
		}
	}

	/**
	 * Get the start state for a specific precedence value.
	 *
	 * @param precedence The current precedence.
	 * @return The start state corresponding to the specified precedence, or
	 * {@code null} if no start state exists for the specified precedence.
	 *
	 * @throws IllegalStateException if this is not a precedence DFA.
	 * @see //isPrecedenceDfa()
	 */
	getPrecedenceStartState(precedence) {
		if (!(this.precedenceDfa)) {
			throw ("Only precedence DFAs may contain a precedence start state.");
		}
		// s0.edges is never null for a precedence DFA
		if (precedence < 0 || precedence >= this.s0.edges.length) {
			return null;
		}
		return this.s0.edges[precedence] || null;
	}

	/**
	 * Set the start state for a specific precedence value.
	 *
	 * @param precedence The current precedence.
	 * @param startState The start state corresponding to the specified
	 * precedence.
	 *
	 * @throws IllegalStateException if this is not a precedence DFA.
	 * @see //isPrecedenceDfa()
	 */
	setPrecedenceStartState(precedence, startState) {
		if (!(this.precedenceDfa)) {
			throw ("Only precedence DFAs may contain a precedence start state.");
		}
		if (precedence < 0) {
			return;
		}

		/**
		 * synchronization on s0 here is ok. when the DFA is turned into a
		 * precedence DFA, s0 will be initialized once and not updated again
		 * s0.edges is never null for a precedence DFA
		 */
		this.s0.edges[precedence] = startState;
	}

	/**
	 * Sets whether this is a precedence DFA. If the specified value differs
	 * from the current DFA configuration, the following actions are taken;
	 * otherwise no changes are made to the current DFA.
	 *
	 * <ul>
	 * <li>The {@link //states} map is cleared</li>
	 * <li>If {@code precedenceDfa} is {@code false}, the initial state
	 * {@link //s0} is set to {@code null}; otherwise, it is initialized to a new
	 * {@link DFAState} with an empty outgoing {@link DFAState//edges} array to
	 * store the start states for individual precedence values.</li>
	 * <li>The {@link //precedenceDfa} field is updated</li>
	 * </ul>
	 *
	 * @param precedenceDfa {@code true} if this is a precedence DFA; otherwise,
	 * {@code false}
	 */
	setPrecedenceDfa(precedenceDfa) {
		if (this.precedenceDfa!==precedenceDfa) {
			this._states = new Set();
			if (precedenceDfa) {
				const precedenceState = new DFAState(null, new ATNConfigSet());
				precedenceState.edges = [];
				precedenceState.isAcceptState = false;
				precedenceState.requiresFullContext = false;
				this.s0 = precedenceState;
			} else {
				this.s0 = null;
			}
			this.precedenceDfa = precedenceDfa;
		}
	}

	/**
	 * Return a list of all states in this DFA, ordered by state number.
	 */
	sortedStates() {
		const list = this._states.values();
		return list.sort(function(a, b) {
			return a.stateNumber - b.stateNumber;
		});
	}

	toString(literalNames, symbolicNames) {
		literalNames = literalNames || null;
		symbolicNames = symbolicNames || null;
		if (this.s0 === null) {
			return "";
		}
		const serializer = new DFASerializer(this, literalNames, symbolicNames);
		return serializer.toString();
	}

	toLexerString() {
		if (this.s0 === null) {
			return "";
		}
		const serializer = new LexerDFASerializer(this);
		return serializer.toString();
	}

	get states(){
		return this._states;
	}
}


module.exports = DFA;


/***/ }),

/***/ 999:
/***/ ((module) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/**
 * A DFA walker that knows how to dump them to serialized strings.
 */
class DFASerializer {
    constructor(dfa, literalNames, symbolicNames) {
        this.dfa = dfa;
        this.literalNames = literalNames || [];
        this.symbolicNames = symbolicNames || [];
    }

    toString() {
       if(this.dfa.s0 === null) {
           return null;
       }
       let buf = "";
       const states = this.dfa.sortedStates();
       for(let i=0; i<states.length; i++) {
           const s = states[i];
           if(s.edges!==null) {
                const n = s.edges.length;
                for(let j=0;j<n;j++) {
                    const t = s.edges[j] || null;
                    if(t!==null && t.stateNumber !== 0x7FFFFFFF) {
                        buf = buf.concat(this.getStateString(s));
                        buf = buf.concat("-");
                        buf = buf.concat(this.getEdgeLabel(j));
                        buf = buf.concat("->");
                        buf = buf.concat(this.getStateString(t));
                        buf = buf.concat('\n');
                    }
                }
           }
       }
       return buf.length===0 ? null : buf;
    }

    getEdgeLabel(i) {
        if (i===0) {
            return "EOF";
        } else if(this.literalNames !==null || this.symbolicNames!==null) {
            return this.literalNames[i-1] || this.symbolicNames[i-1];
        } else {
            return String.fromCharCode(i-1);
        }
    }

    getStateString(s) {
        const baseStateStr = ( s.isAcceptState ? ":" : "") + "s" + s.stateNumber + ( s.requiresFullContext ? "^" : "");
        if(s.isAcceptState) {
            if (s.predicates !== null) {
                return baseStateStr + "=>" + s.predicates.toString();
            } else {
                return baseStateStr + "=>" + s.prediction.toString();
            }
        } else {
            return baseStateStr;
        }
    }
}

class LexerDFASerializer extends DFASerializer {
    constructor(dfa) {
        super(dfa, null);
    }

    getEdgeLabel(i) {
        return "'" + String.fromCharCode(i) + "'";
    }
}

module.exports = { DFASerializer , LexerDFASerializer };



/***/ }),

/***/ 254:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {ATNConfigSet} = __webpack_require__(21);
const {Hash, Set} = __webpack_require__(785);

/**
 * Map a predicate to a predicted alternative.
 */
class PredPrediction {
	constructor(pred, alt) {
		this.alt = alt;
		this.pred = pred;
	}

	toString() {
		return "(" + this.pred + ", " + this.alt + ")";
	}
}

/**
 * A DFA state represents a set of possible ATN configurations.
 * As Aho, Sethi, Ullman p. 117 says "The DFA uses its state
 * to keep track of all possible states the ATN can be in after
 * reading each input symbol. That is to say, after reading
 * input a1a2..an, the DFA is in a state that represents the
 * subset T of the states of the ATN that are reachable from the
 * ATN's start state along some path labeled a1a2..an."
 * In conventional NFA&rarr;DFA conversion, therefore, the subset T
 * would be a bitset representing the set of states the
 * ATN could be in. We need to track the alt predicted by each
 * state as well, however. More importantly, we need to maintain
 * a stack of states, tracking the closure operations as they
 * jump from rule to rule, emulating rule invocations (method calls).
 * I have to add a stack to simulate the proper lookahead sequences for
 * the underlying LL grammar from which the ATN was derived.
 *
 * <p>I use a set of ATNConfig objects not simple states. An ATNConfig
 * is both a state (ala normal conversion) and a RuleContext describing
 * the chain of rules (if any) followed to arrive at that state.</p>
 *
 * <p>A DFA state may have multiple references to a particular state,
 * but with different ATN contexts (with same or different alts)
 * meaning that state was reached via a different set of rule invocations.</p>
 */
class DFAState {
	constructor(stateNumber, configs) {
		if (stateNumber === null) {
			stateNumber = -1;
		}
		if (configs === null) {
			configs = new ATNConfigSet();
		}
		this.stateNumber = stateNumber;
		this.configs = configs;
		/**
		 * {@code edges[symbol]} points to target of symbol. Shift up by 1 so (-1)
		 * {@link Token//EOF} maps to {@code edges[0]}.
		 */
		this.edges = null;
		this.isAcceptState = false;
		/**
		 * if accept state, what ttype do we match or alt do we predict?
		 * This is set to {@link ATN//INVALID_ALT_NUMBER} when {@link//predicates}
		 * {@code !=null} or {@link //requiresFullContext}.
		 */
		this.prediction = 0;
		this.lexerActionExecutor = null;
		/**
		 * Indicates that this state was created during SLL prediction that
		 * discovered a conflict between the configurations in the state. Future
		 * {@link ParserATNSimulator//execATN} invocations immediately jumped doing
		 * full context prediction if this field is true.
		 */
		this.requiresFullContext = false;
		/**
		 * During SLL parsing, this is a list of predicates associated with the
		 * ATN configurations of the DFA state. When we have predicates,
		 * {@link //requiresFullContext} is {@code false} since full context
		 * prediction evaluates predicates
		 * on-the-fly. If this is not null, then {@link //prediction} is
		 * {@link ATN//INVALID_ALT_NUMBER}.
		 *
		 * <p>We only use these for non-{@link //requiresFullContext} but
		 * conflicting states. That
		 * means we know from the context (it's $ or we don't dip into outer
		 * context) that it's an ambiguity not a conflict.</p>
		 *
		 * <p>This list is computed by {@link
		 * ParserATNSimulator//predicateDFAState}.</p>
		 */
		this.predicates = null;
		return this;
	}

	/**
	 * Get the set of all alts mentioned by all ATN configurations in this
	 * DFA state.
	 */
	getAltSet() {
		const alts = new Set();
		if (this.configs !== null) {
			for (let i = 0; i < this.configs.length; i++) {
				const c = this.configs[i];
				alts.add(c.alt);
			}
		}
		if (alts.length === 0) {
			return null;
		} else {
			return alts;
		}
	}

	/**
	 * Two {@link DFAState} instances are equal if their ATN configuration sets
	 * are the same. This method is used to see if a state already exists.
	 *
	 * <p>Because the number of alternatives and number of ATN configurations are
	 * finite, there is a finite number of DFA states that can be processed.
	 * This is necessary to show that the algorithm terminates.</p>
	 *
	 * <p>Cannot test the DFA state numbers here because in
	 * {@link ParserATNSimulator//addDFAState} we need to know if any other state
	 * exists that has this exact set of ATN configurations. The
	 * {@link //stateNumber} is irrelevant.</p>
	 */
	equals(other) {
		// compare set of ATN configurations in this set with other
		return this === other ||
				(other instanceof DFAState &&
					this.configs.equals(other.configs));
	}

	toString() {
		let s = "" + this.stateNumber + ":" + this.configs;
		if(this.isAcceptState) {
			s = s + "=>";
			if (this.predicates !== null)
				s = s + this.predicates;
			else
				s = s + this.prediction;
		}
		return s;
	}

	hashCode() {
		const hash = new Hash();
		hash.update(this.configs);
		return hash.finish();
	}
}

module.exports = { DFAState, PredPrediction };


/***/ }),

/***/ 14:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

exports.DFA = __webpack_require__(178);
/* unused reexport */ __webpack_require__(999).DFASerializer;
/* unused reexport */ __webpack_require__(999).LexerDFASerializer;
/* unused reexport */ __webpack_require__(254).PredPrediction;


/***/ }),

/***/ 114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {BitSet} = __webpack_require__(785);
const {ErrorListener} = __webpack_require__(553)
const {Interval} = __webpack_require__(909)


/**
 * This implementation of {@link ANTLRErrorListener} can be used to identify
 *  certain potential correctness and performance problems in grammars. "Reports"
 *  are made by calling {@link Parser//notifyErrorListeners} with the appropriate
 *  message.
 *
 *  <ul>
 *  <li><b>Ambiguities</b>: These are cases where more than one path through the
 *  grammar can match the input.</li>
 *  <li><b>Weak context sensitivity</b>: These are cases where full-context
 *  prediction resolved an SLL conflict to a unique alternative which equaled the
 *  minimum alternative of the SLL conflict.</li>
 *  <li><b>Strong (forced) context sensitivity</b>: These are cases where the
 *  full-context prediction resolved an SLL conflict to a unique alternative,
 *  <em>and</em> the minimum alternative of the SLL conflict was found to not be
 *  a truly viable alternative. Two-stage parsing cannot be used for inputs where
 *  this situation occurs.</li>
 *  </ul>
 */
class DiagnosticErrorListener extends ErrorListener {
	constructor(exactOnly) {
		super();
		exactOnly = exactOnly || true;
		// whether all ambiguities or only exact ambiguities are reported.
		this.exactOnly = exactOnly;
	}

	reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
		if (this.exactOnly && !exact) {
			return;
		}
		const msg = "reportAmbiguity d=" +
			this.getDecisionDescription(recognizer, dfa) +
			": ambigAlts=" +
			this.getConflictingAlts(ambigAlts, configs) +
			", input='" +
			recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'"
		recognizer.notifyErrorListeners(msg);
	}

	reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
		const msg = "reportAttemptingFullContext d=" +
			this.getDecisionDescription(recognizer, dfa) +
			", input='" +
			recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'"
		recognizer.notifyErrorListeners(msg);
	}

	reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
		const msg = "reportContextSensitivity d=" +
			this.getDecisionDescription(recognizer, dfa) +
			", input='" +
			recognizer.getTokenStream().getText(new Interval(startIndex, stopIndex)) + "'"
		recognizer.notifyErrorListeners(msg);
	}

	getDecisionDescription(recognizer, dfa) {
		const decision = dfa.decision
		const ruleIndex = dfa.atnStartState.ruleIndex

		const ruleNames = recognizer.ruleNames
		if (ruleIndex < 0 || ruleIndex >= ruleNames.length) {
			return "" + decision;
		}
		const ruleName = ruleNames[ruleIndex] || null
		if (ruleName === null || ruleName.length === 0) {
			return "" + decision;
		}
		return `${decision} (${ruleName})`;
	}

	/**
	 * Computes the set of conflicting or ambiguous alternatives from a
	 * configuration set, if that information was not already provided by the
	 * parser.
	 *
	 * @param reportedAlts The set of conflicting or ambiguous alternatives, as
	 * reported by the parser.
	 * @param configs The conflicting or ambiguous configuration set.
	 * @return Returns {@code reportedAlts} if it is not {@code null}, otherwise
	 * returns the set of alternatives represented in {@code configs}.
     */
	getConflictingAlts(reportedAlts, configs) {
		if (reportedAlts !== null) {
			return reportedAlts;
		}
		const result = new BitSet()
		for (let i = 0; i < configs.items.length; i++) {
			result.add(configs.items[i].alt);
		}
		return `{${result.values().join(", ")}}`;
	}
}

module.exports = DiagnosticErrorListener


/***/ }),

/***/ 553:
/***/ ((module) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/**
 * Provides an empty default implementation of {@link ANTLRErrorListener}. The
 * default implementation of each method does nothing, but can be overridden as
 * necessary.
 */
class ErrorListener {
    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    }

    reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
    }

    reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
    }

    reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
    }
}

/**
 * {@inheritDoc}
 *
 * <p>
 * This implementation prints messages to {@link System//err} containing the
 * values of {@code line}, {@code charPositionInLine}, and {@code msg} using
 * the following format.</p>
 *
 * <pre>
 * line <em>line</em>:<em>charPositionInLine</em> <em>msg</em>
 * </pre>
 *
 */
class ConsoleErrorListener extends ErrorListener {
    constructor() {
        super();
    }

    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        console.error("line " + line + ":" + column + " " + msg);
    }
}


/**
 * Provides a default instance of {@link ConsoleErrorListener}.
 */
ConsoleErrorListener.INSTANCE = new ConsoleErrorListener();

class ProxyErrorListener extends ErrorListener {
    constructor(delegates) {
        super();
        if (delegates===null) {
            throw "delegates";
        }
        this.delegates = delegates;
        return this;
    }

    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        this.delegates.map(d => d.syntaxError(recognizer, offendingSymbol, line, column, msg, e));
    }

    reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
        this.delegates.map(d => d.reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs));
    }

    reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs) {
        this.delegates.map(d => d.reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs));
    }

    reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs) {
        this.delegates.map(d => d.reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs));
    }
}

module.exports = {ErrorListener, ConsoleErrorListener, ProxyErrorListener}



/***/ }),

/***/ 390:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Token} = __webpack_require__(994)
const {NoViableAltException, InputMismatchException, FailedPredicateException, ParseCancellationException} = __webpack_require__(337)
const {ATNState} = __webpack_require__(290)
const {Interval, IntervalSet} = __webpack_require__(909)

class ErrorStrategy {

    reset(recognizer) {
    }

    recoverInline(recognizer) {
    }

    recover(recognizer, e) {
    }

    sync(recognizer) {
    }

    inErrorRecoveryMode(recognizer) {
    }

    reportError(recognizer) {
    }
}


/**
 * This is the default implementation of {@link ANTLRErrorStrategy} used for
 * error reporting and recovery in ANTLR parsers.
*/
class DefaultErrorStrategy extends ErrorStrategy {
    constructor() {
        super();
        /**
         * Indicates whether the error strategy is currently "recovering from an
         * error". This is used to suppress reporting multiple error messages while
         * attempting to recover from a detected syntax error.
         *
         * @see //inErrorRecoveryMode
         */
        this.errorRecoveryMode = false;

        /**
         * The index into the input stream where the last error occurred.
         * This is used to prevent infinite loops where an error is found
         * but no token is consumed during recovery...another error is found,
         * ad nauseum. This is a failsafe mechanism to guarantee that at least
         * one token/tree node is consumed for two errors.
         */
        this.lastErrorIndex = -1;
        this.lastErrorStates = null;
        this.nextTokensContext = null;
        this.nextTokenState = 0;
    }

    /**
     * <p>The default implementation simply calls {@link //endErrorCondition} to
     * ensure that the handler is not in error recovery mode.</p>
    */
    reset(recognizer) {
        this.endErrorCondition(recognizer);
    }

    /**
     * This method is called to enter error recovery mode when a recognition
     * exception is reported.
     *
     * @param recognizer the parser instance
    */
    beginErrorCondition(recognizer) {
        this.errorRecoveryMode = true;
    }

    inErrorRecoveryMode(recognizer) {
        return this.errorRecoveryMode;
    }

    /**
     * This method is called to leave error recovery mode after recovering from
     * a recognition exception.
     * @param recognizer
     */
    endErrorCondition(recognizer) {
        this.errorRecoveryMode = false;
        this.lastErrorStates = null;
        this.lastErrorIndex = -1;
    }

    /**
     * {@inheritDoc}
     * <p>The default implementation simply calls {@link //endErrorCondition}.</p>
     */
    reportMatch(recognizer) {
        this.endErrorCondition(recognizer);
    }

    /**
     * {@inheritDoc}
     *
     * <p>The default implementation returns immediately if the handler is already
     * in error recovery mode. Otherwise, it calls {@link //beginErrorCondition}
     * and dispatches the reporting task based on the runtime type of {@code e}
     * according to the following table.</p>
     *
     * <ul>
     * <li>{@link NoViableAltException}: Dispatches the call to
     * {@link //reportNoViableAlternative}</li>
     * <li>{@link InputMismatchException}: Dispatches the call to
     * {@link //reportInputMismatch}</li>
     * <li>{@link FailedPredicateException}: Dispatches the call to
     * {@link //reportFailedPredicate}</li>
     * <li>All other types: calls {@link Parser//notifyErrorListeners} to report
     * the exception</li>
     * </ul>
     */
    reportError(recognizer, e) {
       // if we've already reported an error and have not matched a token
       // yet successfully, don't report any errors.
        if(this.inErrorRecoveryMode(recognizer)) {
            return; // don't report spurious errors
        }
        this.beginErrorCondition(recognizer);
        if ( e instanceof NoViableAltException ) {
            this.reportNoViableAlternative(recognizer, e);
        } else if ( e instanceof InputMismatchException ) {
            this.reportInputMismatch(recognizer, e);
        } else if ( e instanceof FailedPredicateException ) {
            this.reportFailedPredicate(recognizer, e);
        } else {
            console.log("unknown recognition error type: " + e.constructor.name);
            console.log(e.stack);
            recognizer.notifyErrorListeners(e.getOffendingToken(), e.getMessage(), e);
        }
    }

    /**
     *
     * {@inheritDoc}
     *
     * <p>The default implementation resynchronizes the parser by consuming tokens
     * until we find one in the resynchronization set--loosely the set of tokens
     * that can follow the current rule.</p>
     *
     */
    recover(recognizer, e) {
        if (this.lastErrorIndex===recognizer.getInputStream().index &&
            this.lastErrorStates !== null && this.lastErrorStates.indexOf(recognizer.state)>=0) {
            // uh oh, another error at same token index and previously-visited
            // state in ATN; must be a case where LT(1) is in the recovery
            // token set so nothing got consumed. Consume a single token
            // at least to prevent an infinite loop; this is a failsafe.
            recognizer.consume();
        }
        this.lastErrorIndex = recognizer._input.index;
        if (this.lastErrorStates === null) {
            this.lastErrorStates = [];
        }
        this.lastErrorStates.push(recognizer.state);
        const followSet = this.getErrorRecoverySet(recognizer)
        this.consumeUntil(recognizer, followSet);
    }

    /**
     * The default implementation of {@link ANTLRErrorStrategy//sync} makes sure
     * that the current lookahead symbol is consistent with what were expecting
     * at this point in the ATN. You can call this anytime but ANTLR only
     * generates code to check before subrules/loops and each iteration.
     *
     * <p>Implements Jim Idle's magic sync mechanism in closures and optional
     * subrules. E.g.,</p>
     *
     * <pre>
     * a : sync ( stuff sync )* ;
     * sync : {consume to what can follow sync} ;
     * </pre>
     *
     * At the start of a sub rule upon error, {@link //sync} performs single
     * token deletion, if possible. If it can't do that, it bails on the current
     * rule and uses the default error recovery, which consumes until the
     * resynchronization set of the current rule.
     *
     * <p>If the sub rule is optional ({@code (...)?}, {@code (...)*}, or block
     * with an empty alternative), then the expected set includes what follows
     * the subrule.</p>
     *
     * <p>During loop iteration, it consumes until it sees a token that can start a
     * sub rule or what follows loop. Yes, that is pretty aggressive. We opt to
     * stay in the loop as long as possible.</p>
     *
     * <p><strong>ORIGINS</strong></p>
     *
     * <p>Previous versions of ANTLR did a poor job of their recovery within loops.
     * A single mismatch token or missing token would force the parser to bail
     * out of the entire rules surrounding the loop. So, for rule</p>
     *
     * <pre>
     * classDef : 'class' ID '{' member* '}'
     * </pre>
     *
     * input with an extra token between members would force the parser to
     * consume until it found the next class definition rather than the next
     * member definition of the current class.
     *
     * <p>This functionality cost a little bit of effort because the parser has to
     * compare token set at the start of the loop and at each iteration. If for
     * some reason speed is suffering for you, you can turn off this
     * functionality by simply overriding this method as a blank { }.</p>
     *
     */
    sync(recognizer) {
        // If already recovering, don't try to sync
        if (this.inErrorRecoveryMode(recognizer)) {
            return;
        }
        const s = recognizer._interp.atn.states[recognizer.state];
        const la = recognizer.getTokenStream().LA(1);
        // try cheaper subset first; might get lucky. seems to shave a wee bit off
        const nextTokens = recognizer.atn.nextTokens(s);
        if(nextTokens.contains(la)) {
            this.nextTokensContext = null;
            this.nextTokenState = ATNState.INVALID_STATE_NUMBER;
            return;
        } else if (nextTokens.contains(Token.EPSILON)) {
            if(this.nextTokensContext === null) {
                // It's possible the next token won't match information tracked
                // by sync is restricted for performance.
                this.nextTokensContext = recognizer._ctx;
                this.nextTokensState = recognizer._stateNumber;
            }
            return;
        }
        switch (s.stateType) {
        case ATNState.BLOCK_START:
        case ATNState.STAR_BLOCK_START:
        case ATNState.PLUS_BLOCK_START:
        case ATNState.STAR_LOOP_ENTRY:
           // report error and recover if possible
            if( this.singleTokenDeletion(recognizer) !== null) {
                return;
            } else {
                throw new InputMismatchException(recognizer);
            }
        case ATNState.PLUS_LOOP_BACK:
        case ATNState.STAR_LOOP_BACK:
            this.reportUnwantedToken(recognizer);
            const expecting = new IntervalSet()
            expecting.addSet(recognizer.getExpectedTokens());
            const whatFollowsLoopIterationOrRule = expecting.addSet(this.getErrorRecoverySet(recognizer))
            this.consumeUntil(recognizer, whatFollowsLoopIterationOrRule);
            break;
        default:
            // do nothing if we can't identify the exact kind of ATN state
        }
    }

    /**
     * This is called by {@link //reportError} when the exception is a
     * {@link NoViableAltException}.
     *
     * @see //reportError
     *
     * @param recognizer the parser instance
     * @param e the recognition exception
     */
    reportNoViableAlternative(recognizer, e) {
        const tokens = recognizer.getTokenStream()
        let input
        if(tokens !== null) {
            if (e.startToken.type===Token.EOF) {
                input = "<EOF>";
            } else {
                input = tokens.getText(new Interval(e.startToken.tokenIndex, e.offendingToken.tokenIndex));
            }
        } else {
            input = "<unknown input>";
        }
        const msg = "no viable alternative at input " + this.escapeWSAndQuote(input)
        recognizer.notifyErrorListeners(msg, e.offendingToken, e);
    }

    /**
     * This is called by {@link //reportError} when the exception is an
     * {@link InputMismatchException}.
     *
     * @see //reportError
     *
     * @param recognizer the parser instance
     * @param e the recognition exception
     */
    reportInputMismatch(recognizer, e) {
        const msg = "mismatched input " + this.getTokenErrorDisplay(e.offendingToken) +
            " expecting " + e.getExpectedTokens().toString(recognizer.literalNames, recognizer.symbolicNames)
        recognizer.notifyErrorListeners(msg, e.offendingToken, e);
    }

    /**
     * This is called by {@link //reportError} when the exception is a
     * {@link FailedPredicateException}.
     *
     * @see //reportError
     *
     * @param recognizer the parser instance
     * @param e the recognition exception
     */
    reportFailedPredicate(recognizer, e) {
        const ruleName = recognizer.ruleNames[recognizer._ctx.ruleIndex]
        const msg = "rule " + ruleName + " " + e.message
        recognizer.notifyErrorListeners(msg, e.offendingToken, e);
    }

    /**
     * This method is called to report a syntax error which requires the removal
     * of a token from the input stream. At the time this method is called, the
     * erroneous symbol is current {@code LT(1)} symbol and has not yet been
     * removed from the input stream. When this method returns,
     * {@code recognizer} is in error recovery mode.
     *
     * <p>This method is called when {@link //singleTokenDeletion} identifies
     * single-token deletion as a viable recovery strategy for a mismatched
     * input error.</p>
     *
     * <p>The default implementation simply returns if the handler is already in
     * error recovery mode. Otherwise, it calls {@link //beginErrorCondition} to
     * enter error recovery mode, followed by calling
     * {@link Parser//notifyErrorListeners}.</p>
     *
     * @param recognizer the parser instance
     *
     */
    reportUnwantedToken(recognizer) {
        if (this.inErrorRecoveryMode(recognizer)) {
            return;
        }
        this.beginErrorCondition(recognizer);
        const t = recognizer.getCurrentToken()
        const tokenName = this.getTokenErrorDisplay(t)
        const expecting = this.getExpectedTokens(recognizer)
        const msg = "extraneous input " + tokenName + " expecting " +
            expecting.toString(recognizer.literalNames, recognizer.symbolicNames)
        recognizer.notifyErrorListeners(msg, t, null);
    }

    /**
     * This method is called to report a syntax error which requires the
     * insertion of a missing token into the input stream. At the time this
     * method is called, the missing token has not yet been inserted. When this
     * method returns, {@code recognizer} is in error recovery mode.
     *
     * <p>This method is called when {@link //singleTokenInsertion} identifies
     * single-token insertion as a viable recovery strategy for a mismatched
     * input error.</p>
     *
     * <p>The default implementation simply returns if the handler is already in
     * error recovery mode. Otherwise, it calls {@link //beginErrorCondition} to
     * enter error recovery mode, followed by calling
     * {@link Parser//notifyErrorListeners}.</p>
     *
     * @param recognizer the parser instance
     */
    reportMissingToken(recognizer) {
        if ( this.inErrorRecoveryMode(recognizer)) {
            return;
        }
        this.beginErrorCondition(recognizer);
        const t = recognizer.getCurrentToken()
        const expecting = this.getExpectedTokens(recognizer)
        const msg = "missing " + expecting.toString(recognizer.literalNames, recognizer.symbolicNames) +
            " at " + this.getTokenErrorDisplay(t)
        recognizer.notifyErrorListeners(msg, t, null);
    }

    /**
     * <p>The default implementation attempts to recover from the mismatched input
     * by using single token insertion and deletion as described below. If the
     * recovery attempt fails, this method throws an
     * {@link InputMismatchException}.</p>
     *
     * <p><strong>EXTRA TOKEN</strong> (single token deletion)</p>
     *
     * <p>{@code LA(1)} is not what we are looking for. If {@code LA(2)} has the
     * right token, however, then assume {@code LA(1)} is some extra spurious
     * token and delete it. Then consume and return the next token (which was
     * the {@code LA(2)} token) as the successful result of the match operation.</p>
     *
     * <p>This recovery strategy is implemented by {@link
     * //singleTokenDeletion}.</p>
     *
     * <p><strong>MISSING TOKEN</strong> (single token insertion)</p>
     *
     * <p>If current token (at {@code LA(1)}) is consistent with what could come
     * after the expected {@code LA(1)} token, then assume the token is missing
     * and use the parser's {@link TokenFactory} to create it on the fly. The
     * "insertion" is performed by returning the created token as the successful
     * result of the match operation.</p>
     *
     * <p>This recovery strategy is implemented by {@link
     * //singleTokenInsertion}.</p>
     *
     * <p><strong>EXAMPLE</strong></p>
     *
     * <p>For example, Input {@code i=(3;} is clearly missing the {@code ')'}. When
     * the parser returns from the nested call to {@code expr}, it will have
     * call chain:</p>
     *
     * <pre>
     * stat &rarr; expr &rarr; atom
     * </pre>
     *
     * and it will be trying to match the {@code ')'} at this point in the
     * derivation:
     *
     * <pre>
     * =&gt; ID '=' '(' INT ')' ('+' atom)* ';'
     * ^
     * </pre>
     *
     * The attempt to match {@code ')'} will fail when it sees {@code ';'} and
     * call {@link //recoverInline}. To recover, it sees that {@code LA(1)==';'}
     * is in the set of tokens that can follow the {@code ')'} token reference
     * in rule {@code atom}. It can assume that you forgot the {@code ')'}.
     */
    recoverInline(recognizer) {
        // SINGLE TOKEN DELETION
        const matchedSymbol = this.singleTokenDeletion(recognizer)
        if (matchedSymbol !== null) {
            // we have deleted the extra token.
            // now, move past ttype token as if all were ok
            recognizer.consume();
            return matchedSymbol;
        }
        // SINGLE TOKEN INSERTION
        if (this.singleTokenInsertion(recognizer)) {
            return this.getMissingSymbol(recognizer);
        }
        // even that didn't work; must throw the exception
        throw new InputMismatchException(recognizer);
    }

    /**
     * This method implements the single-token insertion inline error recovery
     * strategy. It is called by {@link //recoverInline} if the single-token
     * deletion strategy fails to recover from the mismatched input. If this
     * method returns {@code true}, {@code recognizer} will be in error recovery
     * mode.
     *
     * <p>This method determines whether or not single-token insertion is viable by
     * checking if the {@code LA(1)} input symbol could be successfully matched
     * if it were instead the {@code LA(2)} symbol. If this method returns
     * {@code true}, the caller is responsible for creating and inserting a
     * token with the correct type to produce this behavior.</p>
     *
     * @param recognizer the parser instance
     * @return {@code true} if single-token insertion is a viable recovery
     * strategy for the current mismatched input, otherwise {@code false}
     */
    singleTokenInsertion(recognizer) {
        const currentSymbolType = recognizer.getTokenStream().LA(1)
        // if current token is consistent with what could come after current
        // ATN state, then we know we're missing a token; error recovery
        // is free to conjure up and insert the missing token
        const atn = recognizer._interp.atn
        const currentState = atn.states[recognizer.state]
        const next = currentState.transitions[0].target
        const expectingAtLL2 = atn.nextTokens(next, recognizer._ctx)
        if (expectingAtLL2.contains(currentSymbolType) ){
            this.reportMissingToken(recognizer);
            return true;
        } else {
            return false;
        }
    }

    /**
     * This method implements the single-token deletion inline error recovery
     * strategy. It is called by {@link //recoverInline} to attempt to recover
     * from mismatched input. If this method returns null, the parser and error
     * handler state will not have changed. If this method returns non-null,
     * {@code recognizer} will <em>not</em> be in error recovery mode since the
     * returned token was a successful match.
     *
     * <p>If the single-token deletion is successful, this method calls
     * {@link //reportUnwantedToken} to report the error, followed by
     * {@link Parser//consume} to actually "delete" the extraneous token. Then,
     * before returning {@link //reportMatch} is called to signal a successful
     * match.</p>
     *
     * @param recognizer the parser instance
     * @return the successfully matched {@link Token} instance if single-token
     * deletion successfully recovers from the mismatched input, otherwise
     * {@code null}
     */
    singleTokenDeletion(recognizer) {
        const nextTokenType = recognizer.getTokenStream().LA(2)
        const expecting = this.getExpectedTokens(recognizer)
        if (expecting.contains(nextTokenType)) {
            this.reportUnwantedToken(recognizer);
            // print("recoverFromMismatchedToken deleting " \
            // + str(recognizer.getTokenStream().LT(1)) \
            // + " since " + str(recognizer.getTokenStream().LT(2)) \
            // + " is what we want", file=sys.stderr)
            recognizer.consume(); // simply delete extra token
            // we want to return the token we're actually matching
            const matchedSymbol = recognizer.getCurrentToken()
            this.reportMatch(recognizer); // we know current token is correct
            return matchedSymbol;
        } else {
            return null;
        }
    }

    /**
     * Conjure up a missing token during error recovery.
     *
     * The recognizer attempts to recover from single missing
     * symbols. But, actions might refer to that missing symbol.
     * For example, x=ID {f($x);}. The action clearly assumes
     * that there has been an identifier matched previously and that
     * $x points at that token. If that token is missing, but
     * the next token in the stream is what we want we assume that
     * this token is missing and we keep going. Because we
     * have to return some token to replace the missing token,
     * we have to conjure one up. This method gives the user control
     * over the tokens returned for missing tokens. Mostly,
     * you will want to create something special for identifier
     * tokens. For literals such as '{' and ',', the default
     * action in the parser or tree parser works. It simply creates
     * a CommonToken of the appropriate type. The text will be the token.
     * If you change what tokens must be created by the lexer,
     * override this method to create the appropriate tokens.
     *
     */
    getMissingSymbol(recognizer) {
        const currentSymbol = recognizer.getCurrentToken()
        const expecting = this.getExpectedTokens(recognizer)
        const expectedTokenType = expecting.first() // get any element
        let tokenText
        if (expectedTokenType===Token.EOF) {
            tokenText = "<missing EOF>";
        } else {
            tokenText = "<missing " + recognizer.literalNames[expectedTokenType] + ">";
        }
        let current = currentSymbol
        const lookback = recognizer.getTokenStream().LT(-1)
        if (current.type===Token.EOF && lookback !== null) {
            current = lookback;
        }
        return recognizer.getTokenFactory().create(current.source,
            expectedTokenType, tokenText, Token.DEFAULT_CHANNEL,
            -1, -1, current.line, current.column);
    }

    getExpectedTokens(recognizer) {
        return recognizer.getExpectedTokens();
    }

    /**
     * How should a token be displayed in an error message? The default
     * is to display just the text, but during development you might
     * want to have a lot of information spit out. Override in that case
     * to use t.toString() (which, for CommonToken, dumps everything about
     * the token). This is better than forcing you to override a method in
     * your token objects because you don't have to go modify your lexer
     * so that it creates a new Java type.
     */
    getTokenErrorDisplay(t) {
        if (t === null) {
            return "<no token>";
        }
        let s = t.text
        if (s === null) {
            if (t.type===Token.EOF) {
                s = "<EOF>";
            } else {
                s = "<" + t.type + ">";
            }
        }
        return this.escapeWSAndQuote(s);
    }

    escapeWSAndQuote(s) {
        s = s.replace(/\n/g,"\\n");
        s = s.replace(/\r/g,"\\r");
        s = s.replace(/\t/g,"\\t");
        return "'" + s + "'";
    }

    /**
     * Compute the error recovery set for the current rule. During
     * rule invocation, the parser pushes the set of tokens that can
     * follow that rule reference on the stack; this amounts to
     * computing FIRST of what follows the rule reference in the
     * enclosing rule. See LinearApproximator.FIRST().
     * This local follow set only includes tokens
     * from within the rule; i.e., the FIRST computation done by
     * ANTLR stops at the end of a rule.
     *
     * EXAMPLE
     *
     * When you find a "no viable alt exception", the input is not
     * consistent with any of the alternatives for rule r. The best
     * thing to do is to consume tokens until you see something that
     * can legally follow a call to r//or* any rule that called r.
     * You don't want the exact set of viable next tokens because the
     * input might just be missing a token--you might consume the
     * rest of the input looking for one of the missing tokens.
     *
     * Consider grammar:
     *
     * a : '[' b ']'
     * | '(' b ')'
     * ;
     * b : c '^' INT ;
     * c : ID
     * | INT
     * ;
     *
     * At each rule invocation, the set of tokens that could follow
     * that rule is pushed on a stack. Here are the various
     * context-sensitive follow sets:
     *
     * FOLLOW(b1_in_a) = FIRST(']') = ']'
     * FOLLOW(b2_in_a) = FIRST(')') = ')'
     * FOLLOW(c_in_b) = FIRST('^') = '^'
     *
     * Upon erroneous input "[]", the call chain is
     *
     * a -> b -> c
     *
     * and, hence, the follow context stack is:
     *
     * depth follow set start of rule execution
     * 0 <EOF> a (from main())
     * 1 ']' b
     * 2 '^' c
     *
     * Notice that ')' is not included, because b would have to have
     * been called from a different context in rule a for ')' to be
     * included.
     *
     * For error recovery, we cannot consider FOLLOW(c)
     * (context-sensitive or otherwise). We need the combined set of
     * all context-sensitive FOLLOW sets--the set of all tokens that
     * could follow any reference in the call chain. We need to
     * resync to one of those tokens. Note that FOLLOW(c)='^' and if
     * we resync'd to that token, we'd consume until EOF. We need to
     * sync to context-sensitive FOLLOWs for a, b, and c: {']','^'}.
     * In this case, for input "[]", LA(1) is ']' and in the set, so we would
     * not consume anything. After printing an error, rule c would
     * return normally. Rule b would not find the required '^' though.
     * At this point, it gets a mismatched token error and throws an
     * exception (since LA(1) is not in the viable following token
     * set). The rule exception handler tries to recover, but finds
     * the same recovery set and doesn't consume anything. Rule b
     * exits normally returning to rule a. Now it finds the ']' (and
     * with the successful match exits errorRecovery mode).
     *
     * So, you can see that the parser walks up the call chain looking
     * for the token that was a member of the recovery set.
     *
     * Errors are not generated in errorRecovery mode.
     *
     * ANTLR's error recovery mechanism is based upon original ideas:
     *
     * "Algorithms + Data Structures = Programs" by Niklaus Wirth
     *
     * and
     *
     * "A note on error recovery in recursive descent parsers":
     * http://portal.acm.org/citation.cfm?id=947902.947905
     *
     * Later, Josef Grosch had some good ideas:
     *
     * "Efficient and Comfortable Error Recovery in Recursive Descent
     * Parsers":
     * ftp://www.cocolab.com/products/cocktail/doca4.ps/ell.ps.zip
     *
     * Like Grosch I implement context-sensitive FOLLOW sets that are combined
     * at run-time upon error to avoid overhead during parsing.
     */
    getErrorRecoverySet(recognizer) {
        const atn = recognizer._interp.atn
        let ctx = recognizer._ctx
        const recoverSet = new IntervalSet()
        while (ctx !== null && ctx.invokingState>=0) {
            // compute what follows who invoked us
            const invokingState = atn.states[ctx.invokingState]
            const rt = invokingState.transitions[0]
            const follow = atn.nextTokens(rt.followState)
            recoverSet.addSet(follow);
            ctx = ctx.parentCtx;
        }
        recoverSet.removeOne(Token.EPSILON);
        return recoverSet;
    }

// Consume tokens until one matches the given token set.//
    consumeUntil(recognizer, set) {
        let ttype = recognizer.getTokenStream().LA(1)
        while( ttype !== Token.EOF && !set.contains(ttype)) {
            recognizer.consume();
            ttype = recognizer.getTokenStream().LA(1);
        }
    }
}


/**
 * This implementation of {@link ANTLRErrorStrategy} responds to syntax errors
 * by immediately canceling the parse operation with a
 * {@link ParseCancellationException}. The implementation ensures that the
 * {@link ParserRuleContext//exception} field is set for all parse tree nodes
 * that were not completed prior to encountering the error.
 *
 * <p>
 * This error strategy is useful in the following scenarios.</p>
 *
 * <ul>
 * <li><strong>Two-stage parsing:</strong> This error strategy allows the first
 * stage of two-stage parsing to immediately terminate if an error is
 * encountered, and immediately fall back to the second stage. In addition to
 * avoiding wasted work by attempting to recover from errors here, the empty
 * implementation of {@link BailErrorStrategy//sync} improves the performance of
 * the first stage.</li>
 * <li><strong>Silent validation:</strong> When syntax errors are not being
 * reported or logged, and the parse result is simply ignored if errors occur,
 * the {@link BailErrorStrategy} avoids wasting work on recovering from errors
 * when the result will be ignored either way.</li>
 * </ul>
 *
 * <p>
 * {@code myparser.setErrorHandler(new BailErrorStrategy());}</p>
 *
 * @see Parser//setErrorHandler(ANTLRErrorStrategy)
 * */
class BailErrorStrategy extends DefaultErrorStrategy {
    constructor() {
        super();
    }

    /**
     * Instead of recovering from exception {@code e}, re-throw it wrapped
     * in a {@link ParseCancellationException} so it is not caught by the
     * rule function catches. Use {@link Exception//getCause()} to get the
     * original {@link RecognitionException}.
     */
    recover(recognizer, e) {
        let context = recognizer._ctx
        while (context !== null) {
            context.exception = e;
            context = context.parentCtx;
        }
        throw new ParseCancellationException(e);
    }

    /**
     * Make sure we don't attempt to recover inline; if the parser
     * successfully recovers, it won't throw an exception.
     */
    recoverInline(recognizer) {
        this.recover(recognizer, new InputMismatchException(recognizer));
    }

// Make sure we don't attempt to recover from problems in subrules.//
    sync(recognizer) {
        // pass
    }
}


module.exports = {BailErrorStrategy, DefaultErrorStrategy};


/***/ }),

/***/ 337:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/**
 * The root of the ANTLR exception hierarchy. In general, ANTLR tracks just
 *  3 kinds of errors: prediction errors, failed predicate errors, and
 *  mismatched input errors. In each case, the parser knows where it is
 *  in the input, where it is in the ATN, the rule invocation stack,
 *  and what kind of problem occurred.
 */

const {PredicateTransition} = __webpack_require__(68);
const {Interval} = __webpack_require__(909).Interval;

class RecognitionException extends Error {
    constructor(params) {
        super(params.message);
        if (!!Error.captureStackTrace) {
            Error.captureStackTrace(this, RecognitionException);
        } else {
            var stack = new Error().stack;
        }
        this.message = params.message;
        this.recognizer = params.recognizer;
        this.input = params.input;
        this.ctx = params.ctx;
        /**
         * The current {@link Token} when an error occurred. Since not all streams
         * support accessing symbols by index, we have to track the {@link Token}
         * instance itself
        */
        this.offendingToken = null;
        /**
         * Get the ATN state number the parser was in at the time the error
         * occurred. For {@link NoViableAltException} and
         * {@link LexerNoViableAltException} exceptions, this is the
         * {@link DecisionState} number. For others, it is the state whose outgoing
         * edge we couldn't match.
         */
        this.offendingState = -1;
        if (this.recognizer!==null) {
            this.offendingState = this.recognizer.state;
        }
    }

    /**
     * Gets the set of input symbols which could potentially follow the
     * previously matched symbol at the time this exception was thrown.
     *
     * <p>If the set of expected tokens is not known and could not be computed,
     * this method returns {@code null}.</p>
     *
     * @return The set of token types that could potentially follow the current
     * state in the ATN, or {@code null} if the information is not available.
     */
    getExpectedTokens() {
        if (this.recognizer!==null) {
            return this.recognizer.atn.getExpectedTokens(this.offendingState, this.ctx);
        } else {
            return null;
        }
    }

    // <p>If the state number is not known, this method returns -1.</p>
    toString() {
        return this.message;
    }
}

class LexerNoViableAltException extends RecognitionException {
    constructor(lexer, input, startIndex, deadEndConfigs) {
        super({message: "", recognizer: lexer, input: input, ctx: null});
        this.startIndex = startIndex;
        this.deadEndConfigs = deadEndConfigs;
    }

    toString() {
        let symbol = "";
        if (this.startIndex >= 0 && this.startIndex < this.input.size) {
            symbol = this.input.getText(new Interval(this.startIndex,this.startIndex));
        }
        return "LexerNoViableAltException" + symbol;
    }
}


/**
 * Indicates that the parser could not decide which of two or more paths
 * to take based upon the remaining input. It tracks the starting token
 * of the offending input and also knows where the parser was
 * in the various paths when the error. Reported by reportNoViableAlternative()
 */
class NoViableAltException extends RecognitionException {
    constructor(recognizer, input, startToken, offendingToken, deadEndConfigs, ctx) {
        ctx = ctx || recognizer._ctx;
        offendingToken = offendingToken || recognizer.getCurrentToken();
        startToken = startToken || recognizer.getCurrentToken();
        input = input || recognizer.getInputStream();
        super({message: "", recognizer: recognizer, input: input, ctx: ctx});
        // Which configurations did we try at input.index() that couldn't match
        // input.LT(1)?//
        this.deadEndConfigs = deadEndConfigs;
        // The token object at the start index; the input stream might
        // not be buffering tokens so get a reference to it. (At the
        // time the error occurred, of course the stream needs to keep a
        // buffer all of the tokens but later we might not have access to those.)
        this.startToken = startToken;
        this.offendingToken = offendingToken;
    }
}

/**
 * This signifies any kind of mismatched input exceptions such as
 * when the current input does not match the expected token.
*/
class InputMismatchException extends RecognitionException {
    constructor(recognizer) {
        super({message: "", recognizer: recognizer, input: recognizer.getInputStream(), ctx: recognizer._ctx});
        this.offendingToken = recognizer.getCurrentToken();
    }
}

function formatMessage(predicate, message) {
    if (message !==null) {
        return message;
    } else {
        return "failed predicate: {" + predicate + "}?";
    }
}

/**
 * A semantic predicate failed during validation. Validation of predicates
 * occurs when normally parsing the alternative just like matching a token.
 * Disambiguating predicate evaluation occurs when we test a predicate during
 * prediction.
*/
class FailedPredicateException extends RecognitionException {
    constructor(recognizer, predicate, message) {
        super({
            message: formatMessage(predicate, message || null), recognizer: recognizer,
            input: recognizer.getInputStream(), ctx: recognizer._ctx
        });
        const s = recognizer._interp.atn.states[recognizer.state]
        const trans = s.transitions[0]
        if (trans instanceof PredicateTransition) {
            this.ruleIndex = trans.ruleIndex;
            this.predicateIndex = trans.predIndex;
        } else {
            this.ruleIndex = 0;
            this.predicateIndex = 0;
        }
        this.predicate = predicate;
        this.offendingToken = recognizer.getCurrentToken();
    }
}


class ParseCancellationException extends Error{
    constructor() {
        super()
        Error.captureStackTrace(this, ParseCancellationException);
    }
}

module.exports = {
    RecognitionException,
    NoViableAltException,
    LexerNoViableAltException,
    InputMismatchException,
    FailedPredicateException,
    ParseCancellationException
};


/***/ }),

/***/ 984:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

module.exports.RecognitionException = __webpack_require__(337).RecognitionException;
module.exports.NoViableAltException = __webpack_require__(337).NoViableAltException;
/* unused reexport */ __webpack_require__(337).LexerNoViableAltException;
/* unused reexport */ __webpack_require__(337).InputMismatchException;
module.exports.FailedPredicateException = __webpack_require__(337).FailedPredicateException;
/* unused reexport */ __webpack_require__(114);
/* unused reexport */ __webpack_require__(390).BailErrorStrategy;
/* unused reexport */ __webpack_require__(390).DefaultErrorStrategy;
module.exports.ErrorListener = __webpack_require__(553).ErrorListener;


/***/ }),

/***/ 938:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
exports.atn = __webpack_require__(907);
/* unused reexport */ __webpack_require__(879);
exports.dfa = __webpack_require__(14);
/* unused reexport */ __webpack_require__(414);
exports.tree = __webpack_require__(936);
exports.error = __webpack_require__(984);
exports.Token = __webpack_require__(994).Token;
/* unused reexport */ __webpack_require__(443);
/* unused reexport */ __webpack_require__(994).CommonToken;
exports.InputStream = __webpack_require__(796);
/* unused reexport */ __webpack_require__(661);
exports.CommonTokenStream = __webpack_require__(850);
exports.Lexer = __webpack_require__(126);
exports.Parser = __webpack_require__(63);
var pc = __webpack_require__(259);
exports.d = pc.PredictionContextCache;
exports.ParserRuleContext = __webpack_require__(449);
/* unused reexport */ __webpack_require__(909).Interval;
/* unused reexport */ __webpack_require__(909).IntervalSet;
/* unused reexport */ __webpack_require__(785);
/* unused reexport */ __webpack_require__(723).LL1Analyzer;


/***/ }),

/***/ 879:
/***/ (() => {

/*! https://mths.be/codepointat v0.2.0 by @mathias */
if (!String.prototype.codePointAt) {
	(function() {
		'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
		var defineProperty = (function() {
			// IE 8 only supports `Object.defineProperty` on DOM elements
			let result;
			try {
				const object = {};
				const $defineProperty = Object.defineProperty;
				result = $defineProperty(object, object, object) && $defineProperty;
			} catch(error) {
			}
			return result;
		}());
		const codePointAt = function(position) {
			if (this == null) {
				throw TypeError();
			}
			const string = String(this);
			const size = string.length;
			// `ToInteger`
			let index = position ? Number(position) : 0;
			if (index !== index) { // better `isNaN`
				index = 0;
			}
			// Account for out-of-bounds indices:
			if (index < 0 || index >= size) {
				return undefined;
			}
			// Get the first code unit
			const first = string.charCodeAt(index);
			let second;
			if ( // check if it’s the start of a surrogate pair
				first >= 0xD800 && first <= 0xDBFF && // high surrogate
				size > index + 1 // there is a next code unit
			) {
				second = string.charCodeAt(index + 1);
				if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
					// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
					return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
				}
			}
			return first;
		};
		if (defineProperty) {
			defineProperty(String.prototype, 'codePointAt', {
				'value': codePointAt,
				'configurable': true,
				'writable': true
			});
		} else {
			String.prototype.codePointAt = codePointAt;
		}
	}());
}


/***/ }),

/***/ 414:
/***/ (() => {

/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
if (!String.fromCodePoint) {
	(function() {
		const defineProperty = (function() {
			// IE 8 only supports `Object.defineProperty` on DOM elements
			let result;
			try {
				const object = {};
				const $defineProperty = Object.defineProperty;
				result = $defineProperty(object, object, object) && $defineProperty;
			} catch(error) {}
			return result;
		}());
		const stringFromCharCode = String.fromCharCode;
		const floor = Math.floor;
		const fromCodePoint = function(_) {
			const MAX_SIZE = 0x4000;
			const codeUnits = [];
			let highSurrogate;
			let lowSurrogate;
			let index = -1;
			const length = arguments.length;
			if (!length) {
				return '';
			}
			let result = '';
			while (++index < length) {
				let codePoint = Number(arguments[index]);
				if (
					!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
					codePoint < 0 || // not a valid Unicode code point
					codePoint > 0x10FFFF || // not a valid Unicode code point
					floor(codePoint) !== codePoint // not an integer
				) {
					throw RangeError('Invalid code point: ' + codePoint);
				}
				if (codePoint <= 0xFFFF) { // BMP code point
					codeUnits.push(codePoint);
				} else { // Astral code point; split in surrogate halves
					// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
					codePoint -= 0x10000;
					highSurrogate = (codePoint >> 10) + 0xD800;
					lowSurrogate = (codePoint % 0x400) + 0xDC00;
					codeUnits.push(highSurrogate, lowSurrogate);
				}
				if (index + 1 === length || codeUnits.length > MAX_SIZE) {
					result += stringFromCharCode.apply(null, codeUnits);
					codeUnits.length = 0;
				}
			}
			return result;
		};
		if (defineProperty) {
			defineProperty(String, 'fromCodePoint', {
				'value': fromCodePoint,
				'configurable': true,
				'writable': true
			});
		} else {
			String.fromCodePoint = fromCodePoint;
		}
	}());
}


/***/ }),

/***/ 828:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const {Token} = __webpack_require__(994);
const {Interval} = __webpack_require__(909);
const INVALID_INTERVAL = new Interval(-1, -2);

/**
 * The basic notion of a tree has a parent, a payload, and a list of children.
 * It is the most abstract interface for all the trees used by ANTLR.
 */
class Tree {}

class SyntaxTree extends Tree {
	constructor() {
		super();
	}
}

class ParseTree extends SyntaxTree {
	constructor() {
		super();
	}
}

class RuleNode extends ParseTree {
	constructor() {
		super();
	}

	getRuleContext(){
		throw new Error("missing interface implementation")
	}
}

class TerminalNode extends ParseTree {
	constructor() {
		super();
	}
}

class ErrorNode extends TerminalNode {
	constructor() {
		super();
	}
}

class ParseTreeVisitor {
	visit(ctx) {
		 if (Array.isArray(ctx)) {
			return ctx.map(function(child) {
				return child.accept(this);
			}, this);
		} else {
			return ctx.accept(this);
		}
	}

	visitChildren(ctx) {
		if (ctx.children) {
			return this.visit(ctx.children);
		} else {
			return null;
		}
	}

	visitTerminal(node) {
	}

	visitErrorNode(node) {
	}
}

class ParseTreeListener {
	visitTerminal(node) {
	}

	visitErrorNode(node) {
	}

	enterEveryRule(node) {
	}

	exitEveryRule(node) {
	}
}

class TerminalNodeImpl extends TerminalNode {
	constructor(symbol) {
		super();
		this.parentCtx = null;
		this.symbol = symbol;
	}

	getChild(i) {
		return null;
	}

	getSymbol() {
		return this.symbol;
	}

	getParent() {
		return this.parentCtx;
	}

	getPayload() {
		return this.symbol;
	}

	getSourceInterval() {
		if (this.symbol === null) {
			return INVALID_INTERVAL;
		}
		const tokenIndex = this.symbol.tokenIndex;
		return new Interval(tokenIndex, tokenIndex);
	}

	getChildCount() {
		return 0;
	}

	accept(visitor) {
		return visitor.visitTerminal(this);
	}

	getText() {
		return this.symbol.text;
	}

	toString() {
		if (this.symbol.type === Token.EOF) {
			return "<EOF>";
		} else {
			return this.symbol.text;
		}
	}
}


/**
 * Represents a token that was consumed during resynchronization
 * rather than during a valid match operation. For example,
 * we will create this kind of a node during single token insertion
 * and deletion as well as during "consume until error recovery set"
 * upon no viable alternative exceptions.
 */
class ErrorNodeImpl extends TerminalNodeImpl {
	constructor(token) {
		super(token);
	}

	isErrorNode() {
		return true;
	}

	accept(visitor) {
		return visitor.visitErrorNode(this);
	}
}

class ParseTreeWalker {

	/**
	 * Performs a walk on the given parse tree starting at the root and going down recursively
	 * with depth-first search. On each node, {@link ParseTreeWalker//enterRule} is called before
	 * recursively walking down into child nodes, then
	 * {@link ParseTreeWalker//exitRule} is called after the recursive call to wind up.
	 * @param listener The listener used by the walker to process grammar rules
	 * @param t The parse tree to be walked on
	 */
	walk(listener, t) {
		const errorNode = t instanceof ErrorNode ||
				(t.isErrorNode !== undefined && t.isErrorNode());
		if (errorNode) {
			listener.visitErrorNode(t);
		} else if (t instanceof TerminalNode) {
			listener.visitTerminal(t);
		} else {
			this.enterRule(listener, t);
			for (let i = 0; i < t.getChildCount(); i++) {
				const child = t.getChild(i);
				this.walk(listener, child);
			}
			this.exitRule(listener, t);
		}
	}

	/**
	 * Enters a grammar rule by first triggering the generic event {@link ParseTreeListener//enterEveryRule}
	 * then by triggering the event specific to the given parse tree node
	 * @param listener The listener responding to the trigger events
	 * @param r The grammar rule containing the rule context
	 */
	enterRule(listener, r) {
		const ctx = r.getRuleContext();
		listener.enterEveryRule(ctx);
		ctx.enterRule(listener);
	}

	/**
	 * Exits a grammar rule by first triggering the event specific to the given parse tree node
	 * then by triggering the generic event {@link ParseTreeListener//exitEveryRule}
	 * @param listener The listener responding to the trigger events
	 * @param r The grammar rule containing the rule context
	 */
	exitRule(listener, r) {
		const ctx = r.getRuleContext();
		ctx.exitRule(listener);
		listener.exitEveryRule(ctx);
	}
}

ParseTreeWalker.DEFAULT = new ParseTreeWalker();

module.exports = {
	RuleNode,
	ErrorNode,
	TerminalNode,
	ErrorNodeImpl,
	TerminalNodeImpl,
	ParseTreeListener,
	ParseTreeVisitor,
	ParseTreeWalker,
	INVALID_INTERVAL
}


/***/ }),

/***/ 30:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const Utils = __webpack_require__(785);
const {Token} = __webpack_require__(994);
const {ErrorNode, TerminalNode, RuleNode} = __webpack_require__(828);

/** A set of utility routines useful for all kinds of ANTLR trees. */
const Trees = {
    /**
     * Print out a whole tree in LISP form. {@link //getNodeText} is used on the
     *  node payloads to get the text for the nodes.  Detect
     *  parse trees and extract data appropriately.
     */
    toStringTree: function(tree, ruleNames, recog) {
        ruleNames = ruleNames || null;
        recog = recog || null;
        if(recog!==null) {
            ruleNames = recog.ruleNames;
        }
        let s = Trees.getNodeText(tree, ruleNames);
        s = Utils.escapeWhitespace(s, false);
        const c = tree.getChildCount();
        if(c===0) {
            return s;
        }
        let res = "(" + s + ' ';
        if(c>0) {
            s = Trees.toStringTree(tree.getChild(0), ruleNames);
            res = res.concat(s);
        }
        for(let i=1;i<c;i++) {
            s = Trees.toStringTree(tree.getChild(i), ruleNames);
            res = res.concat(' ' + s);
        }
        res = res.concat(")");
        return res;
    },

    getNodeText: function(t, ruleNames, recog) {
        ruleNames = ruleNames || null;
        recog = recog || null;
        if(recog!==null) {
            ruleNames = recog.ruleNames;
        }
        if(ruleNames!==null) {
            if (t instanceof RuleNode) {
                const context = t.getRuleContext()
                const altNumber = context.getAltNumber();
                // use const value of ATN.INVALID_ALT_NUMBER to avoid circular dependency
                if ( altNumber != 0 ) {
                    return ruleNames[t.ruleIndex]+":"+altNumber;
                }
                return ruleNames[t.ruleIndex];
            } else if ( t instanceof ErrorNode) {
                return t.toString();
            } else if(t instanceof TerminalNode) {
                if(t.symbol!==null) {
                    return t.symbol.text;
                }
            }
        }
        // no recog for rule names
        const payload = t.getPayload();
        if (payload instanceof Token ) {
            return payload.text;
        }
        return t.getPayload().toString();
    },

    /**
     * Return ordered list of all children of this node
     */
    getChildren: function(t) {
        const list = [];
        for(let i=0;i<t.getChildCount();i++) {
            list.push(t.getChild(i));
        }
        return list;
    },

    /**
     * Return a list of all ancestors of this node.  The first node of
     * list is the root and the last is the parent of this node.
     */
    getAncestors: function(t) {
        let ancestors = [];
        t = t.getParent();
        while(t!==null) {
            ancestors = [t].concat(ancestors);
            t = t.getParent();
        }
        return ancestors;
    },

    findAllTokenNodes: function(t, ttype) {
        return Trees.findAllNodes(t, ttype, true);
    },

    findAllRuleNodes: function(t, ruleIndex) {
        return Trees.findAllNodes(t, ruleIndex, false);
    },

    findAllNodes: function(t, index, findTokens) {
        const nodes = [];
        Trees._findAllNodes(t, index, findTokens, nodes);
        return nodes;
    },

    _findAllNodes: function(t, index, findTokens, nodes) {
        // check this node (the root) first
        if(findTokens && (t instanceof TerminalNode)) {
            if(t.symbol.type===index) {
                nodes.push(t);
            }
        } else if(!findTokens && (t instanceof RuleNode)) {
            if(t.ruleIndex===index) {
                nodes.push(t);
            }
        }
        // check children
        for(let i=0;i<t.getChildCount();i++) {
            Trees._findAllNodes(t.getChild(i), index, findTokens, nodes);
        }
    },

    descendants: function(t) {
        let nodes = [t];
        for(let i=0;i<t.getChildCount();i++) {
            nodes = nodes.concat(Trees.descendants(t.getChild(i)));
        }
        return nodes;
    }
}

module.exports = Trees;


/***/ }),

/***/ 936:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const Tree = __webpack_require__(828);
const Trees = __webpack_require__(30);
module.exports = {...Tree, Trees}


/***/ }),

/***/ 509:
/***/ ((__unused_webpack_module, exports) => {

(function(exports) {
  "use strict";

  function isArray(obj) {
    if (obj !== null) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    } else {
      return false;
    }
  }

  function isObject(obj) {
    if (obj !== null) {
      return Object.prototype.toString.call(obj) === "[object Object]";
    } else {
      return false;
    }
  }

  function strictDeepEqual(first, second) {
    // Check the scalar case first.
    if (first === second) {
      return true;
    }

    // Check if they are the same type.
    var firstType = Object.prototype.toString.call(first);
    if (firstType !== Object.prototype.toString.call(second)) {
      return false;
    }
    // We know that first and second have the same type so we can just check the
    // first type from now on.
    if (isArray(first) === true) {
      // Short circuit if they're not the same length;
      if (first.length !== second.length) {
        return false;
      }
      for (var i = 0; i < first.length; i++) {
        if (strictDeepEqual(first[i], second[i]) === false) {
          return false;
        }
      }
      return true;
    }
    if (isObject(first) === true) {
      // An object is equal if it has the same key/value pairs.
      var keysSeen = {};
      for (var key in first) {
        if (hasOwnProperty.call(first, key)) {
          if (strictDeepEqual(first[key], second[key]) === false) {
            return false;
          }
          keysSeen[key] = true;
        }
      }
      // Now check that there aren't any keys in second that weren't
      // in first.
      for (var key2 in second) {
        if (hasOwnProperty.call(second, key2)) {
          if (keysSeen[key2] !== true) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }

  function isFalse(obj) {
    // From the spec:
    // A false value corresponds to the following values:
    // Empty list
    // Empty object
    // Empty string
    // False boolean
    // null value

    // First check the scalar values.
    if (obj === "" || obj === false || obj === null) {
        return true;
    } else if (isArray(obj) && obj.length === 0) {
        // Check for an empty array.
        return true;
    } else if (isObject(obj)) {
        // Check for an empty object.
        for (var key in obj) {
            // If there are any keys, then
            // the object is not empty so the object
            // is not false.
            if (obj.hasOwnProperty(key)) {
              return false;
            }
        }
        return true;
    } else {
        return false;
    }
  }

  function objValues(obj) {
    var keys = Object.keys(obj);
    var values = [];
    for (var i = 0; i < keys.length; i++) {
      values.push(obj[keys[i]]);
    }
    return values;
  }

  function merge(a, b) {
      var merged = {};
      for (var key in a) {
          merged[key] = a[key];
      }
      for (var key2 in b) {
          merged[key2] = b[key2];
      }
      return merged;
  }

  var trimLeft;
  if (typeof String.prototype.trimLeft === "function") {
    trimLeft = function(str) {
      return str.trimLeft();
    };
  } else {
    trimLeft = function(str) {
      return str.match(/^\s*(.*)/)[1];
    };
  }

  // Type constants used to define functions.
  var TYPE_NUMBER = 0;
  var TYPE_ANY = 1;
  var TYPE_STRING = 2;
  var TYPE_ARRAY = 3;
  var TYPE_OBJECT = 4;
  var TYPE_BOOLEAN = 5;
  var TYPE_EXPREF = 6;
  var TYPE_NULL = 7;
  var TYPE_ARRAY_NUMBER = 8;
  var TYPE_ARRAY_STRING = 9;

  var TOK_EOF = "EOF";
  var TOK_UNQUOTEDIDENTIFIER = "UnquotedIdentifier";
  var TOK_QUOTEDIDENTIFIER = "QuotedIdentifier";
  var TOK_RBRACKET = "Rbracket";
  var TOK_RPAREN = "Rparen";
  var TOK_COMMA = "Comma";
  var TOK_COLON = "Colon";
  var TOK_RBRACE = "Rbrace";
  var TOK_NUMBER = "Number";
  var TOK_CURRENT = "Current";
  var TOK_EXPREF = "Expref";
  var TOK_PIPE = "Pipe";
  var TOK_OR = "Or";
  var TOK_AND = "And";
  var TOK_EQ = "EQ";
  var TOK_GT = "GT";
  var TOK_LT = "LT";
  var TOK_GTE = "GTE";
  var TOK_LTE = "LTE";
  var TOK_NE = "NE";
  var TOK_FLATTEN = "Flatten";
  var TOK_STAR = "Star";
  var TOK_FILTER = "Filter";
  var TOK_DOT = "Dot";
  var TOK_NOT = "Not";
  var TOK_LBRACE = "Lbrace";
  var TOK_LBRACKET = "Lbracket";
  var TOK_LPAREN= "Lparen";
  var TOK_LITERAL= "Literal";

  // The "&", "[", "<", ">" tokens
  // are not in basicToken because
  // there are two token variants
  // ("&&", "[?", "<=", ">=").  This is specially handled
  // below.

  var basicTokens = {
    ".": TOK_DOT,
    "*": TOK_STAR,
    ",": TOK_COMMA,
    ":": TOK_COLON,
    "{": TOK_LBRACE,
    "}": TOK_RBRACE,
    "]": TOK_RBRACKET,
    "(": TOK_LPAREN,
    ")": TOK_RPAREN,
    "@": TOK_CURRENT
  };

  var operatorStartToken = {
      "<": true,
      ">": true,
      "=": true,
      "!": true
  };

  var skipChars = {
      " ": true,
      "\t": true,
      "\n": true
  };


  function isAlpha(ch) {
      return (ch >= "a" && ch <= "z") ||
             (ch >= "A" && ch <= "Z") ||
             ch === "_";
  }

  function isNum(ch) {
      return (ch >= "0" && ch <= "9") ||
             ch === "-";
  }
  function isAlphaNum(ch) {
      return (ch >= "a" && ch <= "z") ||
             (ch >= "A" && ch <= "Z") ||
             (ch >= "0" && ch <= "9") ||
             ch === "_";
  }

  function Lexer() {
  }
  Lexer.prototype = {
      tokenize: function(stream) {
          var tokens = [];
          this._current = 0;
          var start;
          var identifier;
          var token;
          while (this._current < stream.length) {
              if (isAlpha(stream[this._current])) {
                  start = this._current;
                  identifier = this._consumeUnquotedIdentifier(stream);
                  tokens.push({type: TOK_UNQUOTEDIDENTIFIER,
                               value: identifier,
                               start: start});
              } else if (basicTokens[stream[this._current]] !== undefined) {
                  tokens.push({type: basicTokens[stream[this._current]],
                              value: stream[this._current],
                              start: this._current});
                  this._current++;
              } else if (isNum(stream[this._current])) {
                  token = this._consumeNumber(stream);
                  tokens.push(token);
              } else if (stream[this._current] === "[") {
                  // No need to increment this._current.  This happens
                  // in _consumeLBracket
                  token = this._consumeLBracket(stream);
                  tokens.push(token);
              } else if (stream[this._current] === "\"") {
                  start = this._current;
                  identifier = this._consumeQuotedIdentifier(stream);
                  tokens.push({type: TOK_QUOTEDIDENTIFIER,
                               value: identifier,
                               start: start});
              } else if (stream[this._current] === "'") {
                  start = this._current;
                  identifier = this._consumeRawStringLiteral(stream);
                  tokens.push({type: TOK_LITERAL,
                               value: identifier,
                               start: start});
              } else if (stream[this._current] === "`") {
                  start = this._current;
                  var literal = this._consumeLiteral(stream);
                  tokens.push({type: TOK_LITERAL,
                               value: literal,
                               start: start});
              } else if (operatorStartToken[stream[this._current]] !== undefined) {
                  tokens.push(this._consumeOperator(stream));
              } else if (skipChars[stream[this._current]] !== undefined) {
                  // Ignore whitespace.
                  this._current++;
              } else if (stream[this._current] === "&") {
                  start = this._current;
                  this._current++;
                  if (stream[this._current] === "&") {
                      this._current++;
                      tokens.push({type: TOK_AND, value: "&&", start: start});
                  } else {
                      tokens.push({type: TOK_EXPREF, value: "&", start: start});
                  }
              } else if (stream[this._current] === "|") {
                  start = this._current;
                  this._current++;
                  if (stream[this._current] === "|") {
                      this._current++;
                      tokens.push({type: TOK_OR, value: "||", start: start});
                  } else {
                      tokens.push({type: TOK_PIPE, value: "|", start: start});
                  }
              } else {
                  var error = new Error("Unknown character:" + stream[this._current]);
                  error.name = "LexerError";
                  throw error;
              }
          }
          return tokens;
      },

      _consumeUnquotedIdentifier: function(stream) {
          var start = this._current;
          this._current++;
          while (this._current < stream.length && isAlphaNum(stream[this._current])) {
              this._current++;
          }
          return stream.slice(start, this._current);
      },

      _consumeQuotedIdentifier: function(stream) {
          var start = this._current;
          this._current++;
          var maxLength = stream.length;
          while (stream[this._current] !== "\"" && this._current < maxLength) {
              // You can escape a double quote and you can escape an escape.
              var current = this._current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "\"")) {
                  current += 2;
              } else {
                  current++;
              }
              this._current = current;
          }
          this._current++;
          return JSON.parse(stream.slice(start, this._current));
      },

      _consumeRawStringLiteral: function(stream) {
          var start = this._current;
          this._current++;
          var maxLength = stream.length;
          while (stream[this._current] !== "'" && this._current < maxLength) {
              // You can escape a single quote and you can escape an escape.
              var current = this._current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "'")) {
                  current += 2;
              } else {
                  current++;
              }
              this._current = current;
          }
          this._current++;
          var literal = stream.slice(start + 1, this._current - 1);
          return literal.replace("\\'", "'");
      },

      _consumeNumber: function(stream) {
          var start = this._current;
          this._current++;
          var maxLength = stream.length;
          while (isNum(stream[this._current]) && this._current < maxLength) {
              this._current++;
          }
          var value = parseInt(stream.slice(start, this._current));
          return {type: TOK_NUMBER, value: value, start: start};
      },

      _consumeLBracket: function(stream) {
          var start = this._current;
          this._current++;
          if (stream[this._current] === "?") {
              this._current++;
              return {type: TOK_FILTER, value: "[?", start: start};
          } else if (stream[this._current] === "]") {
              this._current++;
              return {type: TOK_FLATTEN, value: "[]", start: start};
          } else {
              return {type: TOK_LBRACKET, value: "[", start: start};
          }
      },

      _consumeOperator: function(stream) {
          var start = this._current;
          var startingChar = stream[start];
          this._current++;
          if (startingChar === "!") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_NE, value: "!=", start: start};
              } else {
                return {type: TOK_NOT, value: "!", start: start};
              }
          } else if (startingChar === "<") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_LTE, value: "<=", start: start};
              } else {
                  return {type: TOK_LT, value: "<", start: start};
              }
          } else if (startingChar === ">") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_GTE, value: ">=", start: start};
              } else {
                  return {type: TOK_GT, value: ">", start: start};
              }
          } else if (startingChar === "=") {
              if (stream[this._current] === "=") {
                  this._current++;
                  return {type: TOK_EQ, value: "==", start: start};
              }
          }
      },

      _consumeLiteral: function(stream) {
          this._current++;
          var start = this._current;
          var maxLength = stream.length;
          var literal;
          while(stream[this._current] !== "`" && this._current < maxLength) {
              // You can escape a literal char or you can escape the escape.
              var current = this._current;
              if (stream[current] === "\\" && (stream[current + 1] === "\\" ||
                                               stream[current + 1] === "`")) {
                  current += 2;
              } else {
                  current++;
              }
              this._current = current;
          }
          var literalString = trimLeft(stream.slice(start, this._current));
          literalString = literalString.replace("\\`", "`");
          if (this._looksLikeJSON(literalString)) {
              literal = JSON.parse(literalString);
          } else {
              // Try to JSON parse it as "<literal>"
              literal = JSON.parse("\"" + literalString + "\"");
          }
          // +1 gets us to the ending "`", +1 to move on to the next char.
          this._current++;
          return literal;
      },

      _looksLikeJSON: function(literalString) {
          var startingChars = "[{\"";
          var jsonLiterals = ["true", "false", "null"];
          var numberLooking = "-0123456789";

          if (literalString === "") {
              return false;
          } else if (startingChars.indexOf(literalString[0]) >= 0) {
              return true;
          } else if (jsonLiterals.indexOf(literalString) >= 0) {
              return true;
          } else if (numberLooking.indexOf(literalString[0]) >= 0) {
              try {
                  JSON.parse(literalString);
                  return true;
              } catch (ex) {
                  return false;
              }
          } else {
              return false;
          }
      }
  };

      var bindingPower = {};
      bindingPower[TOK_EOF] = 0;
      bindingPower[TOK_UNQUOTEDIDENTIFIER] = 0;
      bindingPower[TOK_QUOTEDIDENTIFIER] = 0;
      bindingPower[TOK_RBRACKET] = 0;
      bindingPower[TOK_RPAREN] = 0;
      bindingPower[TOK_COMMA] = 0;
      bindingPower[TOK_RBRACE] = 0;
      bindingPower[TOK_NUMBER] = 0;
      bindingPower[TOK_CURRENT] = 0;
      bindingPower[TOK_EXPREF] = 0;
      bindingPower[TOK_PIPE] = 1;
      bindingPower[TOK_OR] = 2;
      bindingPower[TOK_AND] = 3;
      bindingPower[TOK_EQ] = 5;
      bindingPower[TOK_GT] = 5;
      bindingPower[TOK_LT] = 5;
      bindingPower[TOK_GTE] = 5;
      bindingPower[TOK_LTE] = 5;
      bindingPower[TOK_NE] = 5;
      bindingPower[TOK_FLATTEN] = 9;
      bindingPower[TOK_STAR] = 20;
      bindingPower[TOK_FILTER] = 21;
      bindingPower[TOK_DOT] = 40;
      bindingPower[TOK_NOT] = 45;
      bindingPower[TOK_LBRACE] = 50;
      bindingPower[TOK_LBRACKET] = 55;
      bindingPower[TOK_LPAREN] = 60;

  function Parser() {
  }

  Parser.prototype = {
      parse: function(expression) {
          this._loadTokens(expression);
          this.index = 0;
          var ast = this.expression(0);
          if (this._lookahead(0) !== TOK_EOF) {
              var t = this._lookaheadToken(0);
              var error = new Error(
                  "Unexpected token type: " + t.type + ", value: " + t.value);
              error.name = "ParserError";
              throw error;
          }
          return ast;
      },

      _loadTokens: function(expression) {
          var lexer = new Lexer();
          var tokens = lexer.tokenize(expression);
          tokens.push({type: TOK_EOF, value: "", start: expression.length});
          this.tokens = tokens;
      },

      expression: function(rbp) {
          var leftToken = this._lookaheadToken(0);
          this._advance();
          var left = this.nud(leftToken);
          var currentToken = this._lookahead(0);
          while (rbp < bindingPower[currentToken]) {
              this._advance();
              left = this.led(currentToken, left);
              currentToken = this._lookahead(0);
          }
          return left;
      },

      _lookahead: function(number) {
          return this.tokens[this.index + number].type;
      },

      _lookaheadToken: function(number) {
          return this.tokens[this.index + number];
      },

      _advance: function() {
          this.index++;
      },

      nud: function(token) {
        var left;
        var right;
        var expression;
        switch (token.type) {
          case TOK_LITERAL:
            return {type: "Literal", value: token.value};
          case TOK_UNQUOTEDIDENTIFIER:
            return {type: "Field", name: token.value};
          case TOK_QUOTEDIDENTIFIER:
            var node = {type: "Field", name: token.value};
            if (this._lookahead(0) === TOK_LPAREN) {
                throw new Error("Quoted identifier not allowed for function names.");
            } else {
                return node;
            }
            break;
          case TOK_NOT:
            right = this.expression(bindingPower.Not);
            return {type: "NotExpression", children: [right]};
          case TOK_STAR:
            left = {type: "Identity"};
            right = null;
            if (this._lookahead(0) === TOK_RBRACKET) {
                // This can happen in a multiselect,
                // [a, b, *]
                right = {type: "Identity"};
            } else {
                right = this._parseProjectionRHS(bindingPower.Star);
            }
            return {type: "ValueProjection", children: [left, right]};
          case TOK_FILTER:
            return this.led(token.type, {type: "Identity"});
          case TOK_LBRACE:
            return this._parseMultiselectHash();
          case TOK_FLATTEN:
            left = {type: TOK_FLATTEN, children: [{type: "Identity"}]};
            right = this._parseProjectionRHS(bindingPower.Flatten);
            return {type: "Projection", children: [left, right]};
          case TOK_LBRACKET:
            if (this._lookahead(0) === TOK_NUMBER || this._lookahead(0) === TOK_COLON) {
                right = this._parseIndexExpression();
                return this._projectIfSlice({type: "Identity"}, right);
            } else if (this._lookahead(0) === TOK_STAR &&
                       this._lookahead(1) === TOK_RBRACKET) {
                this._advance();
                this._advance();
                right = this._parseProjectionRHS(bindingPower.Star);
                return {type: "Projection",
                        children: [{type: "Identity"}, right]};
            } else {
                return this._parseMultiselectList();
            }
            break;
          case TOK_CURRENT:
            return {type: TOK_CURRENT};
          case TOK_EXPREF:
            expression = this.expression(bindingPower.Expref);
            return {type: "ExpressionReference", children: [expression]};
          case TOK_LPAREN:
            var args = [];
            while (this._lookahead(0) !== TOK_RPAREN) {
              if (this._lookahead(0) === TOK_CURRENT) {
                expression = {type: TOK_CURRENT};
                this._advance();
              } else {
                expression = this.expression(0);
              }
              args.push(expression);
            }
            this._match(TOK_RPAREN);
            return args[0];
          default:
            this._errorToken(token);
        }
      },

      led: function(tokenName, left) {
        var right;
        switch(tokenName) {
          case TOK_DOT:
            var rbp = bindingPower.Dot;
            if (this._lookahead(0) !== TOK_STAR) {
                right = this._parseDotRHS(rbp);
                return {type: "Subexpression", children: [left, right]};
            } else {
                // Creating a projection.
                this._advance();
                right = this._parseProjectionRHS(rbp);
                return {type: "ValueProjection", children: [left, right]};
            }
            break;
          case TOK_PIPE:
            right = this.expression(bindingPower.Pipe);
            return {type: TOK_PIPE, children: [left, right]};
          case TOK_OR:
            right = this.expression(bindingPower.Or);
            return {type: "OrExpression", children: [left, right]};
          case TOK_AND:
            right = this.expression(bindingPower.And);
            return {type: "AndExpression", children: [left, right]};
          case TOK_LPAREN:
            var name = left.name;
            var args = [];
            var expression, node;
            while (this._lookahead(0) !== TOK_RPAREN) {
              if (this._lookahead(0) === TOK_CURRENT) {
                expression = {type: TOK_CURRENT};
                this._advance();
              } else {
                expression = this.expression(0);
              }
              if (this._lookahead(0) === TOK_COMMA) {
                this._match(TOK_COMMA);
              }
              args.push(expression);
            }
            this._match(TOK_RPAREN);
            node = {type: "Function", name: name, children: args};
            return node;
          case TOK_FILTER:
            var condition = this.expression(0);
            this._match(TOK_RBRACKET);
            if (this._lookahead(0) === TOK_FLATTEN) {
              right = {type: "Identity"};
            } else {
              right = this._parseProjectionRHS(bindingPower.Filter);
            }
            return {type: "FilterProjection", children: [left, right, condition]};
          case TOK_FLATTEN:
            var leftNode = {type: TOK_FLATTEN, children: [left]};
            var rightNode = this._parseProjectionRHS(bindingPower.Flatten);
            return {type: "Projection", children: [leftNode, rightNode]};
          case TOK_EQ:
          case TOK_NE:
          case TOK_GT:
          case TOK_GTE:
          case TOK_LT:
          case TOK_LTE:
            return this._parseComparator(left, tokenName);
          case TOK_LBRACKET:
            var token = this._lookaheadToken(0);
            if (token.type === TOK_NUMBER || token.type === TOK_COLON) {
                right = this._parseIndexExpression();
                return this._projectIfSlice(left, right);
            } else {
                this._match(TOK_STAR);
                this._match(TOK_RBRACKET);
                right = this._parseProjectionRHS(bindingPower.Star);
                return {type: "Projection", children: [left, right]};
            }
            break;
          default:
            this._errorToken(this._lookaheadToken(0));
        }
      },

      _match: function(tokenType) {
          if (this._lookahead(0) === tokenType) {
              this._advance();
          } else {
              var t = this._lookaheadToken(0);
              var error = new Error("Expected " + tokenType + ", got: " + t.type);
              error.name = "ParserError";
              throw error;
          }
      },

      _errorToken: function(token) {
          var error = new Error("Invalid token (" +
                                token.type + "): \"" +
                                token.value + "\"");
          error.name = "ParserError";
          throw error;
      },


      _parseIndexExpression: function() {
          if (this._lookahead(0) === TOK_COLON || this._lookahead(1) === TOK_COLON) {
              return this._parseSliceExpression();
          } else {
              var node = {
                  type: "Index",
                  value: this._lookaheadToken(0).value};
              this._advance();
              this._match(TOK_RBRACKET);
              return node;
          }
      },

      _projectIfSlice: function(left, right) {
          var indexExpr = {type: "IndexExpression", children: [left, right]};
          if (right.type === "Slice") {
              return {
                  type: "Projection",
                  children: [indexExpr, this._parseProjectionRHS(bindingPower.Star)]
              };
          } else {
              return indexExpr;
          }
      },

      _parseSliceExpression: function() {
          // [start:end:step] where each part is optional, as well as the last
          // colon.
          var parts = [null, null, null];
          var index = 0;
          var currentToken = this._lookahead(0);
          while (currentToken !== TOK_RBRACKET && index < 3) {
              if (currentToken === TOK_COLON) {
                  index++;
                  this._advance();
              } else if (currentToken === TOK_NUMBER) {
                  parts[index] = this._lookaheadToken(0).value;
                  this._advance();
              } else {
                  var t = this._lookahead(0);
                  var error = new Error("Syntax error, unexpected token: " +
                                        t.value + "(" + t.type + ")");
                  error.name = "Parsererror";
                  throw error;
              }
              currentToken = this._lookahead(0);
          }
          this._match(TOK_RBRACKET);
          return {
              type: "Slice",
              children: parts
          };
      },

      _parseComparator: function(left, comparator) {
        var right = this.expression(bindingPower[comparator]);
        return {type: "Comparator", name: comparator, children: [left, right]};
      },

      _parseDotRHS: function(rbp) {
          var lookahead = this._lookahead(0);
          var exprTokens = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER, TOK_STAR];
          if (exprTokens.indexOf(lookahead) >= 0) {
              return this.expression(rbp);
          } else if (lookahead === TOK_LBRACKET) {
              this._match(TOK_LBRACKET);
              return this._parseMultiselectList();
          } else if (lookahead === TOK_LBRACE) {
              this._match(TOK_LBRACE);
              return this._parseMultiselectHash();
          }
      },

      _parseProjectionRHS: function(rbp) {
          var right;
          if (bindingPower[this._lookahead(0)] < 10) {
              right = {type: "Identity"};
          } else if (this._lookahead(0) === TOK_LBRACKET) {
              right = this.expression(rbp);
          } else if (this._lookahead(0) === TOK_FILTER) {
              right = this.expression(rbp);
          } else if (this._lookahead(0) === TOK_DOT) {
              this._match(TOK_DOT);
              right = this._parseDotRHS(rbp);
          } else {
              var t = this._lookaheadToken(0);
              var error = new Error("Sytanx error, unexpected token: " +
                                    t.value + "(" + t.type + ")");
              error.name = "ParserError";
              throw error;
          }
          return right;
      },

      _parseMultiselectList: function() {
          var expressions = [];
          while (this._lookahead(0) !== TOK_RBRACKET) {
              var expression = this.expression(0);
              expressions.push(expression);
              if (this._lookahead(0) === TOK_COMMA) {
                  this._match(TOK_COMMA);
                  if (this._lookahead(0) === TOK_RBRACKET) {
                    throw new Error("Unexpected token Rbracket");
                  }
              }
          }
          this._match(TOK_RBRACKET);
          return {type: "MultiSelectList", children: expressions};
      },

      _parseMultiselectHash: function() {
        var pairs = [];
        var identifierTypes = [TOK_UNQUOTEDIDENTIFIER, TOK_QUOTEDIDENTIFIER];
        var keyToken, keyName, value, node;
        for (;;) {
          keyToken = this._lookaheadToken(0);
          if (identifierTypes.indexOf(keyToken.type) < 0) {
            throw new Error("Expecting an identifier token, got: " +
                            keyToken.type);
          }
          keyName = keyToken.value;
          this._advance();
          this._match(TOK_COLON);
          value = this.expression(0);
          node = {type: "KeyValuePair", name: keyName, value: value};
          pairs.push(node);
          if (this._lookahead(0) === TOK_COMMA) {
            this._match(TOK_COMMA);
          } else if (this._lookahead(0) === TOK_RBRACE) {
            this._match(TOK_RBRACE);
            break;
          }
        }
        return {type: "MultiSelectHash", children: pairs};
      }
  };


  function TreeInterpreter(runtime) {
    this.runtime = runtime;
  }

  TreeInterpreter.prototype = {
      search: function(node, value) {
          return this.visit(node, value);
      },

      visit: function(node, value) {
          var matched, current, result, first, second, field, left, right, collected, i;
          switch (node.type) {
            case "Field":
              if (value === null ) {
                  return null;
              } else if (isObject(value)) {
                  field = value[node.name];
                  if (field === undefined) {
                      return null;
                  } else {
                      return field;
                  }
              } else {
                return null;
              }
              break;
            case "Subexpression":
              result = this.visit(node.children[0], value);
              for (i = 1; i < node.children.length; i++) {
                  result = this.visit(node.children[1], result);
                  if (result === null) {
                      return null;
                  }
              }
              return result;
            case "IndexExpression":
              left = this.visit(node.children[0], value);
              right = this.visit(node.children[1], left);
              return right;
            case "Index":
              if (!isArray(value)) {
                return null;
              }
              var index = node.value;
              if (index < 0) {
                index = value.length + index;
              }
              result = value[index];
              if (result === undefined) {
                result = null;
              }
              return result;
            case "Slice":
              if (!isArray(value)) {
                return null;
              }
              var sliceParams = node.children.slice(0);
              var computed = this.computeSliceParams(value.length, sliceParams);
              var start = computed[0];
              var stop = computed[1];
              var step = computed[2];
              result = [];
              if (step > 0) {
                  for (i = start; i < stop; i += step) {
                      result.push(value[i]);
                  }
              } else {
                  for (i = start; i > stop; i += step) {
                      result.push(value[i]);
                  }
              }
              return result;
            case "Projection":
              // Evaluate left child.
              var base = this.visit(node.children[0], value);
              if (!isArray(base)) {
                return null;
              }
              collected = [];
              for (i = 0; i < base.length; i++) {
                current = this.visit(node.children[1], base[i]);
                if (current !== null) {
                  collected.push(current);
                }
              }
              return collected;
            case "ValueProjection":
              // Evaluate left child.
              base = this.visit(node.children[0], value);
              if (!isObject(base)) {
                return null;
              }
              collected = [];
              var values = objValues(base);
              for (i = 0; i < values.length; i++) {
                current = this.visit(node.children[1], values[i]);
                if (current !== null) {
                  collected.push(current);
                }
              }
              return collected;
            case "FilterProjection":
              base = this.visit(node.children[0], value);
              if (!isArray(base)) {
                return null;
              }
              var filtered = [];
              var finalResults = [];
              for (i = 0; i < base.length; i++) {
                matched = this.visit(node.children[2], base[i]);
                if (!isFalse(matched)) {
                  filtered.push(base[i]);
                }
              }
              for (var j = 0; j < filtered.length; j++) {
                current = this.visit(node.children[1], filtered[j]);
                if (current !== null) {
                  finalResults.push(current);
                }
              }
              return finalResults;
            case "Comparator":
              first = this.visit(node.children[0], value);
              second = this.visit(node.children[1], value);
              switch(node.name) {
                case TOK_EQ:
                  result = strictDeepEqual(first, second);
                  break;
                case TOK_NE:
                  result = !strictDeepEqual(first, second);
                  break;
                case TOK_GT:
                  result = first > second;
                  break;
                case TOK_GTE:
                  result = first >= second;
                  break;
                case TOK_LT:
                  result = first < second;
                  break;
                case TOK_LTE:
                  result = first <= second;
                  break;
                default:
                  throw new Error("Unknown comparator: " + node.name);
              }
              return result;
            case TOK_FLATTEN:
              var original = this.visit(node.children[0], value);
              if (!isArray(original)) {
                return null;
              }
              var merged = [];
              for (i = 0; i < original.length; i++) {
                current = original[i];
                if (isArray(current)) {
                  merged.push.apply(merged, current);
                } else {
                  merged.push(current);
                }
              }
              return merged;
            case "Identity":
              return value;
            case "MultiSelectList":
              if (value === null) {
                return null;
              }
              collected = [];
              for (i = 0; i < node.children.length; i++) {
                  collected.push(this.visit(node.children[i], value));
              }
              return collected;
            case "MultiSelectHash":
              if (value === null) {
                return null;
              }
              collected = {};
              var child;
              for (i = 0; i < node.children.length; i++) {
                child = node.children[i];
                collected[child.name] = this.visit(child.value, value);
              }
              return collected;
            case "OrExpression":
              matched = this.visit(node.children[0], value);
              if (isFalse(matched)) {
                  matched = this.visit(node.children[1], value);
              }
              return matched;
            case "AndExpression":
              first = this.visit(node.children[0], value);

              if (isFalse(first) === true) {
                return first;
              }
              return this.visit(node.children[1], value);
            case "NotExpression":
              first = this.visit(node.children[0], value);
              return isFalse(first);
            case "Literal":
              return node.value;
            case TOK_PIPE:
              left = this.visit(node.children[0], value);
              return this.visit(node.children[1], left);
            case TOK_CURRENT:
              return value;
            case "Function":
              var resolvedArgs = [];
              for (i = 0; i < node.children.length; i++) {
                  resolvedArgs.push(this.visit(node.children[i], value));
              }
              return this.runtime.callFunction(node.name, resolvedArgs);
            case "ExpressionReference":
              var refNode = node.children[0];
              // Tag the node with a specific attribute so the type
              // checker verify the type.
              refNode.jmespathType = TOK_EXPREF;
              return refNode;
            default:
              throw new Error("Unknown node type: " + node.type);
          }
      },

      computeSliceParams: function(arrayLength, sliceParams) {
        var start = sliceParams[0];
        var stop = sliceParams[1];
        var step = sliceParams[2];
        var computed = [null, null, null];
        if (step === null) {
          step = 1;
        } else if (step === 0) {
          var error = new Error("Invalid slice, step cannot be 0");
          error.name = "RuntimeError";
          throw error;
        }
        var stepValueNegative = step < 0 ? true : false;

        if (start === null) {
            start = stepValueNegative ? arrayLength - 1 : 0;
        } else {
            start = this.capSliceRange(arrayLength, start, step);
        }

        if (stop === null) {
            stop = stepValueNegative ? -1 : arrayLength;
        } else {
            stop = this.capSliceRange(arrayLength, stop, step);
        }
        computed[0] = start;
        computed[1] = stop;
        computed[2] = step;
        return computed;
      },

      capSliceRange: function(arrayLength, actualValue, step) {
          if (actualValue < 0) {
              actualValue += arrayLength;
              if (actualValue < 0) {
                  actualValue = step < 0 ? -1 : 0;
              }
          } else if (actualValue >= arrayLength) {
              actualValue = step < 0 ? arrayLength - 1 : arrayLength;
          }
          return actualValue;
      }

  };

  function Runtime(interpreter) {
    this._interpreter = interpreter;
    this.functionTable = {
        // name: [function, <signature>]
        // The <signature> can be:
        //
        // {
        //   args: [[type1, type2], [type1, type2]],
        //   variadic: true|false
        // }
        //
        // Each arg in the arg list is a list of valid types
        // (if the function is overloaded and supports multiple
        // types.  If the type is "any" then no type checking
        // occurs on the argument.  Variadic is optional
        // and if not provided is assumed to be false.
        abs: {_func: this._functionAbs, _signature: [{types: [TYPE_NUMBER]}]},
        avg: {_func: this._functionAvg, _signature: [{types: [TYPE_ARRAY_NUMBER]}]},
        ceil: {_func: this._functionCeil, _signature: [{types: [TYPE_NUMBER]}]},
        contains: {
            _func: this._functionContains,
            _signature: [{types: [TYPE_STRING, TYPE_ARRAY]},
                        {types: [TYPE_ANY]}]},
        "ends_with": {
            _func: this._functionEndsWith,
            _signature: [{types: [TYPE_STRING]}, {types: [TYPE_STRING]}]},
        floor: {_func: this._functionFloor, _signature: [{types: [TYPE_NUMBER]}]},
        length: {
            _func: this._functionLength,
            _signature: [{types: [TYPE_STRING, TYPE_ARRAY, TYPE_OBJECT]}]},
        map: {
            _func: this._functionMap,
            _signature: [{types: [TYPE_EXPREF]}, {types: [TYPE_ARRAY]}]},
        max: {
            _func: this._functionMax,
            _signature: [{types: [TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING]}]},
        "merge": {
            _func: this._functionMerge,
            _signature: [{types: [TYPE_OBJECT], variadic: true}]
        },
        "max_by": {
          _func: this._functionMaxBy,
          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
        },
        sum: {_func: this._functionSum, _signature: [{types: [TYPE_ARRAY_NUMBER]}]},
        "starts_with": {
            _func: this._functionStartsWith,
            _signature: [{types: [TYPE_STRING]}, {types: [TYPE_STRING]}]},
        min: {
            _func: this._functionMin,
            _signature: [{types: [TYPE_ARRAY_NUMBER, TYPE_ARRAY_STRING]}]},
        "min_by": {
          _func: this._functionMinBy,
          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
        },
        type: {_func: this._functionType, _signature: [{types: [TYPE_ANY]}]},
        keys: {_func: this._functionKeys, _signature: [{types: [TYPE_OBJECT]}]},
        values: {_func: this._functionValues, _signature: [{types: [TYPE_OBJECT]}]},
        sort: {_func: this._functionSort, _signature: [{types: [TYPE_ARRAY_STRING, TYPE_ARRAY_NUMBER]}]},
        "sort_by": {
          _func: this._functionSortBy,
          _signature: [{types: [TYPE_ARRAY]}, {types: [TYPE_EXPREF]}]
        },
        join: {
            _func: this._functionJoin,
            _signature: [
                {types: [TYPE_STRING]},
                {types: [TYPE_ARRAY_STRING]}
            ]
        },
        reverse: {
            _func: this._functionReverse,
            _signature: [{types: [TYPE_STRING, TYPE_ARRAY]}]},
        "to_array": {_func: this._functionToArray, _signature: [{types: [TYPE_ANY]}]},
        "to_string": {_func: this._functionToString, _signature: [{types: [TYPE_ANY]}]},
        "to_number": {_func: this._functionToNumber, _signature: [{types: [TYPE_ANY]}]},
        "not_null": {
            _func: this._functionNotNull,
            _signature: [{types: [TYPE_ANY], variadic: true}]
        }
    };
  }

  Runtime.prototype = {
    callFunction: function(name, resolvedArgs) {
      var functionEntry = this.functionTable[name];
      if (functionEntry === undefined) {
          throw new Error("Unknown function: " + name + "()");
      }
      this._validateArgs(name, resolvedArgs, functionEntry._signature);
      return functionEntry._func.call(this, resolvedArgs);
    },

    _validateArgs: function(name, args, signature) {
        // Validating the args requires validating
        // the correct arity and the correct type of each arg.
        // If the last argument is declared as variadic, then we need
        // a minimum number of args to be required.  Otherwise it has to
        // be an exact amount.
        var pluralized;
        if (signature[signature.length - 1].variadic) {
            if (args.length < signature.length) {
                pluralized = signature.length === 1 ? " argument" : " arguments";
                throw new Error("ArgumentError: " + name + "() " +
                                "takes at least" + signature.length + pluralized +
                                " but received " + args.length);
            }
        } else if (args.length !== signature.length) {
            pluralized = signature.length === 1 ? " argument" : " arguments";
            throw new Error("ArgumentError: " + name + "() " +
                            "takes " + signature.length + pluralized +
                            " but received " + args.length);
        }
        var currentSpec;
        var actualType;
        var typeMatched;
        for (var i = 0; i < signature.length; i++) {
            typeMatched = false;
            currentSpec = signature[i].types;
            actualType = this._getTypeName(args[i]);
            for (var j = 0; j < currentSpec.length; j++) {
                if (this._typeMatches(actualType, currentSpec[j], args[i])) {
                    typeMatched = true;
                    break;
                }
            }
            if (!typeMatched) {
                throw new Error("TypeError: " + name + "() " +
                                "expected argument " + (i + 1) +
                                " to be type " + currentSpec +
                                " but received type " + actualType +
                                " instead.");
            }
        }
    },

    _typeMatches: function(actual, expected, argValue) {
        if (expected === TYPE_ANY) {
            return true;
        }
        if (expected === TYPE_ARRAY_STRING ||
            expected === TYPE_ARRAY_NUMBER ||
            expected === TYPE_ARRAY) {
            // The expected type can either just be array,
            // or it can require a specific subtype (array of numbers).
            //
            // The simplest case is if "array" with no subtype is specified.
            if (expected === TYPE_ARRAY) {
                return actual === TYPE_ARRAY;
            } else if (actual === TYPE_ARRAY) {
                // Otherwise we need to check subtypes.
                // I think this has potential to be improved.
                var subtype;
                if (expected === TYPE_ARRAY_NUMBER) {
                  subtype = TYPE_NUMBER;
                } else if (expected === TYPE_ARRAY_STRING) {
                  subtype = TYPE_STRING;
                }
                for (var i = 0; i < argValue.length; i++) {
                    if (!this._typeMatches(
                            this._getTypeName(argValue[i]), subtype,
                                             argValue[i])) {
                        return false;
                    }
                }
                return true;
            }
        } else {
            return actual === expected;
        }
    },
    _getTypeName: function(obj) {
        switch (Object.prototype.toString.call(obj)) {
            case "[object String]":
              return TYPE_STRING;
            case "[object Number]":
              return TYPE_NUMBER;
            case "[object Array]":
              return TYPE_ARRAY;
            case "[object Boolean]":
              return TYPE_BOOLEAN;
            case "[object Null]":
              return TYPE_NULL;
            case "[object Object]":
              // Check if it's an expref.  If it has, it's been
              // tagged with a jmespathType attr of 'Expref';
              if (obj.jmespathType === TOK_EXPREF) {
                return TYPE_EXPREF;
              } else {
                return TYPE_OBJECT;
              }
        }
    },

    _functionStartsWith: function(resolvedArgs) {
        return resolvedArgs[0].lastIndexOf(resolvedArgs[1]) === 0;
    },

    _functionEndsWith: function(resolvedArgs) {
        var searchStr = resolvedArgs[0];
        var suffix = resolvedArgs[1];
        return searchStr.indexOf(suffix, searchStr.length - suffix.length) !== -1;
    },

    _functionReverse: function(resolvedArgs) {
        var typeName = this._getTypeName(resolvedArgs[0]);
        if (typeName === TYPE_STRING) {
          var originalStr = resolvedArgs[0];
          var reversedStr = "";
          for (var i = originalStr.length - 1; i >= 0; i--) {
              reversedStr += originalStr[i];
          }
          return reversedStr;
        } else {
          var reversedArray = resolvedArgs[0].slice(0);
          reversedArray.reverse();
          return reversedArray;
        }
    },

    _functionAbs: function(resolvedArgs) {
      return Math.abs(resolvedArgs[0]);
    },

    _functionCeil: function(resolvedArgs) {
        return Math.ceil(resolvedArgs[0]);
    },

    _functionAvg: function(resolvedArgs) {
        var sum = 0;
        var inputArray = resolvedArgs[0];
        for (var i = 0; i < inputArray.length; i++) {
            sum += inputArray[i];
        }
        return sum / inputArray.length;
    },

    _functionContains: function(resolvedArgs) {
        return resolvedArgs[0].indexOf(resolvedArgs[1]) >= 0;
    },

    _functionFloor: function(resolvedArgs) {
        return Math.floor(resolvedArgs[0]);
    },

    _functionLength: function(resolvedArgs) {
       if (!isObject(resolvedArgs[0])) {
         return resolvedArgs[0].length;
       } else {
         // As far as I can tell, there's no way to get the length
         // of an object without O(n) iteration through the object.
         return Object.keys(resolvedArgs[0]).length;
       }
    },

    _functionMap: function(resolvedArgs) {
      var mapped = [];
      var interpreter = this._interpreter;
      var exprefNode = resolvedArgs[0];
      var elements = resolvedArgs[1];
      for (var i = 0; i < elements.length; i++) {
          mapped.push(interpreter.visit(exprefNode, elements[i]));
      }
      return mapped;
    },

    _functionMerge: function(resolvedArgs) {
      var merged = {};
      for (var i = 0; i < resolvedArgs.length; i++) {
        var current = resolvedArgs[i];
        for (var key in current) {
          merged[key] = current[key];
        }
      }
      return merged;
    },

    _functionMax: function(resolvedArgs) {
      if (resolvedArgs[0].length > 0) {
        var typeName = this._getTypeName(resolvedArgs[0][0]);
        if (typeName === TYPE_NUMBER) {
          return Math.max.apply(Math, resolvedArgs[0]);
        } else {
          var elements = resolvedArgs[0];
          var maxElement = elements[0];
          for (var i = 1; i < elements.length; i++) {
              if (maxElement.localeCompare(elements[i]) < 0) {
                  maxElement = elements[i];
              }
          }
          return maxElement;
        }
      } else {
          return null;
      }
    },

    _functionMin: function(resolvedArgs) {
      if (resolvedArgs[0].length > 0) {
        var typeName = this._getTypeName(resolvedArgs[0][0]);
        if (typeName === TYPE_NUMBER) {
          return Math.min.apply(Math, resolvedArgs[0]);
        } else {
          var elements = resolvedArgs[0];
          var minElement = elements[0];
          for (var i = 1; i < elements.length; i++) {
              if (elements[i].localeCompare(minElement) < 0) {
                  minElement = elements[i];
              }
          }
          return minElement;
        }
      } else {
        return null;
      }
    },

    _functionSum: function(resolvedArgs) {
      var sum = 0;
      var listToSum = resolvedArgs[0];
      for (var i = 0; i < listToSum.length; i++) {
        sum += listToSum[i];
      }
      return sum;
    },

    _functionType: function(resolvedArgs) {
        switch (this._getTypeName(resolvedArgs[0])) {
          case TYPE_NUMBER:
            return "number";
          case TYPE_STRING:
            return "string";
          case TYPE_ARRAY:
            return "array";
          case TYPE_OBJECT:
            return "object";
          case TYPE_BOOLEAN:
            return "boolean";
          case TYPE_EXPREF:
            return "expref";
          case TYPE_NULL:
            return "null";
        }
    },

    _functionKeys: function(resolvedArgs) {
        return Object.keys(resolvedArgs[0]);
    },

    _functionValues: function(resolvedArgs) {
        var obj = resolvedArgs[0];
        var keys = Object.keys(obj);
        var values = [];
        for (var i = 0; i < keys.length; i++) {
            values.push(obj[keys[i]]);
        }
        return values;
    },

    _functionJoin: function(resolvedArgs) {
        var joinChar = resolvedArgs[0];
        var listJoin = resolvedArgs[1];
        return listJoin.join(joinChar);
    },

    _functionToArray: function(resolvedArgs) {
        if (this._getTypeName(resolvedArgs[0]) === TYPE_ARRAY) {
            return resolvedArgs[0];
        } else {
            return [resolvedArgs[0]];
        }
    },

    _functionToString: function(resolvedArgs) {
        if (this._getTypeName(resolvedArgs[0]) === TYPE_STRING) {
            return resolvedArgs[0];
        } else {
            return JSON.stringify(resolvedArgs[0]);
        }
    },

    _functionToNumber: function(resolvedArgs) {
        var typeName = this._getTypeName(resolvedArgs[0]);
        var convertedValue;
        if (typeName === TYPE_NUMBER) {
            return resolvedArgs[0];
        } else if (typeName === TYPE_STRING) {
            convertedValue = +resolvedArgs[0];
            if (!isNaN(convertedValue)) {
                return convertedValue;
            }
        }
        return null;
    },

    _functionNotNull: function(resolvedArgs) {
        for (var i = 0; i < resolvedArgs.length; i++) {
            if (this._getTypeName(resolvedArgs[i]) !== TYPE_NULL) {
                return resolvedArgs[i];
            }
        }
        return null;
    },

    _functionSort: function(resolvedArgs) {
        var sortedArray = resolvedArgs[0].slice(0);
        sortedArray.sort();
        return sortedArray;
    },

    _functionSortBy: function(resolvedArgs) {
        var sortedArray = resolvedArgs[0].slice(0);
        if (sortedArray.length === 0) {
            return sortedArray;
        }
        var interpreter = this._interpreter;
        var exprefNode = resolvedArgs[1];
        var requiredType = this._getTypeName(
            interpreter.visit(exprefNode, sortedArray[0]));
        if ([TYPE_NUMBER, TYPE_STRING].indexOf(requiredType) < 0) {
            throw new Error("TypeError");
        }
        var that = this;
        // In order to get a stable sort out of an unstable
        // sort algorithm, we decorate/sort/undecorate (DSU)
        // by creating a new list of [index, element] pairs.
        // In the cmp function, if the evaluated elements are
        // equal, then the index will be used as the tiebreaker.
        // After the decorated list has been sorted, it will be
        // undecorated to extract the original elements.
        var decorated = [];
        for (var i = 0; i < sortedArray.length; i++) {
          decorated.push([i, sortedArray[i]]);
        }
        decorated.sort(function(a, b) {
          var exprA = interpreter.visit(exprefNode, a[1]);
          var exprB = interpreter.visit(exprefNode, b[1]);
          if (that._getTypeName(exprA) !== requiredType) {
              throw new Error(
                  "TypeError: expected " + requiredType + ", received " +
                  that._getTypeName(exprA));
          } else if (that._getTypeName(exprB) !== requiredType) {
              throw new Error(
                  "TypeError: expected " + requiredType + ", received " +
                  that._getTypeName(exprB));
          }
          if (exprA > exprB) {
            return 1;
          } else if (exprA < exprB) {
            return -1;
          } else {
            // If they're equal compare the items by their
            // order to maintain relative order of equal keys
            // (i.e. to get a stable sort).
            return a[0] - b[0];
          }
        });
        // Undecorate: extract out the original list elements.
        for (var j = 0; j < decorated.length; j++) {
          sortedArray[j] = decorated[j][1];
        }
        return sortedArray;
    },

    _functionMaxBy: function(resolvedArgs) {
      var exprefNode = resolvedArgs[1];
      var resolvedArray = resolvedArgs[0];
      var keyFunction = this.createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
      var maxNumber = -Infinity;
      var maxRecord;
      var current;
      for (var i = 0; i < resolvedArray.length; i++) {
        current = keyFunction(resolvedArray[i]);
        if (current > maxNumber) {
          maxNumber = current;
          maxRecord = resolvedArray[i];
        }
      }
      return maxRecord;
    },

    _functionMinBy: function(resolvedArgs) {
      var exprefNode = resolvedArgs[1];
      var resolvedArray = resolvedArgs[0];
      var keyFunction = this.createKeyFunction(exprefNode, [TYPE_NUMBER, TYPE_STRING]);
      var minNumber = Infinity;
      var minRecord;
      var current;
      for (var i = 0; i < resolvedArray.length; i++) {
        current = keyFunction(resolvedArray[i]);
        if (current < minNumber) {
          minNumber = current;
          minRecord = resolvedArray[i];
        }
      }
      return minRecord;
    },

    createKeyFunction: function(exprefNode, allowedTypes) {
      var that = this;
      var interpreter = this._interpreter;
      var keyFunc = function(x) {
        var current = interpreter.visit(exprefNode, x);
        if (allowedTypes.indexOf(that._getTypeName(current)) < 0) {
          var msg = "TypeError: expected one of " + allowedTypes +
                    ", received " + that._getTypeName(current);
          throw new Error(msg);
        }
        return current;
      };
      return keyFunc;
    }

  };

  function compile(stream) {
    var parser = new Parser();
    var ast = parser.parse(stream);
    return ast;
  }

  function tokenize(stream) {
      var lexer = new Lexer();
      return lexer.tokenize(stream);
  }

  function search(data, expression) {
      var parser = new Parser();
      // This needs to be improved.  Both the interpreter and runtime depend on
      // each other.  The runtime needs the interpreter to support exprefs.
      // There's likely a clean way to avoid the cyclic dependency.
      var runtime = new Runtime();
      var interpreter = new TreeInterpreter(runtime);
      runtime._interpreter = interpreter;
      var node = parser.parse(expression);
      return interpreter.search(node, data);
  }

  exports.tokenize = tokenize;
  exports.compile = compile;
  exports.search = search;
  exports.strictDeepEqual = strictDeepEqual;
})( false ? 0 : exports);


/***/ }),

/***/ 654:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/antlr4/src/antlr4/index.js
var antlr4 = __webpack_require__(938);
;// CONCATENATED MODULE: ./src/antlr/JSONFormulaListener.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// Generated from antlr/JSONFormula.g4 by ANTLR 4.9.2
// jshint ignore: start
 // This class defines a complete listener for a parse tree produced by JSONFormulaParser.

var JSONFormulaListener = /*#__PURE__*/function (_antlr4$tree$ParseTre) {
  _inherits(JSONFormulaListener, _antlr4$tree$ParseTre);

  var _super = _createSuper(JSONFormulaListener);

  function JSONFormulaListener() {
    _classCallCheck(this, JSONFormulaListener);

    return _super.apply(this, arguments);
  }

  _createClass(JSONFormulaListener, [{
    key: "enterFormula",
    value: // Enter a parse tree produced by JSONFormulaParser#formula.
    function enterFormula(ctx) {} // Exit a parse tree produced by JSONFormulaParser#formula.

  }, {
    key: "exitFormula",
    value: function exitFormula(ctx) {} // Enter a parse tree produced by JSONFormulaParser#binaryExpression.

  }, {
    key: "enterBinaryExpression",
    value: function enterBinaryExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#binaryExpression.

  }, {
    key: "exitBinaryExpression",
    value: function exitBinaryExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#jmesPath.

  }, {
    key: "enterJmesPath",
    value: function enterJmesPath(ctx) {} // Exit a parse tree produced by JSONFormulaParser#jmesPath.

  }, {
    key: "exitJmesPath",
    value: function exitJmesPath(ctx) {} // Enter a parse tree produced by JSONFormulaParser#topLevelString.

  }, {
    key: "enterTopLevelString",
    value: function enterTopLevelString(ctx) {} // Exit a parse tree produced by JSONFormulaParser#topLevelString.

  }, {
    key: "exitTopLevelString",
    value: function exitTopLevelString(ctx) {} // Enter a parse tree produced by JSONFormulaParser#topLevelInt.

  }, {
    key: "enterTopLevelInt",
    value: function enterTopLevelInt(ctx) {} // Exit a parse tree produced by JSONFormulaParser#topLevelInt.

  }, {
    key: "exitTopLevelInt",
    value: function exitTopLevelInt(ctx) {} // Enter a parse tree produced by JSONFormulaParser#functionCall.

  }, {
    key: "enterFunctionCall",
    value: function enterFunctionCall(ctx) {} // Exit a parse tree produced by JSONFormulaParser#functionCall.

  }, {
    key: "exitFunctionCall",
    value: function exitFunctionCall(ctx) {} // Enter a parse tree produced by JSONFormulaParser#braceExpression.

  }, {
    key: "enterBraceExpression",
    value: function enterBraceExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#braceExpression.

  }, {
    key: "exitBraceExpression",
    value: function exitBraceExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#postfix.

  }, {
    key: "enterPostfix",
    value: function enterPostfix(ctx) {} // Exit a parse tree produced by JSONFormulaParser#postfix.

  }, {
    key: "exitPostfix",
    value: function exitPostfix(ctx) {} // Enter a parse tree produced by JSONFormulaParser#unaryExpression.

  }, {
    key: "enterUnaryExpression",
    value: function enterUnaryExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#unaryExpression.

  }, {
    key: "exitUnaryExpression",
    value: function exitUnaryExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#topLevelNumber.

  }, {
    key: "enterTopLevelNumber",
    value: function enterTopLevelNumber(ctx) {} // Exit a parse tree produced by JSONFormulaParser#topLevelNumber.

  }, {
    key: "exitTopLevelNumber",
    value: function exitTopLevelNumber(ctx) {} // Enter a parse tree produced by JSONFormulaParser#unary_op.

  }, {
    key: "enterUnary_op",
    value: function enterUnary_op(ctx) {} // Exit a parse tree produced by JSONFormulaParser#unary_op.

  }, {
    key: "exitUnary_op",
    value: function exitUnary_op(ctx) {} // Enter a parse tree produced by JSONFormulaParser#binary_op.

  }, {
    key: "enterBinary_op",
    value: function enterBinary_op(ctx) {} // Exit a parse tree produced by JSONFormulaParser#binary_op.

  }, {
    key: "exitBinary_op",
    value: function exitBinary_op(ctx) {} // Enter a parse tree produced by JSONFormulaParser#postfix_op.

  }, {
    key: "enterPostfix_op",
    value: function enterPostfix_op(ctx) {} // Exit a parse tree produced by JSONFormulaParser#postfix_op.

  }, {
    key: "exitPostfix_op",
    value: function exitPostfix_op(ctx) {} // Enter a parse tree produced by JSONFormulaParser#function_call.

  }, {
    key: "enterFunction_call",
    value: function enterFunction_call(ctx) {} // Exit a parse tree produced by JSONFormulaParser#function_call.

  }, {
    key: "exitFunction_call",
    value: function exitFunction_call(ctx) {} // Enter a parse tree produced by JSONFormulaParser#parameter.

  }, {
    key: "enterParameter",
    value: function enterParameter(ctx) {} // Exit a parse tree produced by JSONFormulaParser#parameter.

  }, {
    key: "exitParameter",
    value: function exitParameter(ctx) {} // Enter a parse tree produced by JSONFormulaParser#nonempty_expr_list.

  }, {
    key: "enterNonempty_expr_list",
    value: function enterNonempty_expr_list(ctx) {} // Exit a parse tree produced by JSONFormulaParser#nonempty_expr_list.

  }, {
    key: "exitNonempty_expr_list",
    value: function exitNonempty_expr_list(ctx) {} // Enter a parse tree produced by JSONFormulaParser#expression_list.

  }, {
    key: "enterExpression_list",
    value: function enterExpression_list(ctx) {} // Exit a parse tree produced by JSONFormulaParser#expression_list.

  }, {
    key: "exitExpression_list",
    value: function exitExpression_list(ctx) {} // Enter a parse tree produced by JSONFormulaParser#parm_separator.

  }, {
    key: "enterParm_separator",
    value: function enterParm_separator(ctx) {} // Exit a parse tree produced by JSONFormulaParser#parm_separator.

  }, {
    key: "exitParm_separator",
    value: function exitParm_separator(ctx) {} // Enter a parse tree produced by JSONFormulaParser#pipeExpression.

  }, {
    key: "enterPipeExpression",
    value: function enterPipeExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#pipeExpression.

  }, {
    key: "exitPipeExpression",
    value: function exitPipeExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#identifierExpression.

  }, {
    key: "enterIdentifierExpression",
    value: function enterIdentifierExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#identifierExpression.

  }, {
    key: "exitIdentifierExpression",
    value: function exitIdentifierExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#notExpression.

  }, {
    key: "enterNotExpression",
    value: function enterNotExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#notExpression.

  }, {
    key: "exitNotExpression",
    value: function exitNotExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#rawStringExpression.

  }, {
    key: "enterRawStringExpression",
    value: function enterRawStringExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#rawStringExpression.

  }, {
    key: "exitRawStringExpression",
    value: function exitRawStringExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#comparisonExpression.

  }, {
    key: "enterComparisonExpression",
    value: function enterComparisonExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#comparisonExpression.

  }, {
    key: "exitComparisonExpression",
    value: function exitComparisonExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#parenExpression.

  }, {
    key: "enterParenExpression",
    value: function enterParenExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#parenExpression.

  }, {
    key: "exitParenExpression",
    value: function exitParenExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#bracketExpression.

  }, {
    key: "enterBracketExpression",
    value: function enterBracketExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#bracketExpression.

  }, {
    key: "exitBracketExpression",
    value: function exitBracketExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#orExpression.

  }, {
    key: "enterOrExpression",
    value: function enterOrExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#orExpression.

  }, {
    key: "exitOrExpression",
    value: function exitOrExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#currentNodeExpression.

  }, {
    key: "enterCurrentNodeExpression",
    value: function enterCurrentNodeExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#currentNodeExpression.

  }, {
    key: "exitCurrentNodeExpression",
    value: function exitCurrentNodeExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#chainExpression.

  }, {
    key: "enterChainExpression",
    value: function enterChainExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#chainExpression.

  }, {
    key: "exitChainExpression",
    value: function exitChainExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#andExpression.

  }, {
    key: "enterAndExpression",
    value: function enterAndExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#andExpression.

  }, {
    key: "exitAndExpression",
    value: function exitAndExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#multiSelectHashExpression.

  }, {
    key: "enterMultiSelectHashExpression",
    value: function enterMultiSelectHashExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#multiSelectHashExpression.

  }, {
    key: "exitMultiSelectHashExpression",
    value: function exitMultiSelectHashExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#wildcardExpression.

  }, {
    key: "enterWildcardExpression",
    value: function enterWildcardExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#wildcardExpression.

  }, {
    key: "exitWildcardExpression",
    value: function exitWildcardExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#functionCallExpression.

  }, {
    key: "enterFunctionCallExpression",
    value: function enterFunctionCallExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#functionCallExpression.

  }, {
    key: "exitFunctionCallExpression",
    value: function exitFunctionCallExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#multiSelectListExpression.

  }, {
    key: "enterMultiSelectListExpression",
    value: function enterMultiSelectListExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#multiSelectListExpression.

  }, {
    key: "exitMultiSelectListExpression",
    value: function exitMultiSelectListExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#bracketedExpression.

  }, {
    key: "enterBracketedExpression",
    value: function enterBracketedExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#bracketedExpression.

  }, {
    key: "exitBracketedExpression",
    value: function exitBracketedExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#literalExpression.

  }, {
    key: "enterLiteralExpression",
    value: function enterLiteralExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#literalExpression.

  }, {
    key: "exitLiteralExpression",
    value: function exitLiteralExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#chainedIdentifier.

  }, {
    key: "enterChainedIdentifier",
    value: function enterChainedIdentifier(ctx) {} // Exit a parse tree produced by JSONFormulaParser#chainedIdentifier.

  }, {
    key: "exitChainedIdentifier",
    value: function exitChainedIdentifier(ctx) {} // Enter a parse tree produced by JSONFormulaParser#chainedMultiSelectList.

  }, {
    key: "enterChainedMultiSelectList",
    value: function enterChainedMultiSelectList(ctx) {} // Exit a parse tree produced by JSONFormulaParser#chainedMultiSelectList.

  }, {
    key: "exitChainedMultiSelectList",
    value: function exitChainedMultiSelectList(ctx) {} // Enter a parse tree produced by JSONFormulaParser#chainedMultiSelectHash.

  }, {
    key: "enterChainedMultiSelectHash",
    value: function enterChainedMultiSelectHash(ctx) {} // Exit a parse tree produced by JSONFormulaParser#chainedMultiSelectHash.

  }, {
    key: "exitChainedMultiSelectHash",
    value: function exitChainedMultiSelectHash(ctx) {} // Enter a parse tree produced by JSONFormulaParser#chainedFunctionExpression.

  }, {
    key: "enterChainedFunctionExpression",
    value: function enterChainedFunctionExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#chainedFunctionExpression.

  }, {
    key: "exitChainedFunctionExpression",
    value: function exitChainedFunctionExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#chainedWildcard.

  }, {
    key: "enterChainedWildcard",
    value: function enterChainedWildcard(ctx) {} // Exit a parse tree produced by JSONFormulaParser#chainedWildcard.

  }, {
    key: "exitChainedWildcard",
    value: function exitChainedWildcard(ctx) {} // Enter a parse tree produced by JSONFormulaParser#wildcard.

  }, {
    key: "enterWildcard",
    value: function enterWildcard(ctx) {} // Exit a parse tree produced by JSONFormulaParser#wildcard.

  }, {
    key: "exitWildcard",
    value: function exitWildcard(ctx) {} // Enter a parse tree produced by JSONFormulaParser#multiSelectList.

  }, {
    key: "enterMultiSelectList",
    value: function enterMultiSelectList(ctx) {} // Exit a parse tree produced by JSONFormulaParser#multiSelectList.

  }, {
    key: "exitMultiSelectList",
    value: function exitMultiSelectList(ctx) {} // Enter a parse tree produced by JSONFormulaParser#multiSelectHash.

  }, {
    key: "enterMultiSelectHash",
    value: function enterMultiSelectHash(ctx) {} // Exit a parse tree produced by JSONFormulaParser#multiSelectHash.

  }, {
    key: "exitMultiSelectHash",
    value: function exitMultiSelectHash(ctx) {} // Enter a parse tree produced by JSONFormulaParser#keyvalExpr.

  }, {
    key: "enterKeyvalExpr",
    value: function enterKeyvalExpr(ctx) {} // Exit a parse tree produced by JSONFormulaParser#keyvalExpr.

  }, {
    key: "exitKeyvalExpr",
    value: function exitKeyvalExpr(ctx) {} // Enter a parse tree produced by JSONFormulaParser#bracketIndex.

  }, {
    key: "enterBracketIndex",
    value: function enterBracketIndex(ctx) {} // Exit a parse tree produced by JSONFormulaParser#bracketIndex.

  }, {
    key: "exitBracketIndex",
    value: function exitBracketIndex(ctx) {} // Enter a parse tree produced by JSONFormulaParser#bracketStar.

  }, {
    key: "enterBracketStar",
    value: function enterBracketStar(ctx) {} // Exit a parse tree produced by JSONFormulaParser#bracketStar.

  }, {
    key: "exitBracketStar",
    value: function exitBracketStar(ctx) {} // Enter a parse tree produced by JSONFormulaParser#bracketSlice.

  }, {
    key: "enterBracketSlice",
    value: function enterBracketSlice(ctx) {} // Exit a parse tree produced by JSONFormulaParser#bracketSlice.

  }, {
    key: "exitBracketSlice",
    value: function exitBracketSlice(ctx) {} // Enter a parse tree produced by JSONFormulaParser#bracketFlatten.

  }, {
    key: "enterBracketFlatten",
    value: function enterBracketFlatten(ctx) {} // Exit a parse tree produced by JSONFormulaParser#bracketFlatten.

  }, {
    key: "exitBracketFlatten",
    value: function exitBracketFlatten(ctx) {} // Enter a parse tree produced by JSONFormulaParser#select.

  }, {
    key: "enterSelect",
    value: function enterSelect(ctx) {} // Exit a parse tree produced by JSONFormulaParser#select.

  }, {
    key: "exitSelect",
    value: function exitSelect(ctx) {} // Enter a parse tree produced by JSONFormulaParser#slice.

  }, {
    key: "enterSlice",
    value: function enterSlice(ctx) {} // Exit a parse tree produced by JSONFormulaParser#slice.

  }, {
    key: "exitSlice",
    value: function exitSlice(ctx) {} // Enter a parse tree produced by JSONFormulaParser#functionExpression.

  }, {
    key: "enterFunctionExpression",
    value: function enterFunctionExpression(ctx) {} // Exit a parse tree produced by JSONFormulaParser#functionExpression.

  }, {
    key: "exitFunctionExpression",
    value: function exitFunctionExpression(ctx) {} // Enter a parse tree produced by JSONFormulaParser#functionArg.

  }, {
    key: "enterFunctionArg",
    value: function enterFunctionArg(ctx) {} // Exit a parse tree produced by JSONFormulaParser#functionArg.

  }, {
    key: "exitFunctionArg",
    value: function exitFunctionArg(ctx) {} // Enter a parse tree produced by JSONFormulaParser#currentNode.

  }, {
    key: "enterCurrentNode",
    value: function enterCurrentNode(ctx) {} // Exit a parse tree produced by JSONFormulaParser#currentNode.

  }, {
    key: "exitCurrentNode",
    value: function exitCurrentNode(ctx) {} // Enter a parse tree produced by JSONFormulaParser#expressionType.

  }, {
    key: "enterExpressionType",
    value: function enterExpressionType(ctx) {} // Exit a parse tree produced by JSONFormulaParser#expressionType.

  }, {
    key: "exitExpressionType",
    value: function exitExpressionType(ctx) {} // Enter a parse tree produced by JSONFormulaParser#literal.

  }, {
    key: "enterLiteral",
    value: function enterLiteral(ctx) {} // Exit a parse tree produced by JSONFormulaParser#literal.

  }, {
    key: "exitLiteral",
    value: function exitLiteral(ctx) {} // Enter a parse tree produced by JSONFormulaParser#identifier.

  }, {
    key: "enterIdentifier",
    value: function enterIdentifier(ctx) {} // Exit a parse tree produced by JSONFormulaParser#identifier.

  }, {
    key: "exitIdentifier",
    value: function exitIdentifier(ctx) {} // Enter a parse tree produced by JSONFormulaParser#jsonObject.

  }, {
    key: "enterJsonObject",
    value: function enterJsonObject(ctx) {} // Exit a parse tree produced by JSONFormulaParser#jsonObject.

  }, {
    key: "exitJsonObject",
    value: function exitJsonObject(ctx) {} // Enter a parse tree produced by JSONFormulaParser#jsonObjectPair.

  }, {
    key: "enterJsonObjectPair",
    value: function enterJsonObjectPair(ctx) {} // Exit a parse tree produced by JSONFormulaParser#jsonObjectPair.

  }, {
    key: "exitJsonObjectPair",
    value: function exitJsonObjectPair(ctx) {} // Enter a parse tree produced by JSONFormulaParser#jsonArray.

  }, {
    key: "enterJsonArray",
    value: function enterJsonArray(ctx) {} // Exit a parse tree produced by JSONFormulaParser#jsonArray.

  }, {
    key: "exitJsonArray",
    value: function exitJsonArray(ctx) {} // Enter a parse tree produced by JSONFormulaParser#jsonStringValue.

  }, {
    key: "enterJsonStringValue",
    value: function enterJsonStringValue(ctx) {} // Exit a parse tree produced by JSONFormulaParser#jsonStringValue.

  }, {
    key: "exitJsonStringValue",
    value: function exitJsonStringValue(ctx) {} // Enter a parse tree produced by JSONFormulaParser#jsonNumberValue.

  }, {
    key: "enterJsonNumberValue",
    value: function enterJsonNumberValue(ctx) {} // Exit a parse tree produced by JSONFormulaParser#jsonNumberValue.

  }, {
    key: "exitJsonNumberValue",
    value: function exitJsonNumberValue(ctx) {} // Enter a parse tree produced by JSONFormulaParser#jsonObjectValue.

  }, {
    key: "enterJsonObjectValue",
    value: function enterJsonObjectValue(ctx) {} // Exit a parse tree produced by JSONFormulaParser#jsonObjectValue.

  }, {
    key: "exitJsonObjectValue",
    value: function exitJsonObjectValue(ctx) {} // Enter a parse tree produced by JSONFormulaParser#jsonArrayValue.

  }, {
    key: "enterJsonArrayValue",
    value: function enterJsonArrayValue(ctx) {} // Exit a parse tree produced by JSONFormulaParser#jsonArrayValue.

  }, {
    key: "exitJsonArrayValue",
    value: function exitJsonArrayValue(ctx) {} // Enter a parse tree produced by JSONFormulaParser#jsonConstantValue.

  }, {
    key: "enterJsonConstantValue",
    value: function enterJsonConstantValue(ctx) {} // Exit a parse tree produced by JSONFormulaParser#jsonConstantValue.

  }, {
    key: "exitJsonConstantValue",
    value: function exitJsonConstantValue(ctx) {}
  }]);

  return JSONFormulaListener;
}(antlr4.tree.ParseTreeListener);


;// CONCATENATED MODULE: ./src/antlr/JSONFormulaParser.js
function JSONFormulaParser_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { JSONFormulaParser_typeof = function _typeof(obj) { return typeof obj; }; } else { JSONFormulaParser_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return JSONFormulaParser_typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = JSONFormulaParser_getPrototypeOf(object); if (object === null) break; } return object; }

function JSONFormulaParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function JSONFormulaParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function JSONFormulaParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) JSONFormulaParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) JSONFormulaParser_defineProperties(Constructor, staticProps); return Constructor; }

function JSONFormulaParser_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) JSONFormulaParser_setPrototypeOf(subClass, superClass); }

function JSONFormulaParser_setPrototypeOf(o, p) { JSONFormulaParser_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return JSONFormulaParser_setPrototypeOf(o, p); }

function JSONFormulaParser_createSuper(Derived) { var hasNativeReflectConstruct = JSONFormulaParser_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = JSONFormulaParser_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = JSONFormulaParser_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return JSONFormulaParser_possibleConstructorReturn(this, result); }; }

function JSONFormulaParser_possibleConstructorReturn(self, call) { if (call && (JSONFormulaParser_typeof(call) === "object" || typeof call === "function")) { return call; } return JSONFormulaParser_assertThisInitialized(self); }

function JSONFormulaParser_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function JSONFormulaParser_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function JSONFormulaParser_getPrototypeOf(o) { JSONFormulaParser_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return JSONFormulaParser_getPrototypeOf(o); }

// Generated from antlr/JSONFormula.g4 by ANTLR 4.9.2
// jshint ignore: start


var serializedATN = ["\x03\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786", "\u5964\x03$\u012A\x04\x02\t\x02\x04\x03\t\x03\x04\x04", "\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t\x07", "\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\x0B\t\x0B\x04\f\t\f", "\x04\r\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10", "\x04\x11\t\x11\x04\x12\t\x12\x04\x13\t\x13\x04\x14", "\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17", "\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B", "\t\x1B\x04\x1C\t\x1C\x04\x1D\t\x1D\x03\x02\x03\x02", "\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03", "\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03", "\x03\x03\x03\x03\x05\x03K\n\x03\x03\x03\x03\x03", "\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03S\n\x03", "\f\x03\x0E\x03V\x0B\x03\x03\x04\x03\x04\x03\x05", "\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07", "\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\t\x03", "\t\x03\t\x03\t\x03\t\x07\tl\n\t\f\t\x0E\to\x0B\t\x03\n", "\x03\n\x05\ns\n\n\x03\x0B\x03\x0B\x03\f\x03\f\x03", "\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03", "\f\x03\f\x03\f\x03\f\x03\f\x05\f\x87\n\f\x03\f\x03\f", "\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03", "\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x07\f\x9A\n\f", "\f\f\x0E\f\x9D\x0B\f\x03\r\x03\r\x03\r\x03\r\x03\r\x05", "\r\xA4\n\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F", "\x03\x0F\x07\x0F\xAC\n\x0F\f\x0F\x0E\x0F\xAF\x0B", "\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03", "\x10\x07\x10\xB7\n\x10\f\x10\x0E\x10\xBA\x0B\x10", "\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11", "\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12", "\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12", "\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12\xD2\n", "\x12\x03\x13\x05\x13\xD5\n\x13\x03\x13\x03\x13", "\x05\x13\xD9\n\x13\x03\x13\x03\x13\x05\x13\xDD", "\n\x13\x05\x13\xDF\n\x13\x03\x14\x03\x14\x03\x14", "\x03\x14\x03\x14\x07\x14\xE6\n\x14\f\x14\x0E\x14", "\xE9\x0B\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03", "\x14\x05\x14\xF0\n\x14\x03\x15\x03\x15\x05\x15", "\xF4\n\x15\x03\x16\x03\x16\x03\x17\x03\x17\x03", "\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x19\x03", "\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1A\x07\x1A\u0105", "\n\x1A\f\x1A\x0E\x1A\u0108\x0B\x1A\x03\x1A\x03\x1A", "\x03\x1A\x03\x1A\x05\x1A\u010E\n\x1A\x03\x1B\x03", "\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x03", "\x1C\x07\x1C\u0118\n\x1C\f\x1C\x0E\x1C\u011B\x0B\x1C", "\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05\x1C\u0121\n", "\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05", "\x1D\u0128\n\x1D\x03\x1D\x02\x05\x04\x10\x16\x1E", "\x02\x04\x06\b\n\f\x0E\x10\x12\x14\x16\x18\x1A\x1C", "\x1E \"$&(*,.02468\x02\x06\x03\x02\x05\x06\x04\x02", "\x05\x0B\x1E\x1E\x03\x02 \"\x04\x02\x1B\x1B##\x02", "\u0140\x02:\x03\x02\x02\x02\x04J\x03\x02\x02\x02", "\x06W\x03\x02\x02\x02\bY\x03\x02\x02\x02\n[\x03", "\x02\x02\x02\f]\x03\x02\x02\x02\x0Eb\x03\x02\x02", "\x02\x10d\x03\x02\x02\x02\x12r\x03\x02\x02\x02", "\x14t\x03\x02\x02\x02\x16\x86\x03\x02\x02\x02", "\x18\xA3\x03\x02\x02\x02\x1A\xA5\x03\x02\x02\x02", "\x1C\xA7\x03\x02\x02\x02\x1E\xB2\x03\x02\x02\x02", " \xBD\x03\x02\x02\x02\"\xD1\x03\x02\x02\x02$\xD4", "\x03\x02\x02\x02&\xEF\x03\x02\x02\x02(\xF3\x03", "\x02\x02\x02*\xF5\x03\x02\x02\x02,\xF7\x03\x02", "\x02\x02.\xFA\x03\x02\x02\x020\xFE\x03\x02\x02", "\x022\u010D\x03\x02\x02\x024\u010F\x03\x02\x02\x02", "6\u0120\x03\x02\x02\x028\u0127\x03\x02\x02\x02:;\x05", "\x04\x03\x02;<\x07\x02\x02\x03<\x03\x03\x02\x02", "\x02=>\b\x03\x01\x02>K\x07\x1B\x02\x02?K\x07\x1C", "\x02\x02@K\x07\x1F\x02\x02AB\x05\x06\x04\x02BC\x05", "\x04\x03\x07CK\x03\x02\x02\x02DE\x07\x03\x02\x02", "EF\x05\x04\x03\x02FG\x07\x04\x02\x02GK\x03\x02\x02", "\x02HK\x05\f\x07\x02IK\x05\x16\f\x02J=\x03\x02\x02", "\x02J?\x03\x02\x02\x02J@\x03\x02\x02\x02JA\x03\x02", "\x02\x02JD\x03\x02\x02\x02JH\x03\x02\x02\x02JI\x03", "\x02\x02\x02KT\x03\x02\x02\x02LM\f\b\x02\x02MN\x05", "\b\x05\x02NO\x05\x04\x03\tOS\x03\x02\x02\x02PQ\f\x06", "\x02\x02QS\x05\n\x06\x02RL\x03\x02\x02\x02RP\x03", "\x02\x02\x02SV\x03\x02\x02\x02TR\x03\x02\x02\x02", "TU\x03\x02\x02\x02U\x05\x03\x02\x02\x02VT\x03\x02", "\x02\x02WX\t\x02\x02\x02X\x07\x03\x02\x02\x02YZ", "\t\x03\x02\x02Z\t\x03\x02\x02\x02[\\\x07\f\x02\x02", "\\\x0B\x03\x02\x02\x02]^\x07\x1D\x02\x02^_\x07\x03", "\x02\x02_`\x05\x12\n\x02`a\x07\x04\x02\x02a\r\x03", "\x02\x02\x02bc\x05\x04\x03\x02c\x0F\x03\x02\x02", "\x02de\b\t\x01\x02ef\x05\x0E\b\x02fm\x03\x02\x02\x02", "gh\f\x03\x02\x02hi\x05\x14\x0B\x02ij\x05\x0E\b\x02", "jl\x03\x02\x02\x02kg\x03\x02\x02\x02lo\x03\x02\x02", "\x02mk\x03\x02\x02\x02mn\x03\x02\x02\x02n\x11\x03", "\x02\x02\x02om\x03\x02\x02\x02ps\x03\x02\x02\x02", "qs\x05\x10\t\x02rp\x03\x02\x02\x02rq\x03\x02\x02", "\x02s\x13\x03\x02\x02\x02tu\x07\r\x02\x02u\x15\x03", "\x02\x02\x02vw\b\f\x01\x02w\x87\x05\"\x12\x02x\x87", "\x050\x19\x02yz\x07\x11\x02\x02z\x87\x05\x16\f\f", "{|\x07\x03\x02\x02|}\x05\x16\f\x02}~\x07\x04\x02", "\x02~\x87\x03\x02\x02\x02\x7F\x87\x05\x1A\x0E", "\x02\x80\x87\x05\x1C\x0F\x02\x81\x87\x05\x1E\x10", "\x02\x82\x87\x05.\x18\x02\x83\x87\x05&\x14\x02", "\x84\x87\x07\x1F\x02\x02\x85\x87\x05*\x16\x02", "\x86v\x03\x02\x02\x02\x86x\x03\x02\x02\x02\x86", "y\x03\x02\x02\x02\x86{\x03\x02\x02\x02\x86\x7F", "\x03\x02\x02\x02\x86\x80\x03\x02\x02\x02\x86\x81", "\x03\x02\x02\x02\x86\x82\x03\x02\x02\x02\x86\x83", "\x03\x02\x02\x02\x86\x84\x03\x02\x02\x02\x86\x85", "\x03\x02\x02\x02\x87\x9B\x03\x02\x02\x02\x88\x89", "\f\x10\x02\x02\x89\x8A\x07\x1E\x02\x02\x8A\x9A", "\x05\x16\f\x11\x8B\x8C\f\x0F\x02\x02\x8C\x8D\x07", "\x0F\x02\x02\x8D\x9A\x05\x16\f\x10\x8E\x8F\f\x0E", "\x02\x02\x8F\x90\x07\x10\x02\x02\x90\x9A\x05\x16", "\f\x0F\x91\x92\f\x05\x02\x02\x92\x93\x07\x12\x02", "\x02\x93\x9A\x05\x16\f\x06\x94\x95\f\x13\x02\x02", "\x95\x96\x07\x0E\x02\x02\x96\x9A\x05\x18\r\x02", "\x97\x98\f\x12\x02\x02\x98\x9A\x05\"\x12\x02\x99", "\x88\x03\x02\x02\x02\x99\x8B\x03\x02\x02\x02\x99", "\x8E\x03\x02\x02\x02\x99\x91\x03\x02\x02\x02\x99", "\x94\x03\x02\x02\x02\x99\x97\x03\x02\x02\x02\x9A", "\x9D\x03\x02\x02\x02\x9B\x99\x03\x02\x02\x02\x9B", "\x9C\x03\x02\x02\x02\x9C\x17\x03\x02\x02\x02\x9D", "\x9B\x03\x02\x02\x02\x9E\xA4\x050\x19\x02\x9F", "\xA4\x05\x1C\x0F\x02\xA0\xA4\x05\x1E\x10\x02\xA1", "\xA4\x05&\x14\x02\xA2\xA4\x05\x1A\x0E\x02\xA3", "\x9E\x03\x02\x02\x02\xA3\x9F\x03\x02\x02\x02\xA3", "\xA0\x03\x02\x02\x02\xA3\xA1\x03\x02\x02\x02\xA3", "\xA2\x03\x02\x02\x02\xA4\x19\x03\x02\x02\x02\xA5", "\xA6\x07\t\x02\x02\xA6\x1B\x03\x02\x02\x02\xA7", "\xA8\x07\x13\x02\x02\xA8\xAD\x05\x16\f\x02\xA9", "\xAA\x07\r\x02\x02\xAA\xAC\x05\x16\f\x02\xAB\xA9", "\x03\x02\x02\x02\xAC\xAF\x03\x02\x02\x02\xAD\xAB", "\x03\x02\x02\x02\xAD\xAE\x03\x02\x02\x02\xAE\xB0", "\x03\x02\x02\x02\xAF\xAD\x03\x02\x02\x02\xB0\xB1", "\x07\x14\x02\x02\xB1\x1D\x03\x02\x02\x02\xB2\xB3", "\x07\x15\x02\x02\xB3\xB8\x05 \x11\x02\xB4\xB5", "\x07\r\x02\x02\xB5\xB7\x05 \x11\x02\xB6\xB4\x03", "\x02\x02\x02\xB7\xBA\x03\x02\x02\x02\xB8\xB6\x03", "\x02\x02\x02\xB8\xB9\x03\x02\x02\x02\xB9\xBB\x03", "\x02\x02\x02\xBA\xB8\x03\x02\x02\x02\xBB\xBC\x07", "\x16\x02\x02\xBC\x1F\x03\x02\x02\x02\xBD\xBE\x05", "0\x19\x02\xBE\xBF\x07\x17\x02\x02\xBF\xC0\x05", "\x16\f\x02\xC0!\x03\x02\x02\x02\xC1\xC2\x07\x13", "\x02\x02\xC2\xC3\x07\x1B\x02\x02\xC3\xD2\x07\x14", "\x02\x02\xC4\xC5\x07\x13\x02\x02\xC5\xC6\x07\t", "\x02\x02\xC6\xD2\x07\x14\x02\x02\xC7\xC8\x07\x13", "\x02\x02\xC8\xC9\x05$\x13\x02\xC9\xCA\x07\x14", "\x02\x02\xCA\xD2\x03\x02\x02\x02\xCB\xCC\x07\x13", "\x02\x02\xCC\xD2\x07\x14\x02\x02\xCD\xCE\x07\x18", "\x02\x02\xCE\xCF\x05\x16\f\x02\xCF\xD0\x07\x14", "\x02\x02\xD0\xD2\x03\x02\x02\x02\xD1\xC1\x03\x02", "\x02\x02\xD1\xC4\x03\x02\x02\x02\xD1\xC7\x03\x02", "\x02\x02\xD1\xCB\x03\x02\x02\x02\xD1\xCD\x03\x02", "\x02\x02\xD2#\x03\x02\x02\x02\xD3\xD5\x07\x1B", "\x02\x02\xD4\xD3\x03\x02\x02\x02\xD4\xD5\x03\x02", "\x02\x02\xD5\xD6\x03\x02\x02\x02\xD6\xD8\x07\x17", "\x02\x02\xD7\xD9\x07\x1B\x02\x02\xD8\xD7\x03\x02", "\x02\x02\xD8\xD9\x03\x02\x02\x02\xD9\xDE\x03\x02", "\x02\x02\xDA\xDC\x07\x17\x02\x02\xDB\xDD\x07\x1B", "\x02\x02\xDC\xDB\x03\x02\x02\x02\xDC\xDD\x03\x02", "\x02\x02\xDD\xDF\x03\x02\x02\x02\xDE\xDA\x03\x02", "\x02\x02\xDE\xDF\x03\x02\x02\x02\xDF%\x03\x02", "\x02\x02\xE0\xE1\x07!\x02\x02\xE1\xE2\x07\x03", "\x02\x02\xE2\xE7\x05(\x15\x02\xE3\xE4\x07\r\x02", "\x02\xE4\xE6\x05(\x15\x02\xE5\xE3\x03\x02\x02", "\x02\xE6\xE9\x03\x02\x02\x02\xE7\xE5\x03\x02\x02", "\x02\xE7\xE8\x03\x02\x02\x02\xE8\xEA\x03\x02\x02", "\x02\xE9\xE7\x03\x02\x02\x02\xEA\xEB\x07\x04\x02", "\x02\xEB\xF0\x03\x02\x02\x02\xEC\xED\x07!\x02", "\x02\xED\xEE\x07\x03\x02\x02\xEE\xF0\x07\x04\x02", "\x02\xEF\xE0\x03\x02\x02\x02\xEF\xEC\x03\x02\x02", "\x02\xF0'\x03\x02\x02\x02\xF1\xF4\x05\x16\f\x02", "\xF2\xF4\x05,\x17\x02\xF3\xF1\x03\x02\x02\x02", "\xF3\xF2\x03\x02\x02\x02\xF4)\x03\x02\x02\x02", "\xF5\xF6\x07\x19\x02\x02\xF6+\x03\x02\x02\x02", "\xF7\xF8\x07\b\x02\x02\xF8\xF9\x05\x16\f\x02\xF9", "-\x03\x02\x02\x02\xFA\xFB\x07\x1A\x02\x02\xFB", "\xFC\x058\x1D\x02\xFC\xFD\x07\x1A\x02\x02\xFD", "/\x03\x02\x02\x02\xFE\xFF\t\x04\x02\x02\xFF1\x03", "\x02\x02\x02\u0100\u0101\x07\x15\x02\x02\u0101\u0106\x05", "4\x1B\x02\u0102\u0103\x07\r\x02\x02\u0103\u0105\x054\x1B", "\x02\u0104\u0102\x03\x02\x02\x02\u0105\u0108\x03\x02\x02", "\x02\u0106\u0104\x03\x02\x02\x02\u0106\u0107\x03\x02\x02", "\x02\u0107\u0109\x03\x02\x02\x02\u0108\u0106\x03\x02\x02", "\x02\u0109\u010A\x07\x16\x02\x02\u010A\u010E\x03\x02\x02", "\x02\u010B\u010C\x07\x15\x02\x02\u010C\u010E\x07\x16\x02", "\x02\u010D\u0100\x03\x02\x02\x02\u010D\u010B\x03\x02\x02", "\x02\u010E3\x03\x02\x02\x02\u010F\u0110\x07\"\x02\x02", "\u0110\u0111\x07\x17\x02\x02\u0111\u0112\x058\x1D\x02", "\u01125\x03\x02\x02\x02\u0113\u0114\x07\x13\x02\x02", "\u0114\u0119\x058\x1D\x02\u0115\u0116\x07\r\x02\x02\u0116", "\u0118\x058\x1D\x02\u0117\u0115\x03\x02\x02\x02\u0118", "\u011B\x03\x02\x02\x02\u0119\u0117\x03\x02\x02\x02\u0119", "\u011A\x03\x02\x02\x02\u011A\u011C\x03\x02\x02\x02\u011B", "\u0119\x03\x02\x02\x02\u011C\u011D\x07\x14\x02\x02\u011D", "\u0121\x03\x02\x02\x02\u011E\u011F\x07\x13\x02\x02\u011F", "\u0121\x07\x14\x02\x02\u0120\u0113\x03\x02\x02\x02\u0120", "\u011E\x03\x02\x02\x02\u01217\x03\x02\x02\x02\u0122", "\u0128\x07\"\x02\x02\u0123\u0128\t\x05\x02\x02\u0124\u0128", "\x052\x1A\x02\u0125\u0128\x056\x1C\x02\u0126\u0128\x07", " \x02\x02\u0127\u0122\x03\x02\x02\x02\u0127\u0123\x03", "\x02\x02\x02\u0127\u0124\x03\x02\x02\x02\u0127\u0125\x03", "\x02\x02\x02\u0127\u0126\x03\x02\x02\x02\u01289\x03", "\x02\x02\x02\x1AJRTmr\x86\x99\x9B\xA3\xAD\xB8\xD1", "\xD4\xD8\xDC\xDE\xE7\xEF\xF3\u0106\u010D\u0119\u0120\u0127"].join("");
var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);
var decisionsToDFA = atn.decisionToState.map(function (ds, index) {
  return new antlr4.dfa.DFA(ds, index);
});
var sharedContextCache = new antlr4/* PredictionContextCache */.d();

var JSONFormulaParser = /*#__PURE__*/function (_antlr4$Parser) {
  JSONFormulaParser_inherits(JSONFormulaParser, _antlr4$Parser);

  var _super = JSONFormulaParser_createSuper(JSONFormulaParser);

  function JSONFormulaParser(input) {
    var _this;

    JSONFormulaParser_classCallCheck(this, JSONFormulaParser);

    _this = _super.call(this, input);
    _this._interp = new antlr4.atn.ParserATNSimulator(JSONFormulaParser_assertThisInitialized(_this), atn, decisionsToDFA, sharedContextCache);
    _this.ruleNames = JSONFormulaParser.ruleNames;
    _this.literalNames = JSONFormulaParser.literalNames;
    _this.symbolicNames = JSONFormulaParser.symbolicNames;
    return _this;
  }

  JSONFormulaParser_createClass(JSONFormulaParser, [{
    key: "atn",
    get: function get() {
      return atn;
    }
  }, {
    key: "sempred",
    value: function sempred(localctx, ruleIndex, predIndex) {
      switch (ruleIndex) {
        case 1:
          return this.expression_sempred(localctx, predIndex);

        case 7:
          return this.nonempty_expr_list_sempred(localctx, predIndex);

        case 10:
          return this.jmesPathExpression_sempred(localctx, predIndex);

        default:
          throw "No predicate with index:" + ruleIndex;
      }
    }
  }, {
    key: "expression_sempred",
    value: function expression_sempred(localctx, predIndex) {
      switch (predIndex) {
        case 0:
          return this.precpred(this._ctx, 6);

        case 1:
          return this.precpred(this._ctx, 4);

        default:
          throw "No predicate with index:" + predIndex;
      }
    }
  }, {
    key: "nonempty_expr_list_sempred",
    value: function nonempty_expr_list_sempred(localctx, predIndex) {
      switch (predIndex) {
        case 2:
          return this.precpred(this._ctx, 1);

        default:
          throw "No predicate with index:" + predIndex;
      }
    }
  }, {
    key: "jmesPathExpression_sempred",
    value: function jmesPathExpression_sempred(localctx, predIndex) {
      switch (predIndex) {
        case 3:
          return this.precpred(this._ctx, 14);

        case 4:
          return this.precpred(this._ctx, 13);

        case 5:
          return this.precpred(this._ctx, 12);

        case 6:
          return this.precpred(this._ctx, 3);

        case 7:
          return this.precpred(this._ctx, 17);

        case 8:
          return this.precpred(this._ctx, 16);

        default:
          throw "No predicate with index:" + predIndex;
      }
    }
  }, {
    key: "formula",
    value: function formula() {
      var localctx = new FormulaContext(this, this._ctx, this.state);
      this.enterRule(localctx, 0, JSONFormulaParser.RULE_formula);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 56;
        this.expression(0);
        this.state = 57;
        this.match(JSONFormulaParser.EOF);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "expression",
    value: function expression(_p) {
      if (_p === undefined) {
        _p = 0;
      }

      var _parentctx = this._ctx;
      var _parentState = this.state;
      var localctx = new ExpressionContext(this, this._ctx, _parentState);
      var _prevctx = localctx;
      var _startState = 2;
      this.enterRecursionRule(localctx, 2, JSONFormulaParser.RULE_expression, _p);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 72;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 0, this._ctx);

        switch (la_) {
          case 1:
            localctx = new TopLevelIntContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 60;
            this.match(JSONFormulaParser.SIGNED_INT);
            break;

          case 2:
            localctx = new TopLevelNumberContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 61;
            this.match(JSONFormulaParser.NUMBER);
            break;

          case 3:
            localctx = new TopLevelStringContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 62;
            this.match(JSONFormulaParser.RAW_STRING);
            break;

          case 4:
            localctx = new UnaryExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 63;
            this.unary_op();
            this.state = 64;
            this.expression(5);
            break;

          case 5:
            localctx = new BraceExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 66;
            this.match(JSONFormulaParser.T__0);
            this.state = 67;
            this.expression(0);
            this.state = 68;
            this.match(JSONFormulaParser.T__1);
            break;

          case 6:
            localctx = new FunctionCallContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 70;
            this.function_call();
            break;

          case 7:
            localctx = new JmesPathContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 71;
            this.jmesPathExpression(0);
            break;
        }

        this._ctx.stop = this._input.LT(-1);
        this.state = 82;

        this._errHandler.sync(this);

        var _alt = this._interp.adaptivePredict(this._input, 2, this._ctx);

        while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners !== null) {
              this.triggerExitRuleEvent();
            }

            _prevctx = localctx;
            this.state = 80;

            this._errHandler.sync(this);

            var la_ = this._interp.adaptivePredict(this._input, 1, this._ctx);

            switch (la_) {
              case 1:
                localctx = new BinaryExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
                this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
                this.state = 74;

                if (!this.precpred(this._ctx, 6)) {
                  throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                }

                this.state = 75;
                this.binary_op();
                this.state = 76;
                this.expression(7);
                break;

              case 2:
                localctx = new PostfixContext(this, new ExpressionContext(this, _parentctx, _parentState));
                this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_expression);
                this.state = 78;

                if (!this.precpred(this._ctx, 4)) {
                  throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                }

                this.state = 79;
                this.postfix_op();
                break;
            }
          }

          this.state = 84;

          this._errHandler.sync(this);

          _alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
        }
      } catch (error) {
        if (error instanceof antlr4.error.RecognitionException) {
          localctx.exception = error;

          this._errHandler.reportError(this, error);

          this._errHandler.recover(this, error);
        } else {
          throw error;
        }
      } finally {
        this.unrollRecursionContexts(_parentctx);
      }

      return localctx;
    }
  }, {
    key: "unary_op",
    value: function unary_op() {
      var localctx = new Unary_opContext(this, this._ctx, this.state);
      this.enterRule(localctx, 4, JSONFormulaParser.RULE_unary_op);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 85;
        _la = this._input.LA(1);

        if (!(_la === JSONFormulaParser.T__2 || _la === JSONFormulaParser.T__3)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "binary_op",
    value: function binary_op() {
      var localctx = new Binary_opContext(this, this._ctx, this.state);
      this.enterRule(localctx, 6, JSONFormulaParser.RULE_binary_op);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 87;
        _la = this._input.LA(1);

        if (!((_la & ~0x1f) == 0 && (1 << _la & (1 << JSONFormulaParser.T__2 | 1 << JSONFormulaParser.T__3 | 1 << JSONFormulaParser.T__4 | 1 << JSONFormulaParser.T__5 | 1 << JSONFormulaParser.T__6 | 1 << JSONFormulaParser.T__7 | 1 << JSONFormulaParser.T__8 | 1 << JSONFormulaParser.COMPARATOR)) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "postfix_op",
    value: function postfix_op() {
      var localctx = new Postfix_opContext(this, this._ctx, this.state);
      this.enterRule(localctx, 8, JSONFormulaParser.RULE_postfix_op);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 89;
        this.match(JSONFormulaParser.T__9);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "function_call",
    value: function function_call() {
      var localctx = new Function_callContext(this, this._ctx, this.state);
      this.enterRule(localctx, 10, JSONFormulaParser.RULE_function_call);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 91;
        this.match(JSONFormulaParser.FUNCTIONS);
        this.state = 92;
        this.match(JSONFormulaParser.T__0);
        this.state = 93;
        this.expression_list();
        this.state = 94;
        this.match(JSONFormulaParser.T__1);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "parameter",
    value: function parameter() {
      var localctx = new ParameterContext(this, this._ctx, this.state);
      this.enterRule(localctx, 12, JSONFormulaParser.RULE_parameter);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 96;
        this.expression(0);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "nonempty_expr_list",
    value: function nonempty_expr_list(_p) {
      if (_p === undefined) {
        _p = 0;
      }

      var _parentctx = this._ctx;
      var _parentState = this.state;
      var localctx = new Nonempty_expr_listContext(this, this._ctx, _parentState);
      var _prevctx = localctx;
      var _startState = 14;
      this.enterRecursionRule(localctx, 14, JSONFormulaParser.RULE_nonempty_expr_list, _p);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 99;
        this.parameter();
        this._ctx.stop = this._input.LT(-1);
        this.state = 107;

        this._errHandler.sync(this);

        var _alt = this._interp.adaptivePredict(this._input, 3, this._ctx);

        while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners !== null) {
              this.triggerExitRuleEvent();
            }

            _prevctx = localctx;
            localctx = new Nonempty_expr_listContext(this, _parentctx, _parentState);
            this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_nonempty_expr_list);
            this.state = 101;

            if (!this.precpred(this._ctx, 1)) {
              throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
            }

            this.state = 102;
            this.parm_separator();
            this.state = 103;
            this.parameter();
          }

          this.state = 109;

          this._errHandler.sync(this);

          _alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
        }
      } catch (error) {
        if (error instanceof antlr4.error.RecognitionException) {
          localctx.exception = error;

          this._errHandler.reportError(this, error);

          this._errHandler.recover(this, error);
        } else {
          throw error;
        }
      } finally {
        this.unrollRecursionContexts(_parentctx);
      }

      return localctx;
    }
  }, {
    key: "expression_list",
    value: function expression_list() {
      var localctx = new Expression_listContext(this, this._ctx, this.state);
      this.enterRule(localctx, 16, JSONFormulaParser.RULE_expression_list);

      try {
        this.state = 112;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case JSONFormulaParser.T__1:
            this.enterOuterAlt(localctx, 1);
            break;

          case JSONFormulaParser.T__0:
          case JSONFormulaParser.T__2:
          case JSONFormulaParser.T__3:
          case JSONFormulaParser.T__6:
          case JSONFormulaParser.T__14:
          case JSONFormulaParser.T__16:
          case JSONFormulaParser.T__18:
          case JSONFormulaParser.T__21:
          case JSONFormulaParser.T__22:
          case JSONFormulaParser.T__23:
          case JSONFormulaParser.SIGNED_INT:
          case JSONFormulaParser.NUMBER:
          case JSONFormulaParser.FUNCTIONS:
          case JSONFormulaParser.RAW_STRING:
          case JSONFormulaParser.JSON_CONSTANT:
          case JSONFormulaParser.NAME:
          case JSONFormulaParser.STRING:
            this.enterOuterAlt(localctx, 2);
            this.state = 111;
            this.nonempty_expr_list(0);
            break;

          default:
            throw new antlr4.error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "parm_separator",
    value: function parm_separator() {
      var localctx = new Parm_separatorContext(this, this._ctx, this.state);
      this.enterRule(localctx, 18, JSONFormulaParser.RULE_parm_separator);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 114;
        this.match(JSONFormulaParser.T__10);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "jmesPathExpression",
    value: function jmesPathExpression(_p) {
      if (_p === undefined) {
        _p = 0;
      }

      var _parentctx = this._ctx;
      var _parentState = this.state;
      var localctx = new JmesPathExpressionContext(this, this._ctx, _parentState);
      var _prevctx = localctx;
      var _startState = 20;
      this.enterRecursionRule(localctx, 20, JSONFormulaParser.RULE_jmesPathExpression, _p);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 132;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 5, this._ctx);

        switch (la_) {
          case 1:
            localctx = new BracketExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 117;
            this.bracketSpecifier();
            break;

          case 2:
            localctx = new IdentifierExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 118;
            this.identifier();
            break;

          case 3:
            localctx = new NotExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 119;
            this.match(JSONFormulaParser.T__14);
            this.state = 120;
            this.jmesPathExpression(10);
            break;

          case 4:
            localctx = new ParenExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 121;
            this.match(JSONFormulaParser.T__0);
            this.state = 122;
            this.jmesPathExpression(0);
            this.state = 123;
            this.match(JSONFormulaParser.T__1);
            break;

          case 5:
            localctx = new WildcardExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 125;
            this.wildcard();
            break;

          case 6:
            localctx = new MultiSelectListExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 126;
            this.multiSelectList();
            break;

          case 7:
            localctx = new MultiSelectHashExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 127;
            this.multiSelectHash();
            break;

          case 8:
            localctx = new LiteralExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 128;
            this.literal();
            break;

          case 9:
            localctx = new FunctionCallExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 129;
            this.functionExpression();
            break;

          case 10:
            localctx = new RawStringExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 130;
            this.match(JSONFormulaParser.RAW_STRING);
            break;

          case 11:
            localctx = new CurrentNodeExpressionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 131;
            this.currentNode();
            break;
        }

        this._ctx.stop = this._input.LT(-1);
        this.state = 153;

        this._errHandler.sync(this);

        var _alt = this._interp.adaptivePredict(this._input, 7, this._ctx);

        while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners !== null) {
              this.triggerExitRuleEvent();
            }

            _prevctx = localctx;
            this.state = 151;

            this._errHandler.sync(this);

            var la_ = this._interp.adaptivePredict(this._input, 6, this._ctx);

            switch (la_) {
              case 1:
                localctx = new ComparisonExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
                this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
                this.state = 134;

                if (!this.precpred(this._ctx, 14)) {
                  throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 14)");
                }

                this.state = 135;
                this.match(JSONFormulaParser.COMPARATOR);
                this.state = 136;
                this.jmesPathExpression(15);
                break;

              case 2:
                localctx = new AndExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
                this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
                this.state = 137;

                if (!this.precpred(this._ctx, 13)) {
                  throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 13)");
                }

                this.state = 138;
                this.match(JSONFormulaParser.T__12);
                this.state = 139;
                this.jmesPathExpression(14);
                break;

              case 3:
                localctx = new OrExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
                this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
                this.state = 140;

                if (!this.precpred(this._ctx, 12)) {
                  throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 12)");
                }

                this.state = 141;
                this.match(JSONFormulaParser.T__13);
                this.state = 142;
                this.jmesPathExpression(13);
                break;

              case 4:
                localctx = new PipeExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
                this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
                this.state = 143;

                if (!this.precpred(this._ctx, 3)) {
                  throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                }

                this.state = 144;
                this.match(JSONFormulaParser.T__15);
                this.state = 145;
                this.jmesPathExpression(4);
                break;

              case 5:
                localctx = new ChainExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
                this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
                this.state = 146;

                if (!this.precpred(this._ctx, 17)) {
                  throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 17)");
                }

                this.state = 147;
                this.match(JSONFormulaParser.T__11);
                this.state = 148;
                this.chainedExpression();
                break;

              case 6:
                localctx = new BracketedExpressionContext(this, new JmesPathExpressionContext(this, _parentctx, _parentState));
                this.pushNewRecursionContext(localctx, _startState, JSONFormulaParser.RULE_jmesPathExpression);
                this.state = 149;

                if (!this.precpred(this._ctx, 16)) {
                  throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 16)");
                }

                this.state = 150;
                this.bracketSpecifier();
                break;
            }
          }

          this.state = 155;

          this._errHandler.sync(this);

          _alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
        }
      } catch (error) {
        if (error instanceof antlr4.error.RecognitionException) {
          localctx.exception = error;

          this._errHandler.reportError(this, error);

          this._errHandler.recover(this, error);
        } else {
          throw error;
        }
      } finally {
        this.unrollRecursionContexts(_parentctx);
      }

      return localctx;
    }
  }, {
    key: "chainedExpression",
    value: function chainedExpression() {
      var localctx = new ChainedExpressionContext(this, this._ctx, this.state);
      this.enterRule(localctx, 22, JSONFormulaParser.RULE_chainedExpression);

      try {
        this.state = 161;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 8, this._ctx);

        switch (la_) {
          case 1:
            localctx = new ChainedIdentifierContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 156;
            this.identifier();
            break;

          case 2:
            localctx = new ChainedMultiSelectListContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 157;
            this.multiSelectList();
            break;

          case 3:
            localctx = new ChainedMultiSelectHashContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 158;
            this.multiSelectHash();
            break;

          case 4:
            localctx = new ChainedFunctionExpressionContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 159;
            this.functionExpression();
            break;

          case 5:
            localctx = new ChainedWildcardContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 160;
            this.wildcard();
            break;
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "wildcard",
    value: function wildcard() {
      var localctx = new WildcardContext(this, this._ctx, this.state);
      this.enterRule(localctx, 24, JSONFormulaParser.RULE_wildcard);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 163;
        this.match(JSONFormulaParser.T__6);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "multiSelectList",
    value: function multiSelectList() {
      var localctx = new MultiSelectListContext(this, this._ctx, this.state);
      this.enterRule(localctx, 26, JSONFormulaParser.RULE_multiSelectList);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 165;
        this.match(JSONFormulaParser.T__16);
        this.state = 166;
        this.jmesPathExpression(0);
        this.state = 171;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        while (_la === JSONFormulaParser.T__10) {
          this.state = 167;
          this.match(JSONFormulaParser.T__10);
          this.state = 168;
          this.jmesPathExpression(0);
          this.state = 173;

          this._errHandler.sync(this);

          _la = this._input.LA(1);
        }

        this.state = 174;
        this.match(JSONFormulaParser.T__17);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "multiSelectHash",
    value: function multiSelectHash() {
      var localctx = new MultiSelectHashContext(this, this._ctx, this.state);
      this.enterRule(localctx, 28, JSONFormulaParser.RULE_multiSelectHash);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 176;
        this.match(JSONFormulaParser.T__18);
        this.state = 177;
        this.keyvalExpr();
        this.state = 182;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        while (_la === JSONFormulaParser.T__10) {
          this.state = 178;
          this.match(JSONFormulaParser.T__10);
          this.state = 179;
          this.keyvalExpr();
          this.state = 184;

          this._errHandler.sync(this);

          _la = this._input.LA(1);
        }

        this.state = 185;
        this.match(JSONFormulaParser.T__19);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "keyvalExpr",
    value: function keyvalExpr() {
      var localctx = new KeyvalExprContext(this, this._ctx, this.state);
      this.enterRule(localctx, 30, JSONFormulaParser.RULE_keyvalExpr);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 187;
        this.identifier();
        this.state = 188;
        this.match(JSONFormulaParser.T__20);
        this.state = 189;
        this.jmesPathExpression(0);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "bracketSpecifier",
    value: function bracketSpecifier() {
      var localctx = new BracketSpecifierContext(this, this._ctx, this.state);
      this.enterRule(localctx, 32, JSONFormulaParser.RULE_bracketSpecifier);

      try {
        this.state = 207;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 11, this._ctx);

        switch (la_) {
          case 1:
            localctx = new BracketIndexContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 191;
            this.match(JSONFormulaParser.T__16);
            this.state = 192;
            this.match(JSONFormulaParser.SIGNED_INT);
            this.state = 193;
            this.match(JSONFormulaParser.T__17);
            break;

          case 2:
            localctx = new BracketStarContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 194;
            this.match(JSONFormulaParser.T__16);
            this.state = 195;
            this.match(JSONFormulaParser.T__6);
            this.state = 196;
            this.match(JSONFormulaParser.T__17);
            break;

          case 3:
            localctx = new BracketSliceContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 197;
            this.match(JSONFormulaParser.T__16);
            this.state = 198;
            this.slice();
            this.state = 199;
            this.match(JSONFormulaParser.T__17);
            break;

          case 4:
            localctx = new BracketFlattenContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 201;
            this.match(JSONFormulaParser.T__16);
            this.state = 202;
            this.match(JSONFormulaParser.T__17);
            break;

          case 5:
            localctx = new SelectContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 203;
            this.match(JSONFormulaParser.T__21);
            this.state = 204;
            this.jmesPathExpression(0);
            this.state = 205;
            this.match(JSONFormulaParser.T__17);
            break;
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "slice",
    value: function slice() {
      var localctx = new SliceContext(this, this._ctx, this.state);
      this.enterRule(localctx, 34, JSONFormulaParser.RULE_slice);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 210;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === JSONFormulaParser.SIGNED_INT) {
          this.state = 209;
          localctx.start = this.match(JSONFormulaParser.SIGNED_INT);
        }

        this.state = 212;
        this.match(JSONFormulaParser.T__20);
        this.state = 214;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === JSONFormulaParser.SIGNED_INT) {
          this.state = 213;
          localctx.stop = this.match(JSONFormulaParser.SIGNED_INT);
        }

        this.state = 220;

        this._errHandler.sync(this);

        _la = this._input.LA(1);

        if (_la === JSONFormulaParser.T__20) {
          this.state = 216;
          this.match(JSONFormulaParser.T__20);
          this.state = 218;

          this._errHandler.sync(this);

          _la = this._input.LA(1);

          if (_la === JSONFormulaParser.SIGNED_INT) {
            this.state = 217;
            localctx.step = this.match(JSONFormulaParser.SIGNED_INT);
          }
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionExpression",
    value: function functionExpression() {
      var localctx = new FunctionExpressionContext(this, this._ctx, this.state);
      this.enterRule(localctx, 36, JSONFormulaParser.RULE_functionExpression);
      var _la = 0; // Token type

      try {
        this.state = 237;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 17, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 222;
            this.match(JSONFormulaParser.NAME);
            this.state = 223;
            this.match(JSONFormulaParser.T__0);
            this.state = 224;
            this.functionArg();
            this.state = 229;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            while (_la === JSONFormulaParser.T__10) {
              this.state = 225;
              this.match(JSONFormulaParser.T__10);
              this.state = 226;
              this.functionArg();
              this.state = 231;

              this._errHandler.sync(this);

              _la = this._input.LA(1);
            }

            this.state = 232;
            this.match(JSONFormulaParser.T__1);
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 234;
            this.match(JSONFormulaParser.NAME);
            this.state = 235;
            this.match(JSONFormulaParser.T__0);
            this.state = 236;
            this.match(JSONFormulaParser.T__1);
            break;
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "functionArg",
    value: function functionArg() {
      var localctx = new FunctionArgContext(this, this._ctx, this.state);
      this.enterRule(localctx, 38, JSONFormulaParser.RULE_functionArg);

      try {
        this.state = 241;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case JSONFormulaParser.T__0:
          case JSONFormulaParser.T__6:
          case JSONFormulaParser.T__14:
          case JSONFormulaParser.T__16:
          case JSONFormulaParser.T__18:
          case JSONFormulaParser.T__21:
          case JSONFormulaParser.T__22:
          case JSONFormulaParser.T__23:
          case JSONFormulaParser.RAW_STRING:
          case JSONFormulaParser.JSON_CONSTANT:
          case JSONFormulaParser.NAME:
          case JSONFormulaParser.STRING:
            this.enterOuterAlt(localctx, 1);
            this.state = 239;
            this.jmesPathExpression(0);
            break;

          case JSONFormulaParser.T__5:
            this.enterOuterAlt(localctx, 2);
            this.state = 240;
            this.expressionType();
            break;

          default:
            throw new antlr4.error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "currentNode",
    value: function currentNode() {
      var localctx = new CurrentNodeContext(this, this._ctx, this.state);
      this.enterRule(localctx, 40, JSONFormulaParser.RULE_currentNode);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 243;
        this.match(JSONFormulaParser.T__22);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "expressionType",
    value: function expressionType() {
      var localctx = new ExpressionTypeContext(this, this._ctx, this.state);
      this.enterRule(localctx, 42, JSONFormulaParser.RULE_expressionType);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 245;
        this.match(JSONFormulaParser.T__5);
        this.state = 246;
        this.jmesPathExpression(0);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "literal",
    value: function literal() {
      var localctx = new LiteralContext(this, this._ctx, this.state);
      this.enterRule(localctx, 44, JSONFormulaParser.RULE_literal);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 248;
        this.match(JSONFormulaParser.T__23);
        this.state = 249;
        this.jsonValue();
        this.state = 250;
        this.match(JSONFormulaParser.T__23);
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "identifier",
    value: function identifier() {
      var localctx = new IdentifierContext(this, this._ctx, this.state);
      this.enterRule(localctx, 46, JSONFormulaParser.RULE_identifier);
      var _la = 0; // Token type

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 252;
        _la = this._input.LA(1);

        if (!((_la - 30 & ~0x1f) == 0 && (1 << _la - 30 & (1 << JSONFormulaParser.JSON_CONSTANT - 30 | 1 << JSONFormulaParser.NAME - 30 | 1 << JSONFormulaParser.STRING - 30)) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);

          this.consume();
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "jsonObject",
    value: function jsonObject() {
      var localctx = new JsonObjectContext(this, this._ctx, this.state);
      this.enterRule(localctx, 48, JSONFormulaParser.RULE_jsonObject);
      var _la = 0; // Token type

      try {
        this.state = 267;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 20, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 254;
            this.match(JSONFormulaParser.T__18);
            this.state = 255;
            this.jsonObjectPair();
            this.state = 260;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            while (_la === JSONFormulaParser.T__10) {
              this.state = 256;
              this.match(JSONFormulaParser.T__10);
              this.state = 257;
              this.jsonObjectPair();
              this.state = 262;

              this._errHandler.sync(this);

              _la = this._input.LA(1);
            }

            this.state = 263;
            this.match(JSONFormulaParser.T__19);
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 265;
            this.match(JSONFormulaParser.T__18);
            this.state = 266;
            this.match(JSONFormulaParser.T__19);
            break;
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "jsonObjectPair",
    value: function jsonObjectPair() {
      var localctx = new JsonObjectPairContext(this, this._ctx, this.state);
      this.enterRule(localctx, 50, JSONFormulaParser.RULE_jsonObjectPair);

      try {
        this.enterOuterAlt(localctx, 1);
        this.state = 269;
        this.match(JSONFormulaParser.STRING);
        this.state = 270;
        this.match(JSONFormulaParser.T__20);
        this.state = 271;
        this.jsonValue();
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "jsonArray",
    value: function jsonArray() {
      var localctx = new JsonArrayContext(this, this._ctx, this.state);
      this.enterRule(localctx, 52, JSONFormulaParser.RULE_jsonArray);
      var _la = 0; // Token type

      try {
        this.state = 286;

        this._errHandler.sync(this);

        var la_ = this._interp.adaptivePredict(this._input, 22, this._ctx);

        switch (la_) {
          case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 273;
            this.match(JSONFormulaParser.T__16);
            this.state = 274;
            this.jsonValue();
            this.state = 279;

            this._errHandler.sync(this);

            _la = this._input.LA(1);

            while (_la === JSONFormulaParser.T__10) {
              this.state = 275;
              this.match(JSONFormulaParser.T__10);
              this.state = 276;
              this.jsonValue();
              this.state = 281;

              this._errHandler.sync(this);

              _la = this._input.LA(1);
            }

            this.state = 282;
            this.match(JSONFormulaParser.T__17);
            break;

          case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 284;
            this.match(JSONFormulaParser.T__16);
            this.state = 285;
            this.match(JSONFormulaParser.T__17);
            break;
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }, {
    key: "jsonValue",
    value: function jsonValue() {
      var localctx = new JsonValueContext(this, this._ctx, this.state);
      this.enterRule(localctx, 54, JSONFormulaParser.RULE_jsonValue);
      var _la = 0; // Token type

      try {
        this.state = 293;

        this._errHandler.sync(this);

        switch (this._input.LA(1)) {
          case JSONFormulaParser.STRING:
            localctx = new JsonStringValueContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 288;
            this.match(JSONFormulaParser.STRING);
            break;

          case JSONFormulaParser.SIGNED_INT:
          case JSONFormulaParser.REAL_OR_EXPONENT_NUMBER:
            localctx = new JsonNumberValueContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 289;
            _la = this._input.LA(1);

            if (!(_la === JSONFormulaParser.SIGNED_INT || _la === JSONFormulaParser.REAL_OR_EXPONENT_NUMBER)) {
              this._errHandler.recoverInline(this);
            } else {
              this._errHandler.reportMatch(this);

              this.consume();
            }

            break;

          case JSONFormulaParser.T__18:
            localctx = new JsonObjectValueContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 290;
            this.jsonObject();
            break;

          case JSONFormulaParser.T__16:
            localctx = new JsonArrayValueContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 291;
            this.jsonArray();
            break;

          case JSONFormulaParser.JSON_CONSTANT:
            localctx = new JsonConstantValueContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 292;
            this.match(JSONFormulaParser.JSON_CONSTANT);
            break;

          default:
            throw new antlr4.error.NoViableAltException(this);
        }
      } catch (re) {
        if (re instanceof antlr4.error.RecognitionException) {
          localctx.exception = re;

          this._errHandler.reportError(this, re);

          this._errHandler.recover(this, re);
        } else {
          throw re;
        }
      } finally {
        this.exitRule();
      }

      return localctx;
    }
  }]);

  return JSONFormulaParser;
}(antlr4.Parser);

JSONFormulaParser.grammarFileName = "JSONFormula.g4";
JSONFormulaParser.literalNames = [null, "'('", "')'", "'+'", "'-'", "'<>'", "'&'", "'*'", "'/'", "'^'", "'%'", "','", "'.'", "'&&'", "'||'", "'!'", "'|'", "'['", "']'", "'{'", "'}'", "':'", "'[?'", "'@'", "'`'"];
JSONFormulaParser.symbolicNames = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "SIGNED_INT", "NUMBER", "FUNCTIONS", "COMPARATOR", "RAW_STRING", "JSON_CONSTANT", "NAME", "STRING", "REAL_OR_EXPONENT_NUMBER", "WS"];
JSONFormulaParser.ruleNames = ["formula", "expression", "unary_op", "binary_op", "postfix_op", "function_call", "parameter", "nonempty_expr_list", "expression_list", "parm_separator", "jmesPathExpression", "chainedExpression", "wildcard", "multiSelectList", "multiSelectHash", "keyvalExpr", "bracketSpecifier", "slice", "functionExpression", "functionArg", "currentNode", "expressionType", "literal", "identifier", "jsonObject", "jsonObjectPair", "jsonArray", "jsonValue"];

JSONFormulaParser.EOF = antlr4.Token.EOF;
JSONFormulaParser.T__0 = 1;
JSONFormulaParser.T__1 = 2;
JSONFormulaParser.T__2 = 3;
JSONFormulaParser.T__3 = 4;
JSONFormulaParser.T__4 = 5;
JSONFormulaParser.T__5 = 6;
JSONFormulaParser.T__6 = 7;
JSONFormulaParser.T__7 = 8;
JSONFormulaParser.T__8 = 9;
JSONFormulaParser.T__9 = 10;
JSONFormulaParser.T__10 = 11;
JSONFormulaParser.T__11 = 12;
JSONFormulaParser.T__12 = 13;
JSONFormulaParser.T__13 = 14;
JSONFormulaParser.T__14 = 15;
JSONFormulaParser.T__15 = 16;
JSONFormulaParser.T__16 = 17;
JSONFormulaParser.T__17 = 18;
JSONFormulaParser.T__18 = 19;
JSONFormulaParser.T__19 = 20;
JSONFormulaParser.T__20 = 21;
JSONFormulaParser.T__21 = 22;
JSONFormulaParser.T__22 = 23;
JSONFormulaParser.T__23 = 24;
JSONFormulaParser.SIGNED_INT = 25;
JSONFormulaParser.NUMBER = 26;
JSONFormulaParser.FUNCTIONS = 27;
JSONFormulaParser.COMPARATOR = 28;
JSONFormulaParser.RAW_STRING = 29;
JSONFormulaParser.JSON_CONSTANT = 30;
JSONFormulaParser.NAME = 31;
JSONFormulaParser.STRING = 32;
JSONFormulaParser.REAL_OR_EXPONENT_NUMBER = 33;
JSONFormulaParser.WS = 34;
JSONFormulaParser.RULE_formula = 0;
JSONFormulaParser.RULE_expression = 1;
JSONFormulaParser.RULE_unary_op = 2;
JSONFormulaParser.RULE_binary_op = 3;
JSONFormulaParser.RULE_postfix_op = 4;
JSONFormulaParser.RULE_function_call = 5;
JSONFormulaParser.RULE_parameter = 6;
JSONFormulaParser.RULE_nonempty_expr_list = 7;
JSONFormulaParser.RULE_expression_list = 8;
JSONFormulaParser.RULE_parm_separator = 9;
JSONFormulaParser.RULE_jmesPathExpression = 10;
JSONFormulaParser.RULE_chainedExpression = 11;
JSONFormulaParser.RULE_wildcard = 12;
JSONFormulaParser.RULE_multiSelectList = 13;
JSONFormulaParser.RULE_multiSelectHash = 14;
JSONFormulaParser.RULE_keyvalExpr = 15;
JSONFormulaParser.RULE_bracketSpecifier = 16;
JSONFormulaParser.RULE_slice = 17;
JSONFormulaParser.RULE_functionExpression = 18;
JSONFormulaParser.RULE_functionArg = 19;
JSONFormulaParser.RULE_currentNode = 20;
JSONFormulaParser.RULE_expressionType = 21;
JSONFormulaParser.RULE_literal = 22;
JSONFormulaParser.RULE_identifier = 23;
JSONFormulaParser.RULE_jsonObject = 24;
JSONFormulaParser.RULE_jsonObjectPair = 25;
JSONFormulaParser.RULE_jsonArray = 26;
JSONFormulaParser.RULE_jsonValue = 27;

var FormulaContext = /*#__PURE__*/function (_antlr4$ParserRuleCon) {
  JSONFormulaParser_inherits(FormulaContext, _antlr4$ParserRuleCon);

  var _super2 = JSONFormulaParser_createSuper(FormulaContext);

  function FormulaContext(parser, parent, invokingState) {
    var _this2;

    JSONFormulaParser_classCallCheck(this, FormulaContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this2 = _super2.call(this, parent, invokingState);
    _this2.parser = parser;
    _this2.ruleIndex = JSONFormulaParser.RULE_formula;
    return _this2;
  }

  JSONFormulaParser_createClass(FormulaContext, [{
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "EOF",
    value: function EOF() {
      return this.getToken(JSONFormulaParser.EOF, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterFormula(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitFormula(this);
      }
    }
  }]);

  return FormulaContext;
}(antlr4.ParserRuleContext);

var ExpressionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon2) {
  JSONFormulaParser_inherits(ExpressionContext, _antlr4$ParserRuleCon2);

  var _super3 = JSONFormulaParser_createSuper(ExpressionContext);

  function ExpressionContext(parser, parent, invokingState) {
    var _this3;

    JSONFormulaParser_classCallCheck(this, ExpressionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this3 = _super3.call(this, parent, invokingState);
    _this3.parser = parser;
    _this3.ruleIndex = JSONFormulaParser.RULE_expression;
    return _this3;
  }

  JSONFormulaParser_createClass(ExpressionContext, [{
    key: "copyFrom",
    value: function copyFrom(ctx) {
      _get(JSONFormulaParser_getPrototypeOf(ExpressionContext.prototype), "copyFrom", this).call(this, ctx);
    }
  }]);

  return ExpressionContext;
}(antlr4.ParserRuleContext);

var BinaryExpressionContext = /*#__PURE__*/function (_ExpressionContext) {
  JSONFormulaParser_inherits(BinaryExpressionContext, _ExpressionContext);

  var _super4 = JSONFormulaParser_createSuper(BinaryExpressionContext);

  function BinaryExpressionContext(parser, ctx) {
    var _thisSuper, _this4;

    JSONFormulaParser_classCallCheck(this, BinaryExpressionContext);

    _this4 = _super4.call(this, parser);

    _this4.expression = function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(ExpressionContext);
      } else {
        return this.getTypedRuleContext(ExpressionContext, i);
      }
    };

    _get((_thisSuper = JSONFormulaParser_assertThisInitialized(_this4), JSONFormulaParser_getPrototypeOf(BinaryExpressionContext.prototype)), "copyFrom", _thisSuper).call(_thisSuper, ctx);

    return _this4;
  }

  JSONFormulaParser_createClass(BinaryExpressionContext, [{
    key: "binary_op",
    value: function binary_op() {
      return this.getTypedRuleContext(Binary_opContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterBinaryExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitBinaryExpression(this);
      }
    }
  }]);

  return BinaryExpressionContext;
}(ExpressionContext);

JSONFormulaParser.BinaryExpressionContext = BinaryExpressionContext;

var JmesPathContext = /*#__PURE__*/function (_ExpressionContext2) {
  JSONFormulaParser_inherits(JmesPathContext, _ExpressionContext2);

  var _super5 = JSONFormulaParser_createSuper(JmesPathContext);

  function JmesPathContext(parser, ctx) {
    var _thisSuper2, _this5;

    JSONFormulaParser_classCallCheck(this, JmesPathContext);

    _this5 = _super5.call(this, parser);

    _get((_thisSuper2 = JSONFormulaParser_assertThisInitialized(_this5), JSONFormulaParser_getPrototypeOf(JmesPathContext.prototype)), "copyFrom", _thisSuper2).call(_thisSuper2, ctx);

    return _this5;
  }

  JSONFormulaParser_createClass(JmesPathContext, [{
    key: "jmesPathExpression",
    value: function jmesPathExpression() {
      return this.getTypedRuleContext(JmesPathExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterJmesPath(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitJmesPath(this);
      }
    }
  }]);

  return JmesPathContext;
}(ExpressionContext);

JSONFormulaParser.JmesPathContext = JmesPathContext;

var TopLevelStringContext = /*#__PURE__*/function (_ExpressionContext3) {
  JSONFormulaParser_inherits(TopLevelStringContext, _ExpressionContext3);

  var _super6 = JSONFormulaParser_createSuper(TopLevelStringContext);

  function TopLevelStringContext(parser, ctx) {
    var _thisSuper3, _this6;

    JSONFormulaParser_classCallCheck(this, TopLevelStringContext);

    _this6 = _super6.call(this, parser);

    _get((_thisSuper3 = JSONFormulaParser_assertThisInitialized(_this6), JSONFormulaParser_getPrototypeOf(TopLevelStringContext.prototype)), "copyFrom", _thisSuper3).call(_thisSuper3, ctx);

    return _this6;
  }

  JSONFormulaParser_createClass(TopLevelStringContext, [{
    key: "RAW_STRING",
    value: function RAW_STRING() {
      return this.getToken(JSONFormulaParser.RAW_STRING, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterTopLevelString(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitTopLevelString(this);
      }
    }
  }]);

  return TopLevelStringContext;
}(ExpressionContext);

JSONFormulaParser.TopLevelStringContext = TopLevelStringContext;

var TopLevelIntContext = /*#__PURE__*/function (_ExpressionContext4) {
  JSONFormulaParser_inherits(TopLevelIntContext, _ExpressionContext4);

  var _super7 = JSONFormulaParser_createSuper(TopLevelIntContext);

  function TopLevelIntContext(parser, ctx) {
    var _thisSuper4, _this7;

    JSONFormulaParser_classCallCheck(this, TopLevelIntContext);

    _this7 = _super7.call(this, parser);

    _get((_thisSuper4 = JSONFormulaParser_assertThisInitialized(_this7), JSONFormulaParser_getPrototypeOf(TopLevelIntContext.prototype)), "copyFrom", _thisSuper4).call(_thisSuper4, ctx);

    return _this7;
  }

  JSONFormulaParser_createClass(TopLevelIntContext, [{
    key: "SIGNED_INT",
    value: function SIGNED_INT() {
      return this.getToken(JSONFormulaParser.SIGNED_INT, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterTopLevelInt(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitTopLevelInt(this);
      }
    }
  }]);

  return TopLevelIntContext;
}(ExpressionContext);

JSONFormulaParser.TopLevelIntContext = TopLevelIntContext;

var FunctionCallContext = /*#__PURE__*/function (_ExpressionContext5) {
  JSONFormulaParser_inherits(FunctionCallContext, _ExpressionContext5);

  var _super8 = JSONFormulaParser_createSuper(FunctionCallContext);

  function FunctionCallContext(parser, ctx) {
    var _thisSuper5, _this8;

    JSONFormulaParser_classCallCheck(this, FunctionCallContext);

    _this8 = _super8.call(this, parser);

    _get((_thisSuper5 = JSONFormulaParser_assertThisInitialized(_this8), JSONFormulaParser_getPrototypeOf(FunctionCallContext.prototype)), "copyFrom", _thisSuper5).call(_thisSuper5, ctx);

    return _this8;
  }

  JSONFormulaParser_createClass(FunctionCallContext, [{
    key: "function_call",
    value: function function_call() {
      return this.getTypedRuleContext(Function_callContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterFunctionCall(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitFunctionCall(this);
      }
    }
  }]);

  return FunctionCallContext;
}(ExpressionContext);

JSONFormulaParser.FunctionCallContext = FunctionCallContext;

var BraceExpressionContext = /*#__PURE__*/function (_ExpressionContext6) {
  JSONFormulaParser_inherits(BraceExpressionContext, _ExpressionContext6);

  var _super9 = JSONFormulaParser_createSuper(BraceExpressionContext);

  function BraceExpressionContext(parser, ctx) {
    var _thisSuper6, _this9;

    JSONFormulaParser_classCallCheck(this, BraceExpressionContext);

    _this9 = _super9.call(this, parser);

    _get((_thisSuper6 = JSONFormulaParser_assertThisInitialized(_this9), JSONFormulaParser_getPrototypeOf(BraceExpressionContext.prototype)), "copyFrom", _thisSuper6).call(_thisSuper6, ctx);

    return _this9;
  }

  JSONFormulaParser_createClass(BraceExpressionContext, [{
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterBraceExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitBraceExpression(this);
      }
    }
  }]);

  return BraceExpressionContext;
}(ExpressionContext);

JSONFormulaParser.BraceExpressionContext = BraceExpressionContext;

var PostfixContext = /*#__PURE__*/function (_ExpressionContext7) {
  JSONFormulaParser_inherits(PostfixContext, _ExpressionContext7);

  var _super10 = JSONFormulaParser_createSuper(PostfixContext);

  function PostfixContext(parser, ctx) {
    var _thisSuper7, _this10;

    JSONFormulaParser_classCallCheck(this, PostfixContext);

    _this10 = _super10.call(this, parser);

    _get((_thisSuper7 = JSONFormulaParser_assertThisInitialized(_this10), JSONFormulaParser_getPrototypeOf(PostfixContext.prototype)), "copyFrom", _thisSuper7).call(_thisSuper7, ctx);

    return _this10;
  }

  JSONFormulaParser_createClass(PostfixContext, [{
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "postfix_op",
    value: function postfix_op() {
      return this.getTypedRuleContext(Postfix_opContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterPostfix(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitPostfix(this);
      }
    }
  }]);

  return PostfixContext;
}(ExpressionContext);

JSONFormulaParser.PostfixContext = PostfixContext;

var UnaryExpressionContext = /*#__PURE__*/function (_ExpressionContext8) {
  JSONFormulaParser_inherits(UnaryExpressionContext, _ExpressionContext8);

  var _super11 = JSONFormulaParser_createSuper(UnaryExpressionContext);

  function UnaryExpressionContext(parser, ctx) {
    var _thisSuper8, _this11;

    JSONFormulaParser_classCallCheck(this, UnaryExpressionContext);

    _this11 = _super11.call(this, parser);

    _get((_thisSuper8 = JSONFormulaParser_assertThisInitialized(_this11), JSONFormulaParser_getPrototypeOf(UnaryExpressionContext.prototype)), "copyFrom", _thisSuper8).call(_thisSuper8, ctx);

    return _this11;
  }

  JSONFormulaParser_createClass(UnaryExpressionContext, [{
    key: "unary_op",
    value: function unary_op() {
      return this.getTypedRuleContext(Unary_opContext, 0);
    }
  }, {
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterUnaryExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitUnaryExpression(this);
      }
    }
  }]);

  return UnaryExpressionContext;
}(ExpressionContext);

JSONFormulaParser.UnaryExpressionContext = UnaryExpressionContext;

var TopLevelNumberContext = /*#__PURE__*/function (_ExpressionContext9) {
  JSONFormulaParser_inherits(TopLevelNumberContext, _ExpressionContext9);

  var _super12 = JSONFormulaParser_createSuper(TopLevelNumberContext);

  function TopLevelNumberContext(parser, ctx) {
    var _thisSuper9, _this12;

    JSONFormulaParser_classCallCheck(this, TopLevelNumberContext);

    _this12 = _super12.call(this, parser);

    _get((_thisSuper9 = JSONFormulaParser_assertThisInitialized(_this12), JSONFormulaParser_getPrototypeOf(TopLevelNumberContext.prototype)), "copyFrom", _thisSuper9).call(_thisSuper9, ctx);

    return _this12;
  }

  JSONFormulaParser_createClass(TopLevelNumberContext, [{
    key: "NUMBER",
    value: function NUMBER() {
      return this.getToken(JSONFormulaParser.NUMBER, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterTopLevelNumber(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitTopLevelNumber(this);
      }
    }
  }]);

  return TopLevelNumberContext;
}(ExpressionContext);

JSONFormulaParser.TopLevelNumberContext = TopLevelNumberContext;

var Unary_opContext = /*#__PURE__*/function (_antlr4$ParserRuleCon3) {
  JSONFormulaParser_inherits(Unary_opContext, _antlr4$ParserRuleCon3);

  var _super13 = JSONFormulaParser_createSuper(Unary_opContext);

  function Unary_opContext(parser, parent, invokingState) {
    var _this13;

    JSONFormulaParser_classCallCheck(this, Unary_opContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this13 = _super13.call(this, parent, invokingState);
    _this13.parser = parser;
    _this13.ruleIndex = JSONFormulaParser.RULE_unary_op;
    return _this13;
  }

  JSONFormulaParser_createClass(Unary_opContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterUnary_op(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitUnary_op(this);
      }
    }
  }]);

  return Unary_opContext;
}(antlr4.ParserRuleContext);

var Binary_opContext = /*#__PURE__*/function (_antlr4$ParserRuleCon4) {
  JSONFormulaParser_inherits(Binary_opContext, _antlr4$ParserRuleCon4);

  var _super14 = JSONFormulaParser_createSuper(Binary_opContext);

  function Binary_opContext(parser, parent, invokingState) {
    var _this14;

    JSONFormulaParser_classCallCheck(this, Binary_opContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this14 = _super14.call(this, parent, invokingState);
    _this14.parser = parser;
    _this14.ruleIndex = JSONFormulaParser.RULE_binary_op;
    return _this14;
  }

  JSONFormulaParser_createClass(Binary_opContext, [{
    key: "COMPARATOR",
    value: function COMPARATOR() {
      return this.getToken(JSONFormulaParser.COMPARATOR, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterBinary_op(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitBinary_op(this);
      }
    }
  }]);

  return Binary_opContext;
}(antlr4.ParserRuleContext);

var Postfix_opContext = /*#__PURE__*/function (_antlr4$ParserRuleCon5) {
  JSONFormulaParser_inherits(Postfix_opContext, _antlr4$ParserRuleCon5);

  var _super15 = JSONFormulaParser_createSuper(Postfix_opContext);

  function Postfix_opContext(parser, parent, invokingState) {
    var _this15;

    JSONFormulaParser_classCallCheck(this, Postfix_opContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this15 = _super15.call(this, parent, invokingState);
    _this15.parser = parser;
    _this15.ruleIndex = JSONFormulaParser.RULE_postfix_op;
    return _this15;
  }

  JSONFormulaParser_createClass(Postfix_opContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterPostfix_op(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitPostfix_op(this);
      }
    }
  }]);

  return Postfix_opContext;
}(antlr4.ParserRuleContext);

var Function_callContext = /*#__PURE__*/function (_antlr4$ParserRuleCon6) {
  JSONFormulaParser_inherits(Function_callContext, _antlr4$ParserRuleCon6);

  var _super16 = JSONFormulaParser_createSuper(Function_callContext);

  function Function_callContext(parser, parent, invokingState) {
    var _this16;

    JSONFormulaParser_classCallCheck(this, Function_callContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this16 = _super16.call(this, parent, invokingState);
    _this16.parser = parser;
    _this16.ruleIndex = JSONFormulaParser.RULE_function_call;
    return _this16;
  }

  JSONFormulaParser_createClass(Function_callContext, [{
    key: "FUNCTIONS",
    value: function FUNCTIONS() {
      return this.getToken(JSONFormulaParser.FUNCTIONS, 0);
    }
  }, {
    key: "expression_list",
    value: function expression_list() {
      return this.getTypedRuleContext(Expression_listContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterFunction_call(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitFunction_call(this);
      }
    }
  }]);

  return Function_callContext;
}(antlr4.ParserRuleContext);

var ParameterContext = /*#__PURE__*/function (_antlr4$ParserRuleCon7) {
  JSONFormulaParser_inherits(ParameterContext, _antlr4$ParserRuleCon7);

  var _super17 = JSONFormulaParser_createSuper(ParameterContext);

  function ParameterContext(parser, parent, invokingState) {
    var _this17;

    JSONFormulaParser_classCallCheck(this, ParameterContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this17 = _super17.call(this, parent, invokingState);
    _this17.parser = parser;
    _this17.ruleIndex = JSONFormulaParser.RULE_parameter;
    return _this17;
  }

  JSONFormulaParser_createClass(ParameterContext, [{
    key: "expression",
    value: function expression() {
      return this.getTypedRuleContext(ExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterParameter(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitParameter(this);
      }
    }
  }]);

  return ParameterContext;
}(antlr4.ParserRuleContext);

var Nonempty_expr_listContext = /*#__PURE__*/function (_antlr4$ParserRuleCon8) {
  JSONFormulaParser_inherits(Nonempty_expr_listContext, _antlr4$ParserRuleCon8);

  var _super18 = JSONFormulaParser_createSuper(Nonempty_expr_listContext);

  function Nonempty_expr_listContext(parser, parent, invokingState) {
    var _this18;

    JSONFormulaParser_classCallCheck(this, Nonempty_expr_listContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this18 = _super18.call(this, parent, invokingState);
    _this18.parser = parser;
    _this18.ruleIndex = JSONFormulaParser.RULE_nonempty_expr_list;
    return _this18;
  }

  JSONFormulaParser_createClass(Nonempty_expr_listContext, [{
    key: "parameter",
    value: function parameter() {
      return this.getTypedRuleContext(ParameterContext, 0);
    }
  }, {
    key: "nonempty_expr_list",
    value: function nonempty_expr_list() {
      return this.getTypedRuleContext(Nonempty_expr_listContext, 0);
    }
  }, {
    key: "parm_separator",
    value: function parm_separator() {
      return this.getTypedRuleContext(Parm_separatorContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterNonempty_expr_list(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitNonempty_expr_list(this);
      }
    }
  }]);

  return Nonempty_expr_listContext;
}(antlr4.ParserRuleContext);

var Expression_listContext = /*#__PURE__*/function (_antlr4$ParserRuleCon9) {
  JSONFormulaParser_inherits(Expression_listContext, _antlr4$ParserRuleCon9);

  var _super19 = JSONFormulaParser_createSuper(Expression_listContext);

  function Expression_listContext(parser, parent, invokingState) {
    var _this19;

    JSONFormulaParser_classCallCheck(this, Expression_listContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this19 = _super19.call(this, parent, invokingState);
    _this19.parser = parser;
    _this19.ruleIndex = JSONFormulaParser.RULE_expression_list;
    return _this19;
  }

  JSONFormulaParser_createClass(Expression_listContext, [{
    key: "nonempty_expr_list",
    value: function nonempty_expr_list() {
      return this.getTypedRuleContext(Nonempty_expr_listContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterExpression_list(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitExpression_list(this);
      }
    }
  }]);

  return Expression_listContext;
}(antlr4.ParserRuleContext);

var Parm_separatorContext = /*#__PURE__*/function (_antlr4$ParserRuleCon10) {
  JSONFormulaParser_inherits(Parm_separatorContext, _antlr4$ParserRuleCon10);

  var _super20 = JSONFormulaParser_createSuper(Parm_separatorContext);

  function Parm_separatorContext(parser, parent, invokingState) {
    var _this20;

    JSONFormulaParser_classCallCheck(this, Parm_separatorContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this20 = _super20.call(this, parent, invokingState);
    _this20.parser = parser;
    _this20.ruleIndex = JSONFormulaParser.RULE_parm_separator;
    return _this20;
  }

  JSONFormulaParser_createClass(Parm_separatorContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterParm_separator(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitParm_separator(this);
      }
    }
  }]);

  return Parm_separatorContext;
}(antlr4.ParserRuleContext);

var JmesPathExpressionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon11) {
  JSONFormulaParser_inherits(JmesPathExpressionContext, _antlr4$ParserRuleCon11);

  var _super21 = JSONFormulaParser_createSuper(JmesPathExpressionContext);

  function JmesPathExpressionContext(parser, parent, invokingState) {
    var _this21;

    JSONFormulaParser_classCallCheck(this, JmesPathExpressionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this21 = _super21.call(this, parent, invokingState);
    _this21.parser = parser;
    _this21.ruleIndex = JSONFormulaParser.RULE_jmesPathExpression;
    return _this21;
  }

  JSONFormulaParser_createClass(JmesPathExpressionContext, [{
    key: "copyFrom",
    value: function copyFrom(ctx) {
      _get(JSONFormulaParser_getPrototypeOf(JmesPathExpressionContext.prototype), "copyFrom", this).call(this, ctx);
    }
  }]);

  return JmesPathExpressionContext;
}(antlr4.ParserRuleContext);

var PipeExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo) {
  JSONFormulaParser_inherits(PipeExpressionContext, _JmesPathExpressionCo);

  var _super22 = JSONFormulaParser_createSuper(PipeExpressionContext);

  function PipeExpressionContext(parser, ctx) {
    var _thisSuper10, _this22;

    JSONFormulaParser_classCallCheck(this, PipeExpressionContext);

    _this22 = _super22.call(this, parser);

    _this22.jmesPathExpression = function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(JmesPathExpressionContext);
      } else {
        return this.getTypedRuleContext(JmesPathExpressionContext, i);
      }
    };

    _get((_thisSuper10 = JSONFormulaParser_assertThisInitialized(_this22), JSONFormulaParser_getPrototypeOf(PipeExpressionContext.prototype)), "copyFrom", _thisSuper10).call(_thisSuper10, ctx);

    return _this22;
  }

  JSONFormulaParser_createClass(PipeExpressionContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterPipeExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitPipeExpression(this);
      }
    }
  }]);

  return PipeExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.PipeExpressionContext = PipeExpressionContext;

var IdentifierExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo2) {
  JSONFormulaParser_inherits(IdentifierExpressionContext, _JmesPathExpressionCo2);

  var _super23 = JSONFormulaParser_createSuper(IdentifierExpressionContext);

  function IdentifierExpressionContext(parser, ctx) {
    var _thisSuper11, _this23;

    JSONFormulaParser_classCallCheck(this, IdentifierExpressionContext);

    _this23 = _super23.call(this, parser);

    _get((_thisSuper11 = JSONFormulaParser_assertThisInitialized(_this23), JSONFormulaParser_getPrototypeOf(IdentifierExpressionContext.prototype)), "copyFrom", _thisSuper11).call(_thisSuper11, ctx);

    return _this23;
  }

  JSONFormulaParser_createClass(IdentifierExpressionContext, [{
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterIdentifierExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitIdentifierExpression(this);
      }
    }
  }]);

  return IdentifierExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.IdentifierExpressionContext = IdentifierExpressionContext;

var NotExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo3) {
  JSONFormulaParser_inherits(NotExpressionContext, _JmesPathExpressionCo3);

  var _super24 = JSONFormulaParser_createSuper(NotExpressionContext);

  function NotExpressionContext(parser, ctx) {
    var _thisSuper12, _this24;

    JSONFormulaParser_classCallCheck(this, NotExpressionContext);

    _this24 = _super24.call(this, parser);

    _get((_thisSuper12 = JSONFormulaParser_assertThisInitialized(_this24), JSONFormulaParser_getPrototypeOf(NotExpressionContext.prototype)), "copyFrom", _thisSuper12).call(_thisSuper12, ctx);

    return _this24;
  }

  JSONFormulaParser_createClass(NotExpressionContext, [{
    key: "jmesPathExpression",
    value: function jmesPathExpression() {
      return this.getTypedRuleContext(JmesPathExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterNotExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitNotExpression(this);
      }
    }
  }]);

  return NotExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.NotExpressionContext = NotExpressionContext;

var RawStringExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo4) {
  JSONFormulaParser_inherits(RawStringExpressionContext, _JmesPathExpressionCo4);

  var _super25 = JSONFormulaParser_createSuper(RawStringExpressionContext);

  function RawStringExpressionContext(parser, ctx) {
    var _thisSuper13, _this25;

    JSONFormulaParser_classCallCheck(this, RawStringExpressionContext);

    _this25 = _super25.call(this, parser);

    _get((_thisSuper13 = JSONFormulaParser_assertThisInitialized(_this25), JSONFormulaParser_getPrototypeOf(RawStringExpressionContext.prototype)), "copyFrom", _thisSuper13).call(_thisSuper13, ctx);

    return _this25;
  }

  JSONFormulaParser_createClass(RawStringExpressionContext, [{
    key: "RAW_STRING",
    value: function RAW_STRING() {
      return this.getToken(JSONFormulaParser.RAW_STRING, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterRawStringExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitRawStringExpression(this);
      }
    }
  }]);

  return RawStringExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.RawStringExpressionContext = RawStringExpressionContext;

var ComparisonExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo5) {
  JSONFormulaParser_inherits(ComparisonExpressionContext, _JmesPathExpressionCo5);

  var _super26 = JSONFormulaParser_createSuper(ComparisonExpressionContext);

  function ComparisonExpressionContext(parser, ctx) {
    var _thisSuper14, _this26;

    JSONFormulaParser_classCallCheck(this, ComparisonExpressionContext);

    _this26 = _super26.call(this, parser);

    _this26.jmesPathExpression = function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(JmesPathExpressionContext);
      } else {
        return this.getTypedRuleContext(JmesPathExpressionContext, i);
      }
    };

    _get((_thisSuper14 = JSONFormulaParser_assertThisInitialized(_this26), JSONFormulaParser_getPrototypeOf(ComparisonExpressionContext.prototype)), "copyFrom", _thisSuper14).call(_thisSuper14, ctx);

    return _this26;
  }

  JSONFormulaParser_createClass(ComparisonExpressionContext, [{
    key: "COMPARATOR",
    value: function COMPARATOR() {
      return this.getToken(JSONFormulaParser.COMPARATOR, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterComparisonExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitComparisonExpression(this);
      }
    }
  }]);

  return ComparisonExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.ComparisonExpressionContext = ComparisonExpressionContext;

var ParenExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo6) {
  JSONFormulaParser_inherits(ParenExpressionContext, _JmesPathExpressionCo6);

  var _super27 = JSONFormulaParser_createSuper(ParenExpressionContext);

  function ParenExpressionContext(parser, ctx) {
    var _thisSuper15, _this27;

    JSONFormulaParser_classCallCheck(this, ParenExpressionContext);

    _this27 = _super27.call(this, parser);

    _get((_thisSuper15 = JSONFormulaParser_assertThisInitialized(_this27), JSONFormulaParser_getPrototypeOf(ParenExpressionContext.prototype)), "copyFrom", _thisSuper15).call(_thisSuper15, ctx);

    return _this27;
  }

  JSONFormulaParser_createClass(ParenExpressionContext, [{
    key: "jmesPathExpression",
    value: function jmesPathExpression() {
      return this.getTypedRuleContext(JmesPathExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterParenExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitParenExpression(this);
      }
    }
  }]);

  return ParenExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.ParenExpressionContext = ParenExpressionContext;

var BracketExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo7) {
  JSONFormulaParser_inherits(BracketExpressionContext, _JmesPathExpressionCo7);

  var _super28 = JSONFormulaParser_createSuper(BracketExpressionContext);

  function BracketExpressionContext(parser, ctx) {
    var _thisSuper16, _this28;

    JSONFormulaParser_classCallCheck(this, BracketExpressionContext);

    _this28 = _super28.call(this, parser);

    _get((_thisSuper16 = JSONFormulaParser_assertThisInitialized(_this28), JSONFormulaParser_getPrototypeOf(BracketExpressionContext.prototype)), "copyFrom", _thisSuper16).call(_thisSuper16, ctx);

    return _this28;
  }

  JSONFormulaParser_createClass(BracketExpressionContext, [{
    key: "bracketSpecifier",
    value: function bracketSpecifier() {
      return this.getTypedRuleContext(BracketSpecifierContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterBracketExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitBracketExpression(this);
      }
    }
  }]);

  return BracketExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.BracketExpressionContext = BracketExpressionContext;

var OrExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo8) {
  JSONFormulaParser_inherits(OrExpressionContext, _JmesPathExpressionCo8);

  var _super29 = JSONFormulaParser_createSuper(OrExpressionContext);

  function OrExpressionContext(parser, ctx) {
    var _thisSuper17, _this29;

    JSONFormulaParser_classCallCheck(this, OrExpressionContext);

    _this29 = _super29.call(this, parser);

    _this29.jmesPathExpression = function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(JmesPathExpressionContext);
      } else {
        return this.getTypedRuleContext(JmesPathExpressionContext, i);
      }
    };

    _get((_thisSuper17 = JSONFormulaParser_assertThisInitialized(_this29), JSONFormulaParser_getPrototypeOf(OrExpressionContext.prototype)), "copyFrom", _thisSuper17).call(_thisSuper17, ctx);

    return _this29;
  }

  JSONFormulaParser_createClass(OrExpressionContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterOrExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitOrExpression(this);
      }
    }
  }]);

  return OrExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.OrExpressionContext = OrExpressionContext;

var CurrentNodeExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo9) {
  JSONFormulaParser_inherits(CurrentNodeExpressionContext, _JmesPathExpressionCo9);

  var _super30 = JSONFormulaParser_createSuper(CurrentNodeExpressionContext);

  function CurrentNodeExpressionContext(parser, ctx) {
    var _thisSuper18, _this30;

    JSONFormulaParser_classCallCheck(this, CurrentNodeExpressionContext);

    _this30 = _super30.call(this, parser);

    _get((_thisSuper18 = JSONFormulaParser_assertThisInitialized(_this30), JSONFormulaParser_getPrototypeOf(CurrentNodeExpressionContext.prototype)), "copyFrom", _thisSuper18).call(_thisSuper18, ctx);

    return _this30;
  }

  JSONFormulaParser_createClass(CurrentNodeExpressionContext, [{
    key: "currentNode",
    value: function currentNode() {
      return this.getTypedRuleContext(CurrentNodeContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterCurrentNodeExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitCurrentNodeExpression(this);
      }
    }
  }]);

  return CurrentNodeExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.CurrentNodeExpressionContext = CurrentNodeExpressionContext;

var ChainExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo10) {
  JSONFormulaParser_inherits(ChainExpressionContext, _JmesPathExpressionCo10);

  var _super31 = JSONFormulaParser_createSuper(ChainExpressionContext);

  function ChainExpressionContext(parser, ctx) {
    var _thisSuper19, _this31;

    JSONFormulaParser_classCallCheck(this, ChainExpressionContext);

    _this31 = _super31.call(this, parser);

    _get((_thisSuper19 = JSONFormulaParser_assertThisInitialized(_this31), JSONFormulaParser_getPrototypeOf(ChainExpressionContext.prototype)), "copyFrom", _thisSuper19).call(_thisSuper19, ctx);

    return _this31;
  }

  JSONFormulaParser_createClass(ChainExpressionContext, [{
    key: "jmesPathExpression",
    value: function jmesPathExpression() {
      return this.getTypedRuleContext(JmesPathExpressionContext, 0);
    }
  }, {
    key: "chainedExpression",
    value: function chainedExpression() {
      return this.getTypedRuleContext(ChainedExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterChainExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitChainExpression(this);
      }
    }
  }]);

  return ChainExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.ChainExpressionContext = ChainExpressionContext;

var AndExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo11) {
  JSONFormulaParser_inherits(AndExpressionContext, _JmesPathExpressionCo11);

  var _super32 = JSONFormulaParser_createSuper(AndExpressionContext);

  function AndExpressionContext(parser, ctx) {
    var _thisSuper20, _this32;

    JSONFormulaParser_classCallCheck(this, AndExpressionContext);

    _this32 = _super32.call(this, parser);

    _this32.jmesPathExpression = function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(JmesPathExpressionContext);
      } else {
        return this.getTypedRuleContext(JmesPathExpressionContext, i);
      }
    };

    _get((_thisSuper20 = JSONFormulaParser_assertThisInitialized(_this32), JSONFormulaParser_getPrototypeOf(AndExpressionContext.prototype)), "copyFrom", _thisSuper20).call(_thisSuper20, ctx);

    return _this32;
  }

  JSONFormulaParser_createClass(AndExpressionContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterAndExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitAndExpression(this);
      }
    }
  }]);

  return AndExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.AndExpressionContext = AndExpressionContext;

var MultiSelectHashExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo12) {
  JSONFormulaParser_inherits(MultiSelectHashExpressionContext, _JmesPathExpressionCo12);

  var _super33 = JSONFormulaParser_createSuper(MultiSelectHashExpressionContext);

  function MultiSelectHashExpressionContext(parser, ctx) {
    var _thisSuper21, _this33;

    JSONFormulaParser_classCallCheck(this, MultiSelectHashExpressionContext);

    _this33 = _super33.call(this, parser);

    _get((_thisSuper21 = JSONFormulaParser_assertThisInitialized(_this33), JSONFormulaParser_getPrototypeOf(MultiSelectHashExpressionContext.prototype)), "copyFrom", _thisSuper21).call(_thisSuper21, ctx);

    return _this33;
  }

  JSONFormulaParser_createClass(MultiSelectHashExpressionContext, [{
    key: "multiSelectHash",
    value: function multiSelectHash() {
      return this.getTypedRuleContext(MultiSelectHashContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterMultiSelectHashExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitMultiSelectHashExpression(this);
      }
    }
  }]);

  return MultiSelectHashExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.MultiSelectHashExpressionContext = MultiSelectHashExpressionContext;

var WildcardExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo13) {
  JSONFormulaParser_inherits(WildcardExpressionContext, _JmesPathExpressionCo13);

  var _super34 = JSONFormulaParser_createSuper(WildcardExpressionContext);

  function WildcardExpressionContext(parser, ctx) {
    var _thisSuper22, _this34;

    JSONFormulaParser_classCallCheck(this, WildcardExpressionContext);

    _this34 = _super34.call(this, parser);

    _get((_thisSuper22 = JSONFormulaParser_assertThisInitialized(_this34), JSONFormulaParser_getPrototypeOf(WildcardExpressionContext.prototype)), "copyFrom", _thisSuper22).call(_thisSuper22, ctx);

    return _this34;
  }

  JSONFormulaParser_createClass(WildcardExpressionContext, [{
    key: "wildcard",
    value: function wildcard() {
      return this.getTypedRuleContext(WildcardContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterWildcardExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitWildcardExpression(this);
      }
    }
  }]);

  return WildcardExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.WildcardExpressionContext = WildcardExpressionContext;

var FunctionCallExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo14) {
  JSONFormulaParser_inherits(FunctionCallExpressionContext, _JmesPathExpressionCo14);

  var _super35 = JSONFormulaParser_createSuper(FunctionCallExpressionContext);

  function FunctionCallExpressionContext(parser, ctx) {
    var _thisSuper23, _this35;

    JSONFormulaParser_classCallCheck(this, FunctionCallExpressionContext);

    _this35 = _super35.call(this, parser);

    _get((_thisSuper23 = JSONFormulaParser_assertThisInitialized(_this35), JSONFormulaParser_getPrototypeOf(FunctionCallExpressionContext.prototype)), "copyFrom", _thisSuper23).call(_thisSuper23, ctx);

    return _this35;
  }

  JSONFormulaParser_createClass(FunctionCallExpressionContext, [{
    key: "functionExpression",
    value: function functionExpression() {
      return this.getTypedRuleContext(FunctionExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterFunctionCallExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitFunctionCallExpression(this);
      }
    }
  }]);

  return FunctionCallExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.FunctionCallExpressionContext = FunctionCallExpressionContext;

var MultiSelectListExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo15) {
  JSONFormulaParser_inherits(MultiSelectListExpressionContext, _JmesPathExpressionCo15);

  var _super36 = JSONFormulaParser_createSuper(MultiSelectListExpressionContext);

  function MultiSelectListExpressionContext(parser, ctx) {
    var _thisSuper24, _this36;

    JSONFormulaParser_classCallCheck(this, MultiSelectListExpressionContext);

    _this36 = _super36.call(this, parser);

    _get((_thisSuper24 = JSONFormulaParser_assertThisInitialized(_this36), JSONFormulaParser_getPrototypeOf(MultiSelectListExpressionContext.prototype)), "copyFrom", _thisSuper24).call(_thisSuper24, ctx);

    return _this36;
  }

  JSONFormulaParser_createClass(MultiSelectListExpressionContext, [{
    key: "multiSelectList",
    value: function multiSelectList() {
      return this.getTypedRuleContext(MultiSelectListContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterMultiSelectListExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitMultiSelectListExpression(this);
      }
    }
  }]);

  return MultiSelectListExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.MultiSelectListExpressionContext = MultiSelectListExpressionContext;

var BracketedExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo16) {
  JSONFormulaParser_inherits(BracketedExpressionContext, _JmesPathExpressionCo16);

  var _super37 = JSONFormulaParser_createSuper(BracketedExpressionContext);

  function BracketedExpressionContext(parser, ctx) {
    var _thisSuper25, _this37;

    JSONFormulaParser_classCallCheck(this, BracketedExpressionContext);

    _this37 = _super37.call(this, parser);

    _get((_thisSuper25 = JSONFormulaParser_assertThisInitialized(_this37), JSONFormulaParser_getPrototypeOf(BracketedExpressionContext.prototype)), "copyFrom", _thisSuper25).call(_thisSuper25, ctx);

    return _this37;
  }

  JSONFormulaParser_createClass(BracketedExpressionContext, [{
    key: "jmesPathExpression",
    value: function jmesPathExpression() {
      return this.getTypedRuleContext(JmesPathExpressionContext, 0);
    }
  }, {
    key: "bracketSpecifier",
    value: function bracketSpecifier() {
      return this.getTypedRuleContext(BracketSpecifierContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterBracketedExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitBracketedExpression(this);
      }
    }
  }]);

  return BracketedExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.BracketedExpressionContext = BracketedExpressionContext;

var LiteralExpressionContext = /*#__PURE__*/function (_JmesPathExpressionCo17) {
  JSONFormulaParser_inherits(LiteralExpressionContext, _JmesPathExpressionCo17);

  var _super38 = JSONFormulaParser_createSuper(LiteralExpressionContext);

  function LiteralExpressionContext(parser, ctx) {
    var _thisSuper26, _this38;

    JSONFormulaParser_classCallCheck(this, LiteralExpressionContext);

    _this38 = _super38.call(this, parser);

    _get((_thisSuper26 = JSONFormulaParser_assertThisInitialized(_this38), JSONFormulaParser_getPrototypeOf(LiteralExpressionContext.prototype)), "copyFrom", _thisSuper26).call(_thisSuper26, ctx);

    return _this38;
  }

  JSONFormulaParser_createClass(LiteralExpressionContext, [{
    key: "literal",
    value: function literal() {
      return this.getTypedRuleContext(LiteralContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterLiteralExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitLiteralExpression(this);
      }
    }
  }]);

  return LiteralExpressionContext;
}(JmesPathExpressionContext);

JSONFormulaParser.LiteralExpressionContext = LiteralExpressionContext;

var ChainedExpressionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon12) {
  JSONFormulaParser_inherits(ChainedExpressionContext, _antlr4$ParserRuleCon12);

  var _super39 = JSONFormulaParser_createSuper(ChainedExpressionContext);

  function ChainedExpressionContext(parser, parent, invokingState) {
    var _this39;

    JSONFormulaParser_classCallCheck(this, ChainedExpressionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this39 = _super39.call(this, parent, invokingState);
    _this39.parser = parser;
    _this39.ruleIndex = JSONFormulaParser.RULE_chainedExpression;
    return _this39;
  }

  JSONFormulaParser_createClass(ChainedExpressionContext, [{
    key: "copyFrom",
    value: function copyFrom(ctx) {
      _get(JSONFormulaParser_getPrototypeOf(ChainedExpressionContext.prototype), "copyFrom", this).call(this, ctx);
    }
  }]);

  return ChainedExpressionContext;
}(antlr4.ParserRuleContext);

var ChainedMultiSelectListContext = /*#__PURE__*/function (_ChainedExpressionCon) {
  JSONFormulaParser_inherits(ChainedMultiSelectListContext, _ChainedExpressionCon);

  var _super40 = JSONFormulaParser_createSuper(ChainedMultiSelectListContext);

  function ChainedMultiSelectListContext(parser, ctx) {
    var _thisSuper27, _this40;

    JSONFormulaParser_classCallCheck(this, ChainedMultiSelectListContext);

    _this40 = _super40.call(this, parser);

    _get((_thisSuper27 = JSONFormulaParser_assertThisInitialized(_this40), JSONFormulaParser_getPrototypeOf(ChainedMultiSelectListContext.prototype)), "copyFrom", _thisSuper27).call(_thisSuper27, ctx);

    return _this40;
  }

  JSONFormulaParser_createClass(ChainedMultiSelectListContext, [{
    key: "multiSelectList",
    value: function multiSelectList() {
      return this.getTypedRuleContext(MultiSelectListContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterChainedMultiSelectList(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitChainedMultiSelectList(this);
      }
    }
  }]);

  return ChainedMultiSelectListContext;
}(ChainedExpressionContext);

JSONFormulaParser.ChainedMultiSelectListContext = ChainedMultiSelectListContext;

var ChainedWildcardContext = /*#__PURE__*/function (_ChainedExpressionCon2) {
  JSONFormulaParser_inherits(ChainedWildcardContext, _ChainedExpressionCon2);

  var _super41 = JSONFormulaParser_createSuper(ChainedWildcardContext);

  function ChainedWildcardContext(parser, ctx) {
    var _thisSuper28, _this41;

    JSONFormulaParser_classCallCheck(this, ChainedWildcardContext);

    _this41 = _super41.call(this, parser);

    _get((_thisSuper28 = JSONFormulaParser_assertThisInitialized(_this41), JSONFormulaParser_getPrototypeOf(ChainedWildcardContext.prototype)), "copyFrom", _thisSuper28).call(_thisSuper28, ctx);

    return _this41;
  }

  JSONFormulaParser_createClass(ChainedWildcardContext, [{
    key: "wildcard",
    value: function wildcard() {
      return this.getTypedRuleContext(WildcardContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterChainedWildcard(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitChainedWildcard(this);
      }
    }
  }]);

  return ChainedWildcardContext;
}(ChainedExpressionContext);

JSONFormulaParser.ChainedWildcardContext = ChainedWildcardContext;

var ChainedMultiSelectHashContext = /*#__PURE__*/function (_ChainedExpressionCon3) {
  JSONFormulaParser_inherits(ChainedMultiSelectHashContext, _ChainedExpressionCon3);

  var _super42 = JSONFormulaParser_createSuper(ChainedMultiSelectHashContext);

  function ChainedMultiSelectHashContext(parser, ctx) {
    var _thisSuper29, _this42;

    JSONFormulaParser_classCallCheck(this, ChainedMultiSelectHashContext);

    _this42 = _super42.call(this, parser);

    _get((_thisSuper29 = JSONFormulaParser_assertThisInitialized(_this42), JSONFormulaParser_getPrototypeOf(ChainedMultiSelectHashContext.prototype)), "copyFrom", _thisSuper29).call(_thisSuper29, ctx);

    return _this42;
  }

  JSONFormulaParser_createClass(ChainedMultiSelectHashContext, [{
    key: "multiSelectHash",
    value: function multiSelectHash() {
      return this.getTypedRuleContext(MultiSelectHashContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterChainedMultiSelectHash(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitChainedMultiSelectHash(this);
      }
    }
  }]);

  return ChainedMultiSelectHashContext;
}(ChainedExpressionContext);

JSONFormulaParser.ChainedMultiSelectHashContext = ChainedMultiSelectHashContext;

var ChainedIdentifierContext = /*#__PURE__*/function (_ChainedExpressionCon4) {
  JSONFormulaParser_inherits(ChainedIdentifierContext, _ChainedExpressionCon4);

  var _super43 = JSONFormulaParser_createSuper(ChainedIdentifierContext);

  function ChainedIdentifierContext(parser, ctx) {
    var _thisSuper30, _this43;

    JSONFormulaParser_classCallCheck(this, ChainedIdentifierContext);

    _this43 = _super43.call(this, parser);

    _get((_thisSuper30 = JSONFormulaParser_assertThisInitialized(_this43), JSONFormulaParser_getPrototypeOf(ChainedIdentifierContext.prototype)), "copyFrom", _thisSuper30).call(_thisSuper30, ctx);

    return _this43;
  }

  JSONFormulaParser_createClass(ChainedIdentifierContext, [{
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterChainedIdentifier(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitChainedIdentifier(this);
      }
    }
  }]);

  return ChainedIdentifierContext;
}(ChainedExpressionContext);

JSONFormulaParser.ChainedIdentifierContext = ChainedIdentifierContext;

var ChainedFunctionExpressionContext = /*#__PURE__*/function (_ChainedExpressionCon5) {
  JSONFormulaParser_inherits(ChainedFunctionExpressionContext, _ChainedExpressionCon5);

  var _super44 = JSONFormulaParser_createSuper(ChainedFunctionExpressionContext);

  function ChainedFunctionExpressionContext(parser, ctx) {
    var _thisSuper31, _this44;

    JSONFormulaParser_classCallCheck(this, ChainedFunctionExpressionContext);

    _this44 = _super44.call(this, parser);

    _get((_thisSuper31 = JSONFormulaParser_assertThisInitialized(_this44), JSONFormulaParser_getPrototypeOf(ChainedFunctionExpressionContext.prototype)), "copyFrom", _thisSuper31).call(_thisSuper31, ctx);

    return _this44;
  }

  JSONFormulaParser_createClass(ChainedFunctionExpressionContext, [{
    key: "functionExpression",
    value: function functionExpression() {
      return this.getTypedRuleContext(FunctionExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterChainedFunctionExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitChainedFunctionExpression(this);
      }
    }
  }]);

  return ChainedFunctionExpressionContext;
}(ChainedExpressionContext);

JSONFormulaParser.ChainedFunctionExpressionContext = ChainedFunctionExpressionContext;

var WildcardContext = /*#__PURE__*/function (_antlr4$ParserRuleCon13) {
  JSONFormulaParser_inherits(WildcardContext, _antlr4$ParserRuleCon13);

  var _super45 = JSONFormulaParser_createSuper(WildcardContext);

  function WildcardContext(parser, parent, invokingState) {
    var _this45;

    JSONFormulaParser_classCallCheck(this, WildcardContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this45 = _super45.call(this, parent, invokingState);
    _this45.parser = parser;
    _this45.ruleIndex = JSONFormulaParser.RULE_wildcard;
    return _this45;
  }

  JSONFormulaParser_createClass(WildcardContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterWildcard(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitWildcard(this);
      }
    }
  }]);

  return WildcardContext;
}(antlr4.ParserRuleContext);

var MultiSelectListContext = /*#__PURE__*/function (_antlr4$ParserRuleCon14) {
  JSONFormulaParser_inherits(MultiSelectListContext, _antlr4$ParserRuleCon14);

  var _super46 = JSONFormulaParser_createSuper(MultiSelectListContext);

  function MultiSelectListContext(parser, parent, invokingState) {
    var _this46;

    JSONFormulaParser_classCallCheck(this, MultiSelectListContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this46 = _super46.call(this, parent, invokingState);

    _this46.jmesPathExpression = function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(JmesPathExpressionContext);
      } else {
        return this.getTypedRuleContext(JmesPathExpressionContext, i);
      }
    };

    _this46.parser = parser;
    _this46.ruleIndex = JSONFormulaParser.RULE_multiSelectList;
    return _this46;
  }

  JSONFormulaParser_createClass(MultiSelectListContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterMultiSelectList(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitMultiSelectList(this);
      }
    }
  }]);

  return MultiSelectListContext;
}(antlr4.ParserRuleContext);

var MultiSelectHashContext = /*#__PURE__*/function (_antlr4$ParserRuleCon15) {
  JSONFormulaParser_inherits(MultiSelectHashContext, _antlr4$ParserRuleCon15);

  var _super47 = JSONFormulaParser_createSuper(MultiSelectHashContext);

  function MultiSelectHashContext(parser, parent, invokingState) {
    var _this47;

    JSONFormulaParser_classCallCheck(this, MultiSelectHashContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this47 = _super47.call(this, parent, invokingState);

    _this47.keyvalExpr = function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(KeyvalExprContext);
      } else {
        return this.getTypedRuleContext(KeyvalExprContext, i);
      }
    };

    _this47.parser = parser;
    _this47.ruleIndex = JSONFormulaParser.RULE_multiSelectHash;
    return _this47;
  }

  JSONFormulaParser_createClass(MultiSelectHashContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterMultiSelectHash(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitMultiSelectHash(this);
      }
    }
  }]);

  return MultiSelectHashContext;
}(antlr4.ParserRuleContext);

var KeyvalExprContext = /*#__PURE__*/function (_antlr4$ParserRuleCon16) {
  JSONFormulaParser_inherits(KeyvalExprContext, _antlr4$ParserRuleCon16);

  var _super48 = JSONFormulaParser_createSuper(KeyvalExprContext);

  function KeyvalExprContext(parser, parent, invokingState) {
    var _this48;

    JSONFormulaParser_classCallCheck(this, KeyvalExprContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this48 = _super48.call(this, parent, invokingState);
    _this48.parser = parser;
    _this48.ruleIndex = JSONFormulaParser.RULE_keyvalExpr;
    return _this48;
  }

  JSONFormulaParser_createClass(KeyvalExprContext, [{
    key: "identifier",
    value: function identifier() {
      return this.getTypedRuleContext(IdentifierContext, 0);
    }
  }, {
    key: "jmesPathExpression",
    value: function jmesPathExpression() {
      return this.getTypedRuleContext(JmesPathExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterKeyvalExpr(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitKeyvalExpr(this);
      }
    }
  }]);

  return KeyvalExprContext;
}(antlr4.ParserRuleContext);

var BracketSpecifierContext = /*#__PURE__*/function (_antlr4$ParserRuleCon17) {
  JSONFormulaParser_inherits(BracketSpecifierContext, _antlr4$ParserRuleCon17);

  var _super49 = JSONFormulaParser_createSuper(BracketSpecifierContext);

  function BracketSpecifierContext(parser, parent, invokingState) {
    var _this49;

    JSONFormulaParser_classCallCheck(this, BracketSpecifierContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this49 = _super49.call(this, parent, invokingState);
    _this49.parser = parser;
    _this49.ruleIndex = JSONFormulaParser.RULE_bracketSpecifier;
    return _this49;
  }

  JSONFormulaParser_createClass(BracketSpecifierContext, [{
    key: "copyFrom",
    value: function copyFrom(ctx) {
      _get(JSONFormulaParser_getPrototypeOf(BracketSpecifierContext.prototype), "copyFrom", this).call(this, ctx);
    }
  }]);

  return BracketSpecifierContext;
}(antlr4.ParserRuleContext);

var SelectContext = /*#__PURE__*/function (_BracketSpecifierCont) {
  JSONFormulaParser_inherits(SelectContext, _BracketSpecifierCont);

  var _super50 = JSONFormulaParser_createSuper(SelectContext);

  function SelectContext(parser, ctx) {
    var _thisSuper32, _this50;

    JSONFormulaParser_classCallCheck(this, SelectContext);

    _this50 = _super50.call(this, parser);

    _get((_thisSuper32 = JSONFormulaParser_assertThisInitialized(_this50), JSONFormulaParser_getPrototypeOf(SelectContext.prototype)), "copyFrom", _thisSuper32).call(_thisSuper32, ctx);

    return _this50;
  }

  JSONFormulaParser_createClass(SelectContext, [{
    key: "jmesPathExpression",
    value: function jmesPathExpression() {
      return this.getTypedRuleContext(JmesPathExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterSelect(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitSelect(this);
      }
    }
  }]);

  return SelectContext;
}(BracketSpecifierContext);

JSONFormulaParser.SelectContext = SelectContext;

var BracketFlattenContext = /*#__PURE__*/function (_BracketSpecifierCont2) {
  JSONFormulaParser_inherits(BracketFlattenContext, _BracketSpecifierCont2);

  var _super51 = JSONFormulaParser_createSuper(BracketFlattenContext);

  function BracketFlattenContext(parser, ctx) {
    var _thisSuper33, _this51;

    JSONFormulaParser_classCallCheck(this, BracketFlattenContext);

    _this51 = _super51.call(this, parser);

    _get((_thisSuper33 = JSONFormulaParser_assertThisInitialized(_this51), JSONFormulaParser_getPrototypeOf(BracketFlattenContext.prototype)), "copyFrom", _thisSuper33).call(_thisSuper33, ctx);

    return _this51;
  }

  JSONFormulaParser_createClass(BracketFlattenContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterBracketFlatten(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitBracketFlatten(this);
      }
    }
  }]);

  return BracketFlattenContext;
}(BracketSpecifierContext);

JSONFormulaParser.BracketFlattenContext = BracketFlattenContext;

var BracketSliceContext = /*#__PURE__*/function (_BracketSpecifierCont3) {
  JSONFormulaParser_inherits(BracketSliceContext, _BracketSpecifierCont3);

  var _super52 = JSONFormulaParser_createSuper(BracketSliceContext);

  function BracketSliceContext(parser, ctx) {
    var _thisSuper34, _this52;

    JSONFormulaParser_classCallCheck(this, BracketSliceContext);

    _this52 = _super52.call(this, parser);

    _get((_thisSuper34 = JSONFormulaParser_assertThisInitialized(_this52), JSONFormulaParser_getPrototypeOf(BracketSliceContext.prototype)), "copyFrom", _thisSuper34).call(_thisSuper34, ctx);

    return _this52;
  }

  JSONFormulaParser_createClass(BracketSliceContext, [{
    key: "slice",
    value: function slice() {
      return this.getTypedRuleContext(SliceContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterBracketSlice(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitBracketSlice(this);
      }
    }
  }]);

  return BracketSliceContext;
}(BracketSpecifierContext);

JSONFormulaParser.BracketSliceContext = BracketSliceContext;

var BracketIndexContext = /*#__PURE__*/function (_BracketSpecifierCont4) {
  JSONFormulaParser_inherits(BracketIndexContext, _BracketSpecifierCont4);

  var _super53 = JSONFormulaParser_createSuper(BracketIndexContext);

  function BracketIndexContext(parser, ctx) {
    var _thisSuper35, _this53;

    JSONFormulaParser_classCallCheck(this, BracketIndexContext);

    _this53 = _super53.call(this, parser);

    _get((_thisSuper35 = JSONFormulaParser_assertThisInitialized(_this53), JSONFormulaParser_getPrototypeOf(BracketIndexContext.prototype)), "copyFrom", _thisSuper35).call(_thisSuper35, ctx);

    return _this53;
  }

  JSONFormulaParser_createClass(BracketIndexContext, [{
    key: "SIGNED_INT",
    value: function SIGNED_INT() {
      return this.getToken(JSONFormulaParser.SIGNED_INT, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterBracketIndex(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitBracketIndex(this);
      }
    }
  }]);

  return BracketIndexContext;
}(BracketSpecifierContext);

JSONFormulaParser.BracketIndexContext = BracketIndexContext;

var BracketStarContext = /*#__PURE__*/function (_BracketSpecifierCont5) {
  JSONFormulaParser_inherits(BracketStarContext, _BracketSpecifierCont5);

  var _super54 = JSONFormulaParser_createSuper(BracketStarContext);

  function BracketStarContext(parser, ctx) {
    var _thisSuper36, _this54;

    JSONFormulaParser_classCallCheck(this, BracketStarContext);

    _this54 = _super54.call(this, parser);

    _get((_thisSuper36 = JSONFormulaParser_assertThisInitialized(_this54), JSONFormulaParser_getPrototypeOf(BracketStarContext.prototype)), "copyFrom", _thisSuper36).call(_thisSuper36, ctx);

    return _this54;
  }

  JSONFormulaParser_createClass(BracketStarContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterBracketStar(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitBracketStar(this);
      }
    }
  }]);

  return BracketStarContext;
}(BracketSpecifierContext);

JSONFormulaParser.BracketStarContext = BracketStarContext;

var SliceContext = /*#__PURE__*/function (_antlr4$ParserRuleCon18) {
  JSONFormulaParser_inherits(SliceContext, _antlr4$ParserRuleCon18);

  var _super55 = JSONFormulaParser_createSuper(SliceContext);

  function SliceContext(parser, parent, invokingState) {
    var _this55;

    JSONFormulaParser_classCallCheck(this, SliceContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this55 = _super55.call(this, parent, invokingState);

    _this55.SIGNED_INT = function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTokens(JSONFormulaParser.SIGNED_INT);
      } else {
        return this.getToken(JSONFormulaParser.SIGNED_INT, i);
      }
    };

    _this55.parser = parser;
    _this55.ruleIndex = JSONFormulaParser.RULE_slice;
    _this55.start = null; // Token

    _this55.stop = null; // Token

    _this55.step = null; // Token

    return _this55;
  }

  JSONFormulaParser_createClass(SliceContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterSlice(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitSlice(this);
      }
    }
  }]);

  return SliceContext;
}(antlr4.ParserRuleContext);

var FunctionExpressionContext = /*#__PURE__*/function (_antlr4$ParserRuleCon19) {
  JSONFormulaParser_inherits(FunctionExpressionContext, _antlr4$ParserRuleCon19);

  var _super56 = JSONFormulaParser_createSuper(FunctionExpressionContext);

  function FunctionExpressionContext(parser, parent, invokingState) {
    var _this56;

    JSONFormulaParser_classCallCheck(this, FunctionExpressionContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this56 = _super56.call(this, parent, invokingState);

    _this56.functionArg = function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(FunctionArgContext);
      } else {
        return this.getTypedRuleContext(FunctionArgContext, i);
      }
    };

    _this56.parser = parser;
    _this56.ruleIndex = JSONFormulaParser.RULE_functionExpression;
    return _this56;
  }

  JSONFormulaParser_createClass(FunctionExpressionContext, [{
    key: "NAME",
    value: function NAME() {
      return this.getToken(JSONFormulaParser.NAME, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterFunctionExpression(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitFunctionExpression(this);
      }
    }
  }]);

  return FunctionExpressionContext;
}(antlr4.ParserRuleContext);

var FunctionArgContext = /*#__PURE__*/function (_antlr4$ParserRuleCon20) {
  JSONFormulaParser_inherits(FunctionArgContext, _antlr4$ParserRuleCon20);

  var _super57 = JSONFormulaParser_createSuper(FunctionArgContext);

  function FunctionArgContext(parser, parent, invokingState) {
    var _this57;

    JSONFormulaParser_classCallCheck(this, FunctionArgContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this57 = _super57.call(this, parent, invokingState);
    _this57.parser = parser;
    _this57.ruleIndex = JSONFormulaParser.RULE_functionArg;
    return _this57;
  }

  JSONFormulaParser_createClass(FunctionArgContext, [{
    key: "jmesPathExpression",
    value: function jmesPathExpression() {
      return this.getTypedRuleContext(JmesPathExpressionContext, 0);
    }
  }, {
    key: "expressionType",
    value: function expressionType() {
      return this.getTypedRuleContext(ExpressionTypeContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterFunctionArg(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitFunctionArg(this);
      }
    }
  }]);

  return FunctionArgContext;
}(antlr4.ParserRuleContext);

var CurrentNodeContext = /*#__PURE__*/function (_antlr4$ParserRuleCon21) {
  JSONFormulaParser_inherits(CurrentNodeContext, _antlr4$ParserRuleCon21);

  var _super58 = JSONFormulaParser_createSuper(CurrentNodeContext);

  function CurrentNodeContext(parser, parent, invokingState) {
    var _this58;

    JSONFormulaParser_classCallCheck(this, CurrentNodeContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this58 = _super58.call(this, parent, invokingState);
    _this58.parser = parser;
    _this58.ruleIndex = JSONFormulaParser.RULE_currentNode;
    return _this58;
  }

  JSONFormulaParser_createClass(CurrentNodeContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterCurrentNode(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitCurrentNode(this);
      }
    }
  }]);

  return CurrentNodeContext;
}(antlr4.ParserRuleContext);

var ExpressionTypeContext = /*#__PURE__*/function (_antlr4$ParserRuleCon22) {
  JSONFormulaParser_inherits(ExpressionTypeContext, _antlr4$ParserRuleCon22);

  var _super59 = JSONFormulaParser_createSuper(ExpressionTypeContext);

  function ExpressionTypeContext(parser, parent, invokingState) {
    var _this59;

    JSONFormulaParser_classCallCheck(this, ExpressionTypeContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this59 = _super59.call(this, parent, invokingState);
    _this59.parser = parser;
    _this59.ruleIndex = JSONFormulaParser.RULE_expressionType;
    return _this59;
  }

  JSONFormulaParser_createClass(ExpressionTypeContext, [{
    key: "jmesPathExpression",
    value: function jmesPathExpression() {
      return this.getTypedRuleContext(JmesPathExpressionContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterExpressionType(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitExpressionType(this);
      }
    }
  }]);

  return ExpressionTypeContext;
}(antlr4.ParserRuleContext);

var LiteralContext = /*#__PURE__*/function (_antlr4$ParserRuleCon23) {
  JSONFormulaParser_inherits(LiteralContext, _antlr4$ParserRuleCon23);

  var _super60 = JSONFormulaParser_createSuper(LiteralContext);

  function LiteralContext(parser, parent, invokingState) {
    var _this60;

    JSONFormulaParser_classCallCheck(this, LiteralContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this60 = _super60.call(this, parent, invokingState);
    _this60.parser = parser;
    _this60.ruleIndex = JSONFormulaParser.RULE_literal;
    return _this60;
  }

  JSONFormulaParser_createClass(LiteralContext, [{
    key: "jsonValue",
    value: function jsonValue() {
      return this.getTypedRuleContext(JsonValueContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterLiteral(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitLiteral(this);
      }
    }
  }]);

  return LiteralContext;
}(antlr4.ParserRuleContext);

var IdentifierContext = /*#__PURE__*/function (_antlr4$ParserRuleCon24) {
  JSONFormulaParser_inherits(IdentifierContext, _antlr4$ParserRuleCon24);

  var _super61 = JSONFormulaParser_createSuper(IdentifierContext);

  function IdentifierContext(parser, parent, invokingState) {
    var _this61;

    JSONFormulaParser_classCallCheck(this, IdentifierContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this61 = _super61.call(this, parent, invokingState);
    _this61.parser = parser;
    _this61.ruleIndex = JSONFormulaParser.RULE_identifier;
    return _this61;
  }

  JSONFormulaParser_createClass(IdentifierContext, [{
    key: "NAME",
    value: function NAME() {
      return this.getToken(JSONFormulaParser.NAME, 0);
    }
  }, {
    key: "STRING",
    value: function STRING() {
      return this.getToken(JSONFormulaParser.STRING, 0);
    }
  }, {
    key: "JSON_CONSTANT",
    value: function JSON_CONSTANT() {
      return this.getToken(JSONFormulaParser.JSON_CONSTANT, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterIdentifier(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitIdentifier(this);
      }
    }
  }]);

  return IdentifierContext;
}(antlr4.ParserRuleContext);

var JsonObjectContext = /*#__PURE__*/function (_antlr4$ParserRuleCon25) {
  JSONFormulaParser_inherits(JsonObjectContext, _antlr4$ParserRuleCon25);

  var _super62 = JSONFormulaParser_createSuper(JsonObjectContext);

  function JsonObjectContext(parser, parent, invokingState) {
    var _this62;

    JSONFormulaParser_classCallCheck(this, JsonObjectContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this62 = _super62.call(this, parent, invokingState);

    _this62.jsonObjectPair = function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(JsonObjectPairContext);
      } else {
        return this.getTypedRuleContext(JsonObjectPairContext, i);
      }
    };

    _this62.parser = parser;
    _this62.ruleIndex = JSONFormulaParser.RULE_jsonObject;
    return _this62;
  }

  JSONFormulaParser_createClass(JsonObjectContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterJsonObject(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitJsonObject(this);
      }
    }
  }]);

  return JsonObjectContext;
}(antlr4.ParserRuleContext);

var JsonObjectPairContext = /*#__PURE__*/function (_antlr4$ParserRuleCon26) {
  JSONFormulaParser_inherits(JsonObjectPairContext, _antlr4$ParserRuleCon26);

  var _super63 = JSONFormulaParser_createSuper(JsonObjectPairContext);

  function JsonObjectPairContext(parser, parent, invokingState) {
    var _this63;

    JSONFormulaParser_classCallCheck(this, JsonObjectPairContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this63 = _super63.call(this, parent, invokingState);
    _this63.parser = parser;
    _this63.ruleIndex = JSONFormulaParser.RULE_jsonObjectPair;
    return _this63;
  }

  JSONFormulaParser_createClass(JsonObjectPairContext, [{
    key: "STRING",
    value: function STRING() {
      return this.getToken(JSONFormulaParser.STRING, 0);
    }
  }, {
    key: "jsonValue",
    value: function jsonValue() {
      return this.getTypedRuleContext(JsonValueContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterJsonObjectPair(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitJsonObjectPair(this);
      }
    }
  }]);

  return JsonObjectPairContext;
}(antlr4.ParserRuleContext);

var JsonArrayContext = /*#__PURE__*/function (_antlr4$ParserRuleCon27) {
  JSONFormulaParser_inherits(JsonArrayContext, _antlr4$ParserRuleCon27);

  var _super64 = JSONFormulaParser_createSuper(JsonArrayContext);

  function JsonArrayContext(parser, parent, invokingState) {
    var _this64;

    JSONFormulaParser_classCallCheck(this, JsonArrayContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this64 = _super64.call(this, parent, invokingState);

    _this64.jsonValue = function (i) {
      if (i === undefined) {
        i = null;
      }

      if (i === null) {
        return this.getTypedRuleContexts(JsonValueContext);
      } else {
        return this.getTypedRuleContext(JsonValueContext, i);
      }
    };

    _this64.parser = parser;
    _this64.ruleIndex = JSONFormulaParser.RULE_jsonArray;
    return _this64;
  }

  JSONFormulaParser_createClass(JsonArrayContext, [{
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterJsonArray(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitJsonArray(this);
      }
    }
  }]);

  return JsonArrayContext;
}(antlr4.ParserRuleContext);

var JsonValueContext = /*#__PURE__*/function (_antlr4$ParserRuleCon28) {
  JSONFormulaParser_inherits(JsonValueContext, _antlr4$ParserRuleCon28);

  var _super65 = JSONFormulaParser_createSuper(JsonValueContext);

  function JsonValueContext(parser, parent, invokingState) {
    var _this65;

    JSONFormulaParser_classCallCheck(this, JsonValueContext);

    if (parent === undefined) {
      parent = null;
    }

    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }

    _this65 = _super65.call(this, parent, invokingState);
    _this65.parser = parser;
    _this65.ruleIndex = JSONFormulaParser.RULE_jsonValue;
    return _this65;
  }

  JSONFormulaParser_createClass(JsonValueContext, [{
    key: "copyFrom",
    value: function copyFrom(ctx) {
      _get(JSONFormulaParser_getPrototypeOf(JsonValueContext.prototype), "copyFrom", this).call(this, ctx);
    }
  }]);

  return JsonValueContext;
}(antlr4.ParserRuleContext);

var JsonArrayValueContext = /*#__PURE__*/function (_JsonValueContext) {
  JSONFormulaParser_inherits(JsonArrayValueContext, _JsonValueContext);

  var _super66 = JSONFormulaParser_createSuper(JsonArrayValueContext);

  function JsonArrayValueContext(parser, ctx) {
    var _thisSuper37, _this66;

    JSONFormulaParser_classCallCheck(this, JsonArrayValueContext);

    _this66 = _super66.call(this, parser);

    _get((_thisSuper37 = JSONFormulaParser_assertThisInitialized(_this66), JSONFormulaParser_getPrototypeOf(JsonArrayValueContext.prototype)), "copyFrom", _thisSuper37).call(_thisSuper37, ctx);

    return _this66;
  }

  JSONFormulaParser_createClass(JsonArrayValueContext, [{
    key: "jsonArray",
    value: function jsonArray() {
      return this.getTypedRuleContext(JsonArrayContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterJsonArrayValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitJsonArrayValue(this);
      }
    }
  }]);

  return JsonArrayValueContext;
}(JsonValueContext);

JSONFormulaParser.JsonArrayValueContext = JsonArrayValueContext;

var JsonStringValueContext = /*#__PURE__*/function (_JsonValueContext2) {
  JSONFormulaParser_inherits(JsonStringValueContext, _JsonValueContext2);

  var _super67 = JSONFormulaParser_createSuper(JsonStringValueContext);

  function JsonStringValueContext(parser, ctx) {
    var _thisSuper38, _this67;

    JSONFormulaParser_classCallCheck(this, JsonStringValueContext);

    _this67 = _super67.call(this, parser);

    _get((_thisSuper38 = JSONFormulaParser_assertThisInitialized(_this67), JSONFormulaParser_getPrototypeOf(JsonStringValueContext.prototype)), "copyFrom", _thisSuper38).call(_thisSuper38, ctx);

    return _this67;
  }

  JSONFormulaParser_createClass(JsonStringValueContext, [{
    key: "STRING",
    value: function STRING() {
      return this.getToken(JSONFormulaParser.STRING, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterJsonStringValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitJsonStringValue(this);
      }
    }
  }]);

  return JsonStringValueContext;
}(JsonValueContext);

JSONFormulaParser.JsonStringValueContext = JsonStringValueContext;

var JsonObjectValueContext = /*#__PURE__*/function (_JsonValueContext3) {
  JSONFormulaParser_inherits(JsonObjectValueContext, _JsonValueContext3);

  var _super68 = JSONFormulaParser_createSuper(JsonObjectValueContext);

  function JsonObjectValueContext(parser, ctx) {
    var _thisSuper39, _this68;

    JSONFormulaParser_classCallCheck(this, JsonObjectValueContext);

    _this68 = _super68.call(this, parser);

    _get((_thisSuper39 = JSONFormulaParser_assertThisInitialized(_this68), JSONFormulaParser_getPrototypeOf(JsonObjectValueContext.prototype)), "copyFrom", _thisSuper39).call(_thisSuper39, ctx);

    return _this68;
  }

  JSONFormulaParser_createClass(JsonObjectValueContext, [{
    key: "jsonObject",
    value: function jsonObject() {
      return this.getTypedRuleContext(JsonObjectContext, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterJsonObjectValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitJsonObjectValue(this);
      }
    }
  }]);

  return JsonObjectValueContext;
}(JsonValueContext);

JSONFormulaParser.JsonObjectValueContext = JsonObjectValueContext;

var JsonConstantValueContext = /*#__PURE__*/function (_JsonValueContext4) {
  JSONFormulaParser_inherits(JsonConstantValueContext, _JsonValueContext4);

  var _super69 = JSONFormulaParser_createSuper(JsonConstantValueContext);

  function JsonConstantValueContext(parser, ctx) {
    var _thisSuper40, _this69;

    JSONFormulaParser_classCallCheck(this, JsonConstantValueContext);

    _this69 = _super69.call(this, parser);

    _get((_thisSuper40 = JSONFormulaParser_assertThisInitialized(_this69), JSONFormulaParser_getPrototypeOf(JsonConstantValueContext.prototype)), "copyFrom", _thisSuper40).call(_thisSuper40, ctx);

    return _this69;
  }

  JSONFormulaParser_createClass(JsonConstantValueContext, [{
    key: "JSON_CONSTANT",
    value: function JSON_CONSTANT() {
      return this.getToken(JSONFormulaParser.JSON_CONSTANT, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterJsonConstantValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitJsonConstantValue(this);
      }
    }
  }]);

  return JsonConstantValueContext;
}(JsonValueContext);

JSONFormulaParser.JsonConstantValueContext = JsonConstantValueContext;

var JsonNumberValueContext = /*#__PURE__*/function (_JsonValueContext5) {
  JSONFormulaParser_inherits(JsonNumberValueContext, _JsonValueContext5);

  var _super70 = JSONFormulaParser_createSuper(JsonNumberValueContext);

  function JsonNumberValueContext(parser, ctx) {
    var _thisSuper41, _this70;

    JSONFormulaParser_classCallCheck(this, JsonNumberValueContext);

    _this70 = _super70.call(this, parser);

    _get((_thisSuper41 = JSONFormulaParser_assertThisInitialized(_this70), JSONFormulaParser_getPrototypeOf(JsonNumberValueContext.prototype)), "copyFrom", _thisSuper41).call(_thisSuper41, ctx);

    return _this70;
  }

  JSONFormulaParser_createClass(JsonNumberValueContext, [{
    key: "REAL_OR_EXPONENT_NUMBER",
    value: function REAL_OR_EXPONENT_NUMBER() {
      return this.getToken(JSONFormulaParser.REAL_OR_EXPONENT_NUMBER, 0);
    }
  }, {
    key: "SIGNED_INT",
    value: function SIGNED_INT() {
      return this.getToken(JSONFormulaParser.SIGNED_INT, 0);
    }
  }, {
    key: "enterRule",
    value: function enterRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.enterJsonNumberValue(this);
      }
    }
  }, {
    key: "exitRule",
    value: function exitRule(listener) {
      if (listener instanceof JSONFormulaListener) {
        listener.exitJsonNumberValue(this);
      }
    }
  }]);

  return JsonNumberValueContext;
}(JsonValueContext);

JSONFormulaParser.JsonNumberValueContext = JsonNumberValueContext;
JSONFormulaParser.FormulaContext = FormulaContext;
JSONFormulaParser.ExpressionContext = ExpressionContext;
JSONFormulaParser.Unary_opContext = Unary_opContext;
JSONFormulaParser.Binary_opContext = Binary_opContext;
JSONFormulaParser.Postfix_opContext = Postfix_opContext;
JSONFormulaParser.Function_callContext = Function_callContext;
JSONFormulaParser.ParameterContext = ParameterContext;
JSONFormulaParser.Nonempty_expr_listContext = Nonempty_expr_listContext;
JSONFormulaParser.Expression_listContext = Expression_listContext;
JSONFormulaParser.Parm_separatorContext = Parm_separatorContext;
JSONFormulaParser.JmesPathExpressionContext = JmesPathExpressionContext;
JSONFormulaParser.ChainedExpressionContext = ChainedExpressionContext;
JSONFormulaParser.WildcardContext = WildcardContext;
JSONFormulaParser.MultiSelectListContext = MultiSelectListContext;
JSONFormulaParser.MultiSelectHashContext = MultiSelectHashContext;
JSONFormulaParser.KeyvalExprContext = KeyvalExprContext;
JSONFormulaParser.BracketSpecifierContext = BracketSpecifierContext;
JSONFormulaParser.SliceContext = SliceContext;
JSONFormulaParser.FunctionExpressionContext = FunctionExpressionContext;
JSONFormulaParser.FunctionArgContext = FunctionArgContext;
JSONFormulaParser.CurrentNodeContext = CurrentNodeContext;
JSONFormulaParser.ExpressionTypeContext = ExpressionTypeContext;
JSONFormulaParser.LiteralContext = LiteralContext;
JSONFormulaParser.IdentifierContext = IdentifierContext;
JSONFormulaParser.JsonObjectContext = JsonObjectContext;
JSONFormulaParser.JsonObjectPairContext = JsonObjectPairContext;
JSONFormulaParser.JsonArrayContext = JsonArrayContext;
JSONFormulaParser.JsonValueContext = JsonValueContext;
;// CONCATENATED MODULE: ./src/antlr/JSONFormulaLexer.js
function JSONFormulaLexer_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { JSONFormulaLexer_typeof = function _typeof(obj) { return typeof obj; }; } else { JSONFormulaLexer_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return JSONFormulaLexer_typeof(obj); }

function JSONFormulaLexer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function JSONFormulaLexer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function JSONFormulaLexer_createClass(Constructor, protoProps, staticProps) { if (protoProps) JSONFormulaLexer_defineProperties(Constructor.prototype, protoProps); if (staticProps) JSONFormulaLexer_defineProperties(Constructor, staticProps); return Constructor; }

function JSONFormulaLexer_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) JSONFormulaLexer_setPrototypeOf(subClass, superClass); }

function JSONFormulaLexer_setPrototypeOf(o, p) { JSONFormulaLexer_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return JSONFormulaLexer_setPrototypeOf(o, p); }

function JSONFormulaLexer_createSuper(Derived) { var hasNativeReflectConstruct = JSONFormulaLexer_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = JSONFormulaLexer_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = JSONFormulaLexer_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return JSONFormulaLexer_possibleConstructorReturn(this, result); }; }

function JSONFormulaLexer_possibleConstructorReturn(self, call) { if (call && (JSONFormulaLexer_typeof(call) === "object" || typeof call === "function")) { return call; } return JSONFormulaLexer_assertThisInitialized(self); }

function JSONFormulaLexer_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function JSONFormulaLexer_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function JSONFormulaLexer_getPrototypeOf(o) { JSONFormulaLexer_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return JSONFormulaLexer_getPrototypeOf(o); }

// Generated from antlr/JSONFormula.g4 by ANTLR 4.9.2
// jshint ignore: start

var JSONFormulaLexer_serializedATN = ["\x03\u608B\uA72A\u8133\uB9ED\u417C\u3BE7\u7786", "\u5964\x02$\u011D\b\x01\x04\x02\t\x02\x04\x03\t\x03", "\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07", "\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\x0B\t\x0B\x04", "\f\t\f\x04\r\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10", "\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04\x13\t\x13", "\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17", "\t\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A", "\x04\x1B\t\x1B\x04\x1C\t\x1C\x04\x1D\t\x1D\x04\x1E", "\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#", "\t#\x04$\t$\x04%\t%\x04&\t&\x04'\t'\x04(\t(\x04)\t)\x03", "\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03", "\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x07\x03", "\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\x0B\x03", "\x0B\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03", "\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03", "\x11\x03\x11\x03\x12\x03\x12\x03\x13\x03\x13\x03", "\x14\x03\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03", "\x17\x03\x17\x03\x17\x03\x18\x03\x18\x03\x19\x03", "\x19\x03\x1A\x05\x1A\x89\n\x1A\x03\x1A\x03\x1A", "\x03\x1B\x03\x1B\x05\x1B\x8F\n\x1B\x03\x1B\x07", "\x1B\x92\n\x1B\f\x1B\x0E\x1B\x95\x0B\x1B\x03\x1C", "\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C", "\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C", "\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C", "\x05\x1C\xAA\n\x1C\x03\x1D\x03\x1D\x03\x1D\x03", "\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03", "\x1D\x05\x1D\xB6\n\x1D\x03\x1E\x03\x1E\x03\x1E", "\x07\x1E\xBB\n\x1E\f\x1E\x0E\x1E\xBE\x0B\x1E\x03", "\x1E\x03\x1E\x03\x1F\x03\x1F\x03\x1F\x03 \x03", " \x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03 \x03", " \x03 \x05 \xD2\n \x03!\x03!\x07!\xD6\n!\f!\x0E!\xD9", "\x0B!\x03\"\x03\"\x03\"\x07\"\xDE\n\"\f\"\x0E\"\xE1", "\x0B\"\x03\"\x03\"\x03#\x03#\x03#\x05#\xE8\n#\x03", "$\x03$\x03$\x03$\x03$\x03$\x03%\x03%\x03&\x05&\xF3", "\n&\x03&\x03&\x03&\x06&\xF8\n&\r&\x0E&\xF9\x03&\x05", "&\xFD\n&\x03&\x05&\u0100\n&\x03&\x03&\x03&\x05&\u0105", "\n&\x03'\x03'\x03'\x07'\u010A\n'\f'\x0E'\u010D\x0B", "'\x05'\u010F\n'\x03(\x03(\x05(\u0113\n(\x03(\x03(\x03", ")\x06)\u0118\n)\r)\x0E)\u0119\x03)\x03)\x02\x02*\x03\x03", "\x05\x04\x07\x05\t\x06\x0B\x07\r\b\x0F\t\x11\n\x13", "\x0B\x15\f\x17\r\x19\x0E\x1B\x0F\x1D\x10\x1F\x11", "!\x12#\x13%\x14'\x15)\x16+\x17-\x18/\x191\x1A3\x1B", "5\x1C7\x1D9\x1E;\x1F=\x02? A!C\"E\x02G\x02I\x02K#M\x02", "O\x02Q$\x03\x02\r\x03\x022;\x04\x02))^^\x05\x02C\\", "aac|\x06\x022;C\\aac|\x04\x02$$^^\x0B\x02$$11^^bbddhhpp", "ttvv\x05\x022;CHch\x03\x023;\x04\x02GGgg\x04\x02--/", "/\x05\x02\x0B\f\x0F\x0F\"\"\x02\u0134\x02\x03\x03", "\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03", "\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\x0B\x03", "\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03", "\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03", "\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03", "\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03", "\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F\x03", "\x02\x02\x02\x02!\x03\x02\x02\x02\x02#\x03\x02", "\x02\x02\x02%\x03\x02\x02\x02\x02'\x03\x02\x02", "\x02\x02)\x03\x02\x02\x02\x02+\x03\x02\x02\x02", "\x02-\x03\x02\x02\x02\x02/\x03\x02\x02\x02\x02", "1\x03\x02\x02\x02\x023\x03\x02\x02\x02\x025\x03", "\x02\x02\x02\x027\x03\x02\x02\x02\x029\x03\x02", "\x02\x02\x02;\x03\x02\x02\x02\x02?\x03\x02\x02", "\x02\x02A\x03\x02\x02\x02\x02C\x03\x02\x02\x02", "\x02K\x03\x02\x02\x02\x02Q\x03\x02\x02\x02\x03", "S\x03\x02\x02\x02\x05U\x03\x02\x02\x02\x07W\x03", "\x02\x02\x02\tY\x03\x02\x02\x02\x0B[\x03\x02\x02", "\x02\r^\x03\x02\x02\x02\x0F`\x03\x02\x02\x02\x11", "b\x03\x02\x02\x02\x13d\x03\x02\x02\x02\x15f\x03", "\x02\x02\x02\x17h\x03\x02\x02\x02\x19j\x03\x02", "\x02\x02\x1Bl\x03\x02\x02\x02\x1Do\x03\x02\x02", "\x02\x1Fr\x03\x02\x02\x02!t\x03\x02\x02\x02#v\x03", "\x02\x02\x02%x\x03\x02\x02\x02'z\x03\x02\x02\x02", ")|\x03\x02\x02\x02+~\x03\x02\x02\x02-\x80\x03\x02", "\x02\x02/\x83\x03\x02\x02\x021\x85\x03\x02\x02", "\x023\x88\x03\x02\x02\x025\x8C\x03\x02\x02\x02", "7\xA9\x03\x02\x02\x029\xB5\x03\x02\x02\x02;\xB7", "\x03\x02\x02\x02=\xC1\x03\x02\x02\x02?\xD1\x03", "\x02\x02\x02A\xD3\x03\x02\x02\x02C\xDA\x03\x02", "\x02\x02E\xE4\x03\x02\x02\x02G\xE9\x03\x02\x02", "\x02I\xEF\x03\x02\x02\x02K\u0104\x03\x02\x02\x02", "M\u010E\x03\x02\x02\x02O\u0110\x03\x02\x02\x02Q\u0117", "\x03\x02\x02\x02ST\x07*\x02\x02T\x04\x03\x02\x02", "\x02UV\x07+\x02\x02V\x06\x03\x02\x02\x02WX\x07-", "\x02\x02X\b\x03\x02\x02\x02YZ\x07/\x02\x02Z\n\x03", "\x02\x02\x02[\\\x07>\x02\x02\\]\x07@\x02\x02]\f\x03", "\x02\x02\x02^_\x07(\x02\x02_\x0E\x03\x02\x02\x02", "`a\x07,\x02\x02a\x10\x03\x02\x02\x02bc\x071\x02", "\x02c\x12\x03\x02\x02\x02de\x07`\x02\x02e\x14\x03", "\x02\x02\x02fg\x07'\x02\x02g\x16\x03\x02\x02\x02", "hi\x07.\x02\x02i\x18\x03\x02\x02\x02jk\x070\x02", "\x02k\x1A\x03\x02\x02\x02lm\x07(\x02\x02mn\x07(", "\x02\x02n\x1C\x03\x02\x02\x02op\x07~\x02\x02pq\x07", "~\x02\x02q\x1E\x03\x02\x02\x02rs\x07#\x02\x02s ", "\x03\x02\x02\x02tu\x07~\x02\x02u\"\x03\x02\x02\x02", "vw\x07]\x02\x02w$\x03\x02\x02\x02xy\x07_\x02\x02", "y&\x03\x02\x02\x02z{\x07}\x02\x02{(\x03\x02\x02", "\x02|}\x07\x7F\x02\x02}*\x03\x02\x02\x02~\x7F\x07", "<\x02\x02\x7F,\x03\x02\x02\x02\x80\x81\x07]\x02", "\x02\x81\x82\x07A\x02\x02\x82.\x03\x02\x02\x02", "\x83\x84\x07B\x02\x02\x840\x03\x02\x02\x02\x85", "\x86\x07b\x02\x02\x862\x03\x02\x02\x02\x87\x89", "\x07/\x02\x02\x88\x87\x03\x02\x02\x02\x88\x89", "\x03\x02\x02\x02\x89\x8A\x03\x02\x02\x02\x8A\x8B", "\x05M'\x02\x8B4\x03\x02\x02\x02\x8C\x8E\x053\x1A", "\x02\x8D\x8F\x070\x02\x02\x8E\x8D\x03\x02\x02", "\x02\x8E\x8F\x03\x02\x02\x02\x8F\x93\x03\x02\x02", "\x02\x90\x92\t\x02\x02\x02\x91\x90\x03\x02\x02", "\x02\x92\x95\x03\x02\x02\x02\x93\x91\x03\x02\x02", "\x02\x93\x94\x03\x02\x02\x02\x946\x03\x02\x02", "\x02\x95\x93\x03\x02\x02\x02\x96\x97\x07V\x02", "\x02\x97\x98\x07T\x02\x02\x98\x99\x07W\x02\x02", "\x99\xAA\x07G\x02\x02\x9A\x9B\x07H\x02\x02\x9B", "\x9C\x07C\x02\x02\x9C\x9D\x07N\x02\x02\x9D\x9E", "\x07U\x02\x02\x9E\xAA\x07G\x02\x02\x9F\xA0\x07", "u\x02\x02\xA0\xA1\x07w\x02\x02\xA1\xAA\x07o\x02", "\x02\xA2\xA3\x07U\x02\x02\xA3\xA4\x07W\x02\x02", "\xA4\xAA\x07O\x02\x02\xA5\xA6\x07k\x02\x02\xA6", "\xAA\x07h\x02\x02\xA7\xA8\x07K\x02\x02\xA8\xAA", "\x07H\x02\x02\xA9\x96\x03\x02\x02\x02\xA9\x9A", "\x03\x02\x02\x02\xA9\x9F\x03\x02\x02\x02\xA9\xA2", "\x03\x02\x02\x02\xA9\xA5\x03\x02\x02\x02\xA9\xA7", "\x03\x02\x02\x02\xAA8\x03\x02\x02\x02\xAB\xB6", "\x07>\x02\x02\xAC\xAD\x07>\x02\x02\xAD\xB6\x07", "?\x02\x02\xAE\xAF\x07?\x02\x02\xAF\xB6\x07?\x02", "\x02\xB0\xB1\x07@\x02\x02\xB1\xB6\x07?\x02\x02", "\xB2\xB6\x07@\x02\x02\xB3\xB4\x07#\x02\x02\xB4", "\xB6\x07?\x02\x02\xB5\xAB\x03\x02\x02\x02\xB5", "\xAC\x03\x02\x02\x02\xB5\xAE\x03\x02\x02\x02\xB5", "\xB0\x03\x02\x02\x02\xB5\xB2\x03\x02\x02\x02\xB5", "\xB3\x03\x02\x02\x02\xB6:\x03\x02\x02\x02\xB7", "\xBC\x07)\x02\x02\xB8\xBB\x05=\x1F\x02\xB9\xBB", "\n\x03\x02\x02\xBA\xB8\x03\x02\x02\x02\xBA\xB9", "\x03\x02\x02\x02\xBB\xBE\x03\x02\x02\x02\xBC\xBA", "\x03\x02\x02\x02\xBC\xBD\x03\x02\x02\x02\xBD\xBF", "\x03\x02\x02\x02\xBE\xBC\x03\x02\x02\x02\xBF\xC0", "\x07)\x02\x02\xC0<\x03\x02\x02\x02\xC1\xC2\x07", "^\x02\x02\xC2\xC3\x0B\x02\x02\x02\xC3>\x03\x02", "\x02\x02\xC4\xC5\x07v\x02\x02\xC5\xC6\x07t\x02", "\x02\xC6\xC7\x07w\x02\x02\xC7\xD2\x07g\x02\x02", "\xC8\xC9\x07h\x02\x02\xC9\xCA\x07c\x02\x02\xCA", "\xCB\x07n\x02\x02\xCB\xCC\x07u\x02\x02\xCC\xD2", "\x07g\x02\x02\xCD\xCE\x07p\x02\x02\xCE\xCF\x07", "w\x02\x02\xCF\xD0\x07n\x02\x02\xD0\xD2\x07n\x02", "\x02\xD1\xC4\x03\x02\x02\x02\xD1\xC8\x03\x02\x02", "\x02\xD1\xCD\x03\x02\x02\x02\xD2@\x03\x02\x02", "\x02\xD3\xD7\t\x04\x02\x02\xD4\xD6\t\x05\x02\x02", "\xD5\xD4\x03\x02\x02\x02\xD6\xD9\x03\x02\x02\x02", "\xD7\xD5\x03\x02\x02\x02\xD7\xD8\x03\x02\x02\x02", "\xD8B\x03\x02\x02\x02\xD9\xD7\x03\x02\x02\x02", "\xDA\xDF\x07$\x02\x02\xDB\xDE\x05E#\x02\xDC\xDE", "\n\x06\x02\x02\xDD\xDB\x03\x02\x02\x02\xDD\xDC", "\x03\x02\x02\x02\xDE\xE1\x03\x02\x02\x02\xDF\xDD", "\x03\x02\x02\x02\xDF\xE0\x03\x02\x02\x02\xE0\xE2", "\x03\x02\x02\x02\xE1\xDF\x03\x02\x02\x02\xE2\xE3", "\x07$\x02\x02\xE3D\x03\x02\x02\x02\xE4\xE7\x07", "^\x02\x02\xE5\xE8\t\x07\x02\x02\xE6\xE8\x05G$\x02", "\xE7\xE5\x03\x02\x02\x02\xE7\xE6\x03\x02\x02\x02", "\xE8F\x03\x02\x02\x02\xE9\xEA\x07w\x02\x02\xEA", "\xEB\x05I%\x02\xEB\xEC\x05I%\x02\xEC\xED\x05I%\x02", "\xED\xEE\x05I%\x02\xEEH\x03\x02\x02\x02\xEF\xF0", "\t\b\x02\x02\xF0J\x03\x02\x02\x02\xF1\xF3\x07/\x02", "\x02\xF2\xF1\x03\x02\x02\x02\xF2\xF3\x03\x02\x02", "\x02\xF3\xF4\x03\x02\x02\x02\xF4\xF5\x05M'\x02", "\xF5\xF7\x070\x02\x02\xF6\xF8\t\x02\x02\x02\xF7", "\xF6\x03\x02\x02\x02\xF8\xF9\x03\x02\x02\x02\xF9", "\xF7\x03\x02\x02\x02\xF9\xFA\x03\x02\x02\x02\xFA", "\xFC\x03\x02\x02\x02\xFB\xFD\x05O(\x02\xFC\xFB", "\x03\x02\x02\x02\xFC\xFD\x03\x02\x02\x02\xFD\u0105", "\x03\x02\x02\x02\xFE\u0100\x07/\x02\x02\xFF\xFE", "\x03\x02\x02\x02\xFF\u0100\x03\x02\x02\x02\u0100\u0101", "\x03\x02\x02\x02\u0101\u0102\x05M'\x02\u0102\u0103\x05", "O(\x02\u0103\u0105\x03\x02\x02\x02\u0104\xF2\x03\x02", "\x02\x02\u0104\xFF\x03\x02\x02\x02\u0105L\x03\x02", "\x02\x02\u0106\u010F\x072\x02\x02\u0107\u010B\t\t\x02\x02", "\u0108\u010A\t\x02\x02\x02\u0109\u0108\x03\x02\x02\x02", "\u010A\u010D\x03\x02\x02\x02\u010B\u0109\x03\x02\x02\x02", "\u010B\u010C\x03\x02\x02\x02\u010C\u010F\x03\x02\x02\x02", "\u010D\u010B\x03\x02\x02\x02\u010E\u0106\x03\x02\x02\x02", "\u010E\u0107\x03\x02\x02\x02\u010FN\x03\x02\x02\x02", "\u0110\u0112\t\n\x02\x02\u0111\u0113\t\x0B\x02\x02\u0112\u0111", "\x03\x02\x02\x02\u0112\u0113\x03\x02\x02\x02\u0113\u0114", "\x03\x02\x02\x02\u0114\u0115\x05M'\x02\u0115P\x03\x02", "\x02\x02\u0116\u0118\t\f\x02\x02\u0117\u0116\x03\x02\x02", "\x02\u0118\u0119\x03\x02\x02\x02\u0119\u0117\x03\x02\x02", "\x02\u0119\u011A\x03\x02\x02\x02\u011A\u011B\x03\x02\x02", "\x02\u011B\u011C\b)\x02\x02\u011CR\x03\x02\x02\x02\x18", "\x02\x88\x8E\x93\xA9\xB5\xBA\xBC\xD1\xD7\xDD\xDF", "\xE7\xF2\xF9\xFC\xFF\u0104\u010B\u010E\u0112\u0119\x03\b", "\x02\x02"].join("");
var JSONFormulaLexer_atn = new antlr4.atn.ATNDeserializer().deserialize(JSONFormulaLexer_serializedATN);
var JSONFormulaLexer_decisionsToDFA = JSONFormulaLexer_atn.decisionToState.map(function (ds, index) {
  return new antlr4.dfa.DFA(ds, index);
});

var JSONFormulaLexer = /*#__PURE__*/function (_antlr4$Lexer) {
  JSONFormulaLexer_inherits(JSONFormulaLexer, _antlr4$Lexer);

  var _super = JSONFormulaLexer_createSuper(JSONFormulaLexer);

  function JSONFormulaLexer(input) {
    var _this;

    JSONFormulaLexer_classCallCheck(this, JSONFormulaLexer);

    _this = _super.call(this, input);
    _this._interp = new antlr4.atn.LexerATNSimulator(JSONFormulaLexer_assertThisInitialized(_this), JSONFormulaLexer_atn, JSONFormulaLexer_decisionsToDFA, new antlr4/* PredictionContextCache */.d());
    return _this;
  }

  JSONFormulaLexer_createClass(JSONFormulaLexer, [{
    key: "atn",
    get: function get() {
      return JSONFormulaLexer_atn;
    }
  }]);

  return JSONFormulaLexer;
}(antlr4.Lexer);

JSONFormulaLexer.grammarFileName = "JSONFormula.g4";
JSONFormulaLexer.channelNames = ["DEFAULT_TOKEN_CHANNEL", "HIDDEN"];
JSONFormulaLexer.modeNames = ["DEFAULT_MODE"];
JSONFormulaLexer.literalNames = [null, "'('", "')'", "'+'", "'-'", "'<>'", "'&'", "'*'", "'/'", "'^'", "'%'", "','", "'.'", "'&&'", "'||'", "'!'", "'|'", "'['", "']'", "'{'", "'}'", "':'", "'[?'", "'@'", "'`'"];
JSONFormulaLexer.symbolicNames = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "SIGNED_INT", "NUMBER", "FUNCTIONS", "COMPARATOR", "RAW_STRING", "JSON_CONSTANT", "NAME", "STRING", "REAL_OR_EXPONENT_NUMBER", "WS"];
JSONFormulaLexer.ruleNames = ["T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", "T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", "T__17", "T__18", "T__19", "T__20", "T__21", "T__22", "T__23", "SIGNED_INT", "NUMBER", "FUNCTIONS", "COMPARATOR", "RAW_STRING", "RAW_ESC", "JSON_CONSTANT", "NAME", "STRING", "ESC", "UNICODE", "HEX", "REAL_OR_EXPONENT_NUMBER", "INT", "EXP", "WS"];

JSONFormulaLexer.EOF = antlr4.Token.EOF;
JSONFormulaLexer.T__0 = 1;
JSONFormulaLexer.T__1 = 2;
JSONFormulaLexer.T__2 = 3;
JSONFormulaLexer.T__3 = 4;
JSONFormulaLexer.T__4 = 5;
JSONFormulaLexer.T__5 = 6;
JSONFormulaLexer.T__6 = 7;
JSONFormulaLexer.T__7 = 8;
JSONFormulaLexer.T__8 = 9;
JSONFormulaLexer.T__9 = 10;
JSONFormulaLexer.T__10 = 11;
JSONFormulaLexer.T__11 = 12;
JSONFormulaLexer.T__12 = 13;
JSONFormulaLexer.T__13 = 14;
JSONFormulaLexer.T__14 = 15;
JSONFormulaLexer.T__15 = 16;
JSONFormulaLexer.T__16 = 17;
JSONFormulaLexer.T__17 = 18;
JSONFormulaLexer.T__18 = 19;
JSONFormulaLexer.T__19 = 20;
JSONFormulaLexer.T__20 = 21;
JSONFormulaLexer.T__21 = 22;
JSONFormulaLexer.T__22 = 23;
JSONFormulaLexer.T__23 = 24;
JSONFormulaLexer.SIGNED_INT = 25;
JSONFormulaLexer.NUMBER = 26;
JSONFormulaLexer.FUNCTIONS = 27;
JSONFormulaLexer.COMPARATOR = 28;
JSONFormulaLexer.RAW_STRING = 29;
JSONFormulaLexer.JSON_CONSTANT = 30;
JSONFormulaLexer.NAME = 31;
JSONFormulaLexer.STRING = 32;
JSONFormulaLexer.REAL_OR_EXPONENT_NUMBER = 33;
JSONFormulaLexer.WS = 34;
// EXTERNAL MODULE: ./node_modules/jmespath/jmespath.js
var jmespath = __webpack_require__(509);
;// CONCATENATED MODULE: ./src/Listener.js
function Listener_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Listener_typeof = function _typeof(obj) { return typeof obj; }; } else { Listener_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Listener_typeof(obj); }

function Listener_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Listener_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Listener_createClass(Constructor, protoProps, staticProps) { if (protoProps) Listener_defineProperties(Constructor.prototype, protoProps); if (staticProps) Listener_defineProperties(Constructor, staticProps); return Constructor; }

function Listener_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Listener_setPrototypeOf(subClass, superClass); }

function Listener_setPrototypeOf(o, p) { Listener_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Listener_setPrototypeOf(o, p); }

function Listener_createSuper(Derived) { var hasNativeReflectConstruct = Listener_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Listener_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Listener_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Listener_possibleConstructorReturn(this, result); }; }

function Listener_possibleConstructorReturn(self, call) { if (call && (Listener_typeof(call) === "object" || typeof call === "function")) { return call; } return Listener_assertThisInitialized(self); }

function Listener_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Listener_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function Listener_getPrototypeOf(o) { Listener_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Listener_getPrototypeOf(o); }

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



var Listener = /*#__PURE__*/function (_JSONFormulaListener) {
  Listener_inherits(Listener, _JSONFormulaListener);

  var _super = Listener_createSuper(Listener);

  function Listener(data, traceOn) {
    var _this;

    Listener_classCallCheck(this, Listener);

    _this = _super.call(this);
    _this.stack = [];
    _this.data = data;
    _this.traceOn = traceOn;
    return _this;
  }

  Listener_createClass(Listener, [{
    key: "trace",
    value: function trace(msg) {
      if (this.traceOn) console.log(msg);
    } // Enter a parse tree produced by JSONFormulaParser#formula.

  }, {
    key: "enterFormula",
    value: function enterFormula(ctx) {
      this.trace("enterFormula: ".concat(ctx.getText()));
    } // Exit a parse tree produced by JSONFormulaParser#formula.

  }, {
    key: "exitFormula",
    value: function exitFormula(ctx) {
      this.trace("exitFormula: ".concat(ctx.getText()));
      this.result = this.stack.pop();
      this.trace("\n\nRESULT: ".concat(this.result));
    } // Exit a parse tree produced by JSONFormulaParser#binaryExpression.

  }, {
    key: "exitBinaryExpression",
    value: function exitBinaryExpression(ctx) {
      this.trace("exitBinaryExpression: ".concat(ctx.getText()));
      var op1 = this.stack.pop();
      var op = this.stack.pop();
      var op2 = this.stack.pop();

      if (op === "*") {
        this.stack.push(op2 * op1);
      } else if (op === "/") {
        this.stack.push(op2 / op1);
      } else if (op === "-") {
        this.stack.push(op2 - op1);
      } else if (op === "+") {
        this.stack.push(op2 + op1);
      } else if (op === "<") {
        this.stack.push(op2 < op1);
      } else if (op === ">") {
        this.stack.push(op2 > op1);
      } else if (op === "<=") {
        this.stack.push(op2 <= op1);
      } else if (op === ">=") {
        this.stack.push(op2 >= op1);
      } else if (op === "==") {
        this.stack.push(op2 == op1);
      } else if (op === "!=" || op === "<>") {
        this.stack.push(op2 != op1);
      } else if (op === "&") {
        this.stack.push(op2.toString() + op1.toString());
      } else if (op === "^") {
        this.stack.push(Math.pow(op2, op1));
      }
    } // Enter a parse tree produced by JSONFormulaParser#jmesPath.

  }, {
    key: "enterJmesPath",
    value: function enterJmesPath(ctx) {
      this.trace("enterJmesPath: ".concat(ctx.getText()));
    } // Exit a parse tree produced by JSONFormulaParser#jmesPath.

  }, {
    key: "exitJmesPath",
    value: function exitJmesPath(ctx) {
      this.trace("exitJmesPath ".concat(ctx.getText()));
      var expr = ctx.getText();
      var x = jmespath.search(this.data, expr);
      this.trace(x);
      this.stack.push(x);
    } // Exit a parse tree produced by JSONFormulaParser#topLevelString.

  }, {
    key: "exitTopLevelString",
    value: function exitTopLevelString(ctx) {
      this.trace("exitTopLevelString: ".concat(ctx.getText()));
      var str = ctx.getText().replace(/([^\\]|^)'/g, "$1").replace(/'$/, "").replace(/\\'/g, "'");
      this.stack.push(str);
    } // Exit a parse tree produced by JSONFormulaParser#functionCall.

  }, {
    key: "exitFunctionCall",
    value: function exitFunctionCall(ctx) {
      var _this2 = this;

      this.trace("exitFunctionCall: ".concat(ctx.getText()));
      var func = ctx.start.text.toLowerCase();

      if (func === "sum") {
        (function () {
          var result = 0;

          while (_this2.stack.length) {
            var elem = _this2.stack.pop();

            if (elem instanceof Array) {
              elem.forEach(function (e) {
                return result = result + e;
              });
            } else {
              result = result + elem;
            }
          }

          _this2.stack.push(result);
        })();
      } else if (func === "if") {
        var choice2 = this.stack.pop();
        var choice1 = this.stack.pop();
        var condition = this.stack.pop();

        if (condition) {
          this.stack.push(choice1);
        } else {
          this.stack.push(choice2);
        }
      } else if (func === "true") {
        this.stack.push(true);
      } else if (func === "false") {
        this.stack.push(false);
      } else {
        throw new Error("Unimplemented function: ".concat(func));
      }
    } // Exit a parse tree produced by JSONFormulaParser#braceExpression.

  }, {
    key: "exitBraceExpression",
    value: function exitBraceExpression(ctx) {
      this.trace("exitBraceExpression: ".concat(ctx.getText()));
    } // Exit a parse tree produced by JSONFormulaParser#postfix.

  }, {
    key: "exitPostfix",
    value: function exitPostfix(ctx) {
      this.trace("exitPostfix: ".concat(ctx.getText()));
    } // Exit a parse tree produced by JSONFormulaParser#unaryExpression.

  }, {
    key: "exitUnaryExpression",
    value: function exitUnaryExpression(ctx) {
      this.trace("exitUnaryExpression: ".concat(ctx.getText()));
      var op1 = this.stack.pop();
      var op = this.stack.pop();

      if (op === "-") {
        this.stack.push(-op1);
      } else {
        this.stack.push(op1);
      }
    }
  }, {
    key: "exitTopLevelInt",
    value: function exitTopLevelInt(ctx) {
      this.trace("exitTopLevelNumber: ".concat(ctx.getText()));
      this.stack.push(ctx.getText() * 1);
    } // Exit a parse tree produced by JSONFormulaParser#topLevelNumber.

  }, {
    key: "exitTopLevelNumber",
    value: function exitTopLevelNumber(ctx) {
      this.trace("exitTopLevelNumber: ".concat(ctx.getText()));
      this.stack.push(ctx.getText() * 1.0);
    } // Exit a parse tree produced by JSONFormulaParser#unary_op.

  }, {
    key: "exitUnary_op",
    value: function exitUnary_op(ctx) {
      this.trace("exitUnary_op: ".concat(ctx.getText()));
      this.stack.push(ctx.getText());
    } // Exit a parse tree produced by JSONFormulaParser#binary_op.

  }, {
    key: "exitBinary_op",
    value: function exitBinary_op(ctx) {
      this.trace("exitBinary_op: ".concat(ctx.getText()));
      this.stack.push(ctx.getText());
    } // Exit a parse tree produced by JSONFormulaParser#comparison_op.

  }, {
    key: "exitComparison_op",
    value: function exitComparison_op(ctx) {
      this.trace("exitComparison_op: ".concat(ctx.getText()));
    } // Exit a parse tree produced by JSONFormulaParser#postfix_op.

  }, {
    key: "exitPostfix_op",
    value: function exitPostfix_op(ctx) {
      this.trace("exitPostfix_op: ".concat(ctx.getText()));
    } // Exit a parse tree produced by JSONFormulaParser#function_call.

  }, {
    key: "exitFunction_call",
    value: function exitFunction_call(ctx) {
      this.trace("exitFunction_call: ".concat(ctx.getText()));
    } // Exit a parse tree produced by JSONFormulaParser#parameter.

  }, {
    key: "exitParameter",
    value: function exitParameter(ctx) {
      this.trace("exitParameter: ".concat(ctx.getText()));
    } // Exit a parse tree produced by JSONFormulaParser#nonempty_expr_list.

  }, {
    key: "exitNonempty_expr_list",
    value: function exitNonempty_expr_list(ctx) {
      this.trace("exitNonempty_expr_list: ".concat(ctx.getText()));
    } // Exit a parse tree produced by JSONFormulaParser#expression_list.

  }, {
    key: "exitExpression_list",
    value: function exitExpression_list(ctx) {
      this.trace("exitExpression_list: ".concat(ctx.getText()));
    } // Exit a parse tree produced by JSONFormulaParser#intersection_op.

  }, {
    key: "exitIntersection_op",
    value: function exitIntersection_op(ctx) {
      this.trace("exitIntersection_op: ".concat(ctx.getText()));
    } // Exit a parse tree produced by JSONFormulaParser#parm_separator.

  }, {
    key: "exitParm_separator",
    value: function exitParm_separator(ctx) {
      this.trace("exitParm_separator: ".concat(ctx.getText()));
    }
  }]);

  return Listener;
}(JSONFormulaListener);


;// CONCATENATED MODULE: ./src/evaluate.js
function evaluate_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { evaluate_typeof = function _typeof(obj) { return typeof obj; }; } else { evaluate_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return evaluate_typeof(obj); }

function evaluate_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function evaluate_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function evaluate_createClass(Constructor, protoProps, staticProps) { if (protoProps) evaluate_defineProperties(Constructor.prototype, protoProps); if (staticProps) evaluate_defineProperties(Constructor, staticProps); return Constructor; }

function evaluate_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) evaluate_setPrototypeOf(subClass, superClass); }

function evaluate_setPrototypeOf(o, p) { evaluate_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return evaluate_setPrototypeOf(o, p); }

function evaluate_createSuper(Derived) { var hasNativeReflectConstruct = evaluate_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = evaluate_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = evaluate_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return evaluate_possibleConstructorReturn(this, result); }; }

function evaluate_possibleConstructorReturn(self, call) { if (call && (evaluate_typeof(call) === "object" || typeof call === "function")) { return call; } return evaluate_assertThisInitialized(self); }

function evaluate_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function evaluate_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function evaluate_getPrototypeOf(o) { evaluate_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return evaluate_getPrototypeOf(o); }

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




function evaluate(json, expression, trace) {
  var chars = new antlr4.InputStream(expression);
  var lexer = new JSONFormulaLexer(chars);
  lexer._interp.debug = true;
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new JSONFormulaParser(tokens);
  parser.buildParseTrees = true;
  var parseError;

  var ParseErrorListener = /*#__PURE__*/function (_antlr4$error$ErrorLi) {
    evaluate_inherits(ParseErrorListener, _antlr4$error$ErrorLi);

    var _super = evaluate_createSuper(ParseErrorListener);

    function ParseErrorListener() {
      evaluate_classCallCheck(this, ParseErrorListener);

      return _super.apply(this, arguments);
    }

    evaluate_createClass(ParseErrorListener, [{
      key: "syntaxError",
      value: function syntaxError(recognizer, offendingSymbol, line, column, msg) {
        parseError = "line ".concat(line, ", col ").concat(column, ": ").concat(msg);
        if (trace) console.log("ERROR: ".concat(parseError));
      }
    }]);

    return ParseErrorListener;
  }(antlr4.error.ErrorListener);
  /*
  let lexerError;
  class LexerErrorListener extends antlr4.error.ErrorListener {
    syntaxError(recognizer, offendingSymbol, line, column, msg) {
      lexerError = `line ${line}, col ${column}: ${msg}`;
      if (trace) console.log(`ERROR: ${error}`);
    }
  }
  lexer.removeErrorListeners();
  const lexerErrHandler = new LexerErrorListener();
  lexer.addErrorListener(lexerErrHandler);
  */


  var parseErrHandler = new ParseErrorListener();
  parser.removeErrorListeners();
  parser.addErrorListener(parseErrHandler);
  var tree;

  try {
    tree = parser.formula();
  } catch (e) {
    console.log(e);
  }

  var extractor = new Listener(json, trace);
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(extractor, tree);

  if (parseError) {
    if (extractor.result !== undefined) {
      // antlr recovered from the error
      return extractor.result;
    }

    throw new Error(parseError);
  }

  return extractor.result;
}
;// CONCATENATED MODULE: ./src/index.js
function src_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { src_typeof = function _typeof(obj) { return typeof obj; }; } else { src_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return src_typeof(obj); }

function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }

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

var data = document.getElementById("data");
var expression = document.getElementById("expression");
var result = document.getElementById("result");
/*
  Field class allows objects to evaluate correctly according to context.
   - if used in an expression, will return a value or string.
   - for JSON.stringify() returns a scalar
   - BUT also allows explicit access to properties. e.g. field.required, field.name etc.

   Should allow us to eliminate getFieldProperty()
*/

function createField(name, value) {
  var readonly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var required = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var Field = /*#__PURE__*/function () {
    function Field() {
      src_classCallCheck(this, Field);
    }

    src_createClass(Field, [{
      key: "valueOf",
      value: function valueOf() {
        return value;
      }
    }, {
      key: "toString",
      value: function toString() {
        return value.toString();
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return value;
      } // Use getters and scope variables so that the children are not enumerable

    }, {
      key: "value",
      get: function get() {
        return value;
      }
    }, {
      key: "name",
      get: function get() {
        return name;
      }
    }, {
      key: "readonly",
      get: function get() {
        return readonly;
      }
    }, {
      key: "required",
      get: function get() {
        return required;
      }
    }, {
      key: "@value",
      get: function get() {
        return value;
      }
    }, {
      key: "@name",
      get: function get() {
        return name;
      }
    }, {
      key: "@readonly",
      get: function get() {
        return readonly;
      }
    }, {
      key: "@required",
      get: function get() {
        return required;
      }
    }]);

    return Field;
  }();

  return new Field();
}

function createFields(parent, childref, child) {
  if (child instanceof Array) {
    child.forEach(function (item, index) {
      createFields(child, index, item);
    });
  } else if (src_typeof(child) === "object") {
    Object.keys(child).forEach(function (k) {
      createFields(child, k, child[k]);
    });
  } else {
    parent[childref] = createField(childref, parent[childref]);
  }
}

function isField(test) {
  return test !== null && src_typeof(test) === "object" && test.__proto__.constructor.name === "Field";
}

function run() {
  var input = expression.value;
  var json;

  try {
    json = JSON.parse(data.value);

    if (document.getElementById("use-fields").checked) {
      createFields(null, null, json);
    }
  } catch (e) {
    result.value = e.toString();
    return;
  }

  try {
    var r = evaluate(json, input, true);

    if (isField(r)) {
      result.value = r.value;
    } else if (src_typeof(r) === "object") {
      result.value = JSON.stringify(r, null, 2);
    } else {
      result.value = r;
    }
  } catch (e) {
    result.value = e.toString();
  }
}

data.addEventListener("blur", run);
expression.addEventListener("blur", run);
run();
fetch("./antlr/JSONFormula.g4").then(function (r) {
  r.text().then(function (g4) {
    return document.getElementById("grammar-out").innerHTML = g4;
  });
});
})();

JSONFormula = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=json-formula.bundle.js.map