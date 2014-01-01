<?php
include_once "../models/user.class.php";
/*
 * add user will add the full user data to the database
 */

$result = $user->addUser($_POST);

if($result == user::DUPLICATE_ENTRY) {
    print("duplicate entry");
}else {
    print("user added");
}
?>