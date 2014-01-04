$(document).ready(function() {
    // Get some values from elements on the page:
    var form = $("#add-product-form"),
        url = form.attr('action'),
        name = form.find("input[name='name']"),
        description = form.find("input[name='description']"),
        image = form.find("input[name='image']"),
        userId = form.find("input[name='user_id']"),
        status = form.find("div[name='status']"),
        submit = form.find("input[name='submit']");
    
    // retrieve the user from localstorage so we 
    // can send the user_id with the product
    if(sessionStorage.getItem("user")) {
        var user = JSON.parse(sessionStorage.getItem("user"));
        console.log(user.id);
        userId.val(user.id);
    }else {
        status.html("you're not logged, log in if you want to upload a product");
    }
});