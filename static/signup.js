console.log("Hellos")
function validateForm() {
	form = document.form["signup"]
	text = form.elements["email"].value
	console.log(text)
	/*
	var x = document.forms["signup"]["email"].value;
	if ((x==null) || (x=="")) {
		alert("Please fill in email");
		return false;
	}
	*/
}