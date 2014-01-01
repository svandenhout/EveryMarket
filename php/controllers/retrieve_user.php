<?php
include_once "../models/user.class.php";
/*
 * retrieves user from the database
 */

$result = $user->getUserById($_POST);

print(json_encode($result));
?>