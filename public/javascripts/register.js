var app = angular.module("KelpShell", ["firebase", "ngRoute"]);


app.factory('auth', ['$http', '$window', function($http, $window) {

    var auth = {};

    auth.saveToken = function(token)
    {
        $window.localStorage['kelpshell-token'] = token;
    }

    auth.getToken = function()
    {
        return $window.localStorage['kepshell-token'];
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



app.controller("RegisterCtrl", ["$scope", "Auth", "$location", "$window", function($scope, Auth, $location, $window) {

    $scope.createUser = function()
    {
        console.log("Creating user");
        $scope.message = null;
        $scope.error = null;
        $scope.messagePresent = true;

        // create a new user
        Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
            .then(function(firebaseUser) {
                console.log("created User!");
                $scope.message = "User created with uid: " + firebaseUser.uid;
                $window.location.href = '/profile';
                console.log("Moving");
                //$scope.$apply();

                $scope.auth = Auth;

                // any time auth state changes, add the user data to scope
                $scope.auth.$onAuthStateChanged(function(firebaseUser) {
                    $scope.firebaseUser = firebaseUser;
                    console.log(firebaseUser);
                });
            }).catch(function(error) {
                console.log("An error occured");
                $scope.error = error;
        });

    };

    $scope.deleteUser = function()
    {
        $scope.message = null;
        $scope.error = null;

        // delete the currently signed in user
        Auth.$deleteUser().then(function() {
            $scope.message = "User deleted";
        }).catch(function(error) {
            $scope.error = error;
        });
    };

}]);



app.run(["$rootScope", "$location", function($rootScope, $location) {

    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {

        if (error === "AUTH_REQUIRED")
        {
            $location.path("/");
        }

    });

    $rootScope.$on('$routeChangeStart', function () {
        if (!Auth.isLoggedIn()) {
            $location.path('/login');
        } else {
            $location.path('/profile');
        }
    });
}]);


app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);


app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/profile", {
       // the rest is the same for ui-router and ngRoute...
       controller: "ProfileCtrl",
       templateUrl: "views/profile.ejs",
       resolve: {
         // controller will not be loaded until $waitForSignIn resolves
         // Auth refers to our $firebaseAuth wrapper in the factory below
         "currentAuth": ["Auth", function(Auth) {
           // $waitForSignIn returns a promise so the resolve waits for it to complete
           return Auth.$waitForSignIn();
         }]
       }
   }).when("/register", {
       // the rest is the same for ui-router and ngRoute...
       controller: "RegisterCtrl",
       templateUrl: "views/register.ejs",
       resolve: {
         // controller will not be loaded until $requireSignIn resolves
         // Auth refers to our $firebaseAuth wrapper in the factory below
         "currentAuth": ["Auth", function(Auth) {
           // $requireSignIn returns a promise so the resolve waits for it to complete
           // If the promise is rejected, it will throw a $stateChangeError (see above)
           return Auth.$requireSignIn();
         }]
       }
    });
}]);
