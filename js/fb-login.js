$(window).ready(function() {    
    var user;

    // facebook api login
    window.fbAsyncInit = function () {
        FB.init({
            appId: '471262566323560',
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true // parse XFBML
        });

        // handles user login
        FB.Event.subscribe('auth.authResponseChange', function (response) {
            if (response.status === 'connected') {
                onLogin();
            } else if (response.status === 'not_authorized') {
                FB.login();
            }else {
                FB.login();
            }
        });
        
        // handles user logout
        FB.Event.subscribe("auth.logout", function() {
            window.location.reload()
        });
    };

    // Load the SDK asynchronously
    (function (d) {
        var js, id = 'facebook-jssdk',
            ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

    // login is called when a facebook user is logged in
    // onlogin should be called every time index is opened
    function onLogin() {
        FB.api('/me', function (response) {
            doUser(response);
        });
    }
    
    // my user functionality
    function doUser(response) {
        user = new User(response);
        user.checkDbForUser(function(response) {
            if(response) {
                // retrieved the user from the database
                sessionStorage.setItem("user", JSON.stringify(user));
                $(".logged-in").show();
                $(".location-link").html(user.address);
                
                // if the current page is index.html it will build a
                // catalog
                if(
                    window.location.pathname === "/" || 
                    window.location.pathname === "/index.html"
                ) {
                    buildCatalog();
                }
                
                // if the current page is product.html it will build 
                // a detail page of this product
                if(window.location.pathname === "/product.html") {
                    buildDetail();
                }
                
                // chat functionality is too big for the scope of
                // the project
                // facebookChat(user.id);
            }else {
                sessionStorage.setItem("user", JSON.stringify(user));
                // post the new user to the database
                user.postUserToDb(function() {
                    window.location = "/change-location.html";
                });
            }         
        });
    }
});