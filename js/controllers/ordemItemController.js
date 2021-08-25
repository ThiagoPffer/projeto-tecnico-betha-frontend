appModule.controller("ordemItemController", function($location, $scope, $routeParams, ordemServicoService, properties, Popeye, userData) {
    
    // INIT

    var ordemServicoDTO;

    if(ordemServicoService.getOrdemServicoDTO() === undefined){
        $location.path("/ordens/"+$routeParams.idOrdem);
    } else{
        ordemServicoDTO = ordemServicoService.getOrdemServicoDTO();
    }

    // SCOPES

    $scope.showSavingError = false;
    $scope.canChangeComponent = ordemServicoService.canObjectsBeChanged();
    $scope.uri = properties.imageBaseUrl;
    $scope.item = ordemServicoService.getItemById($routeParams.idItem);
    
    // OPERAÇÕES

    $scope.onSaveAllChanges = function(item) {
        ordemServicoService.setItem(item);
        let ordemServicoDTO = ordemServicoService.getOrdemServicoDTO();
        ordemServicoService.updateOrdemServico(ordemServicoDTO).then(function(response) {
            $location.path('ordens/'+$routeParams.idOrdem)
        }, function(err) {
            savingException(err.message);
        });
    }

    $scope.onCancelChanges = function() {
        $location.path('/ordens/'+$routeParams.idOrdem);
    }

    // MODAL

    $scope.openModalItem = function() {
        var modalItem = Popeye.openModal({
            templateUrl: "view/modalItemDetails.html",
            controller: "modalItemController",
            resolve: {
                itemData: function() {
                    return {
                        item: $scope.item,
                        idItem: $routeParams.idItem,
                        idOrdem: $routeParams.idOrdem
                    }
                }
            }
        });
    }

    // VERIFICACOES

    $scope.isPermitted = function() {
        if(userData.tipo === "ADMINISTRADOR" || userData.tipo === "TECNICO"){
            return true;
        } else {
            return false;
        }
    }

    // ERROS 

    var savingException = function(message) {
        $scope.showSavingError = true;
        $scope.savingErrorMessage = message;
    }

});