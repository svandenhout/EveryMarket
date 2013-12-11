<?php
include_once "settings.php";

/*
 * Initiates a mysqli object called DB, I use this class to
 * build different standard query's that i think i need for my 
 * current project.
 */
class Users {
    const EMAIL_IN_USE = 0;
    
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
        
        $result = $this->mysqli->query($sql);
        
        // 1062 is duplicate entry so i will be able to return 
        // an email allready in use message
        if($this->mysqli->errno == 1062) {
            return self::EMAIL_IN_USE;
        }
        
        // when email is in use i use 
        return $result;
    }
    
    // returns array with all users
    public function getAllUsers() {
        $sql = "SELECT name, location, email FROM users";
        
        $result = $this->mysqli->query($sql) or 
            trigger_error($this->mysqli->error."[$sql]");
        
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
            
        $result = $this->mysqli->query($sql) or 
            trigger_error($this->mysqli->error."[$sql]");
        $row = $result->fetch_array(MYSQLI_ASSOC);
        
        return $row;
    }
    
    public function getUserByMail($user_email) {
        $sql = 
            "SELECT *
            FROM users WHERE email ='" .$user_email . "'";
            
        $result = $this->mysqli->query($sql )or 
            trigger_error($this->mysqli->error."[$sql]");
        $row = $result->fetch_array(MYSQLI_ASSOC);
        
        return $row;
    }
    
    private function dbQuery($sql) {
        $result = $this->mysqli->query($sql) or 
            trigger_error($this->mysqli->error."[$sql]");
        
        return $result;
    }
}
?>
