// Add event listener to the form submission event
document.getElementById("myForm").addEventListener("submit", function(event) {
    // Get the email input element
    const emailInput = document.getElementById("email");

    // Get the email error message element
    const emailError = document.getElementById("emailError");

    // Define the regular expression pattern for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the specified pattern
    if (!emailRegex.test(emailInput.value)) {
        // If the email doesn't match the pattern, display an error message
        emailError.textContent = "Invalid email address";

        // Prevent the form from being submitted
        event.preventDefault();
    } else {
        // If the email matches the pattern, clear the error message
        emailError.textContent = "";
    }
});
