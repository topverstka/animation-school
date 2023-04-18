"use strict"

import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade } from "swiper";

const carousels = document.querySelectorAll('.wp-block-gallery');
const carouselClasses = {
	block: "wysiwyg-carousel"
}

function getSwiperConfig(swpierClasses) {
	const {nextButtonClass, prevButtonClass, bulletsClass} = swpierClasses;

	let swiperConfig = {
	  modules: [Navigation, Pagination],
	  // autoHeight: true,
	  spaceBetween: 30,
	  // slidesPerView: 2.5,
	  slidesPerView: 1,
	  effect: 'fade',
	    fadeEffect: {
	    crossFade: true
	  },
	  breakpoints: {
	  	767: {
			  slidesPerView: "auto",
	  	}
	  }
	}

	if (nextButtonClass || prevButtonClass) {
		swiperConfig.navigation = {};
	}
	if (nextButtonClass) {
		swiperConfig.navigation.nextEl = `.${nextButtonClass}`;
	}
	if (prevButtonClass) {
		swiperConfig.navigation.prevEl = `.${prevButtonClass}`;
	}
	if (bulletsClass) {
		swiperConfig.pagination = {
	    el: `.${bulletsClass}`,
	    clickable: true,
	  }
	}

	return swiperConfig;
}

function makeWysiwygCarousels(carousels, cssClasses) {
	carousels.forEach((carousel, carouselIndex) => {
	  carousel.classList.add('swiper');

	  const carouselClass = `${cssClasses.block}-${carouselIndex}`
	  carousel.classList.add(carouselClass);


	  const carouselContent = carousel.innerHTML;
	  carousel.innerHTML = '';

	  const swiperWrapper = document.createElement('div');
	  swiperWrapper.classList.add('swiper-wrapper')

	  carousel.append(swiperWrapper);

	  swiperWrapper.innerHTML = carouselContent;

	  carousel.querySelectorAll('figure').forEach(slide => {
	    slide.classList.add('swiper-slide');
	  })

	  const bullets = document.createElement('div');
	  const bulletsClass = `swiper-pagination-${carouselIndex}`
	  bullets.classList.add('swiper-pagination')
	  bullets.classList.add(bulletsClass)
	  carousel.append(bullets);

	  const prevButton = document.createElement('div')
	  const prevButtonClass = `swiper-button-prev-${carouselIndex}`
	  prevButton.classList.add('swiper-button-prev')
	  prevButton.classList.add(prevButtonClass)
	  carousel.append(prevButton);

	  const nextButton = document.createElement('div')
	  const nextButtonClass = `swiper-button-next-${carouselIndex}`
	  nextButton.classList.add('swiper-button-next')
	  nextButton.classList.add(nextButtonClass)
	  carousel.append(nextButton);

	  new Swiper(`.${carouselClass}`, getSwiperConfig({
	  	nextButtonClass,
	  	prevButtonClass,
	  }));

	})
}

window.addEventListener('DOMContentLoaded', (event) => {
	makeWysiwygCarousels(carousels, carouselClasses);
});