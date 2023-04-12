
function disableDefaultInvalid() {
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
}
disableDefaultInvalid();

export function setInputInvalid(input) {
  input = input.classList.contains('iti') ? input.parentElement : input;

  input.classList.add("input--invalid");
  const field = input.querySelector('[required]');

  let isValid;

  if (field.validity != null) {
  	isValid = field.validity.valid;
  } else if (field.checked) {
  	isValid = field.checked;
  } else {
  	console.log('Да')
  }

  if (field.validationMessage) {
	  changeErrorText(input);
	}

  return isValid;
}

export function setInputValid(input) {
  input.classList.remove("input--invalid");
  const field = input.querySelector(".input__field");

  let isValid;
  if (field.validity != null) {
  	isValid = field.validity.valid;
  } else if (field.checked) {
  	isValid = field.checked;
  }

  if (field.validationMessage) {
	  changeErrorText(input);
  }
  return isValid;
}

export function changeErrorText(input) {
  const field = input.querySelector(".input__field");
  const error = input.querySelector(".input__message");
  if (error) {
    error.innerText = field.validationMessage;
  }
}

export function validateInput(input) {
  const field = input.querySelector("[required]");
  if (field == null) return;
  if (field.getAttribute("required") == null) return;
  console.log(field)

  if (field.type == "tel") {
    return validatePhone(input);
  } else if (field.type == "email") {
    return validateEmail(input);
  } else {
    return validateInputLength(input);
  }
}

export function validateInputLength(input) {
  const field = input.querySelector(".input__field");
  if (field.value.length == 0) {
    return setInputInvalid(input);
  } else {
    return setInputValid(input);
  }
}

export function validatePhone(input) {
  const field = input.querySelector(".input__field");
  let regex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  if (!regex.test(field.value)) {
    return setInputInvalid(input);
  } else {
    return setInputValid(input);
  }
}

export function validateEmail(input) {
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
