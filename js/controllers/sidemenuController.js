appModule.controller("sidemenuController", function($scope, $location, funcionarioService, tokenService) {

    if(tokenService.getToken()===null){
        $location.path('/login');
    }

    var userData = funcionarioService.getFromLocalStorage();
    $scope.idUser = userData.id;
    
    if(!(userData === null)){
        $scope.userName = userData.nome;
        $scope.userType = userData.tipo;
    }

    $scope.logOut = function() {
        funcionarioService.clearLocalStorage();
        $location.path("/login");
    };

    // VERIFICACOES

    $scope.isAdministrador = function() {
        if(userData.tipo === "ADMINISTRADOR"){
            return true;
        } else {
            return false;
        }
    }

    $scope.isNotTecnico = function() {
        if(userData.tipo != "TECNICO"){
            return true;
        } else {
            return false;
        }
    }

});