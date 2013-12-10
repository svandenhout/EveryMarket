<?php 
include_once "users.class.php";
include_once "products.class.php";

// Test all of the models inside models.class.php
$users = new Users();
$products = new Products();


// all users
$result = $users->getAllUsers();
echo "</br>";
print_r($result);
echo "</br>";
    
// all products
$result = $products->getAllProducts();
echo "</br>";
print_r($result);
echo "</br>";

// test for adding a product
$product = [
    "user_id" => 1,
    "name" => "erwtjes",
    "description" => "200 gram lekkere erwtjes",
    "image" => "img/lekkere erwtjes.jpg"
];

if($products->addProduct($product)) {
    echo "</br>";
    echo "product added";
    echo "</br>";
}

// test for adding a user
$user = [
    "name" => "Steven",
    "location" => "TILBURG", 
    "email" => "stevenvandenhout@gmail.com",
    "password" => "hoeren"
];



if($users->addUser($user)) {
    echo "</br>";
    echo "user added";
    echo "</br>";
}

// getting all products per user
$result = $products->getProductsByUserId(1);
echo "</br>";
echo "products by user id";
echo "</br>";
print_r($result);

// retrieve a user by id
$result = $users->getUserById(58);
echo "</br>";
echo "user by id";
echo "</br>";
print_r($result);

// also testing password verify function
echo "</br>";
// this should be a complex looking hash
echo $result["password"];
echo "</br>";
if(password_verify($user["password"], $result["password"])) {
    echo "</br>";
    echo "password verified";
    echo "</br>";
}else {
    echo "</br>";
    echo "password problem!!!";
    echo "</br>";
}

// retrieve a product by id
$result = $products->getProductById(1);
echo "</br>";
echo "product by id";
echo "</br>";
print_r($result);
?>