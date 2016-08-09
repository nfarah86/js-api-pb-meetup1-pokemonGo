$( document ).ready(function() {

    var form = document.querySelector("form");

    $( "#userForm" ).on( "submit", function( event ) {
        event.preventDefault();

        var email = form.elements[0].value
        var password = form.elements[1].value
        var username = form.elements[2].value
        
    if (email != "" && password != "" && username != "") {
            $.ajax({
                url: 'http://localhost:3000/users',
                type: 'post',
                contentType: 'application/x-www-form-urlencoded',
                data:  $(this).serialize(),
                success: function( data, textStatus, jQxhr ){
                    var userID = JSON.stringify(data.data[0].id)
                    setAccessToken(userID)
                    window.location = 'map';
                },
                error: function( jqXhr, textStatus, errorThrown ){
                  console.error(jqXhr, textStatus, errorThrown)
                    window.location = 'login';
                }
            });
    } else {
        window.location = 'error';
    }
    });

    function setAccessToken(id) {

      $.ajax({
                url: 'http://localhost:3000/access_tokens',
                type: 'post',
                contentType: 'application/x-www-form-urlencoded',
                data:  {"user_id":id, "access_token":"bearer", "token_type":"user"},
                headers: {
                  'Access-Control-Allow-Origin':'*'
                },
                success: function( data, textStatus, jQxhr ){
                    console.log(data)
                },
                error: function( jqXhr, textStatus, errorThrown ){
                  console.error(jqXhr, textStatus, errorThrown)
                    window.location = 'error';
                }
            });


    }










});



