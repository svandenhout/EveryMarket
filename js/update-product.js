$(window).ready(function() {
    var id = getParameter("id");
    
    if(id) {
        var posting = $.post(
            "../php/controllers/retrieve_product.php",
            {id: id}
        );
        
        posting.done(function(product) {
            var product = JSON.parse(product);
            product.id = id;
            Jaml.register('update-product-form', function(product) {
                
                form({
                        cls: "update-product-form",
                        action: "php/controllers/update_product.php",
                        method: "post",
                        enctype: "multipart/form-data"
                    },
                    span("product name:"),
                    br(),
                    input({
                        name: "name",
                        type: "text", 
                        value: product.name
                    }),
                    br(),
                    span("product description:"),
                    br(),
                    textarea({
                        name: "description",
                        cols: "40",
                        rows: "20",
                        type: "text", 
                        
                    }, product.description),
                    br(),
                    span("image:"),
                    br(),
                    input({
                        name: "image", 
                        type: "file", 
                        value: product.image
                    }),
                    br(),
                    input({type: "submit"}),
                    input({
                        name: "id",
                        type: "text",
                        value: product.id,
                        style: "visibility:hidden;"
                    })
                )
            });
                        
            $(".update-product").html(
                Jaml.render("update-product-form", product)
            );
        });
    }else {
        console.log("something went wrong, no product id")
    }
});

/*
 * written by someone else, stack overflow link =>
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