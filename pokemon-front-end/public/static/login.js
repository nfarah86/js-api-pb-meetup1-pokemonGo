$( document ).ready(function() {
    var form = document.querySelector("form");

    $( "#loginForm" ).on( "submit", function( event ) {
        event.preventDefault();

        var username = form.elements[0].value
        var password = form.elements[1].value
        
    if (password != "" && username != "") {
            $.ajax({
                url: 'http://localhost:3000/users?username='+username,
                type: 'get',
                success: function( data, textStatus, jQxhr ){
                    console.log("sucess: ", data)
                    var user_id = data.data[0].id
                    setAccessToken(user_id)
                    window.location = 'map'
                },
                error: function( jqXhr, textStatus, errorThrown ){
                   console.error(jqXhr, textStatus, errorThrown)
                    window.location = 'error';
                }
            });
    } else {
        window.location = 'error';
      }
    });

    function setAccessToken(user_id) {
      $.ajax({
                url: 'http://localhost:3000/access_tokens',
                type: 'post',
                contentType: 'application/x-www-form-urlencoded',
                data:  {"user_id":user_id, "access_token":user_id, "token_type":"Bearer"},

                success: function(data) {
                var id = JSON.stringify(data.data[0].id);
                 window.localStorage.setItem('access_token', user_id);
                 window.localStorage.setItem('id',id);
              },
                error: function( jqXhr, textStatus, errorThrown ){
                  console.error(jqXhr, textStatus, errorThrown)
                    window.location = 'error';
                }
            });
    }
});


