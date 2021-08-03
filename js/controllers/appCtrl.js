appModule.controller("appCtrl", function($scope, $http, $window) {
            
    var authToken = "";

    $scope.mensagemErro = "";
    $scope.display_none = "d-none";

    var login = function(funcionario) {
        $scope.display_none = "d-none";
        $http.post("http://localhost:8080/login", funcionario).then(function(response) {
            authToken =  response.headers().authorization;
            $window.location.href = "layout/src/home.html";
        }).catch(function(err) {
            showElement();
            $scope.mensagemErro = "ERRO: Email ou senha inválidos"; //VER COM O MICHEL
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