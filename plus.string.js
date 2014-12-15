/*
 * Plus.string.js 1.0.1
 * https://github.com/singno/plus/
 *
 * Copyright 2014, singno
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 */
;(function (root) {	// `root == window` in the browser, `root == exports` on the server.  
	'use strict';

	// Native APIS of `ECMAScript 5`.
	var nativeTrim = String.prototype.trim,
		nativeTrimLeft = String.prototype.trimLeft,
		nativeTrimRight = String.prototype.trimRight;

	// Short Reference of core prototypes.
	var slice = Array.prototype.slice;

	// Cache RegExps instead of constructing them everytime. 
	var rtitleize = /(^|\s)([a-z])/gi,
		rformat = /\{([^}]+)\}/g,
		rtrimLeft = /^\s+/,
		rtrimRight = /\s+$/,
		rwhiteSpace = /\s+/g,
		rletters = /[a-zA-Z]/g,
		rescapeEntity = /[<>&"']/g,
		runescapeEntity = /&([^;]+);/g,
		rentityCodeHex = /^#x([\da-fA-F]+)$/,
		rentityCode = /^#(\d+)$/,
		runderscored = /[\s\-]+/g,
		rblank = /^\s*$/,
		rcamelize = /(?:_+)(\w)/g,
		rlowerUpper = /([a-z])([A-Z])/g,
		rdasherize = /[\-_\s]+/g,
		runderscore = /_+/g,
		rupper = /[A-Z]/g,
		rtags = /<[^>]*?>/g,

		// Escape `.*+?^=!:${}()|[]/\` characters.
		rescapeRegExp = /([.*+?^=!:${}()|[\]\/\\])/g,
		runicode = /\\u([a-f0-9]{4})/gi,
		rHTMLEntity = /&#([^;]+);/g,

		// All chars are upperCase
		rstrUpper = /^[A-Z]+$/g,

		// All chars are lowerCase
		rstrLower = /^[a-z]+$/g;

	var escapeEntity = {
	    "<": "&lt;",
	    ">": "&gt;",
	    "&": "&amp;",
	    "\"": "&quot;",
	    "'": "&#x27;"
	},
		unescapeEntity = {};

	for (var prop in escapeEntity) {
		if (escapeEntity.hasOwnProperty(prop)) {
			unescapeEntity[escapeEntity[prop]] = prop;
		}
	}

	function extend (target) {
		var source;

		for (var i = 1, len = arguments.length; i < len; i++) {
			source = arguments[i];
			if (typeof source !== 'object') {
				continue;
			}

			for (var prop in source) {
				if (source.hasOwnProperty(prop)) {
					target[prop] = source[prop];
				}
			}
		}

		return target;
	}

	function S (str) {
		if (!(this instanceof S)) {
			return new S(str);
		}

		str += '';
		this._string = str;
		this._chain = false;
	}

	extend(S, {
		VERSION: '1.0.1',

		count: function (str, substr) {
			str += '';
			return str.split(substr).length - 1;
		},

		isBlank: function (str) {
			return rblank.test(str);
		},

		startsWith: function (str, substr) {
			return str.indexOf(substr) === 0;
		},

		endsWith: function (str, substr) {
			str += '';
			substr += '';

			var idx = str.lastIndexOf(substr);
			return str.length === idx + substr.length;
		},

		chop: function (str, step) {
			str += '';
			step = Math.floor(Math.abs(step)) || 1;
			var parts = [];
			for (var i = 0, len = str.length; i < len;) {
				parts.push(str.slice(i, i += step));
			}

			return parts;
		},

		isUpper: function (str) {
			return rstrUpper.test(str);
		},

		isLower: function (str) {
			return rstrLower.test(str);
		}
	}, {
		capitalize: function (str) {
			str += '';
	     	return str.charAt(0).toUpperCase() + str.slice(1); 
	    },

	    titleize: function (str) {
			str += '';
	       	return str.replace(rtitleize, function (s, blank, letter) {
	       		return blank + letter.toUpperCase();
	       	});
		},

	    format: function (str, data) {
		    str += '';
		    data = data || {};

		    var formatStr = str.replace(rformat, function(match, paren){
		        if(data.hasOwnProperty(paren)){
		            return data[paren];
		        }

		        return match;
		    });
		    return formatStr;
		},

		trim: function (str) {
			str += '';
			return nativeTrim ? nativeTrim.call(str) : str.replace(rtrimLeft, '').replace(rtrimRight, ''); 	
		},

		trimLeft: function (str) {
			str += '';
			return nativeTrimLeft ? nativeTrimLeft.call(str) : str.replace(rtrimLeft, '');
		},

		trimRight: function (str) {
			str += '';
			return nativeTrimRight ? nativeTrimRight.call(str) : str.replace(rtrimRight, '');
		},

		clean: function (str) {
			str = S.trim(str);
			return str.replace(rwhiteSpace, ' ');
		},

		swapCase: function (str) {
			str += '';
			return str.replace(rletters, function (c) {
				return c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase();
			});
		},

		escapeHTML: function (str) {
			str += '';
			return str.replace(rescapeEntity, function (entity) {
		        return escapeEntity[entity];
		    });
		},

		unescapeHTML: function (str) {
			str += '';
			str = str.replace(runescapeEntity, function (entity, entityCode) {
				var match;

				if (unescapeEntity.hasOwnProperty(entity)) {
					return unescapeEntity[entity];
				}

				if (match = entityCode.match(rentityCodeHex)) {
					return String.fromCharCode(parseInt(match[1], 16));
				}

				if (match = entityCode.match(rentityCode)) {
					return String.fromCharCode(match[1]);
				}

				return entity;
			});
			return str;
		},

		toHTMLEntity: function (str, radix) {
			str += '';
			radix = +radix || 10;
			var result = [];

			for (var i = 0, len = str.length; i < len; i++) {
				// `&#x{hexCharCode};` for hexadecimal; `&#{decimalCharCode};` for decimal.
				//  For example: ['&#x3e;', '&#62;'] both is '>';
				result.push('&#' + (radix === 16 ? 'x' : '') + str.charCodeAt(i).toString(radix) + ';');
			}

			return result.join('');
		},

		fromHTMLEntity: function (str) {
			return str.replace(rHTMLEntity, function (match, code) {
				// If the code is hexadecimal
				if (code.charAt(0) === 'x') {
					code = '0' + code;
				}

				return String.fromCharCode(code);
			});
		},

		toUnicode: function (str) {
			str += '';
		    var result = [],
		        unicode;

		    for (var i = 0, len = str.length; i < len; i++) {
		    	// The unicode format is `\u{hexCharCode}`
		    	// If the `String(hexCharCode).length < 4`, left pad with '0'.
		        unicode = str.charCodeAt(i).toString(16);
		        unicode = '\\u0000'.slice(0, -unicode.length) + unicode;
		        result.push(unicode);
		    }

		    return result.join(''); 
		},

		fromUnicode: function (str) {
			str += '';

			return str.replace(runicode, function (m, hex) {
				return String.fromCharCode(parseInt(hex, 16));
			});
		},

		reverse: function (str) {
			str += '';
			return str.split('').reverse().join('');
		},

		splice: function (str, idx, count, substr) {
			str += '';
			idx -= 0;
			count -= 0;
			var parts = [
				str.slice(0, idx),
				str.slice(idx + count + (idx > 0 ? 0 : str.length))
			]; 
			return parts.join(substr);
		},

		insert: function (str, idx, substr) {
			return S.splice(str, idx, 0, substr);
		},

		underscored: function (str) {
			return S.trim(str).replace(runderscored, '_').replace(rlowerUpper, '$1_$2').toLowerCase();
		},

		camelize: function (str) {
			return S.underscored(str).replace(rcamelize, function (m, letter) {
				return letter.toUpperCase();
			});
		},

		classify: function (str) {
			str = S.camelize(str);
			return str.charAt(0).toUpperCase() + str.slice(1);
		},

		dasherize: function (str) {
			return S.trim(str).
					replace(rupper, '-$&').
					replace(rdasherize, '-').
					toLowerCase();	
		},

		humanize: function (str) {
			return S(str).chain().underscored().capitalize().value().replace(runderscore, ' ');
		},

		truncate: function (str, len, truncateStr) {
			str += '';
			len = len || 0;
			truncateStr = truncateStr == null ? '...' : truncateStr;

			if (str.length <= len) {
				return str;
			}

			str = str.slice(0, len);
			return str + truncateStr;
		},

		sprintf: function () {
			// todo	
		},

		repeat: function (str, count, separator) {
			var arr = [];
			separator = separator == null ? '' : separator;

			for (var i = 0; i < count; i++) {
				arr.push(str);
			}
			return arr.join(separator);
		},

		surround: function (str, wrap) {
			str += '';
			wrap = wrap == null ? '' : String(wrap); 
			return wrap + str + wrap;
		},

		pad: function (str, len, padStr, type) {
			padStr = padStr == null ? ' ' : padStr;
			type = type || 'left';
			var repeatStr = S.repeat(padStr, len);

			switch (type) {
				case 'right':
					return str + repeatStr;
				case 'both':
					return repeatStr + str + repeatStr;
				case 'left':
				case 'default':
					return repeatStr + str;
			}	
		},

		lpad: function (str, len, padStr) {
			return S.pad(str, len, padStr, 'left');
		},

		rpad: function (str, len, padStr) {
			return S.pad(str, len, padStr, 'right');
		},

		lrpad: function (str, len, padStr) {
			return S.pad(str, len, padStr, 'both');
		},

		strRight: function (str, pattern, offset) {
			str += '';
			pattern += '';

			var idx = str.indexOf(pattern, offset);

			if (idx === -1) {
				return str;
			}

			return str.slice(idx + pattern.length);
		},

		strRightBack: function (str, pattern, offset) {
			str += '';
			pattern += '';

			var idx = str.lastIndexOf(pattern, offset);

			if (idx === -1) {
				return str;
			}

			return str.slice(idx + pattern.length);
		},

		strLeft: function (str, pattern, offset) {
			str += '';

			var idx = str.indexOf(pattern, offset);

			if (idx === -1) {
				return str;
			}

			return str.slice(0, idx);
		},

		strLeftBack: function (str, pattern, offset) {
			str += '';

			var idx = str.lastIndexOf(pattern, offset);

			if (idx === -1) {
				return str;
			}

			return str.slice(0, idx);
		},

		stripTags: function (str) {
			str += ''
			return str.replace(rtags, '');
		},

		escapeRegExp: function (str) {
			str += '';
			return str.replace(rescapeRegExp, '\\$1');
		},

		charLength: function (str) {
			str += '';
			var count = 0;

			for (var i = 0, len = str.length; i < len; i++) {
				if (str[i].charCodeAt(i) > 255) {
					count += 2;
				} else {
					count++;
				}
			}

			return count;
		}
	});

	var fn = S.prototype;

	fn.value 
	= fn.valueOf
	= fn.toString
	= fn.toLocaleString
	= function () {
		return this._string;
	};

	fn.chain = function () {
		this._chain = true;
		return this;
	};

	for (var prop in S) {
		if (typeof S[prop] !== 'function') {
			continue;
		}

		(function (prop) {
			fn[prop] = function () {
				var argv = [this._string].concat(slice.call(arguments)),
					str = S[prop].apply(this, argv); 

				return this._chain ? S(str).chain() : str;	
			};
		})(prop); 
	}

	if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
        module.exports = S;
    } else if (typeof (define) === 'function' && define.amd) { // AMD
        define('plus.string', function () {
            return S;
        });
    } else { // Exports to global namespace.
    	var _ = root._ = root._ || {};
        _.str = _.string = S;
    }

})(this);




