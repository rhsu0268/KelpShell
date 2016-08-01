var app = angular.module('Auth', ["ngRoute"]);


app.factory('auth', ['$http', '$window', function($http, $window) {

    var auth = {};

    auth.saveToken = function(token)
    {
        $window.localStorage['kelpshell-token'] = token;
    }

    auth.getToken = function()
    {
        return $window.localStorage['kelpshell-token'];
    }

    auth.isLoggedIn = function()
    {
        var token = auth.getToken();

        if (token)
        {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp = Date.now() / 1000;
        }
        else
        {
            return false;
        }

    }

    auth.currentUser = function()
    {
        if (auth.isLoggedIn())
        {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    }

    auth.register = function(user)
    {
        return $http.post('/register', user).success(function(data) {

            auth.saveToken(data.token);

        })
    }


    auth.login = function(user)
    {
        return $http.post('/login', user).success(function(data) {

            auth.saveToken(data.token);

        })
    }

    auth.logOut = function()
    {
        $window.localStorage.removeItem('kelpshell-token');
    }

    return auth;

}]);

/*
app.config(function($routeProvider, $locationProvider, $windowProvider) {
    $routeProvider


        .when('/auth', {
            templateUrl: '../../views/auth.ejs',
            controller: 'AuthCtrl',

            onEnter: ['auth', function(auth) {
                if (auth.isLoggedIn()) {
                    console.log("Logged in");
                    //$location.path("/profile");
                    var $window = $windowProvider.$get();
                    //console.log($window);
                    $window.location.href = '/profile';
                }


            }]

        });

        // use the HTML5 History API
       //$locationProvider.html5Mode(true);




});

*/

app.controller("AuthCtrl", ["$scope", 'auth', '$location', '$window', function($scope, auth, $location, $window) {

    console.log("Auth");

    $scope.user = {};

    $scope.register = function()
    {
        auth.register($scope.user).error(function(error) {
            console.log("Error");
            $scope.error = error;
        }).then(function() {

            //$location.path( "/profile" );
            $window.location.href = '/profile';
        });
    }

}]);
