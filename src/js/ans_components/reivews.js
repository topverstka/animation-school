const reivewsGalleries = [...document.querySelectorAll('.reviews__gallery')];

reivewsGalleries.forEach((gallery) => {
	const reviewsCards = [...gallery.querySelectorAll('.reviews-card')];
	
	reviewsCards.forEach((card, index, cards) => {
	  if (index < (cards.length / 2)) return
	  card.classList.add('reviews-card--second-half');
	}) 
})




const reivewsMoreButtons = document.querySelectorAll('.reviews__button-more');

reivewsMoreButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		e.target.closest('.reviews').classList.add('reviews--opened');
	});
})
