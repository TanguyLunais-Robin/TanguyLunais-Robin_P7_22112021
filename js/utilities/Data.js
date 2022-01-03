"use strict";

export default class Data {
	// récupérer tous les ingrédient pour les faire apparaitre par défault avant la recherche
	static getAllIngredients(ing) {
		let ingredients = [];
		ing.forEach((recipe) => {
			recipe.ingredients.forEach((ing) => {
				if (!ingredients.includes(ing.ingredient.toLowerCase()))
					ingredients.push(ing.ingredient.toLowerCase());
			});
		});
		return ingredients;
	}

	// récupérer tous les appareils pour les faire apparaitre par défault avant la recherche
	static getAllAppliances(app) {
		let appliances = [];
		app.forEach((recipe) => {
			if (!appliances.includes(recipe.appliance.toLowerCase()))
				appliances.push(recipe.appliance.toLowerCase());
		});
		return appliances;
	}

	// récupérer tous les ustensils pour les faire apparaitre par défault avant la recherche
	static getAllUstensils(ust) {
		let ustensils = [];
		ust.forEach((recipe) => {
			recipe.ustensils.forEach((ustensil) => {
				if (!ustensils.includes(ustensil.toLowerCase()))
					ustensils.push(ustensil.toLowerCase());
			});
		});
		return ustensils;
	}
}
