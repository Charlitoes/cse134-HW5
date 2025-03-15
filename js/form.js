document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("contactForm");
    let messageBox = document.getElementById("message");
    let nameInput = document.getElementById("name");
    let emailInput = document.getElementById("email");
    let errorMessage = document.getElementById("error");
    let charCount = document.getElementById("charCount");
    let formErrorsInput = document.getElementById("formErrors");
    let form_errors = []; // Array to store error logs
    let maxChars = 148;

    // Function to validate special characters in the message
    function validateMessage() {
        if (!/^[A-Za-z0-9 ]*$/.test(messageBox.value)) {
            errorMessage.style.display = "block";
            errorMessage.innerText = "Message contains invalid characters.";  // Set the error message
            logError("message", "Contains invalid characters", messageBox.value);
            return false;
        } else {
            errorMessage.style.display = "none";
            return true;
        }
    }

    // Function to validate the name field
    function validateName() {
        if (nameInput.value.trim() === "") {
            let nameError = document.getElementById("name-error");
            nameError.style.display = "block";
            nameError.innerText = "Name is required.";  // Set the error message
            logError("name", "Name is required", nameInput.value);
            return false;
        } else {
            let nameError = document.getElementById("name-error");
            nameError.style.display = "none";
            return true;
        }
    }

    // Function to validate email format
    function validateEmail() {
        if (!emailInput.checkValidity()) {
            let emailError = document.getElementById("email-error");
            emailError.style.display = "block";
            emailError.innerText = "Invalid email format.";  // Set the error message
            logError("email", "Invalid email format", emailInput.value);
            return false;
        } else {
            let emailError = document.getElementById("email-error");
            emailError.style.display = "none";
            return true;
        }
    }

    // Function to update character count and change color
    function updateCharCount() {
        let remaining = maxChars - messageBox.value.length;
        charCount.textContent = remaining + " characters remaining";

        if (remaining <= 20 && remaining > 10) {
            charCount.className = "char-count warning";
        } else if (remaining <= 10) {
            charCount.className = "char-count error";
        } else {
            charCount.className = "char-count";
        }
    }

    // Function to log errors into the form_errors array
    function logError(field, message, inputValue) {
        let existingError = form_errors.find(error => error.field === field);
        if (!existingError) {
            form_errors.push({ field: field, message: message, value: inputValue });
        }
    }

    // Listen for input events
    messageBox.addEventListener("input", function () {
        validateMessage();
        updateCharCount();
    });

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);

    // Prevent form submission if there are errors
    form.addEventListener("submit", function (event) {

        let isValid = true;
        if (!validateName()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateMessage()) isValid = false;

        if (!isValid) {
            event.preventDefault(); // Stop form from submitting
            alert("Please fix errors before submitting.");
        }

        // Encode errors as JSON and store them in the hidden input field
        formErrorsInput.value = JSON.stringify(form_errors);
    });

    // Initialize character count on page load
    updateCharCount();
});