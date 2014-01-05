function buildCatalog() {
    /*
     * builds a catalog of products for the user
     * the retrieved catalog is location based
     */
    var catalog = $(".catalog");
    var url = "../php/controllers/retrieve_products.php"
    if(sessionStorage.getItem("user")) {
        var user = sessionStorage.getItem("user");
        user = JSON.parse(user);
        var latLng = JSON.parse(user.latLng);
    }
    console.log("HALLO");
    // retrieve array with all the products available
    // might change the products being retrieved
    console.log(latLng);
    var posting = $.post(url, {lat: latLng.nb, lng: latLng.ob});
    posting.done(function(result) {
        // i want to user for each.. :(
        console.log(result);
        var products = JSON.parse(result);
        products.forEach(function(product) {
            catalog.append(
                "<a class='panel' href='product.html?id=" + product.id + "'>" +
                "<p>" + product.name + "</p>" +
                "<p>" + product.description + "</p>" +
                "<img src=images/" + product.image + " />" +
                "</a>"
            );
        });  
    });
}

