app.controller('uploadCtrl', ['Upload', '$window', function(Upload, $window) {

    var fileUpload = this;

    // function to call on form submit

    fileUpload.submit = function()
    {
        console.log("Submitted!");
        // check if form is valid
        if (fileUpload.upload_form.file.$valid && fileUpload.file)
        {
            // call the upload function
            fileUpload.upload(fileUpload.file);
        }
    }

    fileUpload.upload = function(file)
    {
        Upload.upload({

            url: 'http://localhost:3000/upload',
            data: {file: file}
        }).then(function (resp) {

            if (resp.data.error_code == 0)
            {
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            }
            else
            {
                $window.alert('an error occured');
            }
            }, function (resp)
                {
                    console.log('Error status: ' + resp.status);
                    $window.alert('Error status: ' + resp.status);
            }, function (evt)
                {
                    console.log(evt);
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    fileUpload.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            }
        );
    };


}]);
