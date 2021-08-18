appModule.controller("ordemDetailsController", function($location, $scope, $routeParams, $route, ordemServicoService, clienteService, loadOrdemServico, Popeye) {

    // INIT

    ordemServicoService.setOrdemServicoObj(loadOrdemServico.data);
    $scope.pageId = $routeParams.id;
    $scope.ordemServico = ordemServicoService.getOrdemServicoObj();
    $scope.canChangeComponent = ordemServicoService.canObjectsBeChanged();

    $scope.accessItem = function(idOrdem, idItem){
        $location.path("/ordens/"+idOrdem+"/itens/"+idItem);
    }

    $scope.setStatusColor = function(value) {
        return ordemServicoService.setStatusColor(value);
    }

    var loadCliente = function() {
        $scope.cliente = ordemServicoService.getOrdemServicoObj().cliente;
        $scope.cliente.endereco = clienteService.toStringEndereco($scope.cliente.endereco);
    }

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

    $scope.updateSituacao = function(situacao) {
        ordemServicoService.updateSituacao($routeParams.id, situacao).then(function(response) {
            $route.reload();
            alert("Ordem enviada para o cliente com sucesso!");
        }, function(err) {
            console.log(err);
        });
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

    // INIT

    loadCliente();
});