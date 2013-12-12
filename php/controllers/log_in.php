<?php
include_once "../models/users.class.php";

/*
 * this controller returns all the user info after an email & 
 * password check
 */
$user = new Users();

if($result = $user->getUserByMail($_POST["email"])) {
    if(password_verify($_POST["password"], $result["password"])) {
        echo json_encode($result);
    }else {
        echo "<p> wrong password </p>";
    }
}else {
    echo "<p> email adress not found </p>";
}
?>