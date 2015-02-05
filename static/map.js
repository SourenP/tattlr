function initialize() {
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

  // Create the DIV to hold the control and
  // call the CenterControl() constructor passing
  // in this DIV.
  var centerControlDiv = document.createElement('div');
  var centerControl = new inputBox(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

function createPost(map, lat, lgn, comment) {
  var latLng = new google.maps.LatLng(lat, lgn);
  var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
  marker.setVisible(false)

  var label = new Label({ map: map }, comment);

  label.bindTo('position', marker, 'position');
  label.bindTo('text', marker, 'position');
}


function inputBox(controlDiv, map) {
  var inputBox = document.createElement('input');
  inputBox.className = "inputBox";
  inputBox.type = "text"
  inputBox.onkeypress = 
    function(evt) {
      evt = (evt) ? evt : window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if (charCode == 13) {
        comment = inputBox.value;
        createPost(map, 40.807528, -73.962525, comment);
        inputBox.disabled = true;
        return false;
      }
      return true;
    };

  controlDiv.appendChild(inputBox);

  // Setup the click event listeners:
  //google.maps.event.addDomListener(controlUI, 'click', function() {
  //  map.setCenter(chicago)
  //});
}

google.maps.event.addDomListener(window, 'load', initialize);