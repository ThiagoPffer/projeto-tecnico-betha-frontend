appModule.controller("ordemItemController", function($location, $scope, $routeParams, ordemServicoService) {
    var ordemServicoObj = ordemServicoService.getOrdemServicoObj();
    if(ordemServicoObj === undefined){
        $location.path("/ordens/"+$routeParams.idOrdem);
    }

    $scope.item = ordemServicoService.getItemById($routeParams.idItem);


    if($scope.item.orcamento.toString().indexOf('.' < -1)){
        $scope.item.orcamento = $scope.item.orcamento + ",00";
    }
    $scope.item.orcamento = $scope.item.orcamento.toString().replace('.', ',');
});