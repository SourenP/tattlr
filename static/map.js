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

  // THIS IS WHERE JAKE STARTED EDITING
  var swBound = new google.maps.LatLng(40.607528, -74.062525);
  var neBound = new google.maps.LatLng(40.907528, -73.762525);
  var bounds = new google.maps.LatLngBounds(swBound, neBound);

  var srcImage = 'http://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg';

  overlay = new USGSOverlay(bounds, srcImage, map);
}

function USGSOverlay(bounds, image, map) {

  // Initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay.
  this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
USGSOverlay.prototype.onAdd = function() {

  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create the img element and attach it to the div.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  div.appendChild(img);

  this.div_ = div;

  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
};

USGSOverlay.prototype.draw = function() {

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
  var overlayProjection = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's div to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};

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