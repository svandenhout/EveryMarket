<?php
include_once "../models/product.class.php";

$result = $product->deleteProductById($_POST);

if($result) {
    print(JSON_encode($result));
}
?>