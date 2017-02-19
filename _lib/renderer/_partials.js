"use strict";

const HBS = require("handlebars"),
			fs = require("fs"),
			CONFIG = require("../../config");

module.exports = (() => {
	const files = fs.readdirSync(CONFIG.partials.src);

	for (let file of files) {
		const templatebody = fs.readFileSync(`${CONFIG.partials.src}/${file}`),
					partialname = file.replace(/\..+/, "");

		HBS.registerPartial(partialname, templatebody.toString());
	}
})();
