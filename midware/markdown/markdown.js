const conf = require("../config/main.js");
const html = require("../liquid/liquid.js");
var MarkdownIt = require('markdown-it');
const yamlFront = require('yaml-front-matter');
const fs = require("fs");
const yaml = require('js-yaml');
const path = require('path');



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
