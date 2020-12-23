const conf = require("../config/main.js");
const yamlFront = require('yaml-front-matter');
const fs = require("fs");
const path = require('path');
const rewite_includes = require('./rewite_includes.js');
const yaml = require('js-yaml');
var { Liquid } = require('liquidjs');

console.log(Liquid);
function htmlLoadFilePass(filePath, req, res, config, root) {
	//console.log(filePath);
	if (path.extname(filePath) == "") {
		filePath = path.join(filePath, "/index.html");
	}
	if (path.extname(filePath) != ".html" & path.extname(filePath) != ".json") {
		return false;
	}
	if (!fs.existsSync(filePath)) {
		//console.log("not HTML:" + filePath);
		return false;
	}
	let data = fs.readFileSync(filePath, 'utf8');
	data = config.pass_yaml_frontmatt(data, req.path);
	return html_pass_and_send(data, req, res, config, root);
}

function html_pass_and_send(data, req, res, config, root) {
	let engine = new Liquid({
		globals: data,
		fs: {
			readFileSync: function(file) {
				console.log(file);
				try {
					let data = fs.readFileSync(file, 'utf8');
					data = yamlFront.loadFront(data);
					if (data.layout) {
						data["__content"] = `{% layout \'${data.layout}.html\' %}\n` + data["__content"];
					}

					return data["__content"];
				} catch (e) {
					console.log(e);
				} finally {

				}
				return "";
			},
			readFile: async function(file) {
				let data = fs.readFileSync(file, 'utf8');
				data = yamlFront.loadFront(data);
				if (data.page.layout) {
					data["__content"] = `{% layout \'${data.page.layout}.html\' %}\n` + data["__content"];
				}
			},
			existsSync: function() {
				return true
			},
			exists: async function() {
				return true
			},
			resolve: function(root, file, ext) {
				let _includes = path.resolve(root, "_includes/", file);
				let _layouts = path.resolve(root, "_layouts", file);
				let other = path.resolve(root, file);
				if (fs.existsSync(_includes)) {
					return _includes;
				} else if (fs.existsSync(_layouts)) {
					return _layouts;
				} else {
					return _layouts;
				}
			}
		},
		jsTruthy: true,
		strictVariables: false,
		strictFilters: false,
		root: root
	});
	engine.registerTag('feed_meta', {
		parse: function(tagToken, remainTokens) {
			return "";
		},
		render: async function(scope, hash) {
			return "";
		}
	});
	engine.plugin(require('./tags/feed_meta.js'));
	engine.plugin(require('./tags/bem-mods.js'));
	engine.plugin(require('./tags/svelte.js'));
	engine.plugin(require('./tags/feed_meta.js')); //feed_meta
	engine.plugin(require('./tags/unbind.js'));
	let html_ = data["content"];
	if (data.page.layout) {
		html_ = `{% layout \'${data.page.layout}.html\' %}\n` + html_;
	}
	html_ = engine.parseAndRenderSync(html_, {});
	res.send(html_);
	console.log(data.page);
	return true;
}

exports.htmlLoadFilePass = htmlLoadFilePass;
exports.htmlPass = html_pass_and_send;
exports.html_pass = html_pass_and_send;
