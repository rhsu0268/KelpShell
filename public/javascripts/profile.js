var app = angular.module('profile', ["ngRoute"]);


app.factory('userInfo', ['$http', function($http) {

    var userInfoService = {
        userInfo: []

    };

    userInfoService.get = function(userId)
    {
        return $http.get('/userInfo' + userId).then(function(res) {

            angular.copy(res.data, userInfoService.userInfo);
            console.log(res.data);

        });
    };

    userInfoService.create = function(userInfo)
    {
        return $http.post('/userInfo', userInfo).success(function (data) {
            
            userInfoService.userInfo.push(data);

        });
    };

    userInfoService.update = function(userInfo)
    {
        console.log("Inside update");
        return $http.post('/updateUserInfo', userInfo).success(function (data) {

            console.log("Inside update");
            console.log(data);

        });
    };
    return userInfoService;

}]);

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

app.controller("ProfileCtrl", ['$scope', 'auth', function($scope, auth) {

    $scope.currentUser = auth.currentUser();
    console.log($scope.currentUser);


    $scope.updateProfile = function()
    {
        $scope.userInfo = {};
        $scope.userInfo.name = $scope.user.name;
        console.log($scope.userInfo.name);


        $scope.userInfo.musicBackground = $scope.user.musicBackground;
        console.log($scope.userInfo.musicBackground);
        $scope.userInfo.favoriteGenre = $scope.user.favoriteGenre;
        console.log($scope.userInfo.favoriteGenre);
        $scope.userInfo.favoritePiece = $scope.user.favoritePiece;
        console.log($scope.userInfo.favoritePiece);
    }

}]);
