<?php
include_once "settings.php";

class Products {
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
        
       dbQuery($sql);
        
        return $result;
    }
    
    // returns an array with all products
    // all products have their location
    public function getAllProducts() {
        $sql = 
            "SELECT * FROM users RIGHT JOIN products
            ON users.id = products.user_id";
            
        dbQuery($sql);
        
        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            array_push($rows, $row);
        }
        
        return $rows;
    }
    
    // returns the product by id
    // also returns the location
    public function getProductById($product_id) {
        $sql = 
            "SELECT *
            FROM products WHERE id ='" .$product_id . "'";
            
        dbQuery($sql);
        
        $row = $result->fetch_array(MYSQLI_ASSOC);
        
        return $row;
    }
    
    // needs userId parameter, will return an array with all
    // products affiliated with the userId
    public function getProductsByUserId($user_id) {
        $sql =
            "SELECT user_id, name, description, image
            FROM products WHERE user_id = " . $user_id . "";
        
        dbQuery($sql);
        
        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            array_push($rows, $row);
        }
        
        return $rows;
    }
    
    private function dbQuery($sql) {
        $result = $this->mysqli->query($sql) or 
            trigger_error($this->mysqli->error."[$sql]");
        
        return $result;
    }
}

// init the class 
$product = new Product();
?>