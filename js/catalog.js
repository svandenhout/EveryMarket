function buildCatalog() {
    /*
     * builds a catalog of products for the user
     * the retrieved catalog is location based
     */
    
    // build the big map
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(52.094590, 5.438232),
        disableDefaultUI: true
    };
    
    var map = new google.maps.Map(
        document.getElementById("big-map"), mapOptions
    );
    
    var catalog = $(".catalog");
    var url = "../php/controllers/retrieve_products.php"
    if(sessionStorage.getItem("user")) {
        var user = sessionStorage.getItem("user");
        user = JSON.parse(user);
        var latLng = JSON.parse(user.latLng);
    }
    
    // retrieve array with all the products available
    // might change the products being retrieved
    var posting = $.post(url, {lat: latLng.nb, lng: latLng.ob});
    posting.done(function(result) {
        var products = JSON.parse(result);
        
        // ie 8 is not going to like this.
        // such a shame i wish i could use forEach more.
        products.forEach(function(product) {            
            catalog.append(
                "<a class='panel " + product.latLng + "'" +
                    "href='product.html?id=" + product.id + "'" +
                "</a>" +
                "<h4>" + product.name + "</h4><br>" +
                "<p>" + product.description + "</p>" +
                "<img src=images/" + product.image + " />" +
                "</a>"
            );
        });
        
        $(".panel").mouseover(function() {
            var classes = this.className.split(/\s+/);
            var myLatLng = JSON.parse(classes[1])
            var latLng = new google.maps.LatLng(myLatLng.nb, myLatLng.ob);
            
            map.panTo(latLng);
            map.set("zoom", 14);
        });
    });   
}