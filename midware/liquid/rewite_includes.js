var { Liquid, Tokenizer } = require('liquidjs');
var path = require('path');


/**
 * Rewrite Jekyll includes to match LiquidJS syntax
 * @param  {Buffer} text File contents of a Jekyll include
 * @param  {String} path File path of an include
 * @return {String}      File context of a LiquidJS include
 */
function rewriteIncludes (text) {
    text = text.toString();
    let tokenizer = new Tokenizer(text);
    let output = tokenizer.readTopLevelTokens();
      output.reverse().forEach(tag => {
      text = rewriteTag(tag, text);
    });

    return `{% unbind %}${text}`;
};

/**
 * const rewriteTag - description
 *
 * @param  {type} token description
 * @param  {type} src   description
 * @return {type}       description
 */
const rewriteTag = function(token, src) {
  let raw = token.getText();
  let length = raw.length;

  if (token.kind === 16) return src; // html
  if (token.name && token.name.match(/^end/)) return src;

  if (token.name && token.name === 'include_cached') raw = raw.replace(/include_cached/, 'include');
  if (token.name && token.name === 'component') {
    token.name = 'include';
    raw = raw.replace(
      /component (\S+)/,
      (_, component) => {
        let cpath = component.split('/');
        let cname = cpath[cpath.length - 1];
        return `include ${component}/${cname}.jekyll.html`
      }
    );
  }
  if (token.name && token.name.match(/^include/)) {
    raw = raw.replace(/=/g, ': ');
    raw = raw.replace(/include\s([^"'][^\s]+)/gi, 'include "$1"');
  }

  raw = raw.replace(/\binclude\./gi, '');

  return [
     src.substr(0, token.begin),
     raw,
     src.substr(token.end)
   ].join('');

}

module.exports = {
    rewriteIncludes: rewriteIncludes
}
