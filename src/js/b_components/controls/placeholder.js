// #region inputplaceholder
// @inputPlaceholders
const inputFields = document.querySelectorAll(".input");

function unblurInput(input, placeholder) {
  if (input.value.length === 0) {
    placeholder.classList.remove("active");
  }
}
function checkInputContent(input, placeholder) {
  if (input.value !== "") {
    if (!placeholder.classList.contains("active")) {
      placeholder.classList.add("active");
    }
    return;
  }
}

function makeInputActive(input) {
  if (input.classList.contains("input__placeholder--inited")) {
    return;
  }

  const placeholder = input.parentElement.querySelector(".input__placeholder");
  input.addEventListener("focus", () => {
    if (!placeholder) return;

    placeholder.classList.add("active");
  });

  if (placeholder) {
    input.classList.add("input__placeholder--inited");
    input.addEventListener("blur", () => {
      checkInputContent(input, placeholder);
      unblurInput(input, placeholder);
    });
    input.addEventListener("change", () =>
      checkInputContent(input, placeholder)
    );
    input.addEventListener("input", () => {
      // console.log("input", input.value.length);
      checkInputContent(input, placeholder);
    });
  }
  input.focus();
  input.blur();
  checkInputContent(input, placeholder);
}
if (inputFields) {
  inputFields.forEach((input) => {
    makeInputActive(input);
    input.blur();
  });
}
// #endregion inputplaceholder

  