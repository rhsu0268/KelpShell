var app = angular.module("login", []);

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


    auth.logIn = function(user)
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

/*
app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
    }
]);

app.controller("LoginCtrl", ["$scope", "Auth", function($scope, Auth) {

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
*/


/*
app.run(["$rootScope", "$location", function($rootScope, $location) {

    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {

        if (error === "AUTH_REQUIRED")
        {
            $location.path("/");
        }

    });
}]);

*/



/*
app.controller("AuthCtrl", ['$scope', '$http', 'Auth', function($scope, $http, Auth) {

    // lisens for changes in authentication state
    $scope.auth = Auth;


    // any time the state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;

    });


    $scope.login = function()
    {
        Auth.$signInWithPopup("github").catch(function(error) {
            console.error("Error authenticating with GitHub:", error);
        });
    }

    $scope.logout = function()
    {
        Auth.$signOut();
    }


}]);
*/


app.controller("LoginCtrl", ["$scope", "auth", "$window", function($scope, auth, $window) {

    $scope.logIn = function()
    {
        auth.logIn($scope.user).error(function(error) {
            $scope.error = error;
        }).then(function() {
            $window.location.href = '/profile';
        });
    }



}]);

app.controller("NavCtrl", ['$scope', 'auth', function($scope, auth) {

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logout = auth.logOut;

}]);
