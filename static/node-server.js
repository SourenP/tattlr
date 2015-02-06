var Firebase = require('firebase');
var ref = new Firebase("https://blistering-torch-7470.firebaseIO.com/");

//console.log(ref.child('-JhRqVMqSUlzYe7woUS5').child('comment').val());
// Get a reference to our posts

// Attach an asynchronous callback to read the data at our posts reference


setInterval(function() {
	console.log("hello");
	ref.on("value", function(snapshot) {
		
		snapshot.forEach(function(snapshot) {
			var cur = new Date(); 
			message_time = snapshot.val()['time'];
			console.log(snapshot.val()['time']);
			if(cur.getTime() - message_time  > 5000 ) {
				console.log(snapshot.key());
				ref.child(snapshot.key()).remove();
			}
		});

	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
	});
}, 5000);