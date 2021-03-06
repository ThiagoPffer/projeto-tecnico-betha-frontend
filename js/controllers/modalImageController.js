appModule.controller("modalImageController", function($scope, properties, ordemServicoService, imageData, userData) {

    // SCOPES    

    $scope.showImageGalleryError = false;
    $scope.showImageUploadError = false;
    $scope.canChangeComponent = ordemServicoService.canObjectsBeChanged();
    $scope.uri = properties.imageBaseUrl;
    $scope.item = imageData.item;

    // OPERACOES

    $scope.onDeleteImage = function(imagem) {
        ordemServicoService.deleteImage(imageData.idOrdem, imageData.idItem, imagem.id).then(function(response) {
            var indexImg = $scope.item.imagens.indexOf(imagem);
            $scope.item.imagens.splice(indexImg, 1);
            verifyImageList();
        },function(err) {
            imageSelectionException(err.message);
        });
    }

    $scope.onUploadImage = function() {
        var file = document.getElementById('itemImg').files[0];

        if(file === null || file === undefined){
            imageSelectionException("Selecione uma imagem antes de salvar!");
        }

        ordemServicoService.uploadImage(imageData.idOrdem, imageData.idItem, file).then(function(response) { 
            $scope.showImageGalleryError = false;
            $scope.item.imagens.push(response.data);
        }, function(err) {
            imageSelectionException(err.message);
        });
    }

    // VERIFICACOES

    $scope.isNotRecepcionista = function() {
        if(userData.tipo != "RECEPCIONISTA"){
            return true;
        } else {
            return false;
        }
    }

    var verifyImageList = function() {
        if($scope.item.imagens.length === 0){
            $scope.showImageGalleryError = true;
        }
    }

    var imageSelectionException = function(message) {
        $scope.showImageUploadError = true;
        $scope.imageUploadErrorMessage = message;
    }

    // INIT

    verifyImageList();
});