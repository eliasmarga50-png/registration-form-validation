
const registrationForm = document.getElementById("registrationForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");

function validateFirstName() {
    const firstNameValue = firstName.value.trim();
    const namePattern = /^[A-Za-z]+$/;

    if (firstNameValue === "") {
        firstNameError.textContent = "First name is required.";
        return false;
    }

    if (firstNameValue.length < 3 || firstNameValue.length > 14) {
        firstNameError.textContent = "First name must be between 3 and 14 characters.";
        return false;
    }

    if (!namePattern.test(firstNameValue)) {
        firstNameError.textContent = "First name must contain only letters.";
        return false;
    }

    firstNameError.textContent = "";
    return true;
}

function validateLastName() {
    const lastNameValue = lastName.value.trim();
    const namePattern = /^[A-Za-z]+$/;

    if (lastNameValue === "") {
        lastNameError.textContent = "Last name is required.";
        return false;
    }

    if (lastNameValue.length < 3 || lastNameValue.length > 14) {
        lastNameError.textContent = "Last name must be between 3 and 14 characters.";
        return false;
    }

    if (!namePattern.test(lastNameValue)) {
        lastNameError.textContent = "Last name must contain only letters.";
        return false;
    }

    lastNameError.textContent = "";
    return true;
}

firstName.addEventListener("input", validateFirstName);
lastName.addEventListener("input", validateLastName);

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();

    if (isFirstNameValid && isLastNameValid) {
        alert("First Name and Last Name are valid!");
    }
});
