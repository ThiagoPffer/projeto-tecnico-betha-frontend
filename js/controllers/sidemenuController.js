appModule.controller("sidemenuController", function($scope, $location, funcionarioService, tokenService) {

    if(tokenService.getToken()===null){
        $location.path('/login');
    }

    var userData = funcionarioService.getFromLocalStorage();

    if(!(userData === null)){
        $scope.userName = userData.nome;
        $scope.userType = userData.tipo;
    }

    $scope.logOut = function() {
        funcionarioService.clearLocalStorage();
        $location.path("/login");
    };

    $scope.isPermitted = function() {
        if(userData.tipo === "ADMINISTRADOR"){
            return true;
        } else {
            return false;
        }
    }

});