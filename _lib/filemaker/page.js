"use strict";

const Writable = require("stream").Writable,
			fs = require("fs"),
			path = require("path"),
			CONFIG = require("../../config");

class Page extends Writable {
	constructor() {
		super({objectMode: true});
	}

	_write(page, encoding, next) {
		const dir = path.join(CONFIG.www.dest, page.meta.dir);
		fs.stat(dir, error => {
			if(error) {
				fs.mkdirSync(dir);
			}
			fs.writeFile(`${dir}/${page.meta.filename}.html`, page.rendered, error => {
				if (error) throw new Error(`Could not create ${CONFIG.www.dest}/${page.meta.slug}`);
				next();
			});	
		});
	}
}

module.exports = Page;
