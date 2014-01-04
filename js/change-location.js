/*
 * all of the location based script for the change location page
 * ideally i would have an ajax based address preview in the form
 */
$(document).ready(function() {
    // hide all of the geocoding until user presses the check address button
    $(".geocoding").css("visibility", "hidden");
    
    var geoCoder = new google.maps.Geocoder();    
    
    var mapOptions = {
            zoom: 6,
            center: new google.maps.LatLng(52.094590, 5.438232)
    };
    
    var map = new google.maps.Map(
        document.getElementById("address-map"), mapOptions
    );
        
    // there should allways be a user in the session storage
    if(sessionStorage.getItem("user")) {
        user = new User(JSON.parse(sessionStorage.getItem("user")));
    }
    
    // get elements
    var addressI = $(".address-input"),
        addressB = $(".address-button"),
        formattedAddress = $(".formatted-address"),
        latLng = $(".latLng"),
        submit = $(".submit");
    
    addressB.click(function() {
        geoCoder.geocode({ 'address': addressI.val()}, function(results, status) {
            
            user.setLocation(
                results[0].geometry.location,
                results[0].formatted_address
            );      
            
            setElements();
        });
    });
    
    function setElements() {
        formattedAddress.html(user.address);
        latLng.html(user.latLng);
        
        // show marker of current position
        new google.maps.Marker({
            position: user.latLng,
            map: map,
            title: 'Do you live here?'
        });
        
        // change center and zoom in on the user address
        map.panTo(user.latLng);
        map.setZoom(12);
        $(".geocoding").css("visibility", "visible");
    }
    
    submit.click(function() {
        user.updateLocation(function() {
            window.location = "index.html";
        });
        
    });
});