/**
 *
 * Form
 *
 */

// #region validate

// Выключает стандартные подсказки валидации
document.addEventListener(
  "invalid",
  (function (e) {
    return function (e) {
      e.preventDefault();
      e.target.focus();
      const input = e.target.parentElement;
      setInputInvalid(input);
    };
  })(),
  true
);

function setInputInvalid(input) {
  input = input.classList.contains('iti') ? input.parentElement : input;

  input.classList.add("input--invalid");
  const field = input.querySelector(".input__field");
  const isValid = field.validity.valid;
  changeErrorText(input);
  new window.snacky(field.validationMessage, field.form, 5000);
  return isValid;
}

function setInputValid(input) {
  input.classList.remove("input--invalid");
  const field = input.querySelector(".input__field");
  const isValid = field.validity.valid;
  changeErrorText(input);
  return isValid;
}

function changeErrorText(input) {
  const field = input.querySelector(".input__field");
  const error = input.querySelector(".input__message");
  if (error) {
    error.innerText = field.validationMessage;
  }
}

function validateInput(input) {
  const field = input.querySelector(".input__field");
  if (field == null) return;
  if (field.getAttribute("required") == null) return;

  if (field.type == "tel") {
    return validatePhone(input);
  } else if (field.type == "email") {
    return validateEmail(input);
  } else {
    return validateInputLength(input);
  }
}

function validateInputLength(input) {
  const field = input.querySelector(".input__field");
  if (field.value.length == 0) {
    return setInputInvalid(input);
  } else {
    return setInputValid(input);
  }
}

function validatePhone(input) {
  const field = input.querySelector(".input__field");
  let regex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  if (!regex.test(field.value)) {
    return setInputInvalid(input);
  } else {
    return setInputValid(input);
  }
}
function validateEmail(input) {
  const field = input.querySelector(".input__field");
  let regex =
    // eslint-disable-next-line no-control-regex
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!regex.test(field.value)) {
    return setInputInvalid(input);
  } else {
    return setInputValid(input);
  }
}
// #endregion validate

const buttonClasses = {
  disabled: "button--disabled",
};
function disableButton(button) {
  if (!button.innerText) return;
  button.classList.add(buttonClasses.disabled);
  button.disabled = true;
}
function enableButton(button) {
  if (!button.innerText) return;
  button.classList.remove(buttonClasses.disabled);
  button.disabled = false;
}

// Обработчик форм
const formsList = document.querySelectorAll("form");
formsList.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // console.log("submit");
    form.querySelectorAll(".input").forEach((input) => {
      // validateInput(input);
    });

    const formBody = new URLSearchParams(new FormData(form));
    let response = await fetch(form.action, {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    // try {
    // let result = await response.json();
    // console.log(result);
    // console.log(form);
    // console.log("thanks");
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.dataset.buttonText = submitButton.innerHTML;
      // submitButton.innerText = "Message envoyé"
      // submitButton.innerHTML = "✓";
      // disableButton(submitButton);

      // setTimeout(() => {
      //   submitButton.innerHTML = submitButton.dataset.buttonText;
      //   enableButton(submitButton);
      // }, 10000);
      new window.snacky(`Спасибо!
        Данные успешно отправлены.`, form, 5000);
    }
    const sentEvent = new Event("form_sent", {
      bubbles: true,
      cancelable: false,
    });
    form.dispatchEvent(sentEvent);
    // } catch {
    // console.log("error");
    // }
    setTimeout(() => {
      window.poppa.closeCurrentPop()
      form.reset();
    }, 2500);
  });
});

// #region input-labels
const inputs = document.querySelectorAll(".input");

const inputClasses = {
  invalid: "input--invalid",
  init: "input--init",
  active: "input--active",
  dropdown: "input--dropdown",
  activeDropdown: "input--active-dropdown",
  selectedDropdown: "input--selected-dropdown",
};

function activateInput(input) {
  input.classList.add(inputClasses.active);
}
function deactivateInput(input) {
  input.classList.remove(inputClasses.active);
}

function initInputs(inputs) {
  inputs.forEach((input) => {
    if (input.classList.contains(inputClasses.init)) return;
    input.classList.add(inputClasses.init);

    const field = input.querySelector(".input__field");

    input.addEventListener("click", (e) => {
      if (!e.target.classList.contains("input__field")) return;
      if (input.classList.contains(inputClasses.activeDropdown)) {
        deactivateInput(input);
      } else {
        activateInput(input);
      }
    });

    if (!field) return;

    field.addEventListener("focus", () => {
      activateInput(input);
      setInputValid(input);
    });
    field.addEventListener("blur", () => {
      deactivateInput(input);
      if (field.value != "") {
        validateInput(input);
      }
    });
    if (field.type != "email" && field.type != "tel") {
      field.addEventListener("input", (e) => {
        validateInput(input);
      });
    }

    if (field.value !== "") {
      input.classList.add(inputClasses.active);
    }
  });
}

initInputs(inputs);

// #endregion input-labels


/*

     window.addEventListener('load', function(){
        return;
        let loc = document.getElementById("855929640f27f2de67f");
        loc.value = window.location.href;
        let ref = document.getElementById("855929640f27f2de67fref");
        ref.value = document.referrer;

        let statUrl = "https://academychiptuning.by/stat/counter?ref=" + encodeURIComponent(document.referrer)
            + "&loc=" + encodeURIComponent(document.location.href);
        document.getElementById('gccounterImgContainer').innerHTML
            = "<img width=1 height=1 style='display:none' id='gccounterImg' src='" + statUrl + "'/>";
    });

*/