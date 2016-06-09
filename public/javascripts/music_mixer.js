var app = angular.module('musicMixer', ['rzModule']);

var context;
var osc;

app.controller('musicMixer', ['$scope', function($scope) {

	console.log("music mixer");

	//var context = new AudioContext();
	//var osc = context.createOscillator();

	

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

		osc.disconnect(context.destination);
		osc.stop();

	};


	$scope.startPitch = function()
	{
		context = new AudioContext();
		osc = context.createOscillator()
		osc.connect(context.destination);
		osc.start(0);
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

	    		generatePitch(modelValue);
				//osc.start(0);
	    	}
  		}
	};
}]);

function generatePitch(pitch)
{
	//console.log(context);
	//console.log(osc);
	osc.frequency.value = pitch;
	//osc.connect(context.destination);
}




