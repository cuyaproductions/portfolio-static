"use strict";

const Transform = require("stream").Transform,
			templates = require("./_templates");

const inspect = require("util").inspect;

require("./_partials"); // Register partials
require("./_helpers"); // Register helpers

function render(page) {	
	return templates[page.meta.template](page);
}
class Site extends Transform {
	constructor() {
		super({objectMode: true});
	}

	_transform(page, encoding, next) {
		page.rendered = render(page);
		this.push(page);
		next();
	}
}

module.exports = Site;
