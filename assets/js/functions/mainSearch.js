// Main Search function with array filter()
const mainSearch = (searchValue) => {
	const search = searchValue.toLowerCase();
	recipesFilteredBySearch = recipesFilteredByTags;
	recipesFilteredBySearch = recipesFilteredBySearch.filter(
		(recipe) => recipe.name.toLowerCase().includes(search) || recipe.description.toLowerCase().includes(search) || recipe.ingredients.some((el) => el.ingredient.toLowerCase().includes(search))
	);

	renderRecipesAndTags(recipesFilteredBySearch);
};

const searchbarValue = (e) => {
	// Si la barre de recherche comporte trois caractères, lancez la recherche avec les données d’entrée, sinon lancez la recherche vide
	if (e.target.value.length > 2) {
		mainSearch(e.target.value);
	} else {
		mainSearch("");
	}
};
