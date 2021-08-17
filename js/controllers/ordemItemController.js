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
            verifyImageList();
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
            $scope.item.imagens.push(response.data);
        }, function(err) {
            console.log(err);
        });
    }

    // ERROS 

    var verifyImageList = function() {
        if($scope.item.imagens.length === 0){
            $scope.showImageError = true;
        }
    }

    var genericException = function(message) {
        $scope.showImageUploadError = true;
        $scope.imageUploadErrorMessage = message;
    }

    // INIT

    verifyImageList();
    $scope.item.orcamento = ordemServicoService.formatOrcamentoInput($scope.item.orcamento);
});