"use strict";

export default class Search {
	static searchMainInput(value) {
		let recipesMatched = [];

		recipes.forEach((recipe) => {
			if (
				recipe.name.includes(value) ||
				recipe.description.includes(value) ||
				recipe.ingredients.some((elt) => elt.ingredient.includes(value))
			) {
				recipesMatched.push(recipe);
			}
		});
		return {
			recipesMatched,
		};
	}
}
