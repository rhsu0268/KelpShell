var app = angular.module('extravagantPieces', ['firebase']);


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




/*
app.controller('sharePiecesCtrl', ['$scope', '$compile', '$firebaseArray', function($scope, $compile, $firebaseArray) {


	var pieces = new Firebase('https://kelpshell.firebaseio.com/');
	//$scope.masterpieces = pieces.onPiecesChanged;

	$scope.masterpieces = $firebaseArray(pieces)


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






}]);
*/

/*
app.controller('sharePiecesCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

	var pieces = firebase.database().ref().child("pieces");
	$scope.masterpieces = $firebaseArray(pieces)



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


}]);
*/

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
