// Redherche principal avec les tags 
const searchByTags = () => {
	// Reinitialiser recipesFilteredByTags du tableau
	recipesFilteredByTags = recipes;
	// Filtre recipesFilteredByTags du tableau avec les tags ingredients 
	for (let i = 0; i < ingredientsTagActivated.length; i++) {
		recipesFilteredByTags = recipesFilteredByTags.filter((recipe) => recipe.ingredients.some((el) => el.ingredient.toLowerCase().includes(ingredientsTagActivated[i])));
	}
	// Filtre recipesFilteredByTags du tableau avec les tags appareil 
	for (let i = 0; i < appliancesTagActivated.length; i++) {
		recipesFilteredByTags = recipesFilteredByTags.filter((recipe) => recipe.appliance.toLowerCase().includes(appliancesTagActivated[i]));
	}
	// Filtre recipesFilteredByTags du tableau avec les tags ustensibles
	for (let i = 0; i < ustensilsTagActivated.length; i++) {
		recipesFilteredByTags = recipesFilteredByTags.filter((recipe) => recipe.ustensils.some((el) => el.toLowerCase().includes(ustensilsTagActivated[i])));
	}
	// Lance la recherche principal
	const searchValue = document.getElementById("search");
	// Si la barre de recherche comporte 3 caractères, lancez la recherche sinon lancez la recherche vide
	if (searchValue.value.length > 2) {
		mainSearch(searchValue.value);
	} else {
		mainSearch("");
	}
};
