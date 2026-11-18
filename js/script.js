
const registrationForm = document.getElementById("registrationForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const username = document.getElementById("username");
const email = document.getElementById("email");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");

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

function validateUsername() {
    const usernameValue = username.value.trim();

    if (usernameValue === "") {
        usernameError.textContent = "Username is required.";
        return false;
    }

    if (usernameValue.length < 6) {
        usernameError.textContent = "Username must contain at least 6 characters.";
        return false;
    }

    usernameError.textContent = "";
    return true;
}

function validateEmail() {
    const emailValue = email.value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue === "") {
        emailError.textContent = "Email address is required.";
        return false;
    }

    if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Please enter a valid email address.";
        return false;
    }

    emailError.textContent = "";
    return true;
}

firstName.addEventListener("input", validateFirstName);
lastName.addEventListener("input", validateLastName);
username.addEventListener("input", validateUsername);
email.addEventListener("input", validateEmail);

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (
        isFirstNameValid &&
        isLastNameValid &&
        isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid
    ) {
        alert("All registration fields are valid!");
    }
});