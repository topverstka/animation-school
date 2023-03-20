import { mediaMax, isMobile } from "../utils/functions.js";
import { isClickedBeyond } from "../utils/helpers.js";
const megachips = document.querySelectorAll('.megachips');


function toggleActiveButton(button, buttons) {
  buttons.forEach((button, index, arr) => {
    button.style.order = '';
    button.classList.remove('_active')
  })
  button.classList.add('_active')
}

/**
 * Проверяет есть кнопки расположены в одну или 2 строки
 * Если кнопки расположены в 2 строки, то последняя нажатая кнопка савится в конец списка
 */
megachips.forEach((control) => {
	const megachipsButtons = [...control.querySelectorAll('.megachips__button')];
  const megachipsCurrent = control.querySelector('.megachips__current');


	megachipsButtons.forEach((button, index) => {
		button.addEventListener('click', () => {

      toggleActiveButton(button, megachipsButtons);
      megachipsCurrent.innerText = button.innerText;

      let buttons = 0;
      const totalButtonsWidth = megachipsButtons.reduce((buttonsWidth, button, index) => {
        const currentButtonWidth = button.getBoundingClientRect().width;
        let marginRight = window.getComputedStyle(button).marginRight;
        marginRight = +marginRight.replace('px', '');

        return buttonsWidth += currentButtonWidth + marginRight;
      }, 0)
      const megachipsWidth = control.querySelector('.megachips__list ').getBoundingClientRect().width

      if (megachipsWidth + 1 <= totalButtonsWidth) {
        button.style.order = index + 1;
      }
		});
  })

  window.addEventListener("click", (e) => {
    if (isClickedBeyond(e, 'megachips__current')) {
      control.classList.remove('_active')
    } else {
      if (control.classList.contains('_active')) {
        control.classList.remove('_active')
      } else {
        control.classList.add('_active')
      }
    }
  });
})

const tabsButtons = document.querySelectorAll('.tabs__buttons');
tabsButtons.forEach(buttons => {
	const tabsName = buttons.dataset.tabs;
	const tabsPagesWraps = [...document.querySelectorAll(`.tabs__pages[data-tabs="${tabsName}"]`)];

	if (tabsPagesWraps.length == 0) return;

	buttons.querySelectorAll('.tabs__button').forEach((button, buttonIndex) => {
		button.addEventListener('click', () => {
			tabsPagesWraps.forEach(pages => {
				const currentPages = [...pages.querySelectorAll('.tabs__page')];
				currentPages.forEach(page => {
					page.classList.remove('_active')
				})
				currentPages[buttonIndex].classList.add('_active')
			})
		})
	})
})

/**
 * Делает активной кнопку с классом _active и включает соотвествующий таб
 */
megachips.forEach((control) => {
	const megachipsButtons = control.querySelectorAll('.megachips__button');
  
  const activeButton = control.querySelector('._active');
  if (activeButton) {
    activeButton.classList.remove('_active')
    activeButton.click();
  } else {
    megachipsButtons.querySelector('button').click()
  }
})

// Добавляем активное состояние для табов, чтоб инициализировать Swiper
// tabsBars.forEach((tabsBar) => {
//   if (tabsBar.dataset.tabs) {
//     tabsPagesWraps.forEach((tabsPagesWrap) => {
//       const tabPages = tabsPagesWrap.querySelectorAll(".tabs__page");
//       tabPages.forEach((tabPage) => {
//         tabPage.classList.add(TAB_ACTIVE_CLASS);
//       });
//     });
//   }
// });


// #region tabs
/**
 * @tabs
 *
 * Табы инициируются все
 * У какой кнопки таба есть класс из js переменной TAB_ACTIVE_CLASS, тот таб и будет активным сразу
 *
 * .tabs>.tabs__toggler-container>button.tabs__toggler*2^.tabs__page-container>.tabs__page*2
 *
const tabsBars = document.querySelectorAll(".tabs__toggler-container");
const tabsPagesWraps = document.querySelectorAll(".tabs__page-container");
const TAB_ACTIVE_CLASS = "tab--active";
const TAB_ANIMATED_CLASS = "tab--animated";

// Добавляем активное состояние для табов, чтоб инициализировать Swiper
tabsBars.forEach((tabsBar) => {
  if (tabsBar.dataset.tabs) {
    tabsPagesWraps.forEach((tabsPagesWrap) => {
      const tabPages = tabsPagesWrap.querySelectorAll(".tabs__page");
      tabPages.forEach((tabPage) => {
        tabPage.classList.add(TAB_ACTIVE_CLASS);
      });
    });
  }
});

tabsBars.forEach(tabsBar => {
  if (!tabsBar.querySelector(`.${TAB_ACTIVE_CLASS}`)) {
    tabsBar.querySelector('.tabs__toggler').classList.add(TAB_ACTIVE_CLASS)
  }
})
tabsPagesWraps.forEach(wrap => {
  if (!wrap.querySelector(`.${TAB_ACTIVE_CLASS}`)) {
    wrap.querySelector('.tabs__page').classList.add(TAB_ACTIVE_CLASS)
  }
})
// Задержка нужна, чтобы Swiper слайдеры не разъезжались
setTimeout(() => {
  tabsBars.forEach((tabsBar) => {
    const tabBarButtons = tabsBar.querySelectorAll(".tabs__toggler");
    let clickedCount = 0;
    tabBarButtons.forEach((tabButton, buttonIndex) => {
      tabButton.addEventListener("click", () => {
        if (clickedCount != 0) {
          //
        } else {
          clickedCount++;
        }
        tabBarButtons.forEach((tab) => {
          tab.classList.remove(TAB_ACTIVE_CLASS);
        });
        tabButton.classList.add(TAB_ACTIVE_CLASS);

        if (tabsBar.dataset.tabs) {
          const tabPages = document
            .querySelector(`.tabs__page-container[data-tabs="${tabsBar.dataset.tabs}"]`)
            .querySelectorAll(".tabs__page");

          if (tabPages[buttonIndex]) {
            tabPages.forEach((tabPage, tabIndex) => {
              if (tabIndex !== buttonIndex) {
                tabPage.classList.remove(TAB_ANIMATED_CLASS);
                tabPage.classList.remove(TAB_ACTIVE_CLASS);
              }
            });
            tabPages[buttonIndex].classList.add(TAB_ACTIVE_CLASS);
            setTimeout(() => {
              tabPages[buttonIndex].classList.add(TAB_ANIMATED_CLASS);
            }, 60);
          }
        }
      });
    });
    if (tabsBar.querySelector(".input--dropdown")) {
      const dropdownItems = tabsBar
        .querySelector(".input--dropdown")
        .querySelectorAll(".custom-select-option");
      dropdownItems.forEach((dropdownItem) => {
        dropdownItem.addEventListener("click", () => {
          const tabIndex = dropdownItem.dataset.value;
          const tabsPages = document.querySelector(
            `.tabs__pages[data-tabs="${tabsBar.dataset.tabs}"]`
          );
          const pages = tabsPages.querySelectorAll(".tabs__page");
          pages.forEach((page, index) => {
            page.classList.remove("tab--active");
            if (index == tabIndex) {
              page.classList.add("tab--active");
            }
          });

          tabsBar
            .querySelectorAll(".tabs__controls-button")
            .forEach((button, index) => {
              button.classList.remove("tab--active");
              if (index == tabIndex) {
                button.classList.add("tab--active");
              }
            });

          console.log(dropdownItem);
          console.log(tabsBar.dataset);
        });
      });
    }

    if (tabsBar.dataset.tabs) {
      tabBarButtons.forEach((tabButton) => {
        if (tabButton.classList.contains(TAB_ACTIVE_CLASS)) {
          tabButton.click();
        }
      });
    }
  });
}, 150);

// #endregion tabs
 */
