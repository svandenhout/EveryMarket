<?php
include_once "settings.php";

/*
 * Initiates a mysqli object called DB, I use this class to
 * build different standard query's that i think i need for my 
 * current project.
 */
class DB {    
    public function __construct() {
        $this->mysqli = new mysqli(DB_URL, DB_USERNAME, DB_PASSWORD, DB_NAME);

        if ($this->mysqli->connect_errno) {
            echo "Failed to connect to MySQL: " . $mysqli->connect_error;
        }
    }
    
    // the user parameter is an array
    // user = array(name => name, location => location.... etc
    // requires name, location, email
    public function addUser($user) {
        $sql = 
            "INSERT INTO users (name, location, email)
            VALUES (
                '" . $user["name"] . "', 
                '" . $user["location"] . "', 
                '" . $user["email"] . "'
            )";
        
        $result = $this->dbQuery($sql);
    }
    
    // the product parameter is an array
    // product = array(userid => userid, name => name.... etc
    // requires userid, name, description and an image
    public function addProduct($product) {
        $sql =
            "INSERT INTO products (user_id, name, description, image)
            VALUES (
                " . $product["user_id"] . ", 
                '" . $product["name"] . "', 
                '" . $product["description"] . "',
                '" . $product["image"] . "'
            )";
        
        $result = $this->dbQuery($sql);
    }
    
    // returns an array with all products
    public function getAllProducts() {
        $sql = "SELECT * FROM products";
            
        $result = $this->dbQuery($sql);
        
        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            array_push($rows, $row);
        }
        
        return $rows;
    }
    
    // returns array with all users
    public function getAllUsers() {
        $sql = "SELECT * FROM users";
        
        $result = $this->dbQuery($sql);
        
        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            array_push($rows, $row);
        }
        
        return $rows;
    }
    
    // returns the user array/object (wtf php!)
    public function getUserById($userId) {
        $sql = 
            "SELECT name, location, email
            From users WHERE '" .$userId . "'";
            
        $result = $this->dbQuery($sql);    
    }
    
    // returns the product by id
    public function getProductById($productId) {
        
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
    
    private function dbQuery($sql) {
        $result = $this->mysqli->query($sql) or 
            trigger_error($this->mysqli->error."[$sql]");
        
        return $result;
    }
}
?>
