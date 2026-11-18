
const registrationForm = document.getElementById("registrationForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const profileImage = document.getElementById("profileImage");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const profileImageError = document.getElementById("profileImageError");

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

function validatePassword() {
    const passwordValue = password.value;

    if (passwordValue === "") {
        passwordError.textContent = "Password is required.";
        return false;
    }

    if (passwordValue.length < 8 || passwordValue.length > 128) {
        passwordError.textContent = "Password must be between 8 and 128 characters.";
        return false;
    }

    passwordError.textContent = "";
    return true;
}

function validateConfirmPassword() {
    const confirmPasswordValue = confirmPassword.value;

    if (confirmPasswordValue === "") {
        confirmPasswordError.textContent = "Please confirm your password.";
        return false;
    }

    if (confirmPasswordValue !== password.value) {
        confirmPasswordError.textContent = "Passwords do not match.";
        return false;
    }

    confirmPasswordError.textContent = "";
    return true;
}

function validateProfileImage() {
    const files = profileImage.files;

    if (files.length === 0) {
        profileImageError.textContent = "Please upload a profile image.";
        return false;
    }

    if (files.length > 1) {
        profileImageError.textContent = "Only one image is allowed.";
        return false;
    }

    const file = files[0];
    const allowedExtensions = ["png", "jpg", "jpeg"];
    const allowedTypes = ["image/png", "image/jpeg"];

    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split(".").pop();

    if (!allowedExtensions.includes(fileExtension)) {
        profileImageError.textContent = "Only PNG, JPG and JPEG files are allowed.";
        return false;
    }

    if (!allowedTypes.includes(file.type)) {
        profileImageError.textContent = "Invalid image file type.";
        return false;
    }

    profileImageError.textContent = "";
    return true;
}

firstName.addEventListener("input", validateFirstName);
lastName.addEventListener("input", validateLastName);
username.addEventListener("input", validateUsername);
email.addEventListener("input", validateEmail);

password.addEventListener("input", function() {
    validatePassword();

    if (confirmPassword.value !== "") {
        validateConfirmPassword();
    }
});

confirmPassword.addEventListener("input", validateConfirmPassword);
profileImage.addEventListener("change", validateProfileImage);

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isProfileImageValid = validateProfileImage();

    if (
        isFirstNameValid &&
        isLastNameValid &&
        isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isProfileImageValid
    ) {
        alert("All registration fields are valid!");
    }
});
