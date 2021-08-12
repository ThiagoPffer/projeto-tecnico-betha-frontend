appModule.controller("ordemDetailsController", function($scope, $routeParams, ordemServicoService, clienteService) {
    $scope.pageId = $routeParams.id;

    $scope.setStatusColor = function(value) {
        return ordemServicoService.setStatusColor(value);
    }

    var loadEquipamentos = function() {
        ordemServicoService.getOneOrdemServico($scope.pageId).then(function(response) {
            $scope.ordemServico = response.data;
            ordemServicoService.setOrdemServicoObj(response.data);
            loadCliente();
        }, function(err) {
            genericException(err.data.message);
        });
    }

    var loadCliente = function() {
        $scope.cliente = $scope.ordemServico.cliente;
        $scope.cliente.endereco = clienteService.toStringEndereco($scope.cliente.endereco);
    }

    // ERROS

    var genericException = function(message) {
        $scope.showTableError = true;
        $scope.tableErrorMessage = message;
    }

    // LOADING

    loadEquipamentos();

});