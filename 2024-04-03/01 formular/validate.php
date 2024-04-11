<?php

// Check if the request method is POST
var_dump($_SERVER, $_POST);
if($_SERVER['REQUEST_METHOD'] == "POST") {
    // Get the email from the POST data
    $email = $_POST['email'];

    // Define the regular expression pattern for email validation (use the Slides!!)
    $emailRegex = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

    // Check if the email matches the specified pattern
    if(!preg_match($emailRegex, $email)) {
    // If the email doesn't match the pattern, echo an error message
        echo 'Invalid email';
    } else {
    // else
    // If the email matches the pattern, echo a success message
        echo 'email valid. congrats!';
    }
}

?>
