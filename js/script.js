function checkLength(clave){
	if(clave.length>8){
		return true;
	}else{
		return false;
	};
}
function checkUpper(clave){
	if(/[A-Z]/.test(clave)){
		return true;
	}else{
		return false;
	};
}
function checkLower(clave){
	if(/[a-z]/.test(clave)){
		return true;
	}else{
		return false;
	};
}
function checkNumber(clave){
	if(/\d/.test(clave)){
		return true;
	}else{
		return false;
	};
}
//Starting parse
Parse.initialize("o738tDIjX7Oq1jSB1PtSG6LfVeZqOgpaKH0pK3dt", "p7JfKdqPlYwWoenFcH1pnxR73YDzNaHAjz6iAwhq");
//Starting angular and setting routes
var pokemonModule = angular.module('pokemonModule', ["ngRoute"]).config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'login.html'
	})
	.when('/profile', {
		templateUrl: 'profile.html'
	})
	.otherwise({
		redirectTo: '/'
	});
}).run(['$rootScope', "$location", function($scope, $location) {
	$scope.scenario = 'Sign up';
	$scope.currentUser = Parse.User.current();

	$scope.passLength = false;
	$scope.passUpper = false;
	$scope.passLower = false;
	$scope.passNumber = false;

	$scope.signUp = function(form, newPath) {
		//check if password is longer than 8
		$scope.passLength = checkLength(form.password);
		//check if password has uppercase
		$scope.passUpper = checkUpper(form.password);
		//check if password has lowercase
		$scope.passLower = checkLower(form.password);
		//check if password has digits
		$scope.passNumber = checkNumber(form.password);
		if($scope.passLength && $scope.passUpper && $scope.passLower && $scope.passNumber){
			var user = new Parse.User();
			user.set("email", form.email);
			user.set("username", form.username);
			user.set("password", form.password);
			
			user.signUp(null, {
				success: function(user) {
					$scope.currentUser = user;
					$location.path(newPath);
					$scope.$apply();
				},
				error: function(user, error) {
					alert("Unable to sign up:  " + error.code + " " + error.message);
				}
			});
		};
	};
	
	$scope.logIn = function(form, newPath) {
		Parse.User.logIn(form.username, form.password, {
			success: function(user) {
				$scope.currentUser = user;
				$location.path(newPath);
				$scope.$apply();
			},
			error: function(user, error) {
				alert("Unable to log in: " + error.code + " " + error.message);
			}
		});
	};
	
	$scope.logOut = function(form) {
		Parse.User.logOut();
		$scope.currentUser = null;
		$location.path("/inicio");
	};
}]);