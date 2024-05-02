// Add event listener to the form submission event
document.getElementById("passwordForm").addEventListener("submit", function(event) {
    // Get the password input element
    const passwordInput = document.getElementById("password");

    // Get the password error message element
    const passwordError = document.getElementById("passwordError");

    // Define the regular expression pattern for password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Check if the password matches the specified pattern
    if (!passwordRegex.test(passwordInput.value)) {
        // If the password doesn't match the pattern, display an error message
        passwordError.textContent = "The password must be at least 8 characters long and contain at least one letter and one number.";

        // Prevent the form from being submitted
        event.preventDefault();
    } else {
        // If the password matches the pattern, clear the error message
        passwordError.textContent = "";
    }
});
