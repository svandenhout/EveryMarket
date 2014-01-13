<?php
include_once "../models/user.class.php";
/*
 * controller for changing the location of a user
 */

$result = $user->updateLocation($_POST);
print(json_encode($result));
?>