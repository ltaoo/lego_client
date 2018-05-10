// Reference to https://github.com/sindresorhus/ansi-regex
const _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;

interface Colors {
  reset?: Array<string>;
  black?: string;
  red?: string;
  green?: string;
  yellow?: string;
  blue?: string;
  magenta?: string;
  cyan?: string;
  lightgrey?: string;
  darkgrey?: string;
}

const _defColors: Colors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888',
};
const _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey',
};
const _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>', // delete
};
const _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>', // reset delete
};
[0, 21, 22, 27, 28, 39, 49].forEach(function(n: number) {
  _closeTags[n] = '</span>';
});

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
const ansiHTML: Function = (text: string) => {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text;
  }

  // Cache opened sequence.
  const ansiCodes: Array<number> = [];
  // Replace with markup.
  let ret = text.replace(/\033\[(\d+)*m/g, function(match: string, seq: number) {
    const ot = _openTags[seq];
    if (ot) {
      // If current sequence has been opened, close it.
      if (ansiCodes.indexOf(seq) > -1) {
        // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop();
        return '</span>';
      }
      // Open tag.
      ansiCodes.push(seq);
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">';
    }

    const ct = _closeTags[seq];
    if (ct) {
      // Pop sequence
      ansiCodes.pop();
      return ct;
    }
    return '';
  });

  // Make sure tags are closed.
  const l = ansiCodes.length;
  if (l > 0) {
    ret += Array(l + 1).join('</span>');
  }
  return ret;
};

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
export const setColors = function(colors: object) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.');
  }

  const _finalColors: Colors = {};
  const keys = Object.keys(_defColors);
  for (let i = 0, l = keys.length; i < l; i += 1) {
    const key = keys[i];
    let hex = colors.hasOwnProperty(key) ? colors[key] : null;
    if (!hex) {
      _finalColors[key] = _defColors[key];
      continue;
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex];
      }
      if (
        !Array.isArray(hex) ||
        hex.length === 0 ||
        hex.some(function(h: string) {
          return typeof h !== 'string';
        })
      ) {
        throw new Error(
          'The value of `' +
            key +
            '` property must be an Array and each item could only be a hex string, e.g.: FF0000',
        );
      }
      const defHexColor = _defColors[key];
      if (!hex[0]) {
        hex[0] = defHexColor && defHexColor[0];
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]];
        if (defHexColor && defHexColor[1]) {
          hex.push(defHexColor[1]);
        }
      }

      hex = hex.slice(0, 2);
    } else if (typeof hex !== 'string') {
      throw new Error(
        'The value of `' +
          key +
          '` property must be a hex string, e.g.: FF0000',
      );
    }
    _finalColors[key] = hex;
  }
  _setTags(_finalColors);
};

/**
 * Reset colors.
 */
const reset = function() {
  _setTags(_defColors);
};

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
interface Tags {
  open: Object;
  close: Object;
}
export const tags: Tags = {
  open: _openTags,
  close: _closeTags,
};

function _setTags(colors: Colors) {
  // reset all
  if (colors.reset) {
    _openTags['0'] =
      'font-weight:normal;opacity:1;color:#' +
      colors.reset[0] +
      ';background:#' +
      colors.reset[1];
    // inverse
    _openTags['7'] =
      'color:#' + colors.reset[1] + ';background:#' + colors.reset[0];
    // dark grey
    _openTags['90'] = 'color:#' + colors.darkgrey;
    const keys = Object.keys(_styles);
    for (let i = 0, l = keys.length; i < l; i += 1) {
      const code = _styles[i];
      const color = _styles[code];
      const oriColor = colors[color] || '000';
      _openTags[code] = 'color:#' + oriColor;
      const newcode = parseInt(code, 10);
      _openTags[(newcode + 10).toString()] = 'background:#' + oriColor;
    }
  }
}

reset();

export default ansiHTML;
