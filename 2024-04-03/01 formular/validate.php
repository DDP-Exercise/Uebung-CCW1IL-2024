<?php

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the email from the POST data
    $email = $_POST["email"];

    // Define the regular expression pattern for email validation
    $emailRegex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

    // Check if the email matches the specified pattern
    if (!preg_match($emailRegex, $email)) {
        // If the email doesn't match the pattern, echo an error message
        echo "Invalid email address";
    } else {
        // If the email matches the pattern, echo a success message
        echo "Email address is valid";
    }
}

?>
