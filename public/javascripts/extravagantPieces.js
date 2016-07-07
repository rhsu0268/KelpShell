var app = angular.module('extravagantPieces', []);


function KelpShell(fbname)
{
	this.firebase = new Firebase("https://" + fbname + ".firebaseio.com/");
}
