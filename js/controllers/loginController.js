appModule.controller("loginController", function($scope, $location, login) {
            
    $scope.mensagemErro = "";
    $scope.display_none = "d-none";
    $scope.submit = function(funcionario) {
        formSubmit(funcionario);
    }
    
    var formSubmit = function(funcionario) {
        $scope.display_none = "d-none";
        login.authenticate(funcionario).then(function(response) {
            const authToken = response.headers().authorization;
            localStorage.setItem("authToken", authToken);
            $location.path("/home");
        }, function(err) {
            showElement();
            $scope.mensagemErro = "ERRO "+err.status+": "+err.data.message;
            console.log(err);
        });
    }

    var showElement = function(){
        $scope.display_none = " ";
    };
});