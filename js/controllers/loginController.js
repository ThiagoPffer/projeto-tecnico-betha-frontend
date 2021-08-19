appModule.controller("loginController", function($scope, $location, $route, loginService, funcionarioService) {
    
    $scope.showError = false;
    $scope.errorMessage = "";
    $scope.submit = function(funcionario) {
        formSubmit(funcionario);
    }
    
    var formSubmit = function(funcionario) {
        loginService.authenticate(funcionario).then(function(response) {
            const authToken = response.headers().authorization;
            localStorage.setItem("authToken", authToken);

            funcionarioService.getFuncionario(funcionario.email).then(function(response) {
                funcionarioService.sendToLocalStorage(response.data);
                $location.path("/home");
            }, function(err) {
                $scope.showError = true;
                $scope.errorMessage = "ERRO "+err.status+": "+err.data.message;
            });
            
        }, function(err) {
            $scope.showError = true;
            $scope.errorMessage = "ERRO "+err.status+": "+err.data.message;
        });
    }
});