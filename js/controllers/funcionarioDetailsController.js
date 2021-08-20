appModule.controller("funcionarioDetailsController", function($location, $scope, funcionarioService, loadFuncionario) {

    $scope.funcionario = loadFuncionario.data;
    $scope.nomeFuncionario = loadFuncionario.data.nome
    $scope.goBack = function() {
        $location.path("/funcionarios");
    }

    $scope.tiposFuncionario = ["ADMINISTRADOR", "TECNICO", "RECEPCIONISTA"];

    $scope.onSubmitFuncionarioChanges = function(funcionario, idFuncionario){
        if(funcionario === undefined){
            return funcionarioException("Insira todos os dados do funcionário para modificar!");
        } else {
            let funcionarioDTO = {
                "nome": funcionario.nome,
                "email": funcionario.email,
                "tipo": funcionario.tipo
            };
            console.log(idFuncionario);
            submitFuncionarioChanges(funcionarioDTO, idFuncionario);
        }
    }

    var submitFuncionarioChanges = function(funcionario, idFuncionario) {
        funcionarioService.updateFuncionario(funcionario, idFuncionario).then(function(response) {
            showFuncionarioError = false;
            $location.path("/funcionarios/");
            alert("Funcionário "+funcionario.nome+" modificado com sucesso! Email: "+funcionario.email);
        }, function (err) {
            if(err.data.status === 422){
                let fields = [];
                err.data.errors.forEach(error => {
                    fields.push(error.fieldName);
                });
                fieldsException(fields);
            }else{
                console.log(err.data);
                funcionarioException(err.data.message);
            }
        });
    }

    // ERROS

    var fieldsException = function(fields) {
        let message = "Preencha os seguintes campos: " + fields;
        $scope.showFuncionarioError = true;
        $scope.funcionarioErrorMessage = message;
    }

    var funcionarioException = function(message) {
        $scope.showFuncionarioError = true;
        $scope.funcionarioErrorMessage = message;
    }

});