/*
 * all of the location based script for the change location page.
 * Ideally, i would have an ajax based address preview in the form
 */
$(document).ready(function() {
    // hide all of the geocoding until user presses the check address button
    $(".geocoding").css("visibility", "hidden");
    
    var geoCoder = new google.maps.Geocoder();
    
    // there should allways be a user in the session storage
    if(sessionStorage.getItem("user")) {
        user = new User(JSON.parse(sessionStorage.getItem("user")));
    }
    
    // get elements
    var addressForm = $(".geocode-address-form"),
        addressI = $(".address-input");
    
    addressForm.submit(function(event) {
        event.preventDefault();
        $(".address-button").attr("disabled", true);
        geoCoder.geocode({ 'address': addressI.val()}, function(results, status) {
            
            user.setLocation(
                results[0].geometry.location,
                results[0].formatted_address
            );
            
            // post user location to the database
            user.updateLocation(function() {
                user = JSON.stringify(user);
                sessionStorage.setItem("user", user);
                window.location.href = "confirm-location.html"
            });
        });
    });
});