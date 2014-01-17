<?php
include_once "../models/product.class.php";

/*
 * this controller returns all the user info after an email & 
 * password check
 */

// mostly the w3c file upload example reformatted
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);
if((
    ($_FILES["file"]["type"] == "image/gif")
    || ($_FILES["file"]["type"] == "image/jpeg")
    || ($_FILES["file"]["type"] == "image/jpg")
    || ($_FILES["file"]["type"] == "image/pjpeg")
    || ($_FILES["file"]["type"] == "image/x-png")
    || ($_FILES["file"]["type"] == "image/png"))
    && ($_FILES["file"]["size"] < 20000)
    && in_array($extension, $allowedExts)
) {
    if ($_FILES["file"]["error"] > 0) {
        echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
    } else {
        echo "Upload: " . $_FILES["file"]["name"] . "<br>";
        echo "Type: " . $_FILES["file"]["type"] . "<br>";
        echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
        echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";

        if (file_exists("../../images/" . $_FILES["file"]["name"])) {
            echo $_FILES["file"]["name"] . " already exists. ";
        }else {
            move_uploaded_file($_FILES["file"]["tmp_name"],
            "../../images/" . $_FILES["file"]["name"]);
            echo "Stored in: " . "../../images/" . $_FILES["file"]["name"];
        }
    }
}
else {
    echo "Invalid file";
}

$result = $product->addProduct($_POST, $_FILES["file"]["name"]);

if($result === false){
    print("<p> database problem " . $result . " </p>");
}else {
    print("<p> Product added </p>");
    print("<script>window.location = '/index.html'</script>");
}
?>