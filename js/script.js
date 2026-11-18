
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
const imagePreview = document.getElementById("imagePreview");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");

function clearFormMessage() {
    formMessage.textContent = "";
    formMessage.className = "";
}

function validateFirstName() {
    try {
        const value = firstName.value.trim();

        if (value === "") {
            throw new Error("First name is required.");
        }

        if (!/^[A-Za-z]+$/.test(value)) {
            throw new Error("Use letters only.");
        }

        if (value.length < 3 || value.length > 14) {
            throw new Error("First name must be 3–14 characters.");
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
        const value = lastName.value.trim();

        if (value === "") {
            throw new Error("Last name is required.");
        }

        if (!/^[A-Za-z]+$/.test(value)) {
            throw new Error("Use letters only.");
        }

        if (value.length < 3 || value.length > 14) {
            throw new Error("Last name must be 3–14 characters.");
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
        const value = username.value.trim();

        if (value === "") {
            throw new Error("Username is required.");
        }

        if (value.length < 6) {
            throw new Error("Username must be at least 6 characters.");
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
        const value = email.value.trim();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (value === "") {
            throw new Error("Email address is required.");
        }

        if (!emailPattern.test(value)) {
            throw new Error("Enter a valid email address.");
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
        const value = password.value;

        if (value === "") {
            throw new Error("Password is required.");
        }

        if (value.length < 8 || value.length > 128) {
            throw new Error("Password must be 8–128 characters.");
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
        const value = confirmPassword.value;

        if (value === "") {
            throw new Error("Please confirm your password.");
        }

        if (value !== password.value) {
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
            throw new Error("Please select a profile image.");
        }

        if (files.length > 1) {
            throw new Error("Only one image is allowed.");
        }

        const file = files[0];
        const extension = file.name.split(".").pop().toLowerCase();
        const allowedExtensions = ["png", "jpg", "jpeg"];
        const allowedTypes = ["image/png", "image/jpeg"];

        if (!allowedExtensions.includes(extension) || !allowedTypes.includes(file.type)) {
            throw new Error("Only PNG, JPG, and JPEG images are allowed.");
        }

        profileImageError.textContent = "";
        return true;
    } catch (error) {
        profileImageError.textContent = error.message;
        imagePreviewContainer.hidden = true;
        imagePreview.removeAttribute("src");
        return false;
    }
}

function showImagePreview() {
    if (!validateProfileImage()) {
        return;
    }

    const file = profileImage.files[0];
    const imageURL = URL.createObjectURL(file);

    imagePreview.src = imageURL;
    imagePreviewContainer.hidden = false;
}

firstName.addEventListener("input", () => {
    validateFirstName();
    clearFormMessage();
});

lastName.addEventListener("input", () => {
    validateLastName();
    clearFormMessage();
});

username.addEventListener("input", () => {
    validateUsername();
    clearFormMessage();
});

email.addEventListener("input", () => {
    validateEmail();
    clearFormMessage();
});

password.addEventListener("input", () => {
    validatePassword();

    if (confirmPassword.value !== "") {
        validateConfirmPassword();
    }

    clearFormMessage();
});

confirmPassword.addEventListener("input", () => {
    validateConfirmPassword();
    clearFormMessage();
});

profileImage.addEventListener("change", () => {
    showImagePreview();
    clearFormMessage();
});

document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.target);

        if (target.type === "password") {
            target.type = "text";
            button.textContent = "Hide";
            button.setAttribute("aria-label", "Hide password");
        } else {
            target.type = "password";
            button.textContent = "Show";
            button.setAttribute("aria-label", "Show password");
        }
    });
});

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormMessage();

    try {
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isProfileImageValid = validateProfileImage();

        const isFormValid =
            isFirstNameValid &&
            isLastNameValid &&
            isUsernameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            isProfileImageValid;

        if (!isFormValid) {
            throw new Error("Please correct the errors above and try again.");
        }

        registrationForm.reset();

        imagePreviewContainer.hidden = true;
        imagePreview.removeAttribute("src");

        document.querySelectorAll(".toggle-password").forEach((button) => {
            button.textContent = "Show";
            button.setAttribute("aria-label", "Show password");
        });

        formMessage.textContent = "All fields are valid! Your form is ready for registration.";
        formMessage.className = "success-message";
    } catch (error) {
        formMessage.textContent = error.message;
        formMessage.className = "error-message";
    }
});
