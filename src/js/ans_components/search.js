const searchBoxes = document.querySelectorAll('.search');
searchBoxes.forEach((search) => {
	const input = search.querySelector('.search__input');
	if (!input) return; 
	
	input.addEventListener("input", (e) => {
		if (e.target.value.length > 0) {
			search.classList.add('search--active');
		} else {
			search.classList.remove('search--active');
		}
	});
})
