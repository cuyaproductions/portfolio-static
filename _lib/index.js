"use strict";

module.exports.start = function() {
	const SiteStream = require("./models").Site,
				SiteRender = require("./renderer").Site,
				PageMaker = require("./filemaker").Page;

	const mySite = new SiteStream();
	const siteRender = new SiteRender();
	const pageMaker = new PageMaker();

	mySite.pipe(siteRender).pipe(pageMaker);

}
