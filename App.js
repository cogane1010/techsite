var newConfig = function($routeProvider) { 
	$routeProvider
		.when('/admin/', {
			controller: 'ManagementCtrl',
			templateUrl: 'view/Admin/AdminIndexTbl.html'
		})
		.when('/createAticle/', {
			controller: 'ManagementCtrl',
			templateUrl: 'view/Admin/ManagerTbl.html'
		})
		.when('/', {
			controller: 'HomeController',
			templateUrl: 'view/home.html'
		})
		.when('/home/', {
			controller: 'HomeController',
			templateUrl: 'view/home.html'
		})
		.when('/about_us', {
			controller: 'LinksController',
			templateUrl: 'view/about_us.html'
		})
		.when('/about_us/tab/:tabId', {
			controller: 'LinksController',
			templateUrl: 'view/about_us.html'
		})
		.when('/login_profile', {
			controller: 'LinksController',
			templateUrl: 'view/forms/login.html'
		})
		.when('/link/:linkId', {
			controller: 'LinksController',
			templateUrl: 'view/links.html'
		})
		.when('/addNote/:linkId', {
			controller: 'AddNoteController',
			templateUrl: 'view/forms/addNote.html'
		})
		.when('/deleteNote/:linkId/:noteId', {
			controller: 'DeleteNoteController',
			templateUrl: 'view/forms/addNote.html'
		})
	;
};

var App = angular.module('AngularJS',['ngResource','ngRoute','textAngular','smart-table','ngDropdowns','angularFileUpload'] ).config(newConfig);

App.directive('pageSelect', function() {
	return {
		restrict: 'E',
		template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
		link: function(scope, element, attrs) {
			scope.$watch('currentPage', function(c) {
				scope.inputPage = c;
			});
		}
	}
});
App.config(['$httpProvider', function ($httpProvider) {

	$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
	$httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
	$httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
	$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type, Accept';

}]);