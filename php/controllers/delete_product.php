<?php
include_once "../models/product.class.php";

print_r($_POST);

$result = $product->deleteProductById($_POST);

if($result) {
    print(JSON_encode($result));
}
?>