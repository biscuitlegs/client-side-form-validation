const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const postcodeInput = document.querySelector("#postcode");
const passwordInput = document.querySelector("#password");
const passwordConfirmationInput = document.querySelector(
  "#password-confirmation"
);

const emailErrors = document.querySelector(".email-errors");
const postcodeErrors = document.querySelector(".postcode-errors");
const passwordErrors = document.querySelector(".password-errors");
const passwordConfirmationErrors = document.querySelector(
  ".password-confirmation-errors"
);

function passwordMatchesConfirmation(password, confirmation) {
  let matches = false;
  if (password.value === confirmation.value) {
    matches = true;
  }

  return matches;
}

function removeAllErrors() {
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => error.parentElement.removeChild(error));
}

function createError(text) {
  const error = document.createElement("li");
  error.textContent = text;
  error.classList.add("error");

  return error;
}

function resetErrors(errors) {
  errors.innerHTML = "";
}

function showError(error) {
  error.classList.add("visible");
}

function createCheckIcon() {
  const icon = document.createElement("i");
  icon.classList.add("bi", "bi-check-circle", "input-icon");

  return icon;
}

function createXIcon() {
  const icon = document.createElement("i");
  icon.classList.add("bi", "bi-x-circle", "input-icon");

  return icon;
}

function removeIcons(input) {
  const label = input.parentElement;
  const icons = label.querySelectorAll(".input-icon");
  icons.forEach((icon) => label.removeChild(icon));
}

function updateIcon(input) {
  removeIcons(input);
  const label = input.parentElement;
  if (!input.validity.valid) {
    const xIcon = createXIcon();
    label.appendChild(xIcon);
  } else {
    const checkIcon = createCheckIcon();
    label.appendChild(checkIcon);
  }
}

function updateEmailErrors() {
  resetErrors(emailErrors);
  if (emailInput.validity.valueMissing) {
    const error = createError("Email cannot be blank.");
    emailErrors.appendChild(error);
  }
  if (emailInput.validity.typeMismatch) {
    const error = createError(
      "Email must be a valid email address. E.g. 'dave@example.com'."
    );
    emailErrors.appendChild(error);
  }
}

function updatePostcodeErrors() {
  resetErrors(postcodeErrors);
  if (postcodeInput.validity.valueMissing) {
    const error = createError("Postcode cannot be blank.");
    postcodeErrors.appendChild(error);
  }
  if (postcodeInput.validity.patternMismatch) {
    const error = createError(
      "Postcode must be a valid postcode. E.g. 'A99 9AA'."
    );
    postcodeErrors.appendChild(error);
  }
}

function updatePasswordErrors() {
  resetErrors(passwordErrors);
  resetErrors(passwordConfirmationErrors);
  passwordConfirmationInput.setCustomValidity("");
  if (passwordInput.validity.valueMissing) {
    const error = createError("Password cannot be blank.");
    passwordErrors.appendChild(error);
  }
  if (passwordInput.validity.patternMismatch) {
    const error = createError(
      "Password must contain at least 1 lowercase character, 1 uppercase character and 1 numeric character."
    );
    passwordErrors.appendChild(error);
  }
  if (passwordInput.validity.tooShort) {
    const error = createError("Password must contain at least 6 characters.");
    passwordErrors.appendChild(error);
  }
  if (!passwordMatchesConfirmation(passwordInput, passwordConfirmationInput)) {
    const error = createError("Password confirmation must match password.");
    passwordConfirmationErrors.appendChild(error);
    passwordConfirmationInput.setCustomValidity(
      "Password confirmation must match password."
    );
  }
  updateIcon(passwordConfirmationInput);
}

function updatePasswordConfirmationErrors() {
  resetErrors(passwordConfirmationErrors);
  passwordConfirmationInput.setCustomValidity("");
  if (passwordConfirmationInput.validity.valueMissing) {
    const error = createError("Password confirmation cannot be blank.");
    passwordConfirmationErrors.appendChild(error);
  }
  if (!passwordMatchesConfirmation(passwordInput, passwordConfirmationInput)) {
    const error = createError("Password confirmation must match password.");
    passwordConfirmationErrors.appendChild(error);
    passwordConfirmationInput.setCustomValidity(
      "Password confirmation must match password."
    );
  }
  updateIcon(passwordConfirmationInput);
}

function initializeInputs() {
  updateEmailErrors();
  updatePostcodeErrors();
  updatePasswordErrors();
  updatePasswordConfirmationErrors();
  updateIcon(emailInput);
  updateIcon(postcodeInput);
  updateIcon(passwordInput);
  updateIcon(passwordConfirmationInput);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  removeAllErrors();
  updateEmailErrors();
  updatePostcodeErrors();
  updatePasswordErrors();
  updatePasswordConfirmationErrors();
  updateIcon(emailInput);
  updateIcon(postcodeInput);
  updateIcon(passwordInput);
  updateIcon(passwordConfirmationInput);
});

emailInput.addEventListener("input", updateEmailErrors);
postcodeInput.addEventListener("input", updatePostcodeErrors);
passwordInput.addEventListener("input", updatePasswordErrors);
passwordConfirmationInput.addEventListener(
  "input",
  updatePasswordConfirmationErrors
);
emailInput.addEventListener("input", () => updateIcon(emailInput));
postcodeInput.addEventListener("input", () => updateIcon(postcodeInput));
passwordInput.addEventListener("input", () => updateIcon(passwordInput));
passwordConfirmationInput.addEventListener("input", () =>
  updateIcon(passwordConfirmationInput)
);

initializeInputs();
