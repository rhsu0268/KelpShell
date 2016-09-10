var app = angular.module('extravagantPieces', ['firebase']);

app.factory('userPiece', ['$http', function($http) {


    //var fetchedUserInfo;
    var userPieceService = {
        userPieces: []
    };

    //var self = this;

    userPieceService.get = function(userId)
    {
        return $http.get('/pieces/' + userId).success(function(res) {


            //angular.copy(res.data, userInfoService.userInfo);
            //console.log(userInfoService.userInfo);
            //self.setUserInfo(res.data);
            console.log(res);

        });
    };

    userPieceService.save = function(piece)
    {
        return $http.post('/pieces', piece).success(function (data) {

            //userInfoService.userInfo.push(data);
            console.log(data);

        });
    };
    return userPieceService;
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

app.controller('extravagantPiecesCtrl', ['$scope', 'auth', 'userPiece', '$firebaseArray', '$rootScope',
    function($scope, auth, userPiece, $firebaseArray, $rootScope) {


    $scope.pieces = {};

    var pieces;


    userPiece.get(auth.getUserId()).then(function(res) {


        $scope.pieces = res.data;
        //pieces = res.data;




    });
    //console.log($scope.pieces.data);



    var source;


    $scope.playPiece = function(fileName)
    {
        context = new AudioContext();
        bufferLoader = new BufferLoader(
            context,
            [
               '../uploads/' + fileName
            ],
            finishedLoading	// this is the callback function - it's called after the file is loaded
                            // and is given an array of loaded buffer arrays as an argument
        );

        bufferLoader.load();
    }

    function finishedLoading(bufferList) {
     	// If you had more loops, you could
      	source = context.createBufferSource();
      	source.buffer = bufferList[0];
      	gain = context.createGain();
      	source.connect(gain);
      	gain.gain.value = 0.4;
      	gain.connect(context.destination);
      	source.start(0);
    }

    $scope.stopPiece = function()
    {
        source.stop();
    }

    $scope.sharePiece = function(fileName)
    {
        console.log("sharingPiece");
        console.log(fileName);
        console.log(auth.currentUser());


        var pieceInfo = {};
        pieceInfo.title = fileName;
        pieceInfo.composer = auth.currentUser();

        $rootScope.$emit('sharePiece', pieceInfo);
    }




}]);


app.controller('sharePiecesCtrl', ['$scope', '$firebaseArray', '$rootScope', function($scope, $firebaseArray, $rootScope) {

	var pieces = firebase.database().ref().child("pieces");
	$scope.masterpieces = $firebaseArray(pieces);

    console.log(pieces);
    console.log($scope.masterpieces);



	$scope.sharePiece = function()
	{
		//pieces.submitPiece();
		console.log($scope.title);
		console.log($scope.composer);

		$scope.masterpieces.$add({
			title: $scope.title,
			composer: $scope.composer
		});

		$scope.title = "";
		$scope.composer = "";
	};

    $rootScope.$on('sharePiece', function(event, data) {

        console.log(data);
        $scope.masterpieces.$add({
			title: data.title,
			composer: data.composer
		});
    });


}]);


/*
// create a factory to return a synchronized array of chat messages
app.factory("chatMessages", ["$firebaseArray", function($firebaseArray) {

	// create a reference to the database location where we will store our data
    var ref = firebase.database().ref().child("messages");

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
	}
]);
*/

/*
app.controller("ChatCtrl", ["$scope", "chatMessages", function($scope, chatMessages)
{

	// we pass our new chatMessages factory into controller
	$scope.user = "Guest " + Math.round(Math.random() * 100);

	// we add chatMessages array to the scope to be used in our ng-repeat
	$scope.messages = chatMessages;

	// a method to create new messages; called by ng-submit
	$scope.addMessage = function()
	{
		$scope.messages.$add({
			from: $scope.user,
			content: $scope.message,
			timestamp: firebase.database.ServerValue.TIMESTAMP
		});

		// rest the message input
		$scope.message = "";
	};

	// if the messages are empty, add something for fun!
	$scope.messages.$loaded(function() {
		if ($scope.messages.length === 0)
		{
			$scope.messages.$add({
				from: "Kelp Bot",
				content: "Welcome to Kelpshell!",
				timestamp: firebase.database.ServerValue.TIMESTAMP

			});
		}

	});



}]);
*/
