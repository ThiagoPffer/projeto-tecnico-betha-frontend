appModule.controller("clienteDetailsController", function($location, $scope, clienteService, loadCliente, userData) {

    $scope.cliente = loadCliente.data;
    $scope.nomeCliente = loadCliente.data.nome
    $scope.goBack = function() {
        $location.path("/clientes");
    }

    $scope.onSubmitClienteChanges = function(cliente, idCliente){
        if(cliente === undefined){
            return clienteException("Insira todos os dados do cliente para cadastrar!");
        } else {
            let clienteDTO = {
                "nome": cliente.nome,
                "email": cliente.email,
                "telefone": cliente.telefone,
                "logradouro": cliente.endereco.logradouro,
                "numero": cliente.endereco.numero,
                "bairro": cliente.endereco.bairro,
                "cidade": cliente.endereco.cidade,
                "estado": cliente.endereco.estado
            };
            console.log(idCliente);
            submitClienteChanges(clienteDTO, idCliente);
        }
    }

    var submitClienteChanges = function(cliente, idCliente) {
        clienteService.updateCliente(cliente, idCliente).then(function(response) {
            showClienteError = false;
            $location.path("/clientes/");
            alert("Cliente "+cliente.nome+" modificado com sucesso! Email: "+cliente.email);
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

    // VERIFICACOES

    $scope.isNotTecnico = function() {
        if(userData.tipo != "TECNICO"){
            return true;
        } else {
            return false;
        }
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