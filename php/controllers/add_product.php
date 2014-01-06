<?php
include_once "../models/product.class.php";

/*
 * this controller returns all the user info after an email & 
 * password check
 */

$uploads_dir = $home_dir . '/images';
if ($_FILES["image"]["error"] == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES["image"]["tmp_name"];
    $name = $_FILES["image"]["name"];
    move_uploaded_file($tmp_name, "$uploads_dir/$name");
}

$result = $product->addProduct($_POST, $_FILES["image"]["name"]);

if(!$result){
    print("<p> database problem " . $result . " </p>");
}else {
    print("<p> Product added </p>");
    print("<script>window.location = '/index.html'</script>");
}
?>