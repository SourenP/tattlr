var myLat;
var myLng;
var myLatLng;
var gotCoord = false;
var styles = [
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "on" }
    ]
  },{
    elementType: "labels.text",
    stylers: [
      { visibility: "simplified" }
    ]
  },{
    elementType: "labels.icon",
    stylers: [
      { visibility: "off" }
    ]
  }
  //,{
  //  stylers: [
  //    { hue: "#9BDDFF" },
  //    { saturation: 0 }
  //  ]
  //}
];

function initialize() {

  geoFindMe(setMyCoord);

  var mapOptions = {
    zoom: 17,
    minZoom: 17,
    maxZoom: 19,
    center: { lat: 40.807528, lng: -73.962525},
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    styles: styles
  };
  
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, mapOptions);

  // Create the input box
  var centerControlDiv = document.createElement('div');

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  var inputBox = document.createElement('input');
  inputBox.className = "inputBox";
  inputBox.type = "text"

  // Functionality of input box
  inputBox.onkeypress = function(evt) {
    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode == 13) {
      if (gotCoord) {
        comment = inputBox.value;
        //$.post("/map", {message: JSON.stringify(comment)}, function() {
          createPost(map, myLat, myLng, comment);
          map.panTo(myLatLng)
          map.setZoom(17)
          inputBox.disabled = true;
        //});
      } else {
        alert("Don't have your location")
      }
      return false;
    }
    return true;
  };

  centerControlDiv.appendChild(inputBox);
}

function createPost(map, lat, lng, comment) {
  var latLng = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({ position: latLng, map: map});
  marker.setVisible(false)

  var label = new Label({ map: map }, comment);
  label.bindTo('position', marker, 'position');
  label.bindTo('text', marker, 'position');
}

// Geolocation

function geoFindMe(callback) {

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    gotCoord = true;
    callback(latitude, longitude)
  };

  function error() {
    gotCoord = false;
    alert("Unable to retrieve your location");
  };
  
  navigator.geolocation.getCurrentPosition(success, error);
}

function setMyCoord(lat, lng) {
  myLat = lat;
  myLng = lng;
  myLatLng = new google.maps.LatLng(lat, lng);
  console.log("Got Coordinates" + myLat + myLng)
}

google.maps.event.addDomListener(window, 'load', initialize);