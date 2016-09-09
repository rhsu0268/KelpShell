
app.factory('userPiece', ['$http', function($http) {


    //var fetchedUserInfo;
    var userPieceService = {
        userPieces: []
    };

    //var self = this;

    userPieceService.get = function(userId)
    {
        return $http.get('/pieces/' + userId).success(function(res) {


            //angular.copy(res.data, userInfoService.userInfo);
            //console.log(userInfoService.userInfo);
            //self.setUserInfo(res.data);
            console.log(res.data);

        });
    };

    userPieceService.save = function(piece)
    {
        return $http.post('/pieces', piece).success(function (data) {

            //userInfoService.userInfo.push(data);
            console.log(data);

        });
    };
    return userPieceService;
}]);



app.controller('uploadCtrl', ['Upload', '$window', 'auth', 'userPiece', function(Upload, $window, auth, userPiece) {

    var fileUpload = this;

    // function to call on form submit

    fileUpload.submit = function()
    {
        console.log("Submitted!");
        // check if form is valid

        console.log(auth.getUserId());
        fileUpload.file.userFileId = auth.getUserId();
        console.log(fileUpload.file);
        if (fileUpload.upload_form.file.$valid && fileUpload.file)
        {
            // call the upload function
            fileUpload.upload(fileUpload.file);
        }
    }

    fileUpload.upload = function(file)
    {


        console.log(file);

        var piece = {};

        Upload.upload({

            url: 'http://localhost:3000/upload/' + file.userFileId,
            data: {file: file}
            //$http.post('/register', user)
        }).then(function (resp) {

            if (resp.data.error_code == 0)
            {
                console.log(resp);
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                piece.user = auth.getUserId();
                piece.fileName = resp.data.fileName;
                console.log(piece);
                userPiece.save(piece);

            }
            else
            {
                $window.alert('an error occured');
            }
            }, function (resp)
                {
                    //console.log('Error status: ' + resp.status);
                    $window.alert('Error status: ' + resp.status);
            }, function (evt)
                {
                    //console.log(evt);
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    fileUpload.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            }
        );
    };


}]);
