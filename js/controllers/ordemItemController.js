appModule.controller("ordemItemController", function($location, $scope, $routeParams, ordemServicoService, properties) {
    var ordemServicoObj = ordemServicoService.getOrdemServicoObj();
    if(ordemServicoObj === undefined){
        $location.path("/ordens/"+$routeParams.idOrdem);
    }
    $scope.showImageError = false;
    $scope.uri = properties.imageBaseUrl;
    $scope.item = ordemServicoService.getItemById($routeParams.idItem);

    
    $scope.add = function() {
        var f = document.getElementById('itemImg').files[0],
            r = new FileReader();
    
        r.onloadend = function(e) {
            var data = e.target.result;
            ordemServicoService.uploadImage($routeParams.idOrdem, $routeParams.idItem, data).then(function(response) {
                console.log(response);
            }, function(err) {
                console.log(err);
            });
        }
    
        r.readAsBinaryString(f);
    }


    if($scope.item.imagens.length === 0){
        $scope.showImageError = true;
    }

    if($scope.item.orcamento.toString().indexOf('.' < -1)){
        $scope.item.orcamento = $scope.item.orcamento + ",00";
    }
    $scope.item.orcamento = $scope.item.orcamento.toString().replace('.', ',');
});