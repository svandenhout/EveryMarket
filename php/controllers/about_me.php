<?php
include_once "../models/users.class.php";
/*
 * Sign in controller, will return paragraphs with a status message
 */

if($_POST["name"]) {
    $result = $user->editName($_POST);
}
    
if($_POST["email"]) {
    $result = $user->editEmail($_POST);
    
    if($result == $user::EMAIL_IN_USE) {
        echo "<p> Email address already in use </p>";
    }
}

    
if($_POST["location"]) {
    $result = $user->editLocation($_POST);
}

if($_POST["password"]) {
    $result = $user->editPassword($_POST);
}
?>