appModule.controller("cadastroOrdemController", function($location, $scope, clienteService, ordemService) {

    $scope.showError = false;
    $scope.showEmailError = false;
    $scope.isClienteAvailable = false;

    var ordemservico = {
        "idCliente": undefined,
        "itens": [] 
    };

    $scope.pesquisar = function(keyCode) {
        if(keyCode === 13){
            if(isEmailValido($scope.pesquisa)){
                $scope.showEmailError = false;
                pesquisarCliente();
            } else {
                erroEmail("Você deve inserir um email válido");
            }
        }
    }

    $scope.adicionar = function(item) {
        if(isFormularioValido(item)){
            adicionarItem(item);
        } else {
            erro("Os dados do equipamento devem ser preenchidos corretamente!");
        }
    }

    $scope.enviar = function() {
        if(!isOrdemInvalida()){
            enviarOrdem();
            $location.path("/home");
        }
    }

    var pesquisarCliente = function() {
        clienteService.getCliente($scope.pesquisa.email).then(function(response) {
            $scope.cliente = response.data;
            ordemservico.idCliente = $scope.cliente.id; //CONSTRUÇAO OBJ ORDEM: SETANDO ID DO CLIENTE
            $scope.cliente.endereco = toStringEndereco($scope.cliente.endereco);
            $scope.isClienteAvailable = true;
        }, function(err) {
            erroEmail(err.data.message);
            $scope.isClienteAvailable = false;
        });
    };

    var adicionarItem = function(item) {
        item.orcamento = 0.00;
        ordemservico.itens.push(angular.copy(item));
        delete($scope.item);
        $scope.ordemservico = ordemservico;
    }

    var enviarOrdem = function() {
        ordemService.insertOrdem(ordemservico).then(function(response) {
            limparTela();
        }, function(err) {
            erro(err.data.message);
        })
    }

    // UTILS

    var isEmailValido = function(pesquisa) {
        if(pesquisa != undefined && pesquisa.email != "" && pesquisa.email != undefined){
            return true;
        } else {
            $scope.isClienteAvailable = false;
            return false
        }
    }

    var isFormularioValido = function(item) {
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

    var toStringEndereco = function(enderecoCliente) {
        return `${enderecoCliente.logradouro}, número ${enderecoCliente.numero}, bairro ${enderecoCliente.bairro}, ${enderecoCliente.cidade}, ${enderecoCliente.estado}`;
    }

    var isOrdemInvalida = function() {
        if(ordemservico.idCliente === undefined || ordemservico.itens.length === 0){
            return erro("Favor inserir todos os dados da ordem para lançá-la. A ordem deve conter um cliente e ao menos um equipamento cadastrado.");
        } else {
            return false;
        }
    }

    var erroEmail = function(message) {
        $scope.mensagemErroEmail = message;
        $scope.showEmailError = true;
        return true;
    }

    var erro = function(message) {
        $scope.mensagemErro = message;
        $scope.showError = true;
        return true;
    }

    var resetOrdemServico = function() {
        ordemservico = {
            "idCliente": undefined,
            "itens": [] 
        };
    }

    var limparTela = function(){
        delete($scope.ordemservico);
        delete($scope.cliente);
        delete($scope.pesquisa);
        resetOrdemServico();
        $scope.showError = false;
        $scope.isClienteAvailable = false;
    }

});