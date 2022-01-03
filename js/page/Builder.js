"use strict";

import Display from "./Display.js";

export default class Builder {
	static init() {
		// Construit la section avant la recherche
		Display.buildResult(recipes);
	}

	static initSearch(result) {
		// Construit la section après la recherche
		Display.buildResult(result.recipesMatched);
	}
}
