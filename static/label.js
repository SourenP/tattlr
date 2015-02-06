// Define the overlay, derived from google.maps.OverlayView
function Label(opt_options, comment) {
	// Initialization
	this.setValues(opt_options);

	// Triangle
	var tri = this.div_ = document.createElement('div')
	tri.className = 'post_pointer'

	// Label specific
	var span = this.span_ = document.createElement('span');
	span.className = 'post_text'
	span.innerHTML = comment

	// Text Container
	var text_container = this.div_ = document.createElement('div')
	text_container.className = 'text_container'
	text_container.id='text_container'

	var div = this.div_ = document.createElement('div');
	div.className = 'post'


	text_container.appendChild(span);
	div.appendChild(text_container)
	div.appendChild(tri);

	//div.onmouseclick = function(getbig) {
    

};
Label.prototype = new google.maps.OverlayView;

// Implement onAdd
Label.prototype.onAdd = function() {
	var pane = this.getPanes().overlayMouseTarget;
	pane.appendChild(this.div_);
	var me = this

	google.maps.event.addDomListener(this.div_, 'click', function() {
    	console.log("asdasd")
    	document.getElementById('text_container').style.border = "2px"
	});

	// Ensures the label is redrawn if the text or position is changed.
	var me = this;
	this.listeners_ = [
	google.maps.event.addListener(this, 'position_changed',
	   function() { me.draw(); }),
	];
};


// Implement onRemove
Label.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);

	// Label is removed from the map, stop updating its position/text.
	for (var i = 0, I = this.listeners_.length; i < I; ++i) {
		google.maps.event.removeListener(this.listeners_[i]);
	}
};

// Implement draw
Label.prototype.draw = function() {
	var projection = this.getProjection();
	var position = projection.fromLatLngToDivPixel(this.get('position'));

	var div = this.div_;
	div.style.left = position.x + 'px';
	div.style.top = position.y + 'px';
	div.style.display = 'block';
};