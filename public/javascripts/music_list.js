function KelpShell(fbname)
{
	this.firebase = new Firebase("https://" + fbname + ".firebaseio.com/");
}