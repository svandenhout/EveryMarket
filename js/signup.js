$(document).ready(function() {
    
    // hide all of the geocoding until user presses the address button
    $(".geocoding").css("visibility", "hidden");
    
    // TODO: i should just treat these like member vars next time
    var geoCoder = new google.maps.Geocoder();
    
    // nederland centraal latlng
    var myLatlng = new google.maps.LatLng(52.094590, 5.438232);
    
    // Get some values from elements on the page:
    var form = $("#sign-up-form"),
        url = form.attr('action'),
        name = form.find("input[name='name']"),
        email = form.find("input[name='email']"),
        password = form.find("input[name='password']"),
        user_address = form.find("input[name='user-address']"),
        geocode_address = form.find("span[name='geocode-address']"),
        status = form.find("div[name='status']"),
        location = form.find("input[name='lnglat']"),
        submit = form.find("input[name='submit']");
        
    
    var mapOptions = {
            zoom: 6,
            center: myLatlng
    };
    
    var map = new google.maps.Map(
        document.getElementById('address-map'), mapOptions
    );
    
    $("#address-button").click(function() {
        geoCoder.geocode({ 'address': user_address.val()}, function(results, status) {
            myLatlng = results[0].geometry.location;
            geocode_address.html(results[0].formatted_address);
            location.val(results[0].geometry.location.toString());
            
            // show marker of current position
            new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Do you live here?'
            });
            
            // change center and zoom in on the user address
            map.panTo(myLatlng);
            map.setZoom(12);
            $(".geocoding").css("visibility", "visible");
            submit.show();
        });
        
    });
    
    $(form).submit(function(event) {
        // Stop form from submitting normally
        event.preventDefault();
        
        // Send the data using post
        var posting = $.post( 
            url, { 
                name: name.val(), 
                email: email.val(), 
                password: password.val(),
                location: location.val()
            }
        );
        
        // Put the results in a div
        posting.done(function(data) {
            status.html(data);
            if(data === "<p> User added </p>") {
                window.location = "index.html";
            }else {
                console.log("WAAROM ZOU DIT OOK WERKEN");
            }
        });
    });
});