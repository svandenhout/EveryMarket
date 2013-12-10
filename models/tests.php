<?php 
include_once "models.class.php";

// Test all of the models inside models.class.php
$db = new DB();

// all users
$result = $db->getAllUsers();
echo "<br>";
print_r($result);

// all products
$result = $db->getAllProducts();
echo "<br>";
print_r($result);

// test for adding a product
$product = [
    "user_id" => 1,
    "name" => "erwtjes",
    "description" => "200 gram lekkere erwtjes",
    "image" => "img/lekkere erwtjes.jpg"
];

if($db->addProduct($product)) 
    echo "product added";

// test for adding a user
$user = [
    "name" => "Steven",
    "location" => "TILBURG", 
    "email" => "stevenvandenhout@gmail.com"
];

if($db->addUser($user))
    echo "user added";

// getting all products per user
$result = $db->getProductsByUserId(1);
echo "<br>";
echo "products by user id";
print_r($result);

?>