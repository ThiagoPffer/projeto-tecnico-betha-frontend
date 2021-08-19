appModule.controller("clientesController", function($location, $scope, clienteService, loadClientes) {

    $scope.clientes = loadClientes.data.content;

    $scope.accessClienteData = function(idCliente) {
        $location.path("/clientes/"+idCliente);
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
    
    loadPagination(loadClientes.data.totalPages);

    // ERROS

    var genericException = function(message) {
        $scope.showTableError = true;
        $scope.tableErrorMessage = message;
    }
});