var app = angular.module('profile', ["ngRoute"]);



app.factory('userInfo', ['$http', function($http) {


    var fetchedUserInfo;
    var userInfoService = {
        userInfo: []
    };

    var self = this;

    userInfoService.get = function(userId)
    {
        return $http.get('/userInfo/' + userId).success(function(res) {


            //angular.copy(res.data, userInfoService.userInfo);
            console.log(userInfoService.userInfo);
            //self.setUserInfo(res.data);

        });
    };

    userInfoService.create = function(userInfo)
    {
        return $http.post('/userInfo', userInfo).success(function (data) {

            //userInfoService.userInfo.push(data);
            console.log(data);

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

    userInfoService.setUserData = function(userInfo)
    {
        userInfoService.userInfo = userInfo;
    }


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


    auth.getUserId = function()
    {
        if (auth.isLoggedIn())
        {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload._id;
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



app.controller("ProfileCtrl", ['$scope', 'auth', 'userInfo', '$http', function($scope, auth, userInfo, $http) {


    var currentUserId = auth.getUserId();

    $scope.userInformation = {};


    userInfo.get(currentUserId).then(function(res) {

        console.log(res.data[0]);

        $scope.userInformation.name = res.data[0].name;
        $scope.userInformation.musicBackground = res.data[0].musicBackground;
        $scope.userInformation.favoriteGenre = res.data[0].favoriteGenre;
        $scope.userInformation.favoritePiece = res.data[0].favoritePiece;

    });

    //console.log(userInfo.userInfo);

    //console.log($scope.userInformation);


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
        $scope.userInfo.user = auth.getUserId();
        console.log($scope.userInfo);
        userInfo.create($scope.userInfo);

    }

}]);
