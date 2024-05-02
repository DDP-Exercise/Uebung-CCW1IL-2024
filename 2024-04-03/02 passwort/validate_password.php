<?php

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the password from the POST data
    $password = $_POST["password"];

    // Define the regular expression pattern for password validation
    $passwordRegex = '/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/';

    // Check if the password matches the specified pattern
    if (!preg_match($passwordRegex, $password)) {
        // If the password doesn't match the pattern, display an error message
        echo "The password must be at least 8 characters long and contain at least one letter and one number.";
    } else {
        // If the password matches the pattern, display a success message
        echo "The password is valid.";
    }
}


?>
