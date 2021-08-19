appModule.controller("homeController", function($scope, userData) {
    
    $scope.isPermitted = function() {
        if(userData.tipo === "ADMINISTRADOR" || userData.tipo === "RECEPCIONISTA"){
            return true;
        } else {
            return false;
        }
    }
});