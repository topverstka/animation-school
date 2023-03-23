"use strict";

// #region validators
function validateInputText(input) {
  if (input.value == "") {
    return changeInutState(input, "invalid");
  } else {
    return changeInutState(input, "valid");
  }
}
const textInputs = document.querySelectorAll('.input[type="text"]');
textInputs.forEach((input) => {
  input.addEventListener("input", () => {
    validateInputText(input);
  });
});

function validateCheckbox(checkbox) {
  if (checkbox.checked) {
    checkbox.parentElement.classList.remove("input--invalid");
    return true;
  } else {
    checkbox.parentElement.classList.add("input--invalid");
    return false;
  }
}
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    validateCheckbox(checkbox);
  });
});

const telephoneInputs = document.querySelectorAll('input[type="tel"]');
// telephoneInputs.forEach((input) => {
//   input.addEventListener("input", () => {
//     if (input.value != "+") {
//       input.value = "+" + input.value.replace(/[^\d]/g, "");
//       if (input.value.length > 8) {
//         validatePhone(input);
//       }
//     } else if (input.value == "+") {
//       input.value = "";
//     }
//   });
// });
import "./styles.css";

const input = document.querySelector(".tel");

const prefixNumber = (str) => {
  if (str === "7") {
    return "7 (";
  }
  if (str === "8") {
    return "8 (";
  }
  if (str === "9") {
    return "7 (9";
  }
  return "7 (";
};

/*/ ======================================
input.addEventListener("input", (e) => {
  const value = input.value.replace(/\D+/g, "");
  const numberLength = 11;

  let result;
  if (input.value.includes("+8") || input.value[0] === "8") {
    result = "";
  } else {
    result = "+";
  }

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;
      case 4:
        result += ") ";
        break;
      case 7:
        result += "-";
        break;
      case 9:
        result += "-";
        break;
      default:
        break;
    }
    result += value[i];
  }
  //
  input.value = result;
});
// ======================================*/



function changeInutState(input, state) {
  if (state == "invalid") {
    input.classList.add("input--invalid");
    input.parentElement.classList.add("input__wrap--invalid");
    if (input.parentElement.querySelector(".error-text")) {
      input.parentElement
        .querySelector(".error-text")
        .classList.add("error-text--visible");
    }
    return false;
  } else if (state == "valid") {
    input.classList.remove("input--invalid");
    input.parentElement.classList.remove("input__wrap--invalid");
    if (input.parentElement.querySelector(".error-text")) {
      input.parentElement
        .querySelector(".error-text")
        .classList.remove("error-text--visible");
    }
    return true;
  }
}
function validatePhone(input) {
  if (input.value == "" || input.value.length < 8 || input.value.length > 18) {
    return changeInutState(input, "invalid");
  } else {
    return changeInutState(input, "valid");
  }
}
function validateEmail(input) {
  // regex validate email
  if (
    input.value == "" ||
    !input.value.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
  ) {
    return changeInutState(input, "invalid");
  } else {
    return changeInutState(input, "valid");
  }
}

const phones = document.querySelectorAll(".js-click-copy");
phones.forEach((phone) => {
  phone.addEventListener("click", (event) => {
    if (window.innerWidth < 1024) return;
    event.preventDefault();
    copyToClipboard(phone);
    let phoneNumber = phone.innerText;
    // let copiedText = phone.dataset.clickedText;
    let copiedText = "Скопировано!";
    phone.innerText = copiedText;
    setTimeout(() => {
      phone.innerText = phoneNumber;
    }, 5000);
  });
});

function validateInput(input) {
  if (input.disabled || !input.classList.contains("required")) return;

  if (input.type === "tel") {
    validatePhone(input);
  }
  if (input.type === "text") {
    validateInputText(input);
  }
  if (input.type === "email") {
    validateEmail(input);
  }
}

// #endregion validators

// #region form
const forms = document.querySelectorAll(".form");
forms.forEach((form) => {
  // Validate on Blur
  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("blur", () => {
      validateInput(input);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    form.querySelectorAll("input").forEach((input) => {
      validateInput(input);
    });

    let invalidInputs = [...form.querySelectorAll(".input--invalid")];
    if (invalidInputs.length === 0) {
      console.log("valid");
      document.querySelector(".modal-callback__form").classList.add("_sent");
      document.querySelector(".modal-callback__thanks").classList.add("_sent");
      document.querySelector(".modal-callback").classList.add("_sent");
    } else {
      console.log("invalid");
    }
  });
});
// #endregion form
