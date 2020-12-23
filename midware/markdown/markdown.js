const conf = require("../config/main.js");
const html = require("../liquid/liquid.js");
var MarkdownIt = require('markdown-it');
const yamlFront = require('yaml-front-matter');
const fs = require("fs");
const yaml = require('js-yaml');
const path = require('path');



/**
 * markdown_fs - description
 *
 * @param  {type} filePath description
 * @param  {type} req      description
 * @param  {type} res      description
 * @param  {type} config   description
 * @param  {type} root     description
 * @return {type}          description
 */
function markdown_fs(filePath, req, res, config, root) {
	if (!fs.existsSync(filePath)) {
		if (fs.existsSync(path.join(filePath, "index.md"))) {
			filePath = path.join(filePath, "index.md");
		}
	}
	if (path.extname(filePath) != ".md") {
		return false;
	}
	if (!fs.existsSync(filePath)) {
		return false;
	}
	let data = fs.readFileSync(filePath, 'utf8');
	return markdown_pass(data, req, res, config, root);
}

/**
 * markdown_pass - description
 *
 * @param  {type} data   description
 * @param  {type} req    description
 * @param  {type} res    description
 * @param  {type} config description
 * @param  {type} root   description
 * @return {type}        description
 */
function markdown_pass(data, req, res, config, root) {
	data = config.pass_yaml_frontmatt(data, req.path);
	let md = new MarkdownIt();
	let content = md.render(data.content);
	console.log(content);

	return html.htmlPass(data, req, res, config, root,content);

}
exports.markdown_pass = markdown_pass;
exports.markdown_fs = markdown_fs;
