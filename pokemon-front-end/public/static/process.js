$(document).ready(function() {

createLogInButton();
  function createLogInButton() {
    
    var element = document.createElement("li");
    element.setAttribute("id", "login");
    var createA = document.createElement('a');
    var t = document.createTextNode("Log In");

    createA.setAttribute("href", "/login");
    createA.appendChild(t)

    element.appendChild(createA)
    var gotElement = document.getElementsByTagName("UL")[0];
    gotElement.appendChild(element);  
  };    

    $("#catchPokemon").click(function() {
        alert('wrokng')
        console.log(window.localStorage.getItem('access_token'))
      if (window.localStorage.getItem('access_token')) {
        window.location = '/map'
      } else {
        console.log("inside if")

        window.location = '/index'
      }
    });

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
                data:  {"user_id":id, "access_token":id, "token_type":"Bearer"},

                success: function( data, textStatus, jQxhr ){
                    window.localStorage.setItem('access_token', id);
                },
                error: function( jqXhr, textStatus, errorThrown ){
                  console.error(jqXhr, textStatus, errorThrown)
                    window.location = 'error';
                }
            });
    }
});

