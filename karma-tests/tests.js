//Nicholas Cox - 10500654 - Client Side Scripting TDD!

//References
// - https://www.pluralsight.com/guides/front-end-javascript/introduction-to-angular-test-driven-development#testing-a-service

//test settings
var root = "http://localhost:8080/";
var environment = false;
if(!!environment)
{
	//server domain
	root = "http://192.168.43.3:8080/"; 
}


//tests/tests.js 
describe('Testing a User Service: setUser() & getUser().', function() {
	var userService;

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
		});
	}); 

	// Test (spec) 
	it('Testing getUser returns a user from localForage :)', function() { 
		var user = {
			fullName: 'Testuser',
			email : 'TestEmail@testEmail.co.uk',
			password : '123456789'
		};
		//first lets set a user!
		var setUserPromise = userService.setUser(user);

		setUserPromise.then(function(setUser){
			expect(setUser.fullName).toEqual('Testuser');
			expect(setUser.email).toEqual('TestEmail@testEmail.co.uk');
			expect(setUser.password).toEqual('123456789');
			var getUserPromise = userService.getUser();
			getUserPromise.then(function(getUser){
				expect(getUser.fullName).toEqual('Testuser');
				expect(getUser.email).toEqual('TestEmail@testEmail.co.uk');
				expect(getUser.password).toEqual('123456789');
			});
		});
	});
});

describe('Testing a User Service: getUser().', function() {
	var userService;

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
		});
	}); 

	// Test (spec) 
	it('Testing getUser returns a user from localForage :)', function() { 
		//first lets set a user!
		userService.getUser().then(function(emptyUser){
			expect(!!emptyUser).toEqual(false);
		});
	});
});

//integration tests
describe('Testing a User Service: postLogin()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = { fullName: 'Test', email: 'FakeEmail@Faked.co.uk', password : 'AIUG7349gIU58dOHb429jUUG' };

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenPOST(root + 'login');
		});
	}); 

	// Test (spec) 
	it('Testing userService.postLogin() calls /login', function() { 
		//first lets set a user!
		var promise = userService.postLogin();

		promise.then(function(user){
			expect(user.fullName).toEqual('Test');
			expect(user.email).toEqual('FakeEmail@Faked.co.uk');
			expect(user.password).toEqual('AIUG7349gIU58dOHb429jUUG');
		});
	});
});

describe('Testing UserService: postRegister()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = { fullName: 'Test', email: 'FakeEmail@Faked.co.uk', password : '123456789' };

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenPOST(root + 'register');
		});
	}); 

	// Test (spec) 
	it('Testing userService.postRegister() calls /register', function() { 
		//first lets set a user!
		var promise = userService.postRegister();

		promise.then(function(user){
			expect(user.fullName).toEqual('Test');
			expect(user.email).toEqual('FakeEmail@Faked.co.uk');
			expect(user.password).toEqual('123456789');
		});
	});
});


describe('Testing UserService: getUsers()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = [ {fullName: 'Mac'}, {fullName: 'Mac'}, {fullName: 'Mac'}];

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenGET(root + 'users');
		});
	});

	// Test (spec) 
	it('Testing userService.getUsers() calls /users', function() { 
		//first lets set a user!
		var promise = userService.getUsers();

		promise.then(function(users){
			expect(users[0].fullName).toEqual('Mac');
			expect(users[1].fullName).toEqual('Mac');
			expect(users[2].fullName).toEqual('Mac');
		});
	});
});

describe('Testing UserService: getFriends()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = [ {fullName: 'Mac'}, {fullName: 'Mac'}, {fullName: 'Mac'}];

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenGET(root + 'user/{{userId}}/friends');
		});
	});

	// Test (spec) 
	it('Testing userService.getFriends() calls /user/{{userId}}/friends', function() { 
		//first lets set a user!
		var promise = userService.getFriends();

		promise.then(function(users){
			expect(users[0].fullName).toEqual('Mac');
			expect(users[1].fullName).toEqual('Mac');
			expect(users[2].fullName).toEqual('Mac');
		});
	});
});

describe('Testing UserService: getFriends()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = [ {fullName: 'Mac'}, {fullName: 'Mac'}, {fullName: 'Mac'}];

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenGET(root + 'user/404/friends').respond(200,jsonResponse);;
		});
	});

	// Test (spec) 
	it('Testing userService.getFriends() calls /user/404/friends', function(done) { 
		//first lets set a user!
		var promise = userService.getFriends({userId : '404'});

		promise.then(function(users){
			expect(users[0].fullName).toEqual('Mac');
			expect(users[1].fullName).toEqual('Mac');
			expect(users[2].fullName).toEqual('Mac');
			done()
		});
		$httpBackend.flush();
	});
});


describe('Testing UserService: createRequest()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = { toId: '404'}

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenPOST(root + 'notification/404/create').respond(200,jsonResponse);;
		});
	});

	// Test (spec) 
	it('Testing userService.createRequest() calls notification/404/create', function(done) { 
		//first lets set a user!
		var promise = userService.createRequest({userId : '404'});

		promise.then(function(friendRequest){
			expect(friendRequest).toEqual({ toId: '404'});
			done()
		});
		$httpBackend.flush();
	});
});

describe('Testing UserService: acceptRequest()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = { toId: '915'}

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenPUT(root + 'users/404/notification/915/accept').respond(200,jsonResponse);;
		});
	});

	// Test (spec) 
	it('Testing userService.acceptRequest() calls users/404/notification/915/accept', function(done) { 
		//first lets set a user!
		var promise = userService.acceptRequest({userId : '404', notificationId : '915'});

		promise.then(function(friendRequest){
			expect(friendRequest).toEqual({ toId: '915'});
			done()
		});
		$httpBackend.flush();
	});
});

describe('Testing UserService: declineRequest()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = { toId: '915'}

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenPUT(root + 'users/404/notification/915/decline').respond(200,jsonResponse);;
		});
	});

	// Test (spec) 
	it('Testing userService.declineRequest() calls users/404/notification/915/decline', function(done) { 
		//first lets set a user!
		var promise = userService.declineRequest({userId : '404', notificationId : '915'});

		promise.then(function(friendRequest){
			expect(friendRequest).toEqual({ toId: '915'});
			done()
		});
		$httpBackend.flush();
	});
});

describe('Testing UserService: getFriendRequests()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = [{ fromId: 505, toId : 404},{fromId: 506, toId : 404},{fromId: 507, toId : 404}]

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenGET(root + 'notifications/404').respond(200,jsonResponse);;
		});
	});

	// Test (spec) 
	it('Testing userService.getFriendRequests() calls notifications/404', function(done) { 
		//first lets set a user!
		var promise = userService.getFriendRequests({userId : '404'});

		promise.then(function(response){
			expect(response.length).toEqual(3);
			done()
		});
		$httpBackend.flush();
	});
});

describe('Testing UserService: getFriendRequests()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = [{ fromId: 505, toId : 404},{fromId: 506, toId : 404},{fromId: 507, toId : 404}]

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenGET(root + 'notifications/404').respond(200,jsonResponse);;
		});
	});

	// Test (spec) 
	it('Testing userService.getFriendRequests() calls notifications/404', function(done) { 
		//first lets set a user!
		var promise = userService.getFriendRequests({userId : '404'});

		promise.then(function(response){
			expect(response.length).toEqual(3);
			done()
		});
		$httpBackend.flush();
	});
});


describe('Testing UserService: queryUsers()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = [{ fullName: 'Max' },{fullName: 'Fido'},{fullName: 'Bob'}]

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenGET(root + 'users/query').respond(200, jsonResponse);;
		});
	});

	// Test (spec) 
	it('Testing userService.queryUsers() calls /users/query', function(done) { 
		//first lets set a user!
		var promise = userService.queryUsers();

		promise.then(function(response){
			expect(response.length).toEqual(3);
			done()
		});
		$httpBackend.flush();
	});
});

describe('Testing UserService: queryUsers()', function() {
	var userService,
	$httpBackend, 
	jsonResponse = [{ fullName: 'Max' },{fullName: 'Fido'},{fullName: 'Bob'}]

	beforeEach(function(){ // loads the app module 
		module('homiefinder.userService');
		module('ui.router');
		inject(function($injector){
			userService = $injector.get("userService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenGET(root + 'users/query').respond(200, jsonResponse);;
		});
	});

	// Test (spec) 
	it('Testing userService.queryUsers() calls /users/query', function(done) { 
		//first lets set a user!
		var promise = userService.queryUsers();

		promise.then(function(response){
			expect(response.length).toEqual(3);
			done()
		});
		$httpBackend.flush();
	});
});


//Testing Meeting Service
describe('Testing meetingService: post()', function() {
	var meetingService,
	$httpBackend, 
	jsonResponse = { name: 'Code review', place: {name: 'Google HQ', lat: 90, lng: 90}}

	beforeEach(function(){ 
		module('homiefinder.meetingService');
		module('ui.router');
		inject(function($injector){
			meetingService = $injector.get("meetingService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenPOST(root + 'users/404/meeting/create').respond(200, jsonResponse);;
		});
	});

	it('Testing meetingService.post() calls /users/query', function(done) { 
		var promise = meetingService.post({userId : 404});

		promise.then(function(response){
			expect(response.name).toEqual('Code review');
			done()
		});
		$httpBackend.flush();
	});
});

describe('Testing meetingService: get()', function() {
	var meetingService,
	$httpBackend, 
	jsonResponse = [{ name: 'Code review', place: {name: 'Google HQ', lat: 90, lng: 90}}, { name: 'Code review', place: {name: 'Google HQ', lat: 90, lng: 90}}]

	beforeEach(function(){ 
		module('homiefinder.meetingService');
		module('ui.router');
		inject(function($injector){
			meetingService = $injector.get("meetingService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenGET(root + 'users/404/meetings/get').respond(200, jsonResponse);;
		});
	});

	it('Testing meetingService.get() calls users/404/meetings/get', function(done) { 
		var promise = meetingService.get({userId : 404});

		promise.then(function(response){
			expect(response.length).toEqual(2);
			done()
		});
		$httpBackend.flush();
	});
});

describe('Testing meetingService: put()', function() {
	var meetingService,
	$httpBackend, 
	jsonResponse = { name: 'Code review', place: {name: 'Google HQ', lat: 90, lng: 90}}

	beforeEach(function(){ 
		module('homiefinder.meetingService');
		module('ui.router');
		inject(function($injector){
			meetingService = $injector.get("meetingService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenPUT(root + 'users/404/meetings/404/put').respond(200, jsonResponse);;
		});
	});

	it('Testing meetingService.put() calls users/404/meetings/404/put', function(done) { 
		var promise = meetingService.put({userId : 404, meetingId: 404});

		promise.then(function(response){
			expect(response.name).toEqual('Code review');
			done()
		});
		$httpBackend.flush();
	});
});

describe('Testing meetingService: delete()', function() {
	var meetingService,
	$httpBackend, 
	jsonResponse = { name: 'Code review', place: {name: 'Google HQ', lat: 90, lng: 90}}

	beforeEach(function(){ 
		module('homiefinder.meetingService');
		module('ui.router');
		inject(function($injector){
			meetingService = $injector.get("meetingService");
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenDELETE(root + 'users/404/meetings/404/delete').respond(200, jsonResponse);;
		});
	});

	it('Testing meetingService.delete() calls users/404/meetings/404/delete', function(done) { 
		var promise = meetingService.delete({userId : 404, meetingId: 404});

		promise.then(function(response){
			expect(response.name).toEqual('Code review');
			done()
		});
		$httpBackend.flush();
	});
});
