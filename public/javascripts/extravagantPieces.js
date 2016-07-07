var app = angular.module('extravagantPieces', []);


function KelpShell(fbname)
{
	// create firebase reference
	var firebase = new Firebase("https://" + fbname + ".firebaseio.com/");

	this.firebase = firebase;

	var piecesRef = firebase.child('pieces');

	this.submitPiece = function(composer, title)
	{
		piecesRef.child(btoa(composer)).set({
			title: title

		});
	}
};


app.controller('sharePiecesCtrl', ['$scope', function($scope) {

	var pieces = new KelpShell('kelpshell');

	$scope.sharePiece = function()
	{
		//pieces.submitPiece();
		console.log($scope.title);
		console.log($scope.composer);
	}

}]);
