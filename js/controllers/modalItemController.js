appModule.controller("modalItemController", function($scope, $route, ordemServicoService, Popeye, itemData) {
    $scope.changedItem = angular.copy(itemData.item);
    
    $scope.closeModal = function() {
        Popeye.closeCurrentModal();
    }

    $scope.saveChanges = function(item) {
        ordemServicoService.setItem(item);
        $scope.closeModal();
        $route.reload()
    }
});