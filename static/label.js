// Define the overlay, derived from google.maps.OverlayView

Label.prototype = new google.maps.OverlayView;

function Label(map, comment, key) {
	// Initialization
	this.setMap(map)
	this.comment_ = comment;
	this.key_ = key;

	

	// Triangle
	var tri = document.createElement('div');
	tri.className = 'post_pointer';

	// Text span
	var span = this.span_ = document.createElement('span');
	span.className = 'post_text';
	span.innerHTML = this.comment_;

	// Text Container
	var text_container = document.createElement('div');
	text_container.className = 'text_container';

	var post_container = this.post_container = document.createElement('div');
	post_container.className = 'post_container';
	post_container.id = 'post_' + this.key_;

	text_container.appendChild(span);

	// Main div
	var div = this.div_ = document.createElement('div');
	div.className = 'post'
	div.id = this.key_;

	//
	var marker = this.marker_ = document.createElement('div');
	marker.className = 'post_marker';

	var mouse_trigger_div = this.mouse_trigger_div = document.createElement('div');
	mouse_trigger_div.className = 'post_marker';

	post_container.appendChild(text_container)
	post_container.appendChild(tri);

	mouse_trigger_div.appendChild(marker);
	
	div.appendChild(post_container);
	div.appendChild(mouse_trigger_div);

	/*
	// Initialization
	this.setValues(opt_options);
	this.comment_ = comment;
	this.key_ = key;
	this.onpost = false;

	// MainDiv
	var maindiv = this.maindiv_ = document.createElement('div')
	maindiv.id = this.key_;
	maindiv.class = 'maindiv';

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

	// Main div
	var postbox = this.postbox_ = document.createElement('div');
	postbox.className = 'postbox'
	postbox.id = this.key_ + "_post";

	// mouseoverdiv
	var overdiv = this.overdiv_ = document.createElement('div')
	overdiv.className = 'overdiv'
	overdiv.id = this.key_+ "_over";


	text_container.appendChild(span);
	postbox.appendChild(text_container)
	postbox.appendChild(tri);
	maindiv.appendChild(postbox);
	maindiv.appendChild(overdiv);
	*/
};

// Implement onAdd
Label.prototype.onAdd = function() {
	console.log("add")
	var pane = this.pane_ = this.getPanes().overlayMouseTarget;
	pane.appendChild(this.div_);

	// Ensures the label is redrawn if the text or position is changed.
	var me = this;

	google.maps.event.addDomListener(this.div_, 'mouseover', function() {
		if (!this.onpost)
		{
			console.log("on")
			console.log($("#" + me.key_))
			$("#" + me.key_).hide('fast')
			//$(".postbox").css('display', 'none');
		}
		else
			me.onpost = true;
	});

	//this.listeners_ = [
	//google.maps.event.addListener(this, 'position_changed',
	//   function() { me.draw(); }),
	//];
};

// Implement onRemove
Label.prototype.onRemove = function() {
	this.pane_.removeChild(this.div_);
	$('#' + this.key_).remove();

	// Label is removed from the map, stop updating its position/text.
	for (var i = 0, I = this.listeners_.length; i < I; ++i) {
		google.maps.event.removeListener(this.listeners_[i]);
	}
};

// Implement draw
Label.prototype.draw = function() {
	//console.log("draw")
	var projection = this.getProjection();
	var position = projection.fromLatLngToDivPixel(this.get('position'));

	this.div_.style.left = position.x + 'px';
	this.div_.style.top = position.y + 'px';
	this.div_.style.position = "absolute"
	this.div_.style.display = 'block';
};