Label.prototype = new google.maps.OverlayView;

// Define the overlay, derived from google.maps.OverlayView
function Label(opt_options, comment, key) {
	// Initialization
	this.setValues(opt_options);
	this.comment_ = comment;
	this.key_ = key;
	this.onmarker = false;
	this.onpost = false;

	// Text span
	var span = this.span_ = document.createElement('span');
	span.className = 'post_text';
	span.innerHTML = this.comment_;

	// Text Container
	var text_container = document.createElement('div');
	text_container.className = 'text_container';

	// Post Container
	var post_container = this.post_container = document.createElement('div');
	post_container.className = 'post_container';
	post_container.id = 'post_' + this.key_;

	// Triangle
	var tri = document.createElement('div');
	tri.className = 'post_pointer';

	// Main
	var div = this.div_ = document.createElement('div');
	div.className = 'post'
	div.id = this.key_;

	// Marker
	var marker = this.marker_ = document.createElement('div');
	marker.className = 'post_marker';
	marker.id = 'marker_' + this.key_

	text_container.appendChild(span);
	post_container.appendChild(text_container)
	post_container.appendChild(tri);
	
	div.appendChild(marker);
	div.appendChild(post_container);
};

// Implement onAdd
Label.prototype.onAdd = function() {
	var pane = this.pane_ = this.getPanes().overlayMouseTarget;
	pane.appendChild(this.div_);
	pane.id = "the_pane"

	var me = this;
	$("#post_" + me.key_).hide();

	// Ensures the label is redrawn if the text or position is changed.
	google.maps.event.addDomListener(me.div_, 'mouseover', function() {
		$("#post_" + me.key_).stop().show('fast')
	});	

	google.maps.event.addDomListener(me.div_, 'mouseout', function() {
		$("#post_" + me.key_).stop().hide('fast')
	});	

	// Our Failure
	/* 
	google.maps.event.addDomListener(me.marker_, 'mouseover', function() {
		console.log("onto marker")
		if (!me.onmarker && !me.onpost)
		{
			$("#post_" + me.key_).show('fast')
			me.onmarker = true;
		}
	});

	google.maps.event.addDomListener(me.post_container, 'mouseover', function() {
		console.log("onto post")
		me.onpost = true;
	});

	google.maps.event.addDomListener(me.marker_, 'mouseout', function() {
		console.log("OFF marker")
		if (me.onmarker)
		{
			$("#post_" + me.key_).hide('fast')
		}
		me.onmarker	 = false;
	});

	google.maps.event.addDomListener(me.post_container, 'mouseout', function() {
		console.log("OFF post")
		if (me.onpost && !me.onmarker)
		{
			$("#post_" + me.key_).hide('fast')
			me.onpost = false;	
		}
	});
	*/


	// idk if we need this
	this.listeners_ = [
	google.maps.event.addListener(this, 'position_changed',
	   function() { me.draw(); }),
	];
};

// Implement onRemove
Label.prototype.onRemove = function() {
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