
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
const formMessage = document.getElementById("formMessage");

function validateFirstName() {
    try {
        const firstNameValue = firstName.value.trim();
        const namePattern = /^[A-Za-z]+$/;

        if (firstNameValue === "") {
            throw new Error("First name is required.");
        }

        if (firstNameValue.length < 3 || firstNameValue.length > 14) {
            throw new Error("First name must be between 3 and 14 characters.");
        }

        if (!namePattern.test(firstNameValue)) {
            throw new Error("First name must contain only letters.");
        }

        firstNameError.textContent = "";
        return true;

    } catch (error) {
        firstNameError.textContent = error.message;
        return false;
    }
}

function validateLastName() {
    try {
        const lastNameValue = lastName.value.trim();
        const namePattern = /^[A-Za-z]+$/;

        if (lastNameValue === "") {
            throw new Error("Last name is required.");
        }

        if (lastNameValue.length < 3 || lastNameValue.length > 14) {
            throw new Error("Last name must be between 3 and 14 characters.");
        }

        if (!namePattern.test(lastNameValue)) {
            throw new Error("Last name must contain only letters.");
        }

        lastNameError.textContent = "";
        return true;

    } catch (error) {
        lastNameError.textContent = error.message;
        return false;
    }
}

function validateUsername() {
    try {
        const usernameValue = username.value.trim();

        if (usernameValue === "") {
            throw new Error("Username is required.");
        }

        if (usernameValue.length < 6) {
            throw new Error("Username must contain at least 6 characters.");
        }

        usernameError.textContent = "";
        return true;

    } catch (error) {
        usernameError.textContent = error.message;
        return false;
    }
}

function validateEmail() {
    try {
        const emailValue = email.value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailValue === "") {
            throw new Error("Email address is required.");
        }

        if (!emailPattern.test(emailValue)) {
            throw new Error("Please enter a valid email address.");
        }

        emailError.textContent = "";
        return true;

    } catch (error) {
        emailError.textContent = error.message;
        return false;
    }
}

function validatePassword() {
    try {
        const passwordValue = password.value;

        if (passwordValue === "") {
            throw new Error("Password is required.");
        }

        if (passwordValue.length < 8 || passwordValue.length > 128) {
            throw new Error("Password must be between 8 and 128 characters.");
        }

        passwordError.textContent = "";
        return true;

    } catch (error) {
        passwordError.textContent = error.message;
        return false;
    }
}

function validateConfirmPassword() {
    try {
        const confirmPasswordValue = confirmPassword.value;

        if (confirmPasswordValue === "") {
            throw new Error("Please confirm your password.");
        }

        if (confirmPasswordValue !== password.value) {
            throw new Error("Passwords do not match.");
        }

        confirmPasswordError.textContent = "";
        return true;

    } catch (error) {
        confirmPasswordError.textContent = error.message;
        return false;
    }
}

function validateProfileImage() {
    try {
        const files = profileImage.files;

        if (files.length === 0) {
            throw new Error("Please upload a profile image.");
        }

        if (files.length > 1) {
            throw new Error("Only one image is allowed.");
        }

        const file = files[0];
        const allowedExtensions = ["png", "jpg", "jpeg"];
        const allowedTypes = ["image/png", "image/jpeg"];

        const fileName = file.name.toLowerCase();
        const fileExtension = fileName.split(".").pop();

        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error("Only PNG, JPG and JPEG files are allowed.");
        }

        if (!allowedTypes.includes(file.type)) {
            throw new Error("Invalid image file type.");
        }

        profileImageError.textContent = "";
        return true;

    } catch (error) {
        profileImageError.textContent = error.message;
        return false;
    }
}

function clearFormMessage() {
    formMessage.textContent = "";
    formMessage.className = "";
}

firstName.addEventListener("input", function() {
    validateFirstName();
    clearFormMessage();
});

lastName.addEventListener("input", function() {
    validateLastName();
    clearFormMessage();
});

username.addEventListener("input", function() {
    validateUsername();
    clearFormMessage();
});

email.addEventListener("input", function() {
    validateEmail();
    clearFormMessage();
});

password.addEventListener("input", function() {
    validatePassword();

    if (confirmPassword.value !== "") {
        validateConfirmPassword();
    }

    clearFormMessage();
});

confirmPassword.addEventListener("input", function() {
    validateConfirmPassword();
    clearFormMessage();
});

profileImage.addEventListener("change", function() {
    validateProfileImage();
    clearFormMessage();
});

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isProfileImageValid = validateProfileImage();

        if (
            !isFirstNameValid ||
            !isLastNameValid ||
            !isUsernameValid ||
            !isEmailValid ||
            !isPasswordValid ||
            !isConfirmPasswordValid ||
            !isProfileImageValid
        ) {
            throw new Error("Please correct all errors before submitting.");
        }

        formMessage.textContent = "Registration completed successfully!";
        formMessage.className = "success-message";

        registrationForm.reset();

    } catch (error) {
        formMessage.textContent = error.message;
        formMessage.className = "error-message";
    }
});
