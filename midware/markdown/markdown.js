const conf = require("../config/main.js");
const html = require("../liquid/liquid.js");
var MarkdownIt = require('markdown-it');
const yamlFront = require('yaml-front-matter');
const fs = require("fs");
const yaml = require('js-yaml');
const path = require('path');




/**
 * markdown_fs - reads markdown from the file system
 *
 * @param  {type} filePath a path to the file
 * @param  {request} req      HTTP request
 * @param  {response} res      HTTP response
 * @param  {config} config   the config manger of the website
 * @param  {string} root     the root of the public
 * @return {bool}          retrun bool true if worked, false if faile
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
 * markdown_pass - will pass the Markdown and put it in to liquidjs
 *
 * @param  {type} data   text of the mark down
 * @param  {request} req      HTTP request
 * @param  {response} res      HTTP response
 * @param  {type} config the config manger of the website
 * @param  {type} root   the root of the public
 * @return {bool}        retrun bool true if worked, false if faile
 */
function markdown_pass(data, req, res, config, root) {
	data = config.pass_yaml_frontmatt(data, req.path);
	console.log(data);
	let md = new MarkdownIt();
	data.content = md.render(data.content);
	if (data.content) {} else {
		res.send(data.content);
		return true;
	}
	return html.htmlPass(data, req, res, config, root);

}
exports.markdown_pass = markdown_pass;
exports.markdown_fs = markdown_fs;
