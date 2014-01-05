function buildDetail() {
    var user = new User(sessionStorage.getItem("user"));
    
    var id = getParameter("id");
    if(id) {
        var posting = $.post("../php/controllers/retrieve_product.php", {id: id});
        posting.done(function(response) {
            response = JSON.parse(response);
            $(".name").html(response.name);
            $(".description").html(response.description);
            $(".image").attr("src", "images/" + response.image);
            
            $(".address");
            $(".address-map");
            
            var messageUser = $(".message-user")
            // console.log(document.URL);
            messageUser.click(function() {
                FB.ui({
                    method: "send",
                    name: response.name,
                    to: response.fb_id,
                    link: "www.google.nl"  
                });
            });
            
            FB.api(response.fb_id, function(response) {
                console.log(response);
                var fbLink = $(".user");
                fbLink.html(response.first_name + " " + response.last_name);
                fbLink.attr("href", response.link);
                messageUser.html("message " + response.first_name);
            });
        });
    }
}



/*
 * written by someone else, didn't bother to find out who
 * http://stackoverflow.com/questions/1403888/get-escaped-url-parameter
 */
function getParameter(paramName) {
  var searchString = window.location.search.substring(1),
      i, val, params = searchString.split("&");

  for (i=0;i<params.length;i++) {
    val = params[i].split("=");
    if (val[0] == paramName) {
      return unescape(val[1]);
    }
  }
  return false;
}