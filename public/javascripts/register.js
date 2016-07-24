var app = angular.module("KelpShell", ["firebase", "ngRoute"]);


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
