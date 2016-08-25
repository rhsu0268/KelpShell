//var Recorder = npm.require('recorderjs');

var app = angular.module('composer', ['rzModule']);

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

app.controller('padsCtrl', ['$scope', function($scope) {

    console.log("Pads");

    $scope.playKick = function()
    {
        tune = "kick.wav";
        if (!context)
        {
            playSound(tune);
        }
        else
        {
            source.stop();
            context.close();
            context = null;
        }
    }

    $scope.playSnare = function()
    {
        tune = "snare.wav";
        if (!context)
        {
            playSound(tune);
        }
        else
        {
            source.stop();
            context.close();
            context = null;
        }
    }

    $scope.playTin = function()
    {
        tune = "tin.wav";
        if (!context)
        {
            playSound(tune);
        }
        else
        {
            source.stop();
            context.close();
            context = null;
        }
    }

    $scope.playHat = function()
    {
        tune = "hat.wav";
        if (!context)
        {
            playSound(tune);
        }
        else
        {
            source.stop();
            context.close();
            context = null;
        }
    }

    $scope.playLoop1 = function()
    {
        if (!contextLoop1)
        {
            console.log("Play loop1");
            playSoundLoop1("kick.wav");
        }
        else
        {
            sourceLoop1.stop();
            contextLoop1.close();
            contextLoop1 = null;
        }
    }

    $scope.playLoop2 = function()
    {
        if (!contextLoop2)
        {
            console.log("Play loop2");
            playSoundLoop2("snare.wav");
        }
        else
        {
            sourceLoop2.stop();
            contextLoop2.close();
            contextLoop2 = null;
        }
    }

    $scope.playLoop3 = function()
    {
        if (!contextLoop3)
        {
            console.log("Play loop3");
            playSoundLoop3("tin.wav");
        }
        else
        {
            sourceLoop3.stop();
            contextLoop3.close();
            contextLoop3 = null;
        }
    }

    $scope.playLoop4 = function()
    {
        if (!contextLoop4)
        {
            console.log("Play loop4");
            playSoundLoop4("hat.wav");
        }
        else
        {
            sourceLoop4.stop();
            contextLoop4.close();
            contextLoop4 = null;
        }
    }

}]);
