appModule.controller("novoFuncionarioController", function($location, $scope, funcionarioService) {
    
    $scope.showFuncionarioError = false;
    $scope.goHome = function() {
        return $location.path("/home");
    }
    $scope.tiposFuncionario = ["ADMINISTRADOR", "TECNICO", "RECEPCIONISTA"];
    
    $scope.submitNewFuncionario = function(funcionario) {

        if(funcionario === undefined){
            return funcionarioException("Insira todos os dados do funcionário para cadastrar!");
        }

        funcionarioService.insertFuncionario(funcionario).then(function(response) {
            showFuncionarioError = false;
            $location.path("/funcionarios/");
            alert("Funcionário "+funcionario.nome+" criado com sucesso! Email: "+funcionario.email);
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