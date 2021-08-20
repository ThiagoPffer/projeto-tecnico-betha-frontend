appModule.controller('forgotController', function($scope, $location, loginService) {
    $scope.goBack = function() {
        $location.path('/login');
    }

    $scope.submitPasswordEmail = function(emailObj) {
        loginService.forgotPassword(emailObj).then(function(response) {
            alert("Um email com a nova senha foi enviado para: "+emailObj.email);
            $location.path('/login');
        }, function(err) {
            alert("O email inserido é inválido!");
            console.log(err);
        })
    }
});