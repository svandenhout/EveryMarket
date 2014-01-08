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
        latLng = toLatLng(user.latLng);
    }
    
    // retrieve array with all the products available
    // might change the products being retrieved
    var posting = $.post(url, {lat: latLng.lat(), lng: latLng.lng()});
    posting.done(function(result) {
        console.log(result)
        var products = JSON.parse(result);
        console.log(products);
        
        // ie 8 is not going to like this.
        // such a shame i wish i could use forEach more.
        products.forEach(function(product) {
            
            var latLng = toLatLng(product.latLng);
            
            // markers
            new google.maps.Marker({
                position: latLng,
                map: map,
                title: product.name,
                // icon: "images/" + product.image
            });
            
            // panels
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
            var latLng = toLatLng(classes[1]);
            
            map.panTo(latLng);
            map.set("zoom", 14);
            
        });
    });   
}

// the latLng object i put in my database omits the lat() & lng() functions
// thats problematic since google just changes the names of their keys every
// now & then....
function toLatLng(latLng) {
    latLng = JSON.parse(latLng);
    
    var arr = [];
    for(var key in latLng) {
        var value = latLng[key];
        arr.push(value);
    }
    latLng = new google.maps.LatLng(arr[0], arr[1]);
    
    return latLng;
}