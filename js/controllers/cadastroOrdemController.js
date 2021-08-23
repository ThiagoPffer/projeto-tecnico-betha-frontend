appModule.controller("cadastroOrdemController", function($location, $scope, clienteService, ordemServicoService) {

    // INIT

    var newOrdemServico = ordemServicoService.getEmptyOrdemServicoDTO();

    // SCOPES

    $scope.searchEmail = function(keyCode) {
        if(keyCode === 13){
            if(ordemServicoService.isEmailValid($scope.searchInput)){
                $scope.showEmailError = false;
                searchCliente();
            } else {
                $scope.isClienteAvailable = false;
                emailException("Você deve inserir um email válido");
            }
        }
    }

    $scope.addItem = function(item) {
        if(ordemServicoService.isFormularyValid(item)){
            $scope.showItemError = false;
            pushNewItem(item);
        } else {
            itemException("Os dados do equipamento devem ser preenchidos corretamente!");
        }
    }

    $scope.submitOrdemServico = function() {
        if(ordemServicoService.isOrdemServicoValid(newOrdemServico)){
            insertNewOrdemServico(newOrdemServico);
        } else {
            genericException("Favor inserir todos os dados da ordem para lançá-la. A ordem deve conter um cliente e ao menos um equipamento cadastrado.");
        }
    }

    // OPERACOES

    var searchCliente = function() {
        clienteService.getCliente($scope.searchInput.email).then(function(response) {
            $scope.cliente = response.data;
            newOrdemServico.idCliente = $scope.cliente.id;
            $scope.cliente.endereco = clienteService.toStringEndereco($scope.cliente.endereco);
            $scope.isClienteAvailable = true;
        }, function(err) {
            emailException(err.data.message);
            $scope.isClienteAvailable = false;
        });
    };

    var pushNewItem = function(item) {
        item.orcamento = 0.00;
        newOrdemServico.itens.push(angular.copy(item));
        delete($scope.item);
        $scope.itens = newOrdemServico.itens;
    }
    
    var insertNewOrdemServico = function(newOrdemServico) {
        ordemServicoService.insertOrdemServico(newOrdemServico).then(function(response) {
            clearComponents();
            alert("Ordem de serviço criada com sucesso!");
            $location.path("/ordens");
        }, function(err) {
            genericException(err.data.message);
        });
    }

    // ERROS

    $scope.showError = false;
    $scope.showItemError = false;
    $scope.showEmailError = false;
    $scope.isClienteAvailable = false;

    var emailException = function(message) {
        $scope.emailExceptionMessage = message;
        $scope.showEmailError = true;
    }

    var itemException = function(message) {
        $scope.itemExceptionMessage = message;
        $scope.showItemError = true;
    }

    var genericException = function(message) {
        $scope.genericExceptionMessage = message;
        $scope.showError = true;
    }

    // UTILS

    var clearComponents = function(){
        delete($scope.itens);
        delete($scope.cliente);
        delete($scope.searchInput);
        newOrdemServico = ordemServicoService.getEmptyOrdemServicoDTO();
        $scope.showError = false;
        $scope.showEmailError = false;
        $scope.showItemError = false;
        $scope.isClienteAvailable = false;
    }

});