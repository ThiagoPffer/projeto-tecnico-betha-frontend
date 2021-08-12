appModule.controller("ordensServicoController", function($location, $scope, ordemServicoService, loadOrdensServico) {

    $scope.ordensServico = loadOrdensServico.data.content;    

    $scope.accessOrdemServico = function(id) {
        $location.path("/ordens/"+id);
    }
    
    $scope.setStatusColor = function(value) {
        return ordemServicoService.setStatusColor(value);
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

    // ERROS

    var genericException = function(message) {
        $scope.showTableError = true;
        $scope.tableErrorMessage = message;
    }
});