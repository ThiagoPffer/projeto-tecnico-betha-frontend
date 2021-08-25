appModule.controller("ordemDetailsController", function($location, $scope, $routeParams, $route, ordemServicoService, clienteService, loadOrdemServico, userData, Popeye) {

    // INIT

    $scope.pageId = $routeParams.id;
    ordemServicoService.setOrdemServicoObj(loadOrdemServico.data);
    $scope.ordemServico = loadOrdemServico.data;
    $scope.canChangeComponent = ordemServicoService.canObjectsBeChanged();
    $scope.cliente = loadOrdemServico.data.cliente;
    $scope.cliente.endereco = clienteService.toStringEndereco($scope.cliente.endereco);

    $scope.setColorBasedOnStatus = function(situacao) {
        return ordemServicoService.setColorBasedOnStatus(situacao);
    }

    // OPERACOES

    $scope.onAccessItem = function(idOrdem, idItem){
        $location.path("/ordens/"+idOrdem+"/itens/"+idItem);
    }

    $scope.onConfirmOrdemServicoChanges = function() {
        if($scope.isEmailCheckboxActivated()){
            $scope.updateSituacao('AGUARDANDO_DECISAO');
        } else if($scope.isPagamentoCheckboxActivated()){
            updateEstadoPagamento('PAGO');
        }
    }

    $scope.updateSituacao = function(situacao) {
        ordemServicoService.updateSituacao($routeParams.id, situacao).then(function(response) {
            alert("A situação da ordem foi alterada para " + situacao);
            $route.reload();
        }, function(err) {
            console.log(err);
        });
    }
    
    var updateEstadoPagamento = function(estadoPagamento) {
        ordemServicoService.updateEstadoPagamento($routeParams.id, estadoPagamento).then(function(response) {
            alert("O estado do pagamento da ordem foi alterado para " + estadoPagamento);
            $route.reload();
        }, function(err) {
            console.log(err);
        });
    }

    // MODAL

    $scope.openImageModal = function(idItem) {
        var modalImage = Popeye.openModal({
            templateUrl: "view/modalImages.html",
            controller: "modalImageController",
            resolve: {
                imageData: function() {
                    return {
                        item: ordemServicoService.getItemById(idItem),
                        idItem: idItem,
                        idOrdem: $routeParams.id
                    }
                },
                userData: function() {
                    return userData;
                }
            }
        });
    }

    $scope.openCancelConfirmationModal = function(idItem) {
        var modalCancelConfirmation = Popeye.openModal({
            templateUrl: "view/modalCancelConfirmation.html",
            controller: "modalCancelConfirmationController",
            resolve: {
                modalCancelData: function() {
                    return {
                        idOrdem: $routeParams.id
                    }
                }
            }
        });
    }

    // VERIFICACOES

    $scope.canCancelOrdemServico = function() {
        if(ordemServicoService.getSituacaoOrdemServico() === "EM_ANALISE" 
        || ordemServicoService.getSituacaoOrdemServico() === "AGUARDANDO_DECISAO"){
            return true;
        } else {
            return false;
        }
    }

    $scope.canFinishOrdemServico = function() {
        if(ordemServicoService.getSituacaoOrdemServico() != "APROVADA"){
            return false;
        } else {
            return true;
        }
    }

    $scope.isOrdemServicoPagamentoPendente = function(estadoPagamento) {
        if(estadoPagamento === "PENDENTE"){
            return true;
        } else {
            return false;
        }
    }
    
    $scope.isEmailCheckboxActivated = function() {
        var checkBox = document.getElementById('email-check');
        if(checkBox != null){
            return checkBox.checked
        } else {
            return false;
        }
    }

    $scope.isPagamentoCheckboxActivated = function() {
        var checkBox = document.getElementById('pagamento-check');
        if(checkBox != null){
            return checkBox.checked
        } else {
            return false;
        }
    }

    $scope.isNotRecepcionista = function() {
        if(userData.tipo != "RECEPCIONISTA"){
            return true;
        } else {
            return false;
        }
    }
    
    $scope.isNotTecnico = function() {
        if(userData.tipo != "TECNICO"){
            return true;
        } else {
            return false;
        }
    }

});