function buildCatalog() {
    /*
     * builds a catalog of products for the user
     * the retrieved catalog is location based
     */
    
    var catalog = $(".catalog"),
        bigMap = $("#big-map");
    
    catalog.height($(this).height() - 150);
    bigMap.height($(this).height() - 160)
    
    // build the big map
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(52.094590, 5.438232),
        disableDefaultUI: true
    };
    
    var map = new google.maps.Map(
        document.getElementById("big-map"), mapOptions
    );
    
    var url = "../php/controllers/retrieve_products.php";
    if(sessionStorage.getItem("user")) {
        var user = new User(JSON.parse(sessionStorage.getItem("user")));
    }
    
    // retrieve array with all the products available
    // might change the products being retrieved
    var posting = $.post(url, {lat: user.latLng.lat(), lng: user.latLng.lng()});
    posting.done(function(result) {
        var products = JSON.parse(result);
        var panels = "";
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
            
            // panels, Jaml completely falls flat here :(
            panels = panels +
                "<a class='panel " + product.latLng + "'" +
                    "href='product.html?id=" + product.id + "'>" +
                
                "<h4>" + product.name + "</h4><br>" +
                "<p>" + product.description + "</p>" +
                "<img src=images/" + product.image + " />" +
                "</a>"; 
        });
        
        catalog.html(panels);
        
        $(".panel").mouseover(function() {
            var classes = this.className.split(/\s+/);
            var latLng = toLatLng(classes[1]);
            
            map.panTo(latLng);
            map.set("zoom", 14);
            
        });
    });
    
    // very ugly resize event
    $( window ).resize(function() {
        catalog.height($(this).height() - 150);
        bigMap.height($(this).height() - 160);
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