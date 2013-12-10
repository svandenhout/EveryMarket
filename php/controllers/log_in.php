<?php
/*
 * this controller returns all the user info after an email & 
 * password check
 */
$user = new User();

// add password & shit ... fuck...
if($user->getUserByEmail($_Post["email"])) {
    if(password_verify($_Post["password"], $user["password"])) {
        echo json_encode($user);
    }else {
        echo "<p> wrong password </p>";
    }
}else {
    echo "<p> email adress not found </p>";
}
?>