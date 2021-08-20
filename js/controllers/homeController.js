appModule.controller("homeController", function($scope, userData) {
    
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