var path = require('path');
var fs = require('fs');
const markdown = require("../markdown/markdown.js");
const html = require("../liquid/liquid.js");
const express = require('express');
class Collections {
		app.use(path.join(root, collection), express.static(root))
	}
}

class Defaults {
	constructor(app, root, default_, config) {}
}
exports.Collections = Collections;
exports.Defaults = Defaults;
