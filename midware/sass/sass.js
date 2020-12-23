const sass = require('sass');

const conf = require("../config/main.js");
const fs = require("fs");
const yaml = require('js-yaml');
const path = require('path');



/**
 * css - description
 *
 * @param  {type} root  description
 * @param  {type} path_ description
 * @param  {type} req   description
 * @param  {type} res   description
 * @return {type}       description
 */
function css(root, path_, req, res) {
	let filePath = decodeURIComponent(path_);
	if (path.extname(filePath) != ".css") {
		return false;
	}
	filePath = path.join(root, path_);
	if (fs.existsSync(filePath)) {
		return false
	}
	//Check for scss not class
	filePath = path.join(root, "_sass", "main.scss");
	if (fs.existsSync(filePath)) {
		console.log("found scss file");
		var result = sass.renderSync({
			file: filePath,
			"strictVariables": false
		});
		res.send(result.css);
		return true
	}
	return false;
}
exports.css = css;
