/*
 * User.js represents all the basic user functinality
 * that i want on the javascript side
 * TODO: make the class usable for other projects (more abstraction)
 * i'll probably make it fit for node so i can use routing :)
 */

// fb user is the response from the facebook login
// the user object can be the one returned by facebook
// and an old instance of User
function User(user) {
    // if the user object contains fbUser it's an old isntance
    // of this object
    if(user.fbUser !== undefined) {
        // the user object is an old instance of user
        this.setOldUser(user);
    }else {
        this.fbUser = user;
    }
}

// function takes an incomplete instance of the User and sets the
// values to the current one, incomplete is mostly only name, 
// id & fbUser object
User.prototype.setOldUser = function(user) {
    if(user.fbUser !== undefined)
        this.fbUser = user.fbUser;
    
    if(user.name !== undefined)
        this.name = user.name;
    
    if(user.id !== undefined)
        this.id = user.id;
    
    if(user.latLng !== undefined)
        this.latLng = this.toLatLng(user.latLng);
    
    if(user.address !== undefined)
        this.address = user.address;
}

User.prototype.setLocation = function(latLng, formattedAddress) {
    this.latLng = latLng;
    this.address = formattedAddress;
}

// the checkUser method checks the state of the method
// the callback response will be true when a user is allready
// in the database. If the callback response is true the user
// object will inherit all properties
User.prototype.checkDbForUser = function(callback) {
    var that = this;
    
    this.checkDatabase(function(result) {
        // var res = JSON.parse(result);
        if(result != "duplicate entry") {
            // new user
            that.name = that.fbUser.name;
            that.id = that.fbUser.id;
            
            callback(false);
        }else {
            that.getUserFromDb(function() { 
                // the user has been retrieved from the database
                callback(true);
            });                         
        }
    });
}

// checks if the user is allready in the database
User.prototype.checkDatabase = function(callback) {
    var that = this;
    var url = "../php/controllers/check_user.php";
    var posting = $.post(url, {id: this.fbUser.id});
    
    // i post the that in the callback to make sure i can
    // continue using the User object
    posting.done(function(result) {
        callback(result);
    });
}

// retrieves the full user object from the database
User.prototype.getUserFromDb = function(callback) {
    var that = this;
    var url = "../php/controllers/retrieve_user.php";
    
    var posting = $.post(url, {id: this.fbUser.id});
        
    posting.done(function(result) {
        var res = JSON.parse(result);
        that.name = res.name;
        that.id = res.fb_id;
        that.latLng = res.latlng;
        that.address = res.address; 
        callback();
    });
}

// the latLng object i put in my database omits the lat() & lng() functions
// thats problematic since google just changes the names of their keys every
// now & then....
User.prototype.toLatLng = function(latLng) {
    if(typeof latLng !== "object") {
        latLng = JSON.parse(latLng);
    }
    
    var arr = [];
    for(var key in latLng) {
        var value = latLng[key];
        arr.push(value);
    }
    latLng = new google.maps.LatLng(arr[0], arr[1]);
    
    return latLng;
}

User.prototype.updateLocation = function(callback) {
    var url = "../php/controllers/update_location.php";
    
    var location = {
        latLng: JSON.stringify(this.latLng),
        lat: this.latLng.lat(),
        lng: this.latLng.lng(),
        address: this.address,
        id: this.id
    };
    
    var posting = $.post(url, location);
    
    posting.done(function(result) {
        // should be a message
        callback();
    });
}

// posts the full user object to the database
User.prototype.postUserToDb = function(callback) {
    var that = this;
    var url = "../php/controllers/add_user.php";
    
    var user = {
        name: this.name,
        id: this.id,
    };
    
    var posting = $.post(url, user);
    
    posting.done(function(result) {
        callback();
    });
}