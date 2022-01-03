"use strict";

import Button from "../page/Button.js";
import Display from "../page/Display.js";
import Msg from "../page/Msg.js";
import Search from "../search/Search.js";
import Tag from "../page/Tag.js";
import Utils from "../utilities/Utils.js";
import Data from "../utilities/Data.js";

export default class Ingredients {
	static ingredientsExample = document.getElementById("ingredientsExample");

	static init(ingredients, recipes) {
		Utils.clearFilters(this.ingredientsExample);
		Button.launchButtons(
			document.querySelector("#ingredients > button"),
			document.querySelector("#openIngredientsFilter"),
			document.querySelector("#closeIngredientsFilter"),
			document.querySelector("#hiddenIngredientsFilter")
		);
		this.fillIngredients(Utils.sortByTitle(ingredients));
		this.searchInput(ingredients);
		this.filterTags(recipes);
	}

	// affiche les ingrédients dans la zone ingrédient en accord avec  des recettes affichées dans la section recettes
	static fillIngredients(ingredients) {
		let ul = document.createElement("ul");
		ul.classList.add("listUlIng");
		this.ingredientsExample.appendChild(ul);

		ingredients.forEach((ingredient) => {
			let listIngredients = document.createElement("li");

			ul.appendChild(listIngredients);
			listIngredients.innerHTML = `${Utils.upperText(ingredient)}`;
			listIngredients.classList.add("list-ingredients");
			listIngredients.setAttribute("data-filter", `${ingredient}`);
		});
	}

	// autoriser la recherche pour les ingrédents dans l'input des ingrédients présent dans les recettes affichés
	static searchInput(ingredients) {
		document.getElementById("inputIngredients").addEventListener("keyup", (key) => {
			let valueSearch = key.target.value;
			Utils.clearFilters(this.ingredientsExample);
			this.fillIngredients(
				Utils.Valid(valueSearch)
					? Search.searchInputFilters(ingredients, valueSearch)
					: Utils.sortByTitle(ingredients)
			);
		});
	}

	static filterTags(recipes) {
		let selected = [];
		let ingredientTag = document.getElementById("ingredientTag");

		document.querySelector("#ingredientsExample").addEventListener("click", (event) => {
			let classValue = event.target.classList.value;

			if (-1 === classValue.indexOf("selected")) {
				event.target.classList.add("selected");
				selected.push(event.target.getAttribute("data-filter"));
				Button.hideButtonsOnClick(
					document.querySelector("#ingredients > button"),
					document.querySelector("#openIngredientsFilter"),
					document.querySelector("#hiddenIngredientsFilter")
				);
				Tag.buildTags(
					ingredientTag,
					Utils.upperText(event.target.getAttribute("data-filter"))
				).removeTagsOnClick(
					document.querySelector("#ingredientTag > i"),
					event,
					ingredientTag,
					recipes
				);
				Msg.buildResultMessageWithResult(Search.searchByIngTags(recipes, selected));
				Utils.clearRecipes();
				let result = Search.searchByIngTags(recipes, selected);
				Display.buildResult(result);
				Utils.clearFilters(this.ingredientsExample);
				this.fillIngredients(Utils.sortByTitle(Data.getAllIngredients(result)));
			} else {
				selected.splice(event.target.getAttribute("data-filter"));
				Tag.resetSection(event, ingredientTag, recipes);
			}
		});
		return selected;
	}
}
