"use strict";

const HBS = require("handlebars"),
			fs = require("fs"),
			CONFIG = require("../../config");

const templates = {};

const files = fs.readdirSync(CONFIG.templates.src);

for (let file of files) {
	const templateBody = fs.readFileSync(`${CONFIG.templates.src}/${file}`),
				templateName = file.replace(/\..+/, "");

	templates[templateName] = HBS.compile(templateBody.toString());
}


module.exports = templates;
