appModule.controller("ordemItemController", function($location, $scope, $routeParams, ordemServicoService, properties, Popeye) {
    var ordemServicoObj;

    if(ordemServicoService.getOrdemServicoObj() === undefined){
        $location.path("/ordens/"+$routeParams.idOrdem);
    } else{
        ordemServicoObj = ordemServicoService.getOrdemServicoObj();
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

    // $scope.onSaveAllChanges = function(item) {
    //     ordemServicoService.setItem(item);
    //     let ordemServico = ordemServicoService.getOrdemServicoObj();
    //     console.log(ordemServico);
    //     ordemServicoService.updateOrdemServico(ordemServico).then(function(response) {
    //         console.log(response);
    //     }, function(err) {
    //         console.log(err);
    //     });
    // }

    // MODAL

    $scope.openModal = function() {
        var modal = Popeye.openModal({
            templateUrl: "view/modal-item.html",
            controller: "modalItemController",
            resolve: {
                itemData: function() {
                    return {
                        item: $scope.item,
                        idItem: $routeParams.idItem,
                        idOrdem: $routeParams.idOrdem
                    }
                }
            }
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
});