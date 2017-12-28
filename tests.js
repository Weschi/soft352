//10500654 - Nicholas Cox - Unit/Integration tests

//Integration (API) tests - Assuming you're running the server through node so that endpoints may be requested.

//Test settings
var asynchronous = true;

///
/// Test the register endpoint can be used to create a new user
///
QUnit.test("Register", function( assert ) {

	var uri = 'http://localhost:8080/register';
	var user = {
		fullName: 'Testuser',
		email : 'TestEmail@testEmail.co.uk',
		password : '123456789'
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(data) {
		if (this.readyState == 4 && this.status == 200) {
			assert.ok( data.email == 'TestEmail@testEmail.co.uk', "Register endpoint working as expected." );
		}
	};
	xhttp.open('POST', uri, asynchronous);
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send('lorem=ipsum&name=binny');
});