var app = angular.module('extravagantPieces', []);


function KelpShell(fbname)
{
	// create firebase reference
	this.firebase = new Firebase("https://" + fbname + ".firebaseio.com/");
}
