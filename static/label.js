// Define the overlay, derived from google.maps.OverlayView
function Label(opt_options, comment, key) {
	// Initialization
	this.setValues(opt_options);
	this.key_ = key;

	// Label specific
	var span = this.span_ = document.createElement('span');
	span.className = 'post_text'
	//span.style.cssText = 'position: relative; left: -50%; top: -8px; ' +
	//                  'white-space: nowrap; border: 1px solid blue; ' +
	//                  'padding: 2px; ;
	span.innerHTML = comment

	var div = this.div_ = document.createElement('div');
	div.className = 'post'
	div.id = key;
	div.appendChild(span);
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
	$('#' + this.key_).hide()
	this.pane_.removeChild(this.div_);

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
