$(document).ready(function() {
    
    // Get some values from elements on the page:
    var form = $("#add-product-form"),
        userId = form.find("input[name='user_id']");
    
    // retrieve the user from localstorage so we 
    // can send the user_id with the product
    if(sessionStorage.getItem("user")) {
        var user = JSON.parse(sessionStorage.getItem("user"));
        userId.val(user.id);
    }else {
        status.html("you're not logged, log in if you want to upload a product");
    }
});