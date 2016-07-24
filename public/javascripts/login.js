var app = angular.module("login", ["firebase"]);

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

app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);



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

/*
app.config(["$routeProvider", function($routeProvider) {

    $routeProvider.when("/home", {

        controller: "HomeCtrl",
        templateUrl: "views/home.html",
        resolve: {
            "currentAuth": ["Auth", function(Auth) {
                return Auth.$waitForSignIn();
            }]
        }

    }).when("/account", {

        controller: "AccountCtrl",
        templateUrl: "views/account.html",
        resolve: {

            "currentAuth": ["Auth", function(Auth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return Auth.$requireSignIn();
            }]
        }


    });

}]);
*/
