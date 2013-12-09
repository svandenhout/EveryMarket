<?php
include_once "settings.php";

/*
 * Initiates a mysqli object calles DB, I use this class to
 * build different standard query's that i think i need for my 
 * current project.
 */
class DB {
    
    public function __construct() {
        $mysqli = new mysqli(localhost , DB_USERNAME, DB_PASSWORD, DB_NAME);

        if ($mysqli->connect_errno) {
            $this->db = $mysqli->connect_error;
        }else {
            $this->db = $mysqli;
        }
    }
    
    // the user parameter is an array
    // user = array(name => name, location => location.... etc
    // requires name, location, email
    public function addUser($user) {
        $result = $this->db->query(
            "INSERT_INTO users (name, location, email)
            VALUES (
                " . $user["name"] . ", 
                " . $user["location"] . ", 
                " . $user["email"] . "
            )"
        );
        
        return $result;
    }
    
    // the product parameter is an array
    // product = array(userid => userid, name => name.... etc
    // requires userid, name, description and an image
    public function addProduct($product) {
        return $this->db->query(
            "INSERT_INTO users (userid, name, description, image)
            VALUES (
                " . $product["userid"] . ", 
                " . $product["name"] . ", 
                " . $product["description"] . ",
                " . $product["image"] . "
            )"
        );
    }
    
    // returns an array with all products
    public function getAllProducts() {
        
    }
    
    // needs userId parameter, will return an array with all
    // products affiliated with the userId
    public function getProductsByUserId($userId) {
        $result = $this->db->query(
            "SELECT (userid, name, description, image)
            FROM products WHERE userid = " . userId . ""
        );
        
        return $result->fetch_array(MYSQLI_ASSOC);
    }
    
    public function getDatabase() {
        return $this->db;
    }
    
    
}
?>
