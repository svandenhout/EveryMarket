<?php
include_once "settings.php";

/*
 * Initiates a mysqli object called DB, I use this class to
 * build different standard query's that i think i need for my 
 * current project.
 *
 * ugh i guess this class needs to be changed to a facebook api
 * bot
 */
class User {
    // const DUPLICATE_ENTRY = 0;
    
    public function __construct() {
        $this->mysqli = new mysqli(DB_URL, DB_USERNAME, DB_PASSWORD, DB_NAME);

        if ($this->mysqli->connect_errno) {
            echo "Failed to connect to MySQL: " . $mysqli->connect_error;
        }
    }
    
    // the user parameter is an array with the facebook user id
    public function addUser($user) {
        
        $sql = 
            "INSERT INTO users (name, fb_id)
            VALUES (
                '" . $user["name"] . "',
                '" . $user["id"] . "'
            )";
        
        $result = $this->dbQuery($sql);
        
        return $result;
    }

    // returns DUPLICATE ENTRY when a user is in the database
    public function checkUser($user) {
        $sql = 
            "SELECT * FROM users 
            WHERE fb_id='" . $user["id"] . "'";

        $result = $this->dbQuery($sql);
        
        if($result->num_rows > 0) {
            return "duplicate entry";
        }
    }
    
    public function updateLocation($user) {
        $sql = 
            "UPDATE users
            SET latLng='" . $user["latLng"] . "',
                lat='" . $user["lat"] . "',
                lng='" . $user["lng"] . "',
                address='" . $user["address"] . "'
            WHERE fb_id='" . $user["id"] . "'";
        
        $result = $this->dbQuery($sql);
        
        return $result;
    }
    
    // returns array with all users
    public function getAllUsers() {
        $sql = "SELECT fb_id, location FROM users";
        
        $result = $this->dbQuery($sql);
        
        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            array_push($rows, $row);
        }
        
        return $rows;
    }

    // returns the user array
    public function getUserById($user) {
        $sql = 
            "SELECT *
            FROM users WHERE fb_id ='" . $user["id"] . "'";
            
        $result = $this->dbQuery($sql);
        
        $row = $result->fetch_array(MYSQLI_ASSOC);
        
        // if row returns false the user is not in the database
        if($row) {
            return $row;
        }
    }
    
    private function dbQuery($sql) {
        $result = $this->mysqli->query($sql) or 
            trigger_error($this->mysqli->error."[$sql]");
        
        return $result;
    }
}

// init the class 
$user = new User();
?>
