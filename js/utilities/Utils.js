"use strict";

export default class Utils {
	// La recherche débute à 3 caractères ou plus
	static Valid(value) {
		return value.length > 2;
	}

	// Efface les recettes
	static clearRecipes() {
		return (document.getElementById("mainContent").innerHTML = "");
	}
}
