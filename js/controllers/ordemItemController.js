appModule.controller("ordemItemController", function($location, $scope, $routeParams, ordemServicoService, properties, Popeye) {
    
    // VERIFICAÇÕES INICIAIS

    var ordemServicoDTO;

    if(ordemServicoService.getOrdemServicoDTO() === undefined){
        $location.path("/ordens/"+$routeParams.idOrdem);
    } else{
        ordemServicoDTO = ordemServicoService.getOrdemServicoDTO();
    }

    if(ordemServicoService.getSituacaoOrdemServico() == "EM_ANALISE"){
        $scope.canChangeItem = true;
    } else {
        $scope.canChangeItem = false;
    }

    // SCOPES

    $scope.showImageGalleryError = false;
    $scope.showImageUploadError = false;
    $scope.showSavingError = false;

    $scope.uri = properties.imageBaseUrl;
    $scope.item = ordemServicoService.getItemById($routeParams.idItem);
    
    // OPERAÇÕES

    $scope.onDeleteImage = function(imagem) {
        ordemServicoService.deleteImage($routeParams.idOrdem, $routeParams.idItem, imagem.id).then(function(response) {
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

        ordemServicoService.uploadImage($routeParams.idOrdem, $routeParams.idItem, file).then(function(response) { 
            $scope.showImageGalleryError = false;
            $scope.item.imagens.push(response.data);
        }, function(err) {
            imageSelectionException(err.message);
        });
    }

    $scope.onSaveAllChanges = function(item) {
        ordemServicoService.setItem(item);
        let ordemServicoDTO = ordemServicoService.getOrdemServicoDTO();
        ordemServicoService.updateOrdemServico(ordemServicoDTO).then(function(response) {
            $location.path('ordens/'+$routeParams.idOrdem)
        }, function(err) {
            savingException(err.message);
        });
    }

    $scope.onCancelChanges = function() {
        $location.path('/ordens/'+$routeParams.idOrdem);
    }

    // MODAL

    $scope.openModalItem = function() {
        var modalItem = Popeye.openModal({
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
            $scope.showImageGalleryError = true;
        }
    }

    var imageSelectionException = function(message) {
        $scope.showImageUploadError = true;
        $scope.imageUploadErrorMessage = message;
    }

    var savingException = function(message) {
        $scope.showSavingError = true;
        $scope.savingErrorMessage = message;
    }

    // INIT

    verifyImageList();
});