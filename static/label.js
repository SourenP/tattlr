// Define the overlay, derived from google.maps.OverlayView
function Label(opt_options, comment, key) {
	// Initialization
	this.setValues(opt_options);
	this.comment_ = comment;
	this.key_ = key;

	// Triangle
	var tri = document.createElement('div')
	tri.className = 'post_pointer';

	// Text span
	var span = this.span_ = document.createElement('span');
	span.className = 'post_text';
	span.innerHTML = this.comment_;

	// Text Container
	var text_container = document.createElement('div')
	text_container.className = 'text_container'

	text_container.appendChild(span);

	// Main div
	var div = this.div_ = document.createElement('div');
	div.className = 'post'
	div.id = this.key_;

	div.appendChild(text_container)
	div.appendChild(tri);

};
Label.prototype = new google.maps.OverlayView;

// Implement onAdd
Label.prototype.onAdd = function() {
	var pane = this.pane_ = this.getPanes().overlayLayer;
	pane.appendChild(this.div_);

	// Ensures the label is redrawn if the text or position is changed.
	var me = this;
	this.listeners_ = [
	google.maps.event.addListener(this, 'position_changed',
	   function() { me.draw(); }),
	];
};

// Implement onRemove
Label.prototype.onRemove = function() {
	//$('#' + this.key_).hide()
	this.pane_.removeChild(this.div_);
	$('#' + this.key_).remove();

	// Label is removed from the map, stop updating its position/text.
	for (var i = 0, I = this.listeners_.length; i < I; ++i) {
		google.maps.event.removeListener(this.listeners_[i]);
	}
};

// Implement draw
Label.prototype.draw = function() {
	console.log("draw")
	var projection = this.getProjection();
	var position = projection.fromLatLngToDivPixel(this.get('position'));

	var div = this.div_;
	div.style.left = position.x + 'px';
	div.style.top = position.y + 'px';
	div.style.display = 'block';
};