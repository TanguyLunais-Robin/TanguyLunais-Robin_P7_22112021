//Fonction pour étendre, masquer le titre et désactiver le bouton déroulant et afficher et centrer la rechercheInput
const btnTagOpen = (btnTag, form, btnTagOpenClass, searchInput) => {
	const btnTitle = btnTag.getElementsByClassName("btn-tag-title");

	btnTitle[0].classList.add("hide");
	form.classList.remove("hide");
	btnTag.classList.add(btnTagOpenClass, "rounded-0", "rounded-top");
	btnTag.setAttribute("disabled", false);

	searchInput.focus();
};
// Fonction pour réduire, afficher le titre et activer le bouton déroulant et masquer et réinitialiser la rechercheInput
const btnTagClose = (btnTag, form, btnTagOpenClass, searchInput, searchArray, searchArrayFiltered, renderListFunction, wrapper) => {
	const btnTitle = btnTag.getElementsByClassName("btn-tag-title");

	btnTitle[0].classList.remove("hide");
	form.classList.add("hide");
	btnTag.classList.remove(btnTagOpenClass, "rounded-0", "rounded-top");
	btnTag.removeAttribute("disabled");

	searchInput.value = "";
	searchInTags(searchInput, searchArray, searchArrayFiltered, renderListFunction, wrapper);
};
