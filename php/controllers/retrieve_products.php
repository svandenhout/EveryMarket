<?php 
include_once "../models/product.class.php";

$result = $product->getAllProductsForLocation($_POST, 50);

if($result) {
    print(json_encode($result));
}
?>