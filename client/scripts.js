angular.module('fileUpload', ['ngFileUpload']);

angular.module('fileUpload').controller('FileControllerCtrl', function ($scope, $http) {
    $scope.clearView = function () {
        $scope.displayFiles = false;
        $scope.uploadfile = false;
    }
    $scope.getAllFiles = function () {
        $scope.displayFiles = true;
        $scope.uploadfile = false;
        console.log('calling getAllFiles');
        $http.get('http://localhost:3000/getAllFiles').then(function (value) {
            console.log(value.data);
            $scope.fileData = value.data;
        }); // end of get
    };
    $scope.uploadFile = function () {
        $scope.uploadfile = true;
        $scope.displayFiles = false;
        console.log('calling uploadFile');
    };
    $scope.submitForm = function () {
        $scope.uploadfile = true;
        $scope.displayFiles = false;
        console.log('calling submitForm');
        var file = $scope.myFile;
        console.log('file is '+file);
        console.dir(file);
    };
});