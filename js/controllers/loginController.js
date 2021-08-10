appModule.controller("loginController", function($scope, $location, login, funcionarioService) {
            
    $scope.mensagemErro = "";
    $scope.display_none = "d-none";
    $scope.submit = function(funcionario) {
        formSubmit(funcionario);
    }
    $scope.showError = false;
    
    var formSubmit = function(funcionario) {
        $scope.display_none = "d-none";
        login.authenticate(funcionario).then(function(response) {
            const authToken = response.headers().authorization;
            localStorage.setItem("authToken", authToken);

            funcionarioService.getFuncionario(funcionario.email).then(function(response) {
                funcionarioService.sendToLocalStorage(response.data);
                $location.path("/home");
            }, function(err) {
                $scope.showError = true;
                $scope.mensagemErro = "ERRO "+err.status+": "+err.data.message;
            });
            
        }, function(err) {
            showElement();
            $scope.mensagemErro = "ERRO "+err.status+": "+err.data.message;
        });
    }
});