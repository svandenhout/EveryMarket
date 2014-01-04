<?php 
include_once "../models/product.class.php";

$result = $product->getAllProductsForLocation($_POST, 25);

if($result) {
    print(json_encode($result));
}
?>