appModule.controller("cadastroOrdemController", function($scope, clienteService, ordemService) {

    $scope.pesquisar = function(keyCode) {
        if(keyCode === 13){
            pesquisarCliente();
        }
    }

    var pesquisarCliente = function() {
        clienteService.getCliente($scope.pesquisa.email).then(function(response) {
            $scope.cliente = response.data;
            ordemservico.idCliente = $scope.cliente.id; //CONSTRUÇAO OBJ ORDEM: SETANDO ID DO CLIENTE
            $scope.cliente.endereco = toStringEndereco($scope.cliente.endereco);
            
            console.log($scope.cliente);
            console.log(ordemservico);
        }, function(err) {
            console.log(err) //TRATAR ERRO DE REQUISICAO EXIBINDO MENSAGEM NA TELA
        });
    };

    $scope.adicionarItem = function(item) {
        item.orcamento = 0.00;
        ordemservico.itens.push(item);
        console.log(ordemservico);
    }

    $scope.enviarOrdem = function() {
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
});