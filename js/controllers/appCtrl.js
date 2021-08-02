appModule.controller("appCtrl", function($scope, $http) {
            
    var authToken = "";

    $scope.mensagemErro = "";
    $scope.display_none = "d-none";

    var login = function(funcionario) {
        $scope.display_none = "d-none";
        $http.post("http://localhost:8080/login", funcionario).then(function(response) {
            var headers = response.headers();
            authToken = headers.authorization;

            console.log(authToken);

        }).catch(function(err) {
            showElement();
            $scope.mensagemErro = "ERRO: Email ou senha inválidos";
            console.log(err);
        });
    }

    var showElement = function(){
        $scope.display_none = " ";
    };

    $scope.logar = function(funcionario) {
        login(funcionario);
    }

});