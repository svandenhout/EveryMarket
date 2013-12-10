<?php
include_once "../models/users.class.php";
/*
 * Sign in controller, will return paragraphs with a status message
 */
print_r($_POST);

$user = new Users();

if($user->checkEmail($_POST["email"])) {
    if($user->addUser($_POST)) {
        echo "<p> User added </p>";
    }
}else {
    echo "<p> Email address already in use </p>";
}

?>