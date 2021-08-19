appModule.controller("novoClienteController", function($location, $scope, clienteService) {
    
    $scope.showClienteError = false;

    $scope.submitNewCliente = function(cliente) {

        if(cliente === undefined){
            return clienteException("Insira todos os dados do cliente para cadastrar!");
        }

        clienteService.insertCliente(cliente).then(function(response) {
            showClienteError = false;
            $location.path("/clientes/");
            alert("Cliente "+cliente.nome+" criado com sucesso! Email: "+cliente.email);
        }, function (err) {
            if(err.data.status === 422){
                let fields = [];
                err.data.errors.forEach(error => {
                    fields.push(error.fieldName);
                });
                fieldsException(fields);
            }else{
                console.log(err.data);
                clienteException(err.data.message);
            }
        });
    }

    // ERROS

    var fieldsException = function(fields) {
        let message = "Preencha os seguintes campos: " + fields;
        $scope.showClienteError = true;
        $scope.clienteErrorMessage = message;
    }

    var clienteException = function(message) {
        $scope.showClienteError = true;
        $scope.clienteErrorMessage = message;
    }
});