var app = angular.module("register", ["firebase"]);


app.controller("RegisterCtrl", ["$scope", "Auth", function($scope, Auth) {

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
