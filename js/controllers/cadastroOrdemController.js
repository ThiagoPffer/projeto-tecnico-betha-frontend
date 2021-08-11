appModule.controller("cadastroOrdemController", function($location, $scope, clienteService, ordemServicoService) {

    $scope.showError = false;
    $scope.showEmailError = false;
    $scope.isClienteAvailable = false;

    var newOrdemServico = {
        "idCliente": undefined,
        "itens": [] 
    };

    $scope.searchEmail = function(keyCode) {
        if(keyCode === 13){
            if(isEmailValid($scope.searchInput)){
                $scope.showEmailError = false;
                searchCliente();
            } else {
                emailException("Você deve inserir um email válido");
            }
        }
    }

    $scope.addItem = function(item) {
        if(isFormularyValid(item)){
            pushNewItem(item);
        } else {
            genericException("Os dados do equipamento devem ser preenchidos corretamente!");
        }
    }

    $scope.submitOrdemServico = function() {
        if(isOrdemServicoValid()){
            insertNewOrdemServico();
            $location.path("/home");
        } else {
            genericException("Favor inserir todos os dados da ordem para lançá-la. A ordem deve conter um cliente e ao menos um equipamento cadastrado.");
        }
    }

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
    
    var insertNewOrdemServico = function() {
        ordemServicoService.insertOrdemServico(newOrdemServico).then(function(response) {
            clearComponents();
        }, function(err) {
            genericException(err.data.message);
        });
    }

    // UTILS

    var isEmailValid = function(searchInput) {
        if(searchInput != undefined && searchInput.email != "" && searchInput.email != undefined){
            return true;
        } else {
            $scope.isClienteAvailable = false;
            return false
        }
    }

    var isFormularyValid = function(item) {
        if(item != undefined){
            if(item.equipamento != undefined && item.descricao != undefined && item.descricao != undefined){
                if(item.descricao.length < 25 || item.avaria.length < 15){
                    return false;
                } else {
                    $scope.showError = false;
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false
        }
    }

    var isOrdemServicoValid = function() {
        if(newOrdemServico != undefined){
            if(newOrdemServico.idCliente != undefined && newOrdemServico.itens != undefined){
                if(newOrdemServico.itens.length != 0){
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    var emailException = function(message) {
        $scope.emailExceptionMessage = message;
        $scope.showEmailError = true;
        return true;
    }

    var genericException = function(message) {
        $scope.genericExceptionMessage = message;
        $scope.showError = true;
        return true;
    }

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
        $scope.isClienteAvailable = false;
    }

});