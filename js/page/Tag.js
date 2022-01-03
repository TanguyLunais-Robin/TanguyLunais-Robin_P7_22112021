"use strict";

import Display from "./Display.js";
import Msg from "./Msg.js";
import Utils from "../utilities/Utils.js";
import Ingredients from "../filters/Ingredients.js";
import Appliances from "../filters/Appliances.js";
import Ustensils from "../filters/Ustensils.js";
import Data from "../utilities/Data.js";

export default class Badges {
	static hiddenIngredientsFilter = document.querySelector("#hiddenIngredientsFilter");
	static hiddenAppareilFilter = document.querySelector("#hiddenAppareilFilter");
	static hiddenUstensilesFilter = document.querySelector("#hiddenUstensilesFilter");

	// affichage des badges que le user a sélectionner
	static buildTags(elt, tag) {
		this.pushDownButtonsFilter();
		this.displayTag(elt);
		this.fillTag(elt, tag);
		return this;
	}

	static displayTag(elt) {
		return (elt.style.display = "flex");
	}

	// rempli dans les tags
	static fillTag(elt, tag) {
		return (elt.innerHTML = tag + ` <i class='far fa-times-circle'></i>`);
	}

	//supprime les tags
	static hideTag(elt) {
		this.pushUpButtonsFilter();

		return (elt.style.display = "none");
	}

	// baisses les bouttons
	static pushDownButtonsFilter() {
		this.hiddenIngredientsFilter.style.top = "20rem";
		this.hiddenAppareilFilter.style.top = "20rem";
		this.hiddenUstensilesFilter.style.top = "20rem";
	}

	// monte les bouttons
	static pushUpButtonsFilter() {
		this.hiddenIngredientsFilter.style.top = "16.2rem";
		this.hiddenAppareilFilter.style.top = "16.2rem";
		this.hiddenUstensilesFilter.style.top = "16.2rem";
	}

	static removeTagsOnClick(tag, event, eltBadge, recipes) {
		tag.addEventListener("click", () => {
			this.resetSection(event, eltBadge, recipes);
		});
	}

	static resetSection(event, eltBadge, recipes) {
		event.target.classList.remove("selected");
		this.hideTag(eltBadge);
		Msg.buildResultMessageWithResult(recipes);
		Utils.clearRecipes();
		Display.buildResult(recipes);
		Utils.clearFilters(document.getElementById("ingredientsExample"));
		Ingredients.fillIngredients(Data.getAllIngredients(recipes));
		Utils.clearFilters(document.getElementById("appareilExample"));
		Appliances.fillAppliances(Data.getAllAppliances(recipes));
		Utils.clearFilters(document.getElementById("ustensilesExample"));
		Ustensils.fillUstensils(Data.getAllUstensils(recipes));
	}
}
