"use strict"


/*
import Swiper, { Navigation, Pagination } from "swiper";

const mainSwiper = new Swiper("[data-swiper=main]", {
    modules: [ Navigation, Pagination ],

 slidesPerView: 1,
 spaceBetween: 24,
 loop: true,

    navigation: {
        nextEl: ".main-swiper__arrow.is-next",
        prevEl: ".main-swiper__arrow.is-prev",
    },

 pagination: {
   el: '.main-swiper__pagin',
   type: 'bullets',
   clickable: true,
 },
});
*/

import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";
import {debounce} from "../utils/helpers.js";


const quizes = document.querySelectorAll('.quiz-carousel');
function togglePrevVisibility(context) {
  if (context.activeIndex == 0) {
    context.el.querySelector('.quiz-button-prev').style.display = 'none';
  } else {
    context.el.querySelector('.quiz-button-prev').style.display = '';
  }
}
function hideButtonsOnFinalQuestion(context) {
  if (context.activeIndex == context.slides.length - 1) {
    context.el.querySelector('.quiz-buttons').style.display = 'none';
  }
}
quizes.forEach((quiz, index) => {
  const SWIPER_NAME = 'quiz';
  const CURRENT_SWIPER_NAME = `${SWIPER_NAME}-${index}`;

  if (quiz.id == '') {
    quiz.id+= `${CURRENT_SWIPER_NAME}`;
  } else {
    quiz.id+= ` ${CURRENT_SWIPER_NAME}`;
  }

  let carousel = new Swiper(`#${CURRENT_SWIPER_NAME}`, {
    modules: [Navigation, Pagination, EffectFade],
    autoHeight: true,
    spaceBetween: 10,
    pagination: {
      el: `#${CURRENT_SWIPER_NAME} .${SWIPER_NAME}-pagination`,
      // clickable: true,
      type: "progressbar",
    },
    effect: 'fade',
      fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: `#${CURRENT_SWIPER_NAME} .${SWIPER_NAME}-button-next`,
      prevEl: `#${CURRENT_SWIPER_NAME} .${SWIPER_NAME}-button-prev`,
    },
    on: {
      init: function() {
        togglePrevVisibility(this);
      },
      slideChange: function() {
        const CURRENT_SLIDE = this.slides[this.activeIndex];

        const sliderStatusStepEl = quiz.parentElement.querySelector('.quiz-status__step');
        if (sliderStatusStepEl) {
          const TOTAL_STEPS = this.slides.length;
          const CURRENT_STEP = this.activeIndex + 1;
          sliderStatusStepEl.innerText = `${CURRENT_STEP}/${TOTAL_STEPS}`;
        }

        const stepNameEl = quiz.parentElement.querySelector('.quiz-status__name')
        if (stepNameEl) {
          stepNameEl.innerText = CURRENT_SLIDE.dataset.stepName;
        }

        togglePrevVisibility(this);
        hideButtonsOnFinalQuestion(this);
      }
    }
  });
})


let compareCarousel = new Swiper(".comparer-carousel", {
  modules: [Navigation],
  spaceBetween: 10,
  allowTouchMove: false,
  navigation: {
    nextEl: ".comparer-carousel-button-next",
    prevEl: ".comparer-carousel-button-prev",
  },
});

window.makeThumbsClickable = (gallerySwiper, thumbsSwiper) => {
  // console.log(thumbsSwiper.slides)
  if (!thumbsSwiper || !gallerySwiper) return;
  thumbsSwiper.slides.forEach((slide, index) => {

    if (slide.classList.contains('js-b-clickable')) return;

    slide.classList.add('js-b-clickable')
    slide.addEventListener('click', () => {
      gallerySwiper.slideTo(index);
      thumbsSwiper.slides.forEach(thumb => {
        thumb.classList.remove('_active');
      })
      slide.classList.add('_active');
    })

  })
}
window.modalCases = initModalCases();
window.initModalCases = () => {
  window.modalCases = initModalCases();
};
window.updateModalCases = () => {
  window.modalCases.gallery.update();
  window.modalCases.thumbs.update();
  makeThumbsClickable(window.modalCases.gallery, window.modalCases.thumbs);
  window.modalCases.gallery.slideTo(0);
}
window.removeModalCases = () => {
  window.modalCases.gallery.slides.forEach(slide => slide.remove());
  window.modalCases.thumbs.slides.forEach(slide => slide.remove());
}
window.appendImagesModalCases = (slides) => {
  slides.forEach(slide => {
    window.modalCases.gallery.el.querySelector('.swiper-wrapper').insertAdjacentHTML('beforeend', `
      <div class="swiper-slide modal-case-photos-gallery-slide">
        <picture class="modal-case-photos__pic">
          <img src="${slide}" alt="Кейс" class="modal-case-photos__img">
        </picture>
      </div>
    `);

    window.modalCases.thumbs.el.querySelector('.swiper-wrapper').insertAdjacentHTML('beforeend', `
      <div class="swiper-slide modal-case-photos-thumbs-slide">
        <picture class="modal-case-photos__pic">
          <img src="${slide}" alt="Кейс" class="modal-case-photos__img">
        </picture>
      </div>
    `)
  })
}

/*
  @param gallerySettings: {
    selector:
    config
  }
  @param thumbs: {
    selector:
    config
  }
 */
function makeThumbSwiper(gallerySettings, thumbsSettings) {
  let carouselThumbs;
  let carouselGallery;

  const selectorGallery = gallerySettings.selector
  const configGalleryCustom = gallerySettings.config
  let configGalleryInitial = {
      modules: [Navigation, Pagination, EffectFade],
      spaceBetween: 10,
      speed: 400,
      thumbs: {
        swiper: carouselThumbs,
      },
      on: {
        slideChange: function() {
          if (this.el.classList.contains('cases-gallery-carousel__slideshow')) return;
          carouselThumbs.slideTo(this.activeIndex);
        },
        init: function() {
          setTimeout(() => {
            this.slides.forEach(slide => {
              // slide.style.height = `${slide.parentElement.getBoundingClientRect().height}px`;
            })
          }, 2000)
        }
      }
  }
  let configGallery = {};
  if (configGalleryCustom) {
    configGallery = {
      ...configGalleryInitial,
      ...configGalleryCustom
    };
  } else {
    configGallery = configGalleryInitial;
  }

  const selectorThumbs = thumbsSettings.selector;
  const configThumbsCustom = thumbsSettings.config;
  let configThumbsInitial = {
      centeredSlides: true,
      centeredSlidesBounds: true,
      centerInsufficientSlides: true,
      speed: 400,
      spaceBetween: 10,
      slidesPerView: 3,
  }
  let configThumbs = {};
  if (configThumbsCustom) {
    configThumbs = {
      ...configThumbsInitial,
      ...configThumbsCustom,
    }
  } else {
    configThumbs = configThumbsInitial;
  }

  if (document.querySelector(selectorGallery) && document.querySelector(selectorThumbs)) {
    carouselThumbs = new Swiper(selectorThumbs, configThumbs);
    carouselGallery = new Swiper(selectorGallery, configGallery);
    // window.makeThumbsClickable(carouselGallery, carouselThumbs);
    return {
      gallery: carouselGallery,
      thumbs: carouselThumbs,
    }
  }
}

const casesGallerySlideshows = document.querySelectorAll('.cases-gallery-carousel__slideshow');
const casesGalleryThumbs = document.querySelectorAll('.cases-gallery-carousel__thumbs');
casesGallerySlideshows.forEach((gallery, index) => {
  const galleryClassName = `cases-gallery-carousel__slideshow-${index}`
  const thumbsClassName = `cases-gallery-carousel__thumbs-${index}`
  gallery.classList.add(galleryClassName)
  casesGalleryThumbs[index].classList.add(thumbsClassName)

  const casesGallery = makeThumbSwiper(
    {
      selector: `.${galleryClassName}`,
      config: {
        modules: [Navigation],
        navigation: {
          nextEl: `.${galleryClassName} .cases-gallery-button-next`,
          prevEl: `.${galleryClassName} .cases-gallery-button-prev`,
        },
      }
    },
    {
      selector: `.${thumbsClassName}`,
      config: {
        modules: [Navigation],
        spaceBetween: 10,
        centeredSlides: false,
        centeredSlidesBounds: false,
        centerInsufficientSlides: false,
        slidesPerView: 1,
        slideToClickedSlide: false,
        navigation: {
          nextEl: `.${thumbsClassName} .cases-gallery-button-next`,
          prevEl: `.${thumbsClassName} .cases-gallery-button-prev`,
        },
      }
    }
  );
  if (casesGallery != undefined) {
    const thumbsSlides = casesGallery.thumbs.el.querySelectorAll('.cases-gallery-slide__pic');
    thumbsSlides.forEach((slide, index) => {
      slide.addEventListener("click", (e) => {
        casesGallery.gallery.slideTo(index);
      });
    })
    casesGallery.thumbs.on('slideChange', function() {
      // console.log(this.activeIndex, Math.ceil([...casesGallery.thumbs.slides].length / 19))
      casesGallery.thumbs.el.querySelector('.cases-gallery-page').innerText = `${this.activeIndex + 1} / ${Math.ceil([...casesGallery.thumbs.slides].length / 19) + 1}`
      
    })
    casesGallery.gallery.on('slideChange', function() {
      thumbsSlides.forEach((slide, index) => {
        slide.classList.remove('_active')
        if (this.activeIndex == index) {
          slide.classList.add('_active');
        }
        casesGallery.thumbs.slideTo(Math.floor(this.activeIndex / 19))
        // Спрашивает сколько слайдов и какой индекс у активного
      })
    })

    function handleFirstSlide() {
      mobilePrev.style.display = "";
      if (casesGallery.thumbs.activeIndex === 0) {
        mobilePrev.style.display = "none"
        mobileNext.style.display = ""
      }
    }
    function haldleLastSlide() {
      mobileNext.style.display = "";
      if (casesGallery.thumbs.activeIndex === [...casesGallery.thumbs.slides].length - 1) {
        mobileNext.style.display = "none"
        mobilePrev.style.display = ""
      }
    }
    const mobilePrev = casesGallery.thumbs.el.querySelector('.cases-gallery-button-prev--mobile')
    const mobileNext = casesGallery.thumbs.el.querySelector('.cases-gallery-button-next--mobile')
    if (mobileNext && mobilePrev) {
      handleFirstSlide();
      mobilePrev.addEventListener("click", (e) => {
        casesGallery.thumbs.slidePrev()
        mobilePrev.style.display = ""
        mobileNext.style.display = ""
        handleFirstSlide();
      });
      mobileNext.addEventListener("click", (e) => {
        casesGallery.thumbs.slideNext()
        mobilePrev.style.display = ""
        mobileNext.style.display = ""
        haldleLastSlide();
      });
    }
  }
})

function initModalCases() {
  return makeThumbSwiper(
    {
      selector: '.modal-case-photos-gallery-carousel',
      config: {
        modules: [Navigation],
        navigation: {
          nextEl: ".modal-case-photos-gallery-button-next",
          prevEl: ".modal-case-photos-gallery-button-prev",
        },
      }
    },
    {
      selector: '.modal-case-photos-thumbs-carousel'
    }
  );
}

const buttonCaseCallers = document.querySelectorAll('.js-case-caller');
buttonCaseCallers.forEach((button, index) => {
  const caseId = button.dataset.caseId;
  const action = button.dataset.action;
  if (!caseId) return;

  let body = new FormData();
  body.append("id", caseId);
  body.append("action", action);

  button.addEventListener("click", async (e) => {
    button.classList.add('button--wait');
    const buttonText = button.innerText;
    button.innerText = 'Загрузка...';

    const caseObject = await fetch(urem_ajax.ajaxUrl, {
      // method: "GET",
      method: "POST",
      body: body,
    });

    let result = await caseObject.text();
    // try {
      const caseData = JSON.parse(result);

      button.innerText = buttonText;
      button.classList.remove('button--wait');

      window.poppa.openPop('case');

      const pop = document.querySelector('.poppa#case');
      pop.querySelector('.modal-case__title').innerText = caseData.name;
      pop.querySelector('.modal-case-photos__price-shield').innerText = caseData.badge;
      pop.querySelector('.modal-case__fieldset input[name="form_name"]').value = caseData.name;
      pop.querySelectorAll('.modal-case__desc ul li').forEach(li => li.remove())
      caseData.bullets.forEach(bullet => {
        pop.querySelector('.modal-case__desc ul').insertAdjacentHTML('beforeend', `
          <li>${bullet}</li>
        `)
      })

        

      window.removeModalCases();
      let slides = [];
      if (caseData.thumb != false) {
        slides = [caseData.thumb, ...caseData.gallery];
      } else {
        slides = [...caseData.gallery];
      }
      window.appendImagesModalCases(slides);
      window.updateModalCases();

      setTimeout(() => {
        const titleHeight = pop.querySelector('.modal-case__title').getBoundingClientRect().height;
        const descHeight = pop.querySelector('.modal-case__desc').getBoundingClientRect().height;
        const formHeight = pop.querySelector('.modal-case__form').getBoundingClientRect().height;
        const carouselHeight = titleHeight + descHeight + formHeight + 30;

        pop.querySelector('.modal-case-photos').style.height = `${carouselHeight}px`;
      }, 360);


    // } catch {
      // console.log('error')
    // }
  });
})



// let carouselGallery = new Swiper('.modal-case-photos-gallery-carousel', {
//   // direction: 'vertical',
//   centeredSlides: true,
//   centeredSlidesBounds: true,
//   centerInsufficientSlides: true,
//   spaceBetween: 10,
//   slidesPerView: 3,
// });
// let carouselThumbs = new Swiper('.modal-case-photos-thumbs-carousel', {
//   // direction: 'vertical',
//   centeredSlides: true,
//   centeredSlidesBounds: true,
//   centerInsufficientSlides: true,
//   spaceBetween: 10,
//   slidesPerView: 3,
// });

// -----


if (document.querySelector('.promo-carousel')) {
  function normalizePaginationOffset(swiper) {
    // if (window.innerWidth > 769) return

    const currentSlideCard = swiper.slides[swiper.activeIndex].querySelector('.promo-carousel-card')
    setTimeout(() => {
      const paginationBottomOffset = +currentSlideCard.getBoundingClientRect().height;
      let initialPaginationBottomOffset = 38;
      if (window.innerWidth > 601 && window.innerWidth <= 768) {
        initialPaginationBottomOffset = 98;
      }
      if (window.innerWidth < 769){
        const singularCard = document.querySelector('.promo-carousel-card--singular');
        const singularCardHeight = singularCard.getBoundingClientRect().height
        initialPaginationBottomOffset += singularCardHeight;
      }

      const newPaginationOffset = Math.round(initialPaginationBottomOffset) + Math.round(paginationBottomOffset);
      swiper.pagination.el.style.bottom =  newPaginationOffset + 'px';
    }, 200)
  }
  let promoSlider = new Swiper(".promo-carousel", {
    modules: [Navigation, Autoplay, Pagination, EffectFade],
    effect: 'fade',
      fadeEffect: {
      crossFade: true
    },
    spaceBetween: 10,
    autoHeight: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      769: {
        spaceBetween: 100,
      }
    },
    pagination: {
      el: ".promo-carousel__pagination",
      clickable: true,
    },
    on: {
      init: function () {
        normalizePaginationOffset(this)
      },
      slideChange: function () {
        normalizePaginationOffset(this)
      },
    }
  });
  window.addEventListener("resize", (e) => {
    debounce(normalizePaginationOffset(promoSlider), 200);
  });
}


const CHANGES_CASE_CARD_CAROUSEL = 'changes-case-card-carousel'
if (document.querySelector(`.${CHANGES_CASE_CARD_CAROUSEL}`)) {
  const carousels = document.querySelectorAll(`.${CHANGES_CASE_CARD_CAROUSEL}`);

  carousels.forEach((carousel, index) => {
    carousel.setAttribute('id', `${CHANGES_CASE_CARD_CAROUSEL}-${index}`);
  })
  carousels.forEach((carousel, index) => {
    new Swiper(`#${CHANGES_CASE_CARD_CAROUSEL}-${index}`, {
      modules: [Navigation, Autoplay, Pagination],
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: `#${CHANGES_CASE_CARD_CAROUSEL}-${index} .swiper-button-next`,
        prevEl: `#${CHANGES_CASE_CARD_CAROUSEL}-${index} .swiper-button-prev`,
      },
    });
  })
}

if (document.querySelector('.grabber-carousel')) {
let promoSlider = new Swiper(".grabber-carousel", {
  grabCursor: true,
  slidesPerView: 1.25,
  spaceBetween: 8,
  breakpoints: {
    769: {
      slidesPerView: 2.5,
    }
  }
  // cssMode: true,
  // freeMode: true,
  // centeredSlides: true,
  // effect: 'creative',
  // creativeEffect: {
  // prev: {
  //   shadow: false,
  //   translate: [0, 0, -400],
  // },
  // next: {
  //   translate: ['100%', 0, 0],
  // },
  // },
});
}

if (document.querySelector('.product-cases-carousel')) {
  const carousels = document.querySelectorAll('.product-cases-carousel');
  const CAROUSEL_ID = 'product-cases-carousel';
  setTimeout(() => {
    carousels.forEach((carousel, index) => {
      carousel.id = `${CAROUSEL_ID}-${index}`

      let productCaseSlider = new Swiper(`#${carousel.id}`, {
        grabCursor: true,
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 150,
        modules: [Navigation, Autoplay, Pagination],
        navigation: {
          nextEl: `#${carousel.id} .swiper-button-next`,
          prevEl: `#${carousel.id} .swiper-button-prev`,
        },
      });
      carousel.querySelectorAll('.product-cases-carousel-slide').forEach(slide => {
        slide.querySelector('.gallery-accordion__button-more').addEventListener('click', () => {
          // console.log(productCaseSlider)
          setTimeout(() => {
            productCaseSlider.update();
          }, 200)
        })
      })
    })
  }, 1000)
}
