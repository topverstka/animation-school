// #region tabs
/**
 * @tabs
 *
 * Табы инициируются все
 * У какой кнопки таба есть класс из js переменной TAB_ACTIVE_CLASS, тот таб и будет активным сразу
 *
 * .tabs>.tabs__toggler-container>button.tabs__toggler*2^.tabs__page-container>.tabs__page*2
 *
 */
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
