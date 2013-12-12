<?php
include_once "../models/products.class.php";

/*
 * this controller returns all the user info after an email & 
 * password check
 */
$product = new Products();

print_r($_POST);

$uploads_dir = '../../images';
if ($_FILES["image"]["error"] == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES["image"]["tmp_name"];
    $name = $_FILES["image"]["name"];
    move_uploaded_file($tmp_name, "$uploads_dir/$name");
}


$result = $product->addProduct($_POST, $_FILES["image"]["name"]);

if(!$result){
    echo "<p> database problem " . $result . " </p>";
}else {
    echo "<p> Product added </p>";
}

?>