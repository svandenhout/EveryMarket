<?php
include_once "../models/product.class.php";

$result = $product->getProductById($_POST);

if($result) {
    print(JSON_encode($result));
}
?>