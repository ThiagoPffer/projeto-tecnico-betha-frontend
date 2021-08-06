appModule.controller("sidemenuController", function($scope, funcionarioService, $location) {
    //FAZER UMA REQUISIÇÃO PRO BACKEND USANDO O EMAIL FORNECIDO NO LOGIN PARA TRAZER OS DADOS DE NOME E TIPO DE FUNCIONARIO - FEITO
    //GUARDAR ESTES DADOS NO LOCALSTORAGE - FEITO
    //IMPLEMENTAR OS LINKS EM CADA ITEM DO MENU
    //LIMPAR O LOCALSTORAGE AO FAZER LOGOUT

    var userData = funcionarioService.getFromLocalStorage();
    var currentPath = $location.path();

    if(!(userData === null)){
        $scope.userName = userData.nome;
        $scope.userType = userData.tipo;
    }

    $scope.logOut = function() {
        funcionarioService.clearLocalStorage();
        $location.path("/login");
    };

    $scope.isActive = function(path) {
        path.forEach(item => {
            if(item === currentPath){
                console.log("chegou aqui");
                return "active";
            }
        });
        console.log("mas aqui tambem")
        return "seila";
    };

});