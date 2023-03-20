function makeSnack(message, type = false) {
  const notificationSnackWrap = document.querySelector(
    ".notification-snack__wrap"
  );
  const notificationSnackTemplate = document.querySelector(
    ".notification-snack--template"
  );
  const notificationSnack = notificationSnackTemplate.cloneNode(true).content;
  notificationSnack.querySelector(".notification-snack__message").innerHTML =
    message;
  notificationSnackWrap.appendChild(notificationSnack);

  const snacks = Array.from(notificationSnackWrap.children);
  const snacksLastChild = snacks[snacks.length - 1];

  if (type) {
    if (type === "success") {
      snacksLastChild.classList.add("alert--success");
    } else if (type === "error") {
      snacksLastChild.classList.add("alert--error");
    }
  }

  setTimeout((e) => {
    snacksLastChild.classList.add("notification-snack--shown");
  }, 100);
  function removeSnack(snacksLastChild, delay = 200) {
    setTimeout((e) => {
      snacksLastChild.classList.remove("notification-snack--shown");
    }, delay);
    setTimeout((e) => {
      snacksLastChild.remove();
    }, delay + 600);
  }

  snacksLastChild
    .querySelector(".notification-snack__close")
    .addEventListener("click", function () {
      removeSnack(snacksLastChild);
    });

  removeSnack(snacksLastChild, 5000);
}
