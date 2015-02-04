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
    flat: true,
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

function inputBox(controlDiv, map) {
  var inputBox = document.createElement('input');
  inputBox.className = "inputBox";
  //inputBox.title = 'Click to recenter the map';
  controlDiv.appendChild(inputBox);

  // Setup the click event listeners:
  //google.maps.event.addDomListener(controlUI, 'click', function() {
  //  map.setCenter(chicago)
  //});
}

google.maps.event.addDomListener(window, 'load', initialize);