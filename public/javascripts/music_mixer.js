var app = angular.module('musicMixer', ['rzModule']);

var context = new AudioContext();
var osc = context.createOscillator();

app.controller('musicMixer', ['$scope', function($scope) {

	console.log("music mixer");



	$scope.generatePitch300 = function()
	{
		//osc.stop();

		generatePitch(300);
		osc.start(0);
	};

	$scope.generatePitch350 = function()
	{
		//osc.stop();

		generatePitch(350);
		osc.start(0);
	};

	$scope.stopPitch = function()
	{
		osc.stop();
	};

	$scope.slider = {
  		value: 150,
  		options: {
	  		step: 20,
	    	floor: 300,
	    	ceil: 700,
	    	onChange: function(sliderId, modelValue, highValue, pointerType)
	    	{
	    		console.log(modelValue);
	    	}
  		}
	};
}]);

function generatePitch(pitch)
{
	//console.log(context);
	//console.log(osc);
	osc.frequency.value = pitch;
	osc.connect(context.destination);
}




