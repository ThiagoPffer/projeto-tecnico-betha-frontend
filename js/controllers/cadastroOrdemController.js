appModule.controller("cadastroOrdemController", function($location, $scope, clienteService, ordemServicoService) {

    $scope.showError = false;
    $scope.showItemError = false;
    $scope.showEmailError = false;
    $scope.isClienteAvailable = false;

    var newOrdemServico = { // DESFAZER VARIAVEL GLOBAL
        "idCliente": undefined,
        "itens": [] 
    };

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
            $location.path("/home");
        } else {
            genericException("Favor inserir todos os dados da ordem para lançá-la. A ordem deve conter um cliente e ao menos um equipamento cadastrado.");
        }
    }

    // OPERACOES

    var searchCliente = function() {
        clienteService.getCliente($scope.searchInput.email).then(function(response) {
            $scope.cliente = response.data;
            newOrdemServico.idCliente = $scope.cliente.id; //CONSTRUÇAO OBJ ORDEM: SETANDO ID DO CLIENTE
            $scope.cliente.endereco = toStringEndereco($scope.cliente.endereco);
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
        }, function(err) {
            genericException(err.data.message);
        });
    }

    // ERROS

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

    var toStringEndereco = function(enderecoCliente) {
        return `${enderecoCliente.logradouro}, número ${enderecoCliente.numero}, bairro ${enderecoCliente.bairro}, ${enderecoCliente.cidade}, ${enderecoCliente.estado}`;
    }

    var resetOrdemServico = function() {
        newOrdemServico = {
            "idCliente": undefined,
            "itens": [] 
        };
    }

    var clearComponents = function(){
        delete($scope.itens);
        delete($scope.cliente);
        delete($scope.searchInput);
        resetOrdemServico();
        $scope.showError = false;
        $scope.showEmailError = false;
        $scope.showItemError = false;
        $scope.isClienteAvailable = false;
    }

});