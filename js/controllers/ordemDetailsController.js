appModule.controller("ordemDetailsController", function($location, $scope, $routeParams, $route, ordemServicoService, clienteService, loadOrdemServico, Popeye) {

    // INIT

    ordemServicoService.setOrdemServicoObj(loadOrdemServico.data);
    $scope.pageId = $routeParams.id;
    $scope.ordemServico = ordemServicoService.getOrdemServicoObj();

    $scope.canChangeComponent = ordemServicoService.canObjectsBeChanged();

    var loadCliente = function() {
        $scope.cliente = ordemServicoService.getOrdemServicoObj().cliente;
        $scope.cliente.endereco = clienteService.toStringEndereco($scope.cliente.endereco);
    }

    loadCliente();

    // OPERACOES

    $scope.accessItem = function(idOrdem, idItem){
        $location.path("/ordens/"+idOrdem+"/itens/"+idItem);
    }

    $scope.setStatusColor = function(value) {
        return ordemServicoService.setStatusColor(value);
    }

    $scope.updateSituacao = function(situacao) {
        ordemServicoService.updateSituacao($routeParams.id, situacao).then(function(response) {
            $route.reload();
            alert("A situação da ordem foi alterada para " + situacao);
        }, function(err) {
            console.log(err);
        });
    }

    // MODAL

    $scope.openImageModal = function(idItem) {
        var modalImage = Popeye.openModal({
            templateUrl: "view/modal-image.html",
            controller: "modalImageController",
            resolve: {
                imageData: function() {
                    return {
                        item: ordemServicoService.getItemById(idItem),
                        idItem: idItem,
                        idOrdem: $routeParams.id
                    }
                }
            }
        });
    }

    $scope.openCancelConfirmationModal = function(idItem) {
        var modalCancelConfirmation = Popeye.openModal({
            templateUrl: "view/modal-cancel-confirmation.html",
            controller: "modalCancelConfirmationController",
            resolve: {
                modalCancelData: function() {
                    return {
                        idOrdem: $routeParams.id
                    }
                }
            }
        });
    }

    // VERIFICAOES

    $scope.canCancelOrdemServico = function() {
        if(ordemServicoService.getSituacaoOrdemServico() != "EM_ANALISE"){
            return false;
        } else {
            return true;
        }
    }

    $scope.canFinishOrdemServico = function() {
        if(ordemServicoService.getSituacaoOrdemServico() != "APROVADA"){
            return false;
        } else {
            return true;
        }
    }
    
    $scope.isEmailCheckboxActivated = function() {
        var checkBox = document.getElementById('email-check');
        return checkBox.checked
    }

    // ERROS

    var genericException = function(message) {
        $scope.showTableError = true;
        $scope.tableErrorMessage = message;
    }

});