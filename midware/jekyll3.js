"use strict";
const fs = require("fs");
const yaml = require('js-yaml');
const path = require('path');
const yamlFront = require('yaml-front-matter');
const express = require('express');
const markdown = require("./markdown/markdown.js");
const html = require("./liquid/liquid.js");
const sass = require("./sass/sass.js");
const conf = require("./config/main.js");
//const page = require("./page/pages.js");
var MarkdownIt = require('markdown-it');



/**
 * setup - the website with jekyl like  things
 *
 * @param  {exprees.app} app        Exprees
 * @param  {str} root = "." root of the jekyl website
 */
function setup(app, root = ".") {
	const config = new conf.config(root, app);
	let coll = [];



	/**
	 * makeCollection - make all the collection
	 *
	 * @param  {type} collection description
	 * @return {type}            description
	 */
	function makeCollection(collection) {
		console.log('setup_collections->path:' + config.collections[collection].permalink);
		app.use(config.collections[collection].permalink, function(req, res, next) {
			console.log('collections->path:' + req.params.path);
			next();
		});
		//app.use(collection, express.static(root))
	}
	for (let collection in config.collections) {
		console.log("collection: /" + collection + "/");
		makeCollection(collection);
	}
	app.use(function(req, res, next) {
		let filePath = decodeURIComponent(req.path)
		filePath = path.join(root, filePath);
		console.log("enter: " + filePath);
		if (!path.extname(filePath)) {
			console.log("other: " + filePath);
			if (html.htmlLoadFilePass(filePath, req, res, config, root)) {
				console.log("other_html: " + filePath);
				return;
			}
			// if (markdown.markdown(filePath, req, res, config, root)) {
			//return;
			// }
		} else if (path.extname(filePath) == ".html" & html.htmlLoadFilePass(filePath, req, res, config, root)) {
			console.log("html: " + filePath);
			return;
		} else if (path.extname(filePath) == ".js" & html.htmlLoadFilePass(filePath, req, res, config, root)) {
			console.log("js: " + filePath);
			return;
		} else if (path.extname(filePath) == ".md" & markdown.markdown_fs(filePath, req, res, config, root)) {
			console.log("md: " + filePath);
			return;
		} else if (path.extname(filePath) == ".css" & sass.css(root, req.path, req, res)) {
			console.log("css: " + filePath);
			return;
		}
		next();
	});
	app.use(config.site.paginate_path, function(req, res, next) {
		next();
	});
	//paginate_path
	//permalink

	// loop over satic folder to allow root fs acceset
	let fs_list = fs.readdirSync(path.join(root));
	for (var variable of fs_list) {
		if (fs.lstatSync(path.join(root, variable)).isDirectory()) {
			app.use(variable, express.static(root))
		}
	}

	app.use("/news", express.static(root))
	app.use(express.static(root))

	for (let collection in config.collections) {
		app.use("/:xx/", express.static(root));
	}
}
//red.red_router(server)
exports.setup = setup;
