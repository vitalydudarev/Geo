/* Main script which obtains GPS location and displays it */

var options = { enableHighAccuracy: true };
var element;
var map;
var coords;

function init() {
  element = document.getElementById("current");
  getLocation(showPosition);
}

function initMap(lat, lng) {
  var mapElement = document.getElementById("map_canvas");
  var latLng = new google.maps.LatLng(lat, lng);

  map = new google.maps.Map(mapElement, {
        center: latLng,
        zoom: 11,
        mapTypeId: 'roadmap'
      });

  var infoWindow = new google.maps.InfoWindow({
    content: '<div style="height: 20px; width: 80px"><b>You are here.<b></div>'
    });

  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: "You are here!"
    });

  infoWindow.open(map, marker);

  bindInfoWindow(marker, map, infoWindow);
}

function bindInfoWindow(marker, map, infoWindow) {
  google.maps.event.addListener(marker, 'click', function() {
    //infoWindow.setContent(html);
    infoWindow.open(map, marker);
    });
}

function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    }

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, onError, options);
  } else {
      element.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  coords = position.coords;
  element.innerHTML = "Latitude: " + coords.latitude + "<br>Longitude: " + coords.longitude;
  initMap(coords.latitude, coords.longitude);
}

function onError(err) {
  element.innerHTML = "An error has occured: " + err.message;
}

function checkIn() {
      var lat = coords.latitude;
      var lng = coords.longitude;
      jQuery.ajax({
        type: "POST",
        url: 'processor.php',
        dataType: 'json',
        data: {functionname: 'addRecord', arguments: [lat, lng, "Note"]},

    success: function (obj, textstatus) {
                  if( !('error' in obj) ) {
                    window.alert("Done.");
                      //yourVariable = obj.result;
                  }
                  else {
                    window.alert("An error has occured.");
                      //console.log(obj.error);
                  }
            }
    });
    }

function load() {
      // replace with the calculated map center and zoom value
      var mapElement = document.getElementById("map_canvas");
      map = new google.maps.Map(mapElement, {
        center: new google.maps.LatLng(53.9, 27.566667),
        zoom: 11,
        mapTypeId: 'roadmap'
      });
      var infoWindow = new google.maps.InfoWindow();

      // Change this depending on the name of your PHP file
      downloadUrl("getXml.php", function(data) {
        var xml = data.responseXML;
        var checkins = xml.documentElement.getElementsByTagName("checkin");
        //var i = 0;
        for (var i = 0; i < checkins.length; i++) {
          var note = checkins[i].getAttribute("note");
          var dateTime = checkins[i].getAttribute("date_time");
          var lat = checkins[i].getAttribute("lat");
          var lng = checkins[i].getAttribute("lng");

          var point = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
          var html = "<b>" + note + "</b> <br/>" + dateTime;
          //var icon = customIcons[type] || {};
          //var html = "sdsdsd";
          var marker = new google.maps.Marker({
            map: map,
            position: point
            //draggable: true
            //shadow: icon.shadow
          });
          bindInfoWindow(marker, map, infoWindow, html);

          google.maps.event.addListener(marker, "dblclick", function (e) {
            var iw1 = new google.maps.InfoWindow({ content: marker.getPosition().toString() });
            iw1.open(map, this); });
        }
      });
    }

    // So, you can define your own function for loading the file, and call it downloadUrl(). 
    // The function takes two parameters:

    // url specifies the path to the PHP script. It's usually easiest to have this reside 
    // in the same directory as the HTML so that you can just refer to it by filename.
    // callback indicates the function that's called when the XML is returned to the JavaScript.
    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest();

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

function doNothing() {
}

function yoyo() {
  window.alert("ds");
}