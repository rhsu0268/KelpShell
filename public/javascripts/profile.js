var app = angular.module('profile', ["firebase"]);

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

app.controller("ProfileCtrl", ["$scope", "Profile", function($scope, Profile) {

    Profile("richardhsu").$bindTo($scope, "profile");

    

}]);
