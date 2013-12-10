<?php
include_once "settings.php";

/*
 * Initiates a mysqli object called DB, I use this class to
 * build different standard query's that i think i need for my 
 * current project.
 */
class Users {    
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
        $password = password_hash($user["password"], PASSWORD_DEFAULT );
        
        $sql = 
            "INSERT INTO users (name, location, email, password)
            VALUES (
                '" . $user["name"] . "', 
                '" . $user["location"] . "', 
                '" . $user["email"] . "',
                '" . $password . "'
            )";
        
        $result = $this->dbQuery($sql);
        
        return $result;
    }
    
    // returns array with all users
    public function getAllUsers() {
        $sql = "SELECT name, location, email FROM users";
        
        $result = $this->dbQuery($sql);
        
        $rows = array();
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            array_push($rows, $row);
        }
        
        return $rows;
    }
    
    // returns the user array/object (wtf php!)
    public function getUserById($user_id) {
        $sql = 
            "SELECT name, location, email
            FROM users WHERE id ='" .$user_id . "'";
            
        $result = $this->dbQuery($sql);
        $row = $result->fetch_array(MYSQLI_ASSOC);
        
        return $row;
    }
    
    public function getUserByMail($user_email) {
        $sql = 
            "SELECT *
            FROM users WHERE email ='" .$user_email . "'";
            
        $result = $this->dbQuery($sql);
        $row = $result->fetch_array(MYSQLI_ASSOC);
        
        return $row;
    }
    
    // function checks if the user mail is allready on the server
    public function checkEmail($user_email) {
        $sql = 
            "SELECT email
            FROM users WHERE email ='" .$user_email . "'";
        
        if(!$this->dbQuery($sql)) {
            return TRUE;
        }else {
            return FALSE;
        }
    }
    
    private function dbQuery($sql) {
        $result = $this->mysqli->query($sql) or 
            trigger_error($this->mysqli->error."[$sql]");
        
        return $result;
    }
}
?>
