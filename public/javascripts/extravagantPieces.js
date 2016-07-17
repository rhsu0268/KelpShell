var app = angular.module('extravagantPieces', ['firebase']);

/*
function KelpShell(fbname)
{
	// create firebase reference
	var firebase = new Firebase("https://" + fbname + ".firebaseio.com/");

	this.firebase = firebase;

	var piecesRef = firebase.child('pieces');

	this.submitPiece = function(composer, title)
	{
		console.log("composer" + composer);
		console.log("title" + title);

		piecesRef.child().set({
			title: title,
			composer: composer

		});
	};

	this.onPiecesChanged = function() {};

	piecesRef.on('value', function(snapshot) {
		var pieces = snapshot.val();
		console.log(pieces);
		var preparedPieces = [];

		for (var title in pieces)
		{
			if (pieces.hasOwnProperty(title))
			{
				preparedPieces.push({
					title: pieces[title].title
				})
			}
		}
		console.log(preparedPieces);
		this.onPiecesChanged(preparedPieces);
	}.bind(this));

};
*/



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

// create a factory to return a synchronized array of chat messages
app.factory("chatMessages", ["$firebaseArray", function($firebaseArray) {

	// create a reference to the database location where we will store our data
    var ref = firebase.database().ref();

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
	}
]);


app.controller("ChatCtrl", ["$scope", "chatMessages", function($scope, chatMessages)
{

	// we pass our new chatMessages factory into controller
	/*
	$scope.user = "Guest " + Math.round(Math.random() * 100);

	// we add chatMessages array to the scope to be used in our ng-repeat
	$scope.messages = chatMessages;

	// a method to create new messages; called by ng-submit
	$scope.addMessage = function()
	{
		$scope.messages.$add({
			from: $scope.user,
			content: $scope.message
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
				content: "Welcome to Kelpshell!"

			});
		}

	});
	*/


}]);
