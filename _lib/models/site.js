"use strict";

const fs = require("fs"),
			Readable = require("stream").Readable,
			CONFIG = require("../../config");

function isJSON(name) {
	return name.match(/\.json$/);
}


function pageTree(cwd) {
	function isDir(name) {
		return fs.statSync(`${cwd}/${name}`).isDirectory();
	}

	const files = fs.readdirSync(cwd),
				json = files.filter(isJSON),
				dirs = files.filter(isDir);

	let result = []
	
		for (let file of json) {
			const page = JSON.parse(fs.readFileSync(`${cwd}/${file}`));
			page.meta.dir = cwd.replace(CONFIG.data.src, "");
			page.meta.filename = file.replace(".json", "");
			result.push(page);
		}
	
		for (let dir of dirs) {
			result = result.concat(pageTree(`${cwd}/${dir}`));
		}
	
	return result;
}

class Site extends Readable {
	constructor() {
		super({objectMode: true});
		this._pages = pageTree(CONFIG.data.src);
		this._current = 0;
	}

	_read() {
		if (this._current === this._pages.length) {
			return this.push(null);
		}
		const data = this._pages[this._current++];
		this.push(data);
	}

	createDataStreams() {
		this.data = {};
		for (let type in CONFIG.data) {
			if (CONFIG.data.hasOwnProperty(type))
				this.data[type] = this.getData(CONFIG.data[type]);
		}
		return this.data;
	}

	getData(directory) {
		const result = [];
		const files = fs.readdirSync(directory).filter(this.jsonFiles);

		for (let file of files) {
			const dataBuffer = fs.readFileSync(`${directory}/${file}`),
						data = JSON.parse(dataBuffer);	
			result.push(data);
		}
		return result;
	}
}

module.exports = Site;

