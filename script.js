var map;
var currentMarker;

var customIcons = {
      restaurant: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      },
      bar: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
        shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'
      }
    };

    function load() {
      map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(53.9, 27.566667),
        zoom: 8,
        mapTypeId: 'roadmap'
      });
      var infoWindow = new google.maps.InfoWindow;

      // Change this depending on the name of your PHP file
      downloadUrl("getXml.php", function(data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName("marker");
        //var i = 0;
        for (var i = 0; i < markers.length; i++) {
          var name = markers[i].getAttribute("name");
          var address = markers[i].getAttribute("address");
          //var type = markers[i].getAttribute("type");
          var point = new google.maps.LatLng(
              parseFloat(markers[i].getAttribute("lat")),
              parseFloat(markers[i].getAttribute("lng")));
          var html = "<b>" + name + "</b> <br/>" + address;
          //var icon = customIcons[type] || {};
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

    function aaa(data, map, infoWindow)
    {
      var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName("marker");
        //var i = 0;
        for (var i = 0; i < markers.length; i++) {
          var name = markers[i].getAttribute("name");
          var address = markers[i].getAttribute("address");
          //var type = markers[i].getAttribute("type");
          var point = new google.maps.LatLng(
              parseFloat(markers[i].getAttribute("lat")),
              parseFloat(markers[i].getAttribute("lng")));
          var html = "<b>" + name + "</b> <br/>" + address;
          //var icon = customIcons[type] || {};
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
    }

    function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
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
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

    function save() {
      var lat = currentMarker.getPosition().lat();
      var lng = currentMarker.getPosition().lng();
      jQuery.ajax({
        type: "POST",
        url: 'processor.php',
        dataType: 'json',
        data: {functionname: 'addRecord', arguments: [document.getElementById('desc').value, lat, lng]},

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

    function calculateCentralPoint()
    {
    }

    function add() {
      var point = map.getCenter();
      //var point = new google.maps.LatLng(53.9, 27.566667);
          
          currentMarker = new google.maps.Marker({
            map: map,
            position: point,
            draggable: true
            //shadow: icon.shadow
          });
    }

    function doNothing() {}

    function yoyo() {
      window.alert("ds");
    }