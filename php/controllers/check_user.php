<?php
include_once "../models/user.class.php";
/*
 * checks if a user id is allready in the database
 */

// returns duplicate entry if the user is allready in the database
$result = $user->checkUser($_POST);

if($result == "duplicate entry") {
    print($result);
}
?>