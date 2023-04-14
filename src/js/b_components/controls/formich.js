/**
 *
 * Form
 *
 */

import {setInputValid, setInputInvalid, validateInput} from "./input-validator.js"

// const buttonClasses = {
//   disabled: "button--disabled",
// };
// function disableButton(button) {
//   if (!button.innerText) return;
//   button.classList.add(buttonClasses.disabled);
//   button.disabled = true;
// }
// function enableButton(button) {
//   if (!button.innerText) return;
//   button.classList.remove(buttonClasses.disabled);
//   button.disabled = false;
// }

const formsList = document.querySelectorAll(".form");
formsList.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputsToValidate = [
      ...form.querySelectorAll('.form-control')
    ];

    inputsToValidate.forEach((input) => {
      validateInput(input);
    });

    // const formBody = new FormData(form);
    // let response = await fetch(form.action, {
    //   method: "POST",
    //   body: formBody,
    // });

    // try {
    // let result = await response.json();
    // console.log(result);
    // console.log(form);
    // console.log("thanks");
    // const submitButton = form.querySelector('button[type="submit"]');
    // if (submitButton) {
    //   submitButton.dataset.buttonText = submitButton.innerHTML;
    // }
  });
});

// #region input-labels
const inputs = document.querySelectorAll(".form .form-control");

const inputClasses = {
  invalid: "is-invalid",
  init: "input--init",
  active: "input--active",
  dropdown: "input--dropdown",
  activeDropdown: "input--active-dropdown",
  selectedDropdown: "input--selected-dropdown",
};

function activateInput(input) {
//   input.classList.add(inputClasses.active);
}
function deactivateInput(input) {
//   input.classList.remove(inputClasses.active);
}

function initInputs(inputs) {
  inputs.forEach((input) => {
    if (input.classList.contains(inputClasses.init)) return;
    input.classList.add(inputClasses.init);

    const field = input.querySelector("[required]");

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
      // setInputValid(input);
    });
    field.addEventListener("blur", () => {
      deactivateInput(input);
      if (field.value != "") {
        validateInput(input);
      }
    });

    field.addEventListener('input', () => {
      setInputValid(input);
    });
    field.addEventListener('change', () => {
      setInputValid(input);
    })

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