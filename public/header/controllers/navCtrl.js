app.controller("NavCtrl", ['$scope', 'auth', function($scope, auth) {


    //$scope.isLoggedIn = auth.isLoggedIn;

    var loggedIn;


    //$scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logout = auth.logOut;

    if (auth.isLoggedIn)
    {
        $scope.isLoggedIn = function()
        {
            return true;
        }
    }
}]);
