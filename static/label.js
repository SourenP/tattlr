// Define the overlay, derived from google.maps.OverlayView
function Label(opt_options, comment, key) {
	// Initialization
	this.setValues(opt_options);
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

};


Label.prototype = new google.maps.OverlayView;

// Implement onAdd
Label.prototype.onAdd = function() {
	var pane = this.pane_ = this.getPanes().overlayMouseTarget;
	pane.appendChild(this.div_);

	// Ensures the label is redrawn if the text or position is changed.
	var me = this;
	this.listeners_ = [
		//google.maps.event.addListener(this, 'position_changed',
		//  function() { me.draw(); }), 

		google.maps.event.addDomListener(pane, 'mouseover', function(e) {
            $(me.post_container).css('opacity', 1);
	    	if($(me.post_container).is(':visible')) {
	    		console.log(this.id);
	    		e.stopPropagation();
	    		return false;
	    	} else {
	    		e.stopPropagation();
	    		
	    	}
	    	
		}),

		google.maps.event.addDomListener(pane, 'mouseout', function(e) {
			window.event.cancelBubble = true;
            if (window.event.stopPropagation)
                window.event.stopPropagation();
            	
	    	//console.log(this.id);
	    	$(me.post_container).css('opacity', 0);
	    	
		})
	];

	

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
	var projection = this.getProjection();
	var position = projection.fromLatLngToDivPixel(this.get('position'));

	var div = this.div_;
	div.style.left = position.x + 'px';
	div.style.top = position.y + 'px';
	div.style.display = 'block';
};