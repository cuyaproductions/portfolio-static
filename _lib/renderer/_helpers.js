"use strict";

const HBS = require("handlebars"),
			path = require("path");

module.exports = (() => {
	HBS.registerHelper({
		relative_link: function (link) {
			const dirArr = this.meta.dir.split(path.sep);

			if (link === this.meta.dir) return "";
			if (dirArr.length === 1) return link;

			let result = "";
			for(let ii= 1; ii < dirArr.length; ii++) {
				result += "../";
			}
			return result + link;
		},

		feature_coords: function () {
			const coords = this.coordinates;
			let result = "";

			for (let position in coords) {
				result += `${position}: ${coords[position]}%; `;
			}
			return result;
		}
	});
})();
