appModule.controller("ordemDetailsController", function($location, $scope, $routeParams, ordemServicoService, clienteService, loadOrdemServico) {
    $scope.pageId = $routeParams.id;

    $scope.accessItem = function(idOrdem, idItem){
        $location.path("/ordens/"+idOrdem+"/itens/"+idItem);
    }

    $scope.setStatusColor = function(value) {
        return ordemServicoService.setStatusColor(value);
    }

    $scope.ordemServico = loadOrdemServico.data;
    ordemServicoService.setOrdemServicoObj(loadOrdemServico.data);

    var loadCliente = function() {
        $scope.cliente = ordemServicoService.getOrdemServicoObj().cliente;
        $scope.cliente.endereco = clienteService.toStringEndereco($scope.cliente.endereco);
    }

    // ERROS

    var genericException = function(message) {
        $scope.showTableError = true;
        $scope.tableErrorMessage = message;
    }

    // INIT

    loadCliente();
});