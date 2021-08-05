appModule.controller("sidemenuController", function($scope, funcionarioService, config) {
    //FAZER UMA REQUISIÇÃO PRO BACKEND USANDO O EMAIL FORNECIDO NO LOGIN PARA TRAZER OS DADOS DE NOME E TIPO DE FUNCIONARIO
    //GUARDAR ESTES DADOS NO LOCALSTORAGE
    //LIMPAR O LOCALSTORAGE AO FAZER LOGOUT

    var userData = funcionarioService.getFromLocalStorage();

    if(!(userData === null)){
        $scope.userName = userData.nome;
        $scope.userType = userData.tipo;
    }

    var verificaTela = function() {
        console.log("teste");
        return funcionarioService.getFromLocalStorage() != null;
    };

});