appModule.controller("homeController", function($scope, token) {
    console.log(token.getToken() != null);
    
    $scope.teste = function() {
        token.verifyToken().then(function(response) {
            console.log(response);
        }, function(err) {
            console.log(err);
        });
    }
});