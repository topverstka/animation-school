import { copyToClipboard } from "../utils/helpers.js";

const copyNotificationText = "Скопировано";

const copyClickItems = document.querySelectorAll(".js_click-copy");
copyClickItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // код для мобильных устройств
    } else {
      // код для обычных устройств
      e.preventDefault();

      const copiedText = item.innerText;
      copyToClipboard(copiedText);
      item.dataset.text = copiedText;
      if (item.classList.contains("hints__item--tel")) {
        const telText = item.querySelector(".hints__item-text");
        telText.innerText = copyNotificationText;
        setTimeout(() => {
          telText.innerText = item.dataset.text;
        }, 5000);
      } else {
        item.innerText = copyNotificationText;
        setTimeout(() => {
          item.innerText = item.dataset.text;
        }, 5000);
      }
    }
  });
});
