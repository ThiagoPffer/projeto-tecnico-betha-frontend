appModule.controller("ordemItemController", function($location, $scope, $routeParams, ordemServicoService, properties, Popeye) {
    
    // INIT

    var ordemServicoDTO;

    if(ordemServicoService.getOrdemServicoDTO() === undefined){
        $location.path("/ordens/"+$routeParams.idOrdem);
    } else{
        ordemServicoDTO = ordemServicoService.getOrdemServicoDTO();
    }

    // SCOPES

    $scope.showSavingError = false;
    $scope.canChangeItem = ordemServicoService.canObjectsBeChanged();
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
            templateUrl: "view/modal-item.html",
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

    // ERROS 

    var savingException = function(message) {
        $scope.showSavingError = true;
        $scope.savingErrorMessage = message;
    }

});