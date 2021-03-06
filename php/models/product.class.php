<?php
include_once "settings.php";

class Product {
    public function __construct() {
        $this->mysqli = new mysqli(DB_URL, DB_USERNAME, DB_PASSWORD, DB_NAME);

        if ($this->mysqli->connect_errno) {
            echo "Failed to connect to MySQL: " . $mysqli->connect_error;
        }
    }
    
    // the product parameter is an array
    // product = array(userid => userid, name => name.... etc
    // requires userid, name, description and an image
    public function addProduct($product, $fileName) {
        $sql =
            "INSERT INTO products (user_id, name, description, image)
            VALUES (
                " . $product["user_id"] . ",
                '" . $product["name"] . "',
                '" . $product["description"] . "',
                '" . $fileName . "'
            )";
        
        $result = $this->dbQuery($sql);
        
        return $result;
    }
    
    public function updateProduct($product, $fileName) {
        $sql = 
            "UPDATE products
            SET name='" . $product["name"] . "',
                description='" . $product["description"] . "',
                image='" . $fileName . "'
            WHERE id='" . $product["id"] . "'";
        
        $result = $this->dbQuery($sql);
        
        print($result);
    }
    
    // returns an array with all products
    // all products have their location
    public function getAllProducts() {
        $sql = 
            "SELECT * FROM users RIGHT JOIN products
            ON users.fb_id = products.user_id";
            
        $result = $this->dbQuery($sql);
        
        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            array_push($rows, $row);
        }
        
        return $rows;
    }
    
    // lat 0.25 should be ~25 km 
    // lng 0.4 should also be ~25km 
    // very rough calculations based on the 51 degree lat (netherlands)
    public function getAllProductsForLocation($location, $kilometers) {
        // TODO this is not the right way to calculate latlng to km. The 
        // margin for error is HUGE, 25 km could be like 30 km
        // (this will not work as expected in places like antartica
        // because the earth is round)
        $lat_degrees = $kilometers * 0.01;
        $lng_degrees = $kilometers * 0.016;
        $min_lat = $location["lat"] - $lat_degrees;
        $max_lat = $location["lat"] + $lat_degrees;
        $min_lng = $location["lng"] - $lng_degrees;
        $max_lng = $location["lng"] + $lng_degrees;
        
        $sql = 
            "SELECT
                users.fb_id,
                users.latLng,
                users.name AS user_name,
                products.id,
                products.name, 
                products.description, 
                products.image
            FROM users JOIN products 
            ON users.fb_id = products.user_id
            WHERE users.lat < " . $max_lat . " AND users.lat > " . $min_lat . "
            AND users.lng < " . $max_lng . " AND users.lng > " . $min_lng;
        
        $result = $this->dbQuery($sql);
        
        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            array_push($rows, $row);
        }
        
        return $rows;
    }
    
    // returns the product by id
    // also returns the location & other user stuff
    public function getProductById($product_id) {
        $product_id = $product_id["id"];
        
        $sql = 
            "SELECT 
                users.fb_id,
                users.latLng,
                users.address,
                users.name AS user_name,
                products.id,
                products.name, 
                products.description, 
                products.image
            FROM users JOIN products 
            WHERE products.user_id = users.fb_id AND
            products.id = " .$product_id;
            
        $result = $this->dbQuery($sql);
        
        $row = $result->fetch_array(MYSQLI_ASSOC);
        
        return $row;
    }
    
    // needs userId parameter, will return an array with all
    // products affiliated with the userId
    public function getProductsByUserId($user_id) {
        $sql =
            "SELECT user_id, name, description, image
            FROM products WHERE user_id = " . $user_id . "";
        
        $result = $this->dbQuery($sql);
        
        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            array_push($rows, $row);
        }
        
        return $rows;
    }
    
    public function deleteProductById($product_id) {
        $product_id = $product_id["id"];
        $sql = 
            "DELETE FROM products
            WHERE id=" . $product_id;
        
        $result = $this->dbQuery($sql);
        
        print($result);
    }
    
    private function dbQuery($sql) {
        $result = $this->mysqli->query($sql) or 
            trigger_error($this->mysqli->error."[$sql]");
        
        if($this->mysqli->affected_rows > 0) {
            return $result;
        }else {
            return false;
        }
        
        
    }
}

// init the class 
$product = new Product();
?>