appModule.controller("sidemenuController", function($scope, funcionarioService, $location, token) {
    //FAZER UMA REQUISIÇÃO PRO BACKEND USANDO O EMAIL FORNECIDO NO LOGIN PARA TRAZER OS DADOS DE NOME E TIPO DE FUNCIONARIO - FEITO
    //GUARDAR ESTES DADOS NO LOCALSTORAGE - FEITO
    //IMPLEMENTAR OS LINKS EM CADA ITEM DO MENU
    //LIMPAR O LOCALSTORAGE AO FAZER LOGOUT

    if(token.getToken()===null){
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

});