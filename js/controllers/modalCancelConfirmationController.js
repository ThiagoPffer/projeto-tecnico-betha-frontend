appModule.controller("modalCancelConfirmationController", function($scope, $route, Popeye, ordemServicoService, modalCancelData) {
    $scope.closeModal = function() {
        Popeye.closeCurrentModal();
    }

    $scope.updateSituacao = function(situacao) {
        ordemServicoService.updateSituacao(modalCancelData.idOrdem, situacao).then(function(response) {
            $route.reload();
            alert("A situação da ordem foi alterada para " + situacao);
            $scope.closeModal();
        }, function(err) {
            alert(err.message);
        });
    }
});