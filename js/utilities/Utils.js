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

	static clearFilters(elt) {
		return (elt.innerHTML = "");
	}

	static normalizeText(text) {
		return text
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "");
	}

	// Transforme le texte en majuscule
	static upperText(text) {
		return (
			text
				.charAt(0)
				.toUpperCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "") +
			text
				.substring(1)
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
		);
	}

	// Collect tous les ingrédient et les tris alphabétiquement
	static sortByTitle(array) {
		let arrayNoSort = [...new Set(array)];
		let arraySort = arrayNoSort.sort((a, b) => {
			if (a.toLowerCase() < b.toLowerCase()) {
				return -1;
			} else if (a.toLowerCase() > b.toLowerCase()) {
				return 1;
			}
		});

		return arraySort;
	}
}
