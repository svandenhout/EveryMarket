<?php
include_once "../models/users.class.php";
/*
 * Sign in controller, will return paragraphs with a status message
 */

$user = new Users();
$result = $user->addUser($_POST);
    
if($result == $user::EMAIL_IN_USE) {
    echo "<p> Email address already in use </p>";
}else if(!$result){
    echo "<p> database problem " . $result . " </p>";
}else {
    echo "<p> User added </p>";
}

?>