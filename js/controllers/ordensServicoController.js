appModule.controller("ordensServicoController", function($location, $scope, ordemServicoService) {

    var currentPage = $location.search().page;
    if(currentPage === undefined){
        currentPage = 0;
    }
    $scope.ordensServico = [];
    $scope.pagination = [];
    $scope.isSelected = function(paginationValue) {
        if(currentPage == paginationValue){
            return "selected";
        }
    };

    $scope.accessOrdemServico = function(id) {
        $location.path("/ordens/"+id);
    }
    
    $scope.statusColor = function(value) {
        if(value === "EM_ANALISE" || value === "AGUARDANDO_DECISAO" || value === "PENDENTE"){
            return "yellow";
        } else if(value === "CANCELADA" || value === "CANCELADO"){
            return "red"
        } else if(value === "APROVADA" || value === "CONCLUIDA" || value === "PAGO"){
            return "green"
        }
        console.log(value);
    }

    var loadOrdensServico = function() {
        ordemServicoService.getOrdensServico(currentPage).then(function(response) {
            $scope.ordensServico = response.data.content;
            loadPagination(response.data.totalPages);
            console.log(response);
        },function(err) {
            if(err.data.status === 404){
                $location.path("/erro");
            } else {
                genericException(err.data.message);
            }
            console.log(err);
        })
    }

    var loadPagination = function(totalPages) {
        for(let i=0;i<totalPages;i++){
            $scope.pagination.push({'value': i});
        }
    }

    loadOrdensServico();

    var genericException = function(message) {
        $scope.showTableError = true;
        $scope.tableErrorMessage = message;
    }
});