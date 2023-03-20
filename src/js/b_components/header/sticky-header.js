// #region stickyHeader

const header = document.querySelector(".header");
const headerNav = header.querySelector(".header__nav");
window.addEventListener("scroll", () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // код для мобильных устройств
  } else {
    // код для обычных устройств
    const headerOffset = headerNav.getBoundingClientRect();
    if (headerOffset.height < window.pageYOffset) {
      header.classList.add("header--sticky");
    } else {
      header.classList.remove("header--sticky");
    }
  }
});
// #endregion stickyHeader
