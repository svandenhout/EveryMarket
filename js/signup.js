$(document).ready(function() {
    var geoCoder = new google.maps.Geocoder();
    var myLatlng = google.maps.LatLng(52.094590, 5.438232);
    
    // Get some values from elements on the page:
    var form = $("#sign-up-form"),
        name = form.find("input[name='name']"),
        email = form.find("input[name='email']"),
        password = form.find("input[name='password']"),
        user_address = form.find("input[name='user-address']"),
        geocode_address = form.find("input[name='geocode-address']"),
        location = form.find("input[name='location']"),
        submit = form.find("input[name='submit']"),
        url = form.attr("action");
    
    var mapOptions = {
            zoom: 3,
            center: myLatlng
    };
    
    var map = new google.maps.Map(document.getElementById('address-map'), mapOptions)
    
    $("#address-button").click(function() {
        console.log(user_address.val());
        geoCoder.geocode( { 'address': user_address.val()}, function(results, status) {
            console.log(results)
            geocode_address.val(results[0].formatted_address);
            location.val(results[0].geometry.location);
            submit.show();
        })
        
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Do you live here?'
        });
    });
    
        
    $("#sign-up-form").submit(function(event) {
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
            console.log(data);
            $( "#sign-up-status" ).innerHTML = data;
        });
    });
})