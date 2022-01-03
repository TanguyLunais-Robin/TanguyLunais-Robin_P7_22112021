"use strict";

import Button from "../page/Button.js";
import Display from "../page/Display.js";
import Msg from "../page/Msg.js";
import Search from "../search/Search.js";
import Tag from "../page/Tag.js";
import Utils from "../utilities/Utils.js";
import Data from "../utilities/Data.js";

export default class Ustensils {
	static ustensilsExample = document.getElementById("ustensilesExample");

	static init(ustensils, recipes) {
		Utils.clearFilters(this.ustensilsExample);
		Button.launchButtons(
			document.querySelector("#ustensiles > button"),
			document.querySelector("#openUstensilesFilter"),
			document.querySelector("#closeUstensilesFilter"),
			document.querySelector("#hiddenUstensilesFilter")
		);
		this.fillUstensils(Utils.sortByTitle(ustensils));
		this.searchInput(ustensils);
		this.filterTags(recipes);
		return this;
	}

	//affiche les ustensils dans la zone des ustensils relié aux receettes affichées dans la section des recettes.

	static fillUstensils(ustensils) {
		let ul = document.createElement("ul");
		ul.classList.add("listUlUst");
		this.ustensilsExample.appendChild(ul);

		ustensils.forEach((ustensils) => {
			let listUstensils = document.createElement("li");

			listUstensils.innerHTML = `${Utils.upperText(ustensils)}`;
			ul.appendChild(listUstensils);
			listUstensils.classList.add("list-ustensiles");
			listUstensils.setAttribute("data-filter", `${ustensils}`);
		});
	}

	//autorise de chercher les ustensils dans l'input des utensils présent dans les recettes affichées
	static searchInput(ustensils) {
		document.getElementById("inputUstensiles").addEventListener("keyup", (key) => {
			let valueSearch = key.target.value;
			Utils.clearFilters(this.ustensilsExample);
			this.fillUstensils(
				Utils.isValid(valueSearch)
					? Search.searchInputFilters(ustensils, valueSearch)
					: Utils.sortByTitle(ustensils)
			);
		});
	}

	static filterTags(recipes) {
		let selected = [];
		let ustensileTag = document.getElementById("ustensileTag");

		document.querySelector("#ustensilesExample").addEventListener("click", (event) => {
			let classValue = event.target.classList.value;

			if (-1 === classValue.indexOf("selected")) {
				event.target.classList.add("selected");
				selected.push(event.target.getAttribute("data-filter"));
				Button.hideButtonsOnClick(
					document.querySelector("#ustensiles > button"),
					document.querySelector("#openUstensilesFilter"),
					document.querySelector("#hiddenUstensilesFilter")
				);
				Tag.buildTags(
					ustensileTag,
					Utils.upperText(event.target.getAttribute("data-filter"))
				).removeTagsOnClick(
					document.querySelector("#ustensileTag > i"),
					event,
					ustensileTag,
					recipes
				);
				Msg.buildResultMessageWithResult(Search.searchByUstTags(recipes, selected));
				Utils.clearRecipes();
				Display.buildResult(Search.searchByUstTags(recipes, selected));
				Utils.clearFilters(this.ustensilsExample);
				this.fillUstensils(
					Utils.sortByTitle(
						Data.getAllUstensils(Search.searchByUstTags(recipes, selected))
					)
				);
			} else {
				selected.splice(event.target.getAttribute("data-filter"));
				Tag.resetSection(event, ustensileTag, recipes);
			}
		});
		return selected;
	}
}
