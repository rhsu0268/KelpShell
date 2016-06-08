var app = angular.module('musicMixer', []);

var context = new AudioContext();
var osc = context.createOscillator();

app.controller('musicMixer', ['$scope', function($scope) {

	console.log("music mixer");



	$scope.generatePitch300 = function()
	{
		generatePitch(300);
		osc.start(0);
	}

	$scope.generatePitch350 = function()
	{
		generatePitch(350);
		osc.start(0);
	}

	$scope.stopPitch = function()
	{
		osc.stop();
	}
}]);

function generatePitch(pitch)
{
	//console.log(context);
	//console.log(osc);
	osc.frequency.value = pitch;
	osc.connect(context.destination);
}




