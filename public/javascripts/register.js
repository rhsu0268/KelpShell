var app = angular.module('register', ["ngRoute"]);


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
        $window.location.href = '/';
    }

    return auth;

}]);



app.controller("NavCtrl", ['$scope', 'auth', function($scope, auth) {

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logout = auth.logOut;

}]);

app.controller("RegisterCtrl", ["$scope", 'auth', '$location', '$window', function($scope, auth, $location, $window) {

    console.log("Auth");

    $scope.user = {};

    $scope.error = false;

    $scope.register = function()
    {
        auth.register($scope.user).error(function(error) {
            console.log("Error");


            $scope.error = error;
            //console.log($scope.error);
            //console.log($scope.error.message);
            //$scope.error.message = $scope.error.message;
            //$scope.error = true;
        }).then(function() {

            //$location.path( "/profile" );
            $window.location.href = '/profile';
        });
    }

}]);
