import {bodyLock} from '../../b_helpers/action-helpers.js'

const burger = document.querySelector(".burger");
const header = document.querySelector(".header");
const HEADER_OPENED_CLASS = "header--opened";
const BURGER_OPENED = "is-active";

function openBurger() {
  header.classList.add(HEADER_OPENED_CLASS);
  burger.classList.add(BURGER_OPENED)
  bodyLock(true);
  const stickyHeader = document.querySelector('.page-heading--sticky-run');

  if (!stickyHeader) return;

  stickyHeader.style.transform = '';
}
function closeBurger() {
  header.classList.remove(HEADER_OPENED_CLASS);
  burger.classList.remove(BURGER_OPENED)
  bodyLock(false);
}

if (header && burger) {
  burger.addEventListener("click", () => {
    if (header.classList.contains(HEADER_OPENED_CLASS)) {
      closeBurger();
    } else {
      openBurger();
    }
  });
}