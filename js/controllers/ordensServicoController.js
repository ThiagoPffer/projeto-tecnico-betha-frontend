appModule.controller("ordensServicoController", function($location, $scope, ordemServicoService, loadOrdensServico) {

    // INIT

    $scope.ordensServico = loadOrdensServico.data.content;
    
    $scope.setColorBasedOnStatus = function(situacao) {
        return ordemServicoService.setColorBasedOnStatus(situacao);
    }

    // OPERACOES

    $scope.accessOrdemServico = function(id) {
        $location.path("/ordens/"+id);
    }

    // PAGINACAO
    
    $scope.pagination = [];
    var currentPage = $location.search().page;
    
    if(currentPage === undefined){
        currentPage = 0;
    }
    
    $scope.isSelected = function(paginationValue) {
        if(currentPage == paginationValue){
            return "selected";
        }
    };
    
    var loadPagination = function(totalPages) {
        for(let i=0;i<totalPages;i++){
            $scope.pagination.push({'value': i});
        }
    }
    
    loadPagination(loadOrdensServico.data.totalPages);
});