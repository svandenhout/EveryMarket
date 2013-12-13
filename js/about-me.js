$(document).ready(function() {
    // hide all of the geocoding until user presses the check address button
    $(".geocoding").css("visibility", "hidden");
    
    var geoCoder = new google.maps.Geocoder();
    
    // nederland centraal latlng
    var myLatlng = new google.maps.LatLng(52.094590, 5.438232);
    
    var mapOptions = {
            zoom: 6,
            center: myLatlng
    };
    
    var map = new google.maps.Map(
        document.getElementById('address-map'), mapOptions
    );
    
    // Get some values from elements on the page:
    var form = $("#sign-up-form"),
        url = form.attr('action'),
        
        // geocoding & etc
        geocode_address = form.find("span[name='geocode-address']"),
        status = form.find("div[name='status']"),
        location = form.find("input[name='lnglat']"),
        submit = form.find("input[name='submit']"),
       
        // inputs
        nameI = form.find("input[name='name']"),
        emailI = form.find("input[name='email']"),
        passwordI = form.find("input[name='password']"),
        confirmPasswordI = form.find("input[name='confirm-password']"),
        addressI = form.find("input[name='address']"),
        
        // buttons 
        nameB = $("#name-button"),
        emailB = $("#email-button"),
        passwordB = $("#password-button"),
        addressB = $("#address-button"),
        addresCheckB = $("#address-check-button"),
        
        // paragraphs
        nameP = form.find("p[name='name']"),
        emailP = form.find("p[name='email']"),
        addressP = form.find("p[name='address']"),
        
        // what i'm sending
        name,
        email,
        address,
        password;
    
        
    
    if(localStorage.user) {
        var user = jQuery.parseJSON(localStorage.user);
        nameP.html(user.name);
        emailP.html(user.email);
        
        // prep for sending to database
        name = user.name;
        email = user.email;
        password = user.password;
        address = user.location;
        
        // hopefully this works
        geoCoder.geocode({address: user.location}, function(results, status) {
            addressP.html(results[0].formatted_address);
        });
    }else {
        console.log("no user");
    }
    
    // These buttons make input elements appear 
    // the input elements are used to change the user data.
    nameB.click(function() {
        $(".change-name").show();
        submit.show();
    });
    
    emailB.click(function() {
        $(".change-email").show();
        submit.show();
    });
    
    // make second field to compare passwords first
    passwordB.click(function() {
        $(".change-password").show();
        submit.show();
    });
    
    addressB.click(function() {
        $(".change-address").show();
        submit.show();
    });
    
    addresCheckB.click(function() {
        geoCoder.geocode({ 'address': user_addressI.val()}, function(results, status) {
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
        });
        
    });

    // fuction checks wether the user changed a value
    // callback takes the information that needs to be posted
    // pretty smart --<
    function valueCheck(callback) {
        if(nameI.val() != "") {
            var post = {name: nameI.val()}
            callback(post);
        }
    
        if(emailI.val() != "") {
            var post = {email: emailI.val()}
            callback(post);
        }
        
        if(addressI.val() != "") {
            var post = {location: addressI.val()}
            callback(post);
        }
        
        // check for new password...
        if(
            confirmPasswordI.val() === passwordI.val() 
            && passwordI.val() != ""
        ) {
            var post = {password: passwordI.val()}
            callback(post);
        }
    }
    
    $(form).submit(function(event) {
        // Stop form from submitting normally
        event.preventDefault();
        
        valueCheck(function(post) {
            
            // Send the data using post
            var posting = $.post(url, post);
            
            // Put the results in a div
            posting.done(function(data) {
                console.log(data);
                status.html(data);
            });
        });  
    });
});