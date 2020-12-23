const fs = require("fs");
const yaml = require('js-yaml');
const yamlFront = require('yaml-front-matter');
const path = require('path');
var express = require('express')

/**
 * isSubDirectory - description
 *
 * @param  {type} parent description
 * @param  {type} child  description
 * @return {type}        description
 */
function isSubDirectory(parent, child) {
	return !path.relative(parent, child).startsWith('..');
}

class Defaults {

	/**
	 * constructor - description
	 *
	 * @param  {string} path      description
	 * @param  {type} values    description
	 * @param  {type} root_path description
	 * @return {type}           description
	 */
	constructor(path, values, root_path) {
		this.router = express.Router()
		router.get('/' + path, function(req, res, next) {
			let file_path = url.parse(req.path).pathname;
			path.join(variable.scope.path, fileStats.name)
			let data = fs.readFileSync(path.join(root, fileStats.name), 'utf8');
			let ext_name = path.extname(file_path);
			if (ext_name == ".html" || ext_name == ".md") {
				res.send(html);
				return;
			} else if (path.extname("") == "") {
				res.send(html);
				return;
			} else {
				res.send(html);
				return;
			}
		});
	}
}

class Config {

	/**
	 * constructor - description
	 *
	 * @param  {type} root = "." description
	 * @param  {type} app        description
	 * @return {type}            description
	 */
	constructor(root = ".", app) {
		this.root = root;
		this.collections = {}
		this.defaults = {}
		this.reload(app, root)

	}

	/**
	 * reload - description
	 *
	 * @param  {type} app  description
	 * @param  {type} root description
	 * @return {type}      description
	 */
	reload(app, root) {
		this.posts = {};

		this.site = yaml.safeLoad(fs.readFileSync(path.join(this.root, "_config.yml"), 'utf8'));
		this.site.time = Date.now();
		this.paginator = {}
		if (!this.site.pages) {
			this.site.pages = [];
		}
		if (!this.site.posts) {
			this.site.posts = [];
		}
		if (!this.site.related_posts) {
			this.site.related_posts = [];
		}
		if (!this.site.static_files) {
			this.site.static_files = [];
		}
		if (!this.site.html_pages) {
			this.site.html_pages = [];
		}
		if (!this.site.data) {
			this.site.data = [];
		}
		if (!this.site.documents) {
			this.site.documents = [];
		}
		if (!this.site.categories) {
			this.site.categories = [];
		}
		if (!this.site.tags) {
			this.site.tags = [];
		}
		if (!this.site.api) {
			this.site.api = [];
		}
		if (!this.paginator.paginate_path) {
			this.paginator.paginate_path = "/blog/page:num/"
		}
		if (!this.paginator.page) {
			this.paginator.page = 0;
		}
		if (!this.paginator.per_page) {
			this.paginator.per_page = 0;
		}
		if (!this.paginator.posts) {
			this.paginator.posts = 0;
		}
		if (!this.paginator.total_posts) {
			this.paginator.total_posts = 0;
		}
		if (!this.paginator.total_pages) {
			this.paginator.total_pages = 0;
		}
		if (!this.paginator.previous_page) {
			this.paginator.previous_page = null;
		}
		if (!this.paginator.previous_page_path) {
			this.paginator.previous_page_path = null;
		}
		if (!this.paginator.next_page) {
			this.paginator.next_page = null;
		}
		if (!this.paginator.next_page_path) {
			this.paginator.next_page_path = null;
		}


		this.defaults = this.site.defaults;

		let defaults2 = {}
		for (let default_ in this.defaults) {
			defaults2[this.defaults[default_].scope.path] = this.defaults[default_].values
		}
		this.defaults = defaults2;
		this.collections = this.site.collections;
		for (var collection in this.site.collections) {


		}
		let apis_fs_dir = fs.readdirSync(path.join(this.root, "api"));
		for (var api_fs of apis_fs_dir) {
			let api_fs_ = path.join(this.root, "api", api_fs);
			let data = fs.readFileSync(api_fs_, 'utf8')
			switch (path.extname(api_fs_)) {
				case ".json":
					let api_name = path.basename(api_fs_, '.json')
					this.site.api[api_name] = {}
					break;
				case ".md":
				case ".html":
					this.site.paginator++
					//this.site.html_pages.push();
					//paginator.total_pages
					break;
				default:

			}

		}

		let post_fs_dirs = fs.readdirSync(path.join(this.root, "_posts"));
		while (post_fs_dirs.length) {
			let post_fs_dir = post_fs_dirs.pop();
			if (fs.lstatSync(path.join(this.root, "_posts", post_fs_dir)).isDirectory()) {
				for (var name of fs.readdirSync(path.join(this.root, "_posts", post_fs_dir))) {
					post_fs_dirs.push(path.join(post_fs_dir, name))

				}
			} else {
				let regex = /([0-9]*)-([0-1][0-9])-([0-9][0-9])-(.*)\.md/g;
				let array = [...post_fs_dir.matchAll(regex)];
				let markdown = fs.readFileSync(path.join(this.root, "_posts", post_fs_dir), 'utf8');
				let data = yamlFront.loadFront(markdown);
				'/article/:title.html'.split(path.sep);
				data.title = "";
				data.fname = array[0][4];
				data.author = data.author;
				data.categories = data.category;
				data.content = data.__content;
				data.baseurl = path.join("_posts", post_fs_dir);
				data.date = new Date(array[0][1], array[0][2], array[0][3]);
				data.path = post_fs_dir;
				data.url = "";
				data.excerpt = "";
				this.site.posts.push(data);
			}

		}

		let post_fs_datas = fs.readdirSync(path.join(this.root, "_data"));
		while (post_fs_datas.length) {
			let post_fs_data = post_fs_datas.pop();
			if (fs.lstatSync(path.join(this.root, "_data", post_fs_data)).isDirectory()) {
				for (var name of fs.readdirSync(path.join(this.root, "_data", post_fs_data))) {
					post_fs_datas.push(path.join(post_fs_data, name))
				}
			} else {
			//	console.log(post_fs_data);
				switch (path.extname(post_fs_data)) {
					case ".yaml":
						this.site.data[path.basename(post_fs_data, ".yaml")] = yaml.safeLoad(fs.readFileSync(path.join(this.root, "_data", post_fs_data), 'utf8'));
						break;
					case ".yml":
						this.site.data[path.basename(post_fs_data, ".yml")] = yaml.safeLoad(fs.readFileSync(path.join(this.root, "_data", post_fs_data), 'utf8'));
						break;
					case ".json":
						this.site.data[path.basename(post_fs_data, ".json")] = require(path.join(this.root, "_data", post_fs_data));
						break;
					default:

				}

			}

		}
		post_fs_dirs = fs.readdirSync(path.join(this.root));
		for (var post_fs_dir of post_fs_dirs) {
			if (post_fs_dir == "_data") {
				break;
			}
			if (post_fs_dir == "_includes") {
				break;
			}
			if (post_fs_dir == "_layouts") {
				break;
			}
			if (post_fs_dir == "_sass") {
				break;
			}
			app.use(path.join(post_fs_dir), express.static(root))
		}
		post_fs_dirs = fs.readdirSync(path.join(this.root));
		while (post_fs_dirs.length) {
			let post_fs_dir = post_fs_dirs.pop();
			if (post_fs_dir == "_data") {
				break;
			}
			if (post_fs_dir == "_includes") {
				break;
			}
			if (post_fs_dir == "_layouts") {
				break;
			}
			if (post_fs_dir == "_sass") {
				break;
			}
			if (fs.lstatSync(path.join(this.root, post_fs_dir)).isDirectory()) {
				let files = fs.readdirSync(path.join(this.root, post_fs_dir));
				for (var file of files) {
					post_fs_dirs.push(path.join(post_fs_dir, file));
				}
			} else {
				switch (path.extname(post_fs_dir)) {
					case ".html":
					case ".md":
						break;
					case ".json":
					default:
						this.site.static_files.push({
							"path": post_fs_dir,
							"modified_time": "",
							"name": "",
							"basename": "",
							"extname": ""
						});

				}
			}

			//	let markdown = fs.readFileSync(path.join(this.root, post_fs_dir), 'utf8');
		}
	}

	/**
	 * pass_yaml_frontmatt - description
	 *
	 * @param  {type} data         description
	 * @param  {type} pathfs = "/" description
	 * @return {type}              description
	 */
	pass_yaml_frontmatt(data, pathfs = "/") {
		for (var default_ in this.defaults) {
			if (isSubDirectory("/" + default_, pathfs)) {
				//console.log(default_);
			}
		}
		let page = yamlFront.loadFront(data);
		let __content = page["__content"];
		let datad = {
			"site": this.site,
			"content": __content,
			"page": page,
			"paginator": this.paginator,
		}
		datad.page = page;
		datad.page.content = page["__content"];
		datad.page.url = pathfs;
		datad.page.dir = pathfs;
		datad.page.name = pathfs;
		datad.page.path = pathfs;
		datad.page.next = null;
		datad.page.nomenu = true;
		datad.page.previous = null;
		datad.content = page["__content"];
		delete datad.__content
		return datad;
	}
}
exports.config = Config;
