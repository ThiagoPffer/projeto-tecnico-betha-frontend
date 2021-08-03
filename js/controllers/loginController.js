appModule.controller("loginController", function($scope, $location, login) {
            
    $scope.mensagemErro = "";
    $scope.display_none = "d-none";
    $scope.submit = function(funcionario) {
        formSubmit(funcionario);
    }
    
    var formSubmit = function(funcionario) {
        $scope.display_none = "d-none";
        login.authenticate(funcionario).then(function(response) {
            const authToken = response.headers().authorization;
            localStorage.setItem("authToken", authToken);
            $location.path("/home");
        }).catch(function(err) {
            showElement();
            $scope.mensagemErro = "ERRO: Email ou senha inválidos"; //VER COM O MICHEL
            console.log(err);
        });
    }

    var showElement = function(){
        $scope.display_none = " ";
    };
});