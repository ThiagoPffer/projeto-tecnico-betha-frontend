appModule.controller("ordemDetailsController", function($location, $scope, $routeParams, ordemServicoService, clienteService) {
    $scope.pageId = $routeParams.id;

    $scope.statusColor = function(value) {
        if(value === "EM_ANALISE" || value === "AGUARDANDO_DECISAO" || value === "PENDENTE"){
            return "yellow";
        } else if(value === "CANCELADA" || value === "CANCELADO"){
            return "red"
        } else if(value === "APROVADA" || value === "CONCLUIDA" || value === "PAGO"){
            return "green"
        }
    }

    var loadEquipamentos = function() {
        ordemServicoService.getOneOrdemServico($scope.pageId).then(function(response) {
            $scope.ordemServico = response.data;
            loadCliente($scope.ordemServico.cliente.id);
            console.log(response);
        },function(err) {
            if(err.data.status === 404){
                $location.path("/erro");
            } else {
                genericException(err.data.message);
            }
            console.log(err);
        })
    }

    var loadCliente = function(idCliente) {
        clienteService.getClienteById(idCliente).then(function(response) {
            $scope.cliente = response.data;
            $scope.cliente.endereco = clienteService.toStringEndereco($scope.cliente.endereco);
            console.log(response);
        },function(err) {
            if(err.data.status === 404){
                $location.path("/erro");
            } else {
                genericException(err.data.message);
            }
            console.log(err);
        })
    }

    var genericException = function(message) {
        $scope.showTableError = true;
        $scope.tableErrorMessage = message;
    }

    loadEquipamentos();
});