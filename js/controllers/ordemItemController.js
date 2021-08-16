appModule.controller("ordemItemController", function($location, $scope, $routeParams, ordemServicoService, properties) {
    var ordemServicoObj = ordemServicoService.getOrdemServicoObj();
    if(ordemServicoObj === undefined){
        $location.path("/ordens/"+$routeParams.idOrdem);
    }
    $scope.showImageError = false;
    $scope.showImageUploadError = false;
    $scope.uri = properties.imageBaseUrl;
    $scope.item = ordemServicoService.getItemById($routeParams.idItem);

    
    $scope.onDeleteImage = function(imagem) {
        ordemServicoService.deleteImage($routeParams.idOrdem, $routeParams.idItem, imagem.id).then(function(response) {
            var indexImg = $scope.item.imagens.indexOf(imagem);
            $scope.item.imagens.splice(indexImg, 1);
            if($scope.item.imagens.length === 0){
                $scope.showImageError = true;
            }
        },function(err) {
            console.log(err);
        });
    }

    $scope.onUploadImage = function() {
        var file = document.getElementById('itemImg').files[0];

        if(file === null || file === undefined){
            genericException("Selecione uma imagem antes de salvar!");
        }

        ordemServicoService.uploadImage($routeParams.idOrdem, $routeParams.idItem, file).then(function(response) { 
            $scope.showImageError = false;
            preparePreviewObject(response.headers());
            console.log(response);
        }, function(err) {
            console.log(err);
        });
    }

    if($scope.item.imagens.length === 0){
        $scope.showImageError = true;
    }

    if($scope.item.orcamento.toString().indexOf('.' < -1)){
        $scope.item.orcamento = $scope.item.orcamento + ",00";
    }
    $scope.item.orcamento = $scope.item.orcamento.toString().replace('.', ',');

    var preparePreviewObject = function(headers) {
        // let imgObj = {
        //     "id": undefined,
        //     "uri": 
        // }
        // $scope.item.imagens.push(imgObj);
        console.log(headers);
    }

    // ERROS 

    var genericException = function(message) {
        $scope.showImageUploadError = true;
        $scope.imageUploadErrorMessage = message;
    }
});