function initialize() {
  var mapOptions = {
    center: { lat: 40.807528, lng: -73.962525}, 
    zoom: 17
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);