$(document).ready(function() {
    if(sessionStorage.getItem("user")) {
        user = new User(JSON.parse(sessionStorage.getItem("user")));
    }
    
    // Just testing this Jaml library (I like it :))
    Jaml.register('rendered-address-form', function() {
        form({cls: "rendered-address-form"},
            h2("Is this where you live?"),
            br(),
            span(user.address),
            a({href: "change-location.html"}, "change"),
            br(),
            div({id: "address-map"}),
            br(),
            input({type: "submit", value: "confirm"}),
            input({type: "text", value: user.latLng, style: "visibility: hidden;"})  
        );
    });
    
    // render the new form into the current body (replacing old form)
    $(document.body).html(Jaml.render("rendered-address-form"));
    
    var mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(52.094590, 5.438232)
    };
    
    var map = new google.maps.Map(
        document.getElementById("address-map"), mapOptions
    );
    
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
    
    $(".rendered-address-form").submit(function(event) {
        event.preventDefault();
        window.location = "index.html";
    });
});