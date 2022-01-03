"use strict";
import Utils from "../utilities/Utils.js";

export default class Display {
	// construit la section contenant les recettes à afficher
	static buildResult(collections) {
		return collections.forEach((collection) => {
			this.buildRecipe(collection);
		});
	}

	// construite chaque recette
	static buildRecipe(collection) {
		let section = document.getElementById("mainContent");

		return section.appendChild(this.createArticleElt(collection));
	}

	// construit l'article qui contiendra l'information de chaque recette
	static createArticleElt(collection) {
		let article = document.createElement("article");
		let dataFilterIngredients = collection.ingredients.map((element) =>
			Utils.normalizeText(element.ingredient)
		);
		let dataFilterAppliances = Utils.normalizeText(collection.appliance);
		let dataFilterUstensils = collection.ustensils;
		let dataFilter =
			collection.ingredients.map((element) => Utils.normalizeText(element.ingredient)) +
			collection.ustensils +
			Utils.normalizeText(collection.appliance);

		article.classList.add("articleRecipes");
		article.setAttribute("data-filter", dataFilter);
		article.setAttribute("data-filter-ingredients", dataFilterIngredients);
		article.setAttribute("data-filter-appliances", dataFilterAppliances);
		article.setAttribute("data-filter-ustensils", dataFilterUstensils);
		article.innerHTML = this.getArticleInnerHTML(collection);

		return article;
	}

	static getArticleInnerHTML(collection) {
		return `
		<img src='./images/background_grey.png' alt='img' />
            <div class='recipeTitle'>
                <h2 class='recipeName'>${collection.name}</h2>
                <span class='recipeDuration'><i class='far fa-clock'></i>${
					collection.time
				} min</span>
            </div>
            <div class='recipeInfo'>
                <div class='recipeIngredients'>${collection.ingredients
					.map(
						(elt) => `
                    <p><b>${elt.ingredient} </b>:
                    ${"quantity" in elt ? elt.quantity : ""}
                    ${"unit" in elt ? elt.unit : ""}</p>`
					)
					.join(" ")}
                </div>
                <div class='recipeInstructions'>
                    <span>${collection.description}</span>
                </div>
            </div>
        `;
	}
}
