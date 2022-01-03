"use strict";
import Builder from "./page/Builder.js";
import Search from "./search/Search.js";
import Utils from "./utilities/Utils.js";
import Messages from "./page/Msg.js";

// Construit par default sans la recherche
Builder.init();

// Construit avec la recherche Input
document.getElementById("searchBarInput").addEventListener("keyup", (key) => {
	let valueSearch = key.target.value;
	if (Utils.Valid(valueSearch)) {
		console.time();

		let result = Search.searchMainInput(valueSearch);
		if (result.recipesMatched.length === 0) {
			return Messages.buildResultMessageWithNoResult();
		}
		Utils.clearRecipes();
		Builder.initSearch(result);
		console.timeEnd();

		return;
	}
	// Reset le build
	Utils.clearRecipes();
	Builder.init();
	//test
});
