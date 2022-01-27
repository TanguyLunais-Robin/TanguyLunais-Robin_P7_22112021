class Homepage {
	constructor() {
		this.$recipesListWrapper = document.querySelector("#recipes-list");
		this.$ingredientsListWrapper = document.querySelector("#ingredients-list");
		this.$appliancesListWrapper = document.querySelector("#appliances-list");
		this.$ustensilsListWrapper = document.querySelector("#ustensils-list");
	}
	// Render recipe list function
	async recipe(array) {
		while (this.$recipesListWrapper.firstChild) {
			this.$recipesListWrapper.removeChild(this.$recipesListWrapper.lastChild);
		}
		// Reset array list
		ingredientsList = [];
		appliancesList = [];
		ustensilsList = [];
		// Récupération et génération de la liste des recettes - Si le tableau > 0 rend la carte des recettes sinon afficher le message
		if (array.length > 0) {
			array
				.map((recipe) => new Recipe(recipe))
				.forEach((recipe) => {
					const template = new RecipeCard(recipe);
					this.$recipesListWrapper.appendChild(template.createRecipeCard());
					// Boucle dans le tableau ingredients
					for (let i = 0; i < template._recipe._ingredients.length; i++) {
						// Regarde si l'ingredient n'est pas deja dans le tableau
						if (ingredientsList.indexOf(template._recipe._ingredients[i].ingredient.toLowerCase()) === -1) {
							// Si l'ingredient n'est pas dans le tableau on l'ajoute 
							ingredientsList.push(template._recipe._ingredients[i].ingredient.toLowerCase());
						}
					}
					// Compléter le tableau des appareils // Vérifiez si l’appareil n’est pas déjà dans le tableau
					if (appliancesList.indexOf(template._recipe._appliance.toLowerCase()) === -1) {
						// Si l'appareil n'est pas dans la liste , il est ajouté au tableau
						appliancesList.push(template._recipe._appliance.toLowerCase());
					}
					// Boucle dans le tableau des ustensibles 
					for (let i = 0; i < template._recipe._ustensils.length; i++) {
						// Regarde si l'ustensible n'est pas deja dans le tableau
						if (ustensilsList.indexOf(template._recipe._ustensils[i].toLowerCase()) === -1) {
							// Si l'ustensible n'est pas dans le tableau on l'ajoute 
							ustensilsList.push(template._recipe._ustensils[i].toLowerCase());
						}
					}
				});
		} else {
			this.$recipesListWrapper.innerHTML += `<h2 class="w-100 px-3 text-center"> Aucune recette ne correspond à votre recherche... <br> Vous pouvez chercher « tarte aux pommes », « poisson », etc.</h2>`;
		}
	}
	// Render tags list function
	async renderList(wrapper, array, tagType) {
		// Supprime les éléments déjà présents dans le dropdown 
		while (wrapper.firstChild) {
			wrapper.removeChild(wrapper.lastChild);
		}
		// Ajoute les 30 premiers items a chaque dropdown - Si le resultat > 0 montrer le rendu , sinon montrer message 
		if (array.length > 0) {
			wrapper.classList.remove("one-column");
			for (let i = 0; i < 30; i++) {
				const template = new TagsList(array[i], tagType);
				if (template._tag != undefined) {
					wrapper.appendChild(template.createTag());
				}
			}
		} else {
			wrapper.classList.add("one-column");
			wrapper.innerHTML += `<li class="text-white px-3"> Aucun tag ne correspond à votre recherche...</li>`;
		}
	}
	// Générer tags dropdown des ingrédients
	async renderIngredientsList(array, wrapper = this.$ingredientsListWrapper) {
		homepage.renderList(wrapper, array, "ingredient");
		homepage.tags("btn-tag-ingredient", "bg-primary", ingredientsTagActivated);
	}
	// Générer tags dropdown des appareils
	async renderAppliancesList(array, wrapper = this.$appliancesListWrapper) {
		homepage.renderList(wrapper, array, "appliance");
		homepage.tags("btn-tag-appliance", "bg-success", appliancesTagActivated);
	}
	// Générer tags dropdown des ustensibles
	async renderUstensilsList(array, wrapper = this.$ustensilsListWrapper) {
		homepage.renderList(wrapper, array, "ustensil");
		homepage.tags("btn-tag-ustensil", "bg-danger", ustensilsTagActivated);
	}
	// Gérer l’ajout d’un tag à la recherche
	async tags(className, backgroundColor, tagsArrayList) {
		// DOM of tags via className
		const tags = document.getElementsByClassName(className);
		// Regarder si le tag existe 
		if (tags != undefined) {
			for (let i = 0; i < tags.length; i++) {
				// AJouter tag a la recherche des recettes quand on clique dans le dropdown
				tags[i].addEventListener("click", function () {
					const tagsContainer = document.getElementById("tags-container");
					const newTags = document.getElementById(tags[i].value);
					if (newTags === undefined || newTags === null) {
						// Verifier si le tag n'est pas deja activer 
						if (tagsArrayList.indexOf(tags[i].value) === -1) {
							// Generer HTML du tag 
							tagsContainer.innerHTML += `
							<div id="${tags[i].value.split(" ").join("-")}" class="tags badge tag-${tags[i].value.split(" ").join("-")} ${backgroundColor} ps-3 pe-2 py-2 me-3 mb-2 rounded">
								<span>${tags[i].value.charAt(0).toUpperCase() + tags[i].value.slice(1)}</span>
								<button id="btn-close-${tags[i].value.split(" ").join("-")}" type="button" class="tag-close-btn align-middle ms-1" aria-label="Close">
									<img src="./assets/img/tag-close.svg" alt="" aria-hidden="true">
								</button>
							</div>`;
							// Ajoute le tag , au tag deja activer dans le tableau
							tagsArrayList.push(tags[i].value);
							// Lancer la recherche des recettes qui utilise le tag 
							searchByTags();

							homepage.removeTags();
						}
					}
				});
			}
		}
	}
	// Gérer la suppression d’un tag à la recherche de recettes
	async removeTags() {
		const closeTag = (tagsArrayList) => {
			for (let i = 0; i < tagsArrayList.length; i++) {
				const tag = document.getElementById(tagsArrayList[i].split(" ").join("-"));
				const btnTag = document.getElementById("btn-close-" + tagsArrayList[i].split(" ").join("-"));
				// Retire la recherche tag en cliquant sur la croix 
				btnTag.addEventListener("click", function () {
					tag.remove();
					const index = tagsArrayList.indexOf(btnTag.id.replace("btn-close-", "").split("-").join(" "));
					if (index !== -1) {
						tagsArrayList.splice(index, 1);
					}
					// Relancer la recherche des recettes après la suppresion du tag 
					searchByTags();
				});
			}
		};
		for (let i = 0; i < allTagActivated.length; i++) {
			closeTag(allTagActivated[i]);
		}
	}
}
// Init arrays
var recipesFilteredByTags = recipes;
var recipesFilteredBySearch = recipesFilteredByTags;

var ingredientsList = [];
var appliancesList = [];
var ustensilsList = [];

var ingredientsListFiltered = ingredientsList;
var appliancesListFiltered = appliancesList;
var ustensilsListFiltered = ustensilsList;

var ingredientsTagActivated = [];
var appliancesTagActivated = [];
var ustensilsTagActivated = [];

var allTagActivated = [ingredientsTagActivated, appliancesTagActivated, ustensilsTagActivated];

// First render
const homepage = new Homepage();
renderRecipesAndTags(recipes);

// Input listener on searchbar
document.getElementById("search").addEventListener("input", searchbarValue);

// array DOM for dropdown form
const formDOM = [document.getElementById("form-ingredient"), document.getElementById("form-appliance"), document.getElementById("form-ustensil")];
for (let i = 0; i < formDOM.length; i++) {
	//Prevent submit in each dropdown form
	formDOM[i].addEventListener("submit", (event) => {
		event.preventDefault();
	});
}
// array of objects for dropdown searchInTags
const updateSearchTags = () => {
	searchTags[0].array = ingredientsList;
	searchTags[0].arrayFiltered = ingredientsListFiltered;
	searchTags[1].array = appliancesList;
	searchTags[1].arrayFiltered = appliancesListFiltered;
	searchTags[2].array = ustensilsList;
	searchTags[2].arrayFiltered = ustensilsListFiltered;
};

let searchTags = [
	{
		input: document.getElementById("search-ingredient"),
		array: ingredientsList,
		arrayFiltered: ingredientsListFiltered,
		renderListFunction: homepage.renderIngredientsList,
		wrapper: document.querySelector("#ingredients-list"),
	},
	{
		input: document.getElementById("search-appliance"),
		array: appliancesList,
		arrayFiltered: appliancesListFiltered,
		renderListFunction: homepage.renderAppliancesList,
		wrapper: document.querySelector("#appliances-list"),
	},
	{
		input: document.getElementById("search-ustensil"),
		array: ustensilsList,
		arrayFiltered: ustensilsListFiltered,
		renderListFunction: homepage.renderUstensilsList,
		wrapper: document.querySelector("#ustensils-list"),
	},
];
for (let i = 0; i < searchTags.length; i++) {
	// Input listener on tag search in each dropdown
	searchTags[i].input.addEventListener("input", () => {
		searchInTags(searchTags[i].input, searchTags[i].array, searchTags[i].arrayFiltered, searchTags[i].renderListFunction, searchTags[i].wrapper);
	});
}

// Tags buttons management
// DOM for dropdown tags buttons
const btnTagDOM = [document.getElementById("dropdownIngredients"), document.getElementById("dropdownAppliances"), document.getElementById("dropdownUstensils")];
for (let i = 0; i < btnTagDOM.length; i++) {
	// Listener on open for each dropdown
	btnTagDOM[i].addEventListener("show.bs.dropdown", function () {
		btnTagOpen(btnTagDOM[i], formDOM[i], "btn-tag-open", searchTags[i].input);
	});
	// Listener on close for each dropdown
	btnTagDOM[i].addEventListener("hidden.bs.dropdown", function () {
		updateSearchTags();
		btnTagClose(btnTagDOM[i], formDOM[i], "btn-tag-open", searchTags[i].input, searchTags[i].array, searchTags[i].arrayFiltered, searchTags[i].renderListFunction, searchTags[i].wrapper);
	});
}
