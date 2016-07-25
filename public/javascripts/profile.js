var app = angular.module('KelpShell', ["firebase"]);

app.factory("Profile", ["$firebaseObject", function($firebaseObject) {

    return function(username)
    {
        // create a reference to the database node where we will store our data
        var ref = firebase.database().ref("rooms").push();
        var profileRef = ref.child(username);

        // return it as a synchronized object
        return $firebaseObject(profileRef);
    }

}]);

app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
}]);

app.controller("ProfileCtrl", ["$scope", "Profile", "Auth", function($scope, Profile, Auth) {

    Profile("richardhsu").$bindTo($scope, "profile");

    if (Auth.currentUser)
    {
        console.log(Auth.currentUser);
    }
    else {
        console.log("null");
    }

}]);
