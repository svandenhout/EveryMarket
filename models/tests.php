<?php 
include_once "models.class.php";

// LETS DO TESTING
$db = new DB();

$user = [
    "name" => "Steven", 
    "location" => "TILBURG", 
    "email" => "stevenvandenhout@gmail.com"]; 

$result = $db->addUser($user);

if($result) {
    echo "TEST 1 done";
}else {
    echo "TEST 1 failed". $result;
}
?>