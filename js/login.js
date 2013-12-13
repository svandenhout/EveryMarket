$(document).ready(function() {
    // values of the log in form
    var loginForm = $("#log-in-form"),
        url = loginForm.attr('action'),
        email = loginForm.find("input[name='email']"),
        password = loginForm.find("input[name='password']"),
        submit = loginForm.find("input[name='submit']"),
        status = loginForm.find("div[name='log-in-status']");
    
    // values of the div when logged in
    var loggedInDiv = $("#logged-in"),
        loggedinas = loggedInDiv.find("p[name='logged-in-as']"),
        logout = loggedInDiv.find("button[name='logout']");
    
    var userObject
    // check if the localstorage is being used
    if(localStorage.user) {
        loggedIn();   
    // localstorage has no user
    }else {
        loggedOut();
    }
    
    logout.click(function() {
        localStorage.removeItem('user');
        loggedInDiv.hide();
        loginForm.show();
    });
    
    $(loginForm).submit(function(event) {
        // Stop form from submitting normally
        event.preventDefault();
        
        // Send the data using post
        var posting = $.post( 
            url, { 
                email: email.val(), 
                password: password.val()
            }
        );
        
        // Put the results in a div
        posting.done(function(data) {
            // rather expensive way to check for json
            console.log(data);
            var object = jQuery.parseJSON(data);
            if(typeof object == 'object') {
                // logged in so do stuff
                localStorage.user = data;
                status.html("logged in");
                loggedIn();
            }else {
                // if the callback is not parsed to an object
                // the data is sure to be a string.
                status.html(data);
            }
            // status.html(data);
        });
    });
    
    // set te state to when no one has logged in yet
    function loggedOut() {
        loggedInDiv.hide();
        loginForm.show();
    }
    
    // set the state to when the user is logged in
    function loggedIn() {
        userObject = jQuery.parseJSON(localStorage.user);
        loggedInDiv.show();
        loginForm.hide();
        loggedinas.html("logged in as " + "<a href='about-me.html'>" + userObject.name + "</a>");
    }
    
    
});