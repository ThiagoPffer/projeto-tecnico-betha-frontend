appModule.controller("cadastroOrdemController", function($scope, clienteService) {
    var emailCliente;
    var enderecoCliente;

    $scope.cliente = {};

    $scope.ordemservico = {
        "cliente": emailCliente 
    };

    var pesquisarCliente = function() {
        emailCliente = $scope.ordemservico.cliente;
        clienteService.getCliente(emailCliente).then(function(response) {
            $scope.cliente = response.data;
            enderecoCliente = $scope.cliente.endereco;
            console.log($scope.cliente);
            console.log(enderecoCliente);
            var toString = `${enderecoCliente.logradouro}, número ${enderecoCliente.numero}, bairro ${enderecoCliente.bairro}, ${enderecoCliente.cidade}, ${enderecoCliente.estado}`;
            $scope.cliente.endereco = toString;
        }, function(err) {
            console.log(err)
        });
    };

    $scope.pesquisar = function(keyCode) {
        if(keyCode === 13){
            pesquisarCliente();
        }
    }

});