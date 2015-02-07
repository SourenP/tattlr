var myFirebaseRef = new Firebase("https://blistering-torch-7470.firebaseIO.com/");
var myLat;
var myLng;
var myLatLng;
var postDic = {};
var map_g;
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
];


function initialize() {
  console.log(Firebase.ServerValue.TIMESTAMP)
  // Find my coordinates
  geoFindMe(setMyCoord);

  var mapOptions = {
    zoom: 17,
    minZoom: 17,
    maxZoom: 19,
    center: { lat: 40.808259, lng: -73.961833},
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    styles: styles
  };
  
  var mapDiv = document.getElementById('map-canvas');
  var map = new google.maps.Map(mapDiv, mapOptions);
  map_g = map;

  // Display all current posts
  //createAllPosts(map);

  // Create the input box
  var centerControlDiv = document.createElement('div');
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
  var inputBox = document.createElement('input');
  inputBox.className = "inputBox";
  inputBox.type = "text"
  centerControlDiv.appendChild(inputBox);

  // Functionality of input box
  inputBox.onkeypress = function(evt) {
    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode == 13) {
      if (gotCoord)
      {
        curr_user = "bananaquit"
        curr_comment = inputBox.value;
        var d = new Date();
        curr_time = d.getTime();
        myFirebaseRef.push({user: curr_user, comment: curr_comment, lat: myLat, lng: myLng, time: curr_time});
        map.panTo(myLatLng);
        map.setZoom(17);
        inputBox.disabled = true;
      } else alert("Don't have your location");
    } else if (inputBox.value.length>30) evt.preventDefault();
  };
}

// Post creation

function createPost(map, lat, lng, comment, key) {
  var latLng = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({ position: latLng, map: map});
  marker.setVisible(false);
  postDic[key] = new Label({ map: map }, comment, key);
  postDic[key].bindTo('position', marker, 'position');
  postDic[key].bindTo('text', marker, 'position');
}

function createAllPosts(map) {
  myFirebaseRef.orderByChild("time").on("child_added", function(snapshot) {
    post = snapshot.val();
    createPost(map, post.lat, post.lng, post.comment, snapshot.key());
  });
}


// Firebase events: posts getting added and removed

// onADD
myFirebaseRef.on('child_added', function(snapshot) {
  post = snapshot.val();
  createPost(map_g, post.lat, post.lng, post.comment, snapshot.key());
});

// onREMOVE
myFirebaseRef.on('child_removed', function(snapshot) {
  postDic[snapshot.key()].setMap(null);
});


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
  //var marker = new google.maps.Marker({ position: myLatLng, map: map_g});
}

// Add maps listener on load
google.maps.event.addDomListener(window, 'load', initialize);