$( document ).ready(function() {

    alert("working")

    var form = document.querySelector("form");

    $( "#loginForm" ).on( "submit", function( event ) {
        event.preventDefault();

        console.log(form)

        var username = form.elements[0].value
        var password = form.elements[1].value

        console.log(username, password)
        
    if (password != "" && username != "") {
            $.ajax({
                url: 'http://localhost:3000/users',
                type: 'get',
                data:  $(this).serialize(),
                success: function( data, textStatus, jQxhr ){
                    console.log("sucess: ", data)
                    var userID = JSON.stringify(data.data[0])
                    //setAccessToken(userID)
                    console.log("sucess")
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

    function setAccessToken(id) {

      $.ajax({
                url: 'http://localhost:3000/access_tokens',
                type: 'post',
                contentType: 'application/x-www-form-urlencoded',
                data:  {"user_id":id, "access_token":"trial133", "token_type":"Bearer"},

                success: function( data, textStatus, jQxhr ){
                    

                    var accessToken = data.data[0].access_token;
                    window.localStorage.setItem('access_token', accessToken);
                    access_token = window.localStorage.getItem('access_token');
                    console.log("access token is: ", access_token)
                },
                error: function( jqXhr, textStatus, errorThrown ){
                  console.error(jqXhr, textStatus, errorThrown)
                    window.location = 'error';
                }
            });

    }










});


