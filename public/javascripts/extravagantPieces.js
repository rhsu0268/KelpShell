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
