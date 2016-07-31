// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);



scotchApp.config(function($routeProvider) {
    $routeProvider


        .when('/index', {
            templateUrl: '../templates/home.html',
            controller: 'mainController'
        })

        .when('/about', {
            templateUrl: '../templates/about.html',
            controller: 'aboutController'
        })



});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope) {
     // create a message to display in our view
     console.log("main");
     $scope.message = 'Everyone come and see how good I look!';
 });

 scotchApp.controller('aboutController', function($scope) {
     console.log("about");
     $scope.message = 'Look! I am an about page.';
 });
