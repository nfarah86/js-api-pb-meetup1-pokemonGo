$(document).ready(function() {

var id= window.localStorage.getItem('id');

  createLogOut();
  function createLogOut() {
    
    var element = document.createElement("li");
    element.setAttribute("id", "logout");
    var createA = document.createElement('a');
    var t = document.createTextNode("Logout");

    createA.setAttribute("href", "/login");
    createA.appendChild(t)

    element.appendChild(createA)
    var gotElement = document.getElementsByTagName("UL")[0];
    gotElement.appendChild(element);  
  };    
   
   $("#logout").click(function() {
      alert("logout")
        $.ajax({
          url: "http://localhost:3000/access_tokens/" + id.toString(),
          type: 'DELETE',
          contentType: 'application/x-www-form-urlencoded',
          success: function(data) {
             window.localStorage.removeItem('access_token');
             window.localStorage.removeItem('id');
             window.location = 'login'
          },
          error: function(errorThrown) {
            console.log(errorThrown);
          }
      });
    });
 
     $("#pokemonButton").click(function() {
        geoFindMe()
      });

    function geoFindMe(){
    access_token = window.localStorage.getItem('access_token');

    if (access_token === null) {
         window.location = 'login'
      };
 
    var output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

      function success(position) {
      var lat1  = position.coords.latitude;
      var long1 = position.coords.longitude;

      mapLocation(lat1, long1);
    };

    function error() {
      output.innerHTML = "Unable to retrieve your location";
    };

    output.innerHTML = "<p>Locating…</p>";
    navigator.geolocation.getCurrentPosition(success, error);
  
    function mapLocation(lat1, long1) {
        L.mapbox.accessToken = 'pk.eyJ1IjoibmFkaW5lMTIxMiIsImEiOiJjaXI1cmh6b2IwMDh4ZzdubnRqdDFyNXlwIn0.mVYNJqMFyiQqXlKFpXj3Sg';
        var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([lat1, long1], 25);

        var buttonPokemon = document.getElementById("pokemonButton");
        buttonPokemon.innerHTML= "Catch Em!"
        output.innerHTML = "<p></p>";
        access_token = window.localStorage.getItem('access_token');

          $.ajax({
                url: 'http://localhost:3000/pokemon_jsons',
                type: 'get',
                headers: {
                      'Authorization':'Bearer ' + access_token,
                  },
                contentType: 'application/x-www-form-urlencoded',
                success: function( data, textStatus, jQxhr ){
                  for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].created_at) {
                        delete data.data[i].created_at;
                    } 
                    if (data.data[i].updated_at) {
                        delete data.data[i].updated_at;
                    }
                       setData(data)
                  }
                },
                 error: function(jqXhr, textStatus, errorThrown){
                  console.log("here is the access token ", access_token)
                  console.error(jqXhr, textStatus, errorThrown)
                    
                }
           });

      function setData(data) {
       var geoJson = data.data;

       var myLayer = L.mapbox.featureLayer().addTo(map);
       myLayer.setGeoJSON(geoJson);


      function calcDistance(lat1, lat2, long1, long2) {
          var R = 6371e3; // mets
          var Δφ = toRadians(lat2-lat1);
          var Δλ = toRadians(long2-long1);

          var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = R * c;
          console.log(d)
          return d;
      }

      function toRadians(Value) {
          return Value * Math.PI / 180;
      }

     myLayer.on('layeradd', function(e) {
      var marker = e.layer,
          feature = marker.feature;
      marker.setIcon(L.icon(feature.properties.icon));
    });

     myLayer.setGeoJSON(geoJson);

     myLayer.on('click', function(e) {
       var pokemonCoordinates =  e.layer.feature.geometry.coordinates
        var distance = calcDistance(lat1, pokemonCoordinates[1], long1, pokemonCoordinates[0]);
        if (distance < 100) {
            e.layer.feature.properties['oldIconUrl'] = e.layer.feature.properties.icon['iconUrl'];
            e.layer.feature.properties.icon['iconUrl'] = 'http://vignette2.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png/revision/latest?cb=20140520015336';
            myLayer.setGeoJSON(geoJson);
        }
      });
    };
   }
  }
});
