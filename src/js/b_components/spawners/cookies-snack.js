// #region cookies
let cookiesPop = true;
if (!localStorage.getItem("cookies")) {
  localStorage.setItem("cookies", "true");
} else if (localStorage.getItem("cookies") == "false") {
  cookiesPop = false;
}

checkCookies(cookiesPop);
const cookiesButton = document.querySelector("#snack-cookies .snack__button");
cookiesButton.addEventListener("click", () => {
  cookiesPop = false;
  checkCookies(cookiesPop);
  localStorage.setItem("cookies", "false");
});

function checkCookies(cookiesPop) {
  const cookiesSnack = document.querySelector("#snack-cookies");
  if (!cookiesPop) {
    cookiesSnack.classList.remove("snack--visible");
    setTimeout(() => {
      cookiesSnack.remove();
    }, 2000);
  } else {
    cookiesSnack.classList.add("snack--visible");
  }
}
// #endregion cookies
