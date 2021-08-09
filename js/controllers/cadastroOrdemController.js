appModule.controller("cadastroOrdemController", function($scope, clienteService, ordemService) {

    $scope.exibirErro = false;

    $scope.pesquisar = function(keyCode) {
        if(keyCode === 13){
            pesquisarCliente();
        }
    }

    $scope.adicionar = function(item) {
        adicionarItem(item);
    }

    $scope.enviar = function() {
        if(!isOrdemInvalida()){
            enviarOrdem();
        }
    }

    var pesquisarCliente = function() {
        clienteService.getCliente($scope.pesquisa.email).then(function(response) {
            $scope.cliente = response.data;
            ordemservico.idCliente = $scope.cliente.id; //CONSTRUÇAO OBJ ORDEM: SETANDO ID DO CLIENTE
            $scope.cliente.endereco = toStringEndereco($scope.cliente.endereco);
            
            console.log($scope.cliente);
            console.log(ordemservico);
            $scope.isClienteAvailable = true;
        }, function(err) {
            console.log(err) //TRATAR ERRO DE REQUISICAO EXIBINDO MENSAGEM NA TELA
            $scope.isClienteAvailable = false;
        });
    };

    var adicionarItem = function(item) {
        item.orcamento = 0.00;
        ordemservico.itens.push(angular.copy(item));
        delete($scope.item);

        $scope.ordemservico = ordemservico;
        console.log(ordemservico);
    }

    var enviarOrdem = function() {
        ordemService.insertOrdem(ordemservico).then(function(response) {
            console.log(response);
        }, function(err) {
            console.log(err);
        })
    }

    var toStringEndereco = function(enderecoCliente) {
        return `${enderecoCliente.logradouro}, número ${enderecoCliente.numero}, bairro ${enderecoCliente.bairro}, ${enderecoCliente.cidade}, ${enderecoCliente.estado}`;
    }

    var ordemservico = {
        "idCliente": undefined,
        "itens": [] 
    };


    var isOrdemInvalida = function() {
        if(ordemservico.idCliente === undefined || ordemservico.itens.length === 0){
            return erro("Favor inserir todos os dados da ordem para lançá-la. A ordem deve conter um cliente e ao menos um equipamento cadastrado.");
        } else {
            return false;
        }
    }

    var erro = function(message) {
        $scope.mensagemErro = message;
        $scope.exibirErro = true;
        return true;
    }

});