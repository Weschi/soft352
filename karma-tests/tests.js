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
		//first lets set a user!
		userService.getUser().then(function(emptyUser){
			expect(!!emptyUser).toEqual(false);
		});
	});
});

//integration tests
describe('Testing a User Service: postLogin()', function() {
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
		//first lets set a user!
		userService.getUser().then(function(emptyUser){
			expect(!!emptyUser).toEqual(false);
		});
	});
});

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
		//first lets set a user!
		userService.getUser().then(function(emptyUser){
			expect(!!emptyUser).toEqual(false);
		});
	});
});

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
		//first lets set a user!
		userService.getUser().then(function(emptyUser){
			expect(!!emptyUser).toEqual(false);
		});
	});
});

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
		//first lets set a user!
		userService.getUser().then(function(emptyUser){
			expect(!!emptyUser).toEqual(false);
		});
	});
});