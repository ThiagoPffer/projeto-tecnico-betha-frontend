appModule.controller("ordensServicoController", function($location, $scope, ordemServicoService) {
    var currentPage;
    
    $scope.ordensServico = [];
    $scope.pagination = [];
    $scope.isSelected = function(paginationValue) {
        if(currentPage === paginationValue){
            return "selected";
        }
    };
    
    var loadOrdensServico = function() {
        ordemServicoService.getOrdensServico().then(function(response) {
            $scope.ordensServico = response.data.content;
            currentPage = response.data.number+1;
            loadPagination(response.data.totalPages);
            console.log(response);
        },function(err) {
            console.log(err);
        })
    }

    var loadPagination = function(totalPages) {
        for(let i=1;i<=totalPages;i++){
            $scope.pagination.push({'value': i});
        }
    }

    // $scope.accessOrdemServico = function(id) {
    //     $location.path("/nova-ordem");
    // }

    loadOrdensServico();
});