appModule.controller("funcionariosController", function($location, $scope, loadFuncionarios) {

    $scope.funcionarios = loadFuncionarios.data.content;

    $scope.accessFuncionarioData = function(idFuncionario) {
        $location.path("/funcionarios/"+idFuncionario);
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
    
    loadPagination(loadFuncionarios.data.totalPages);

    // ERROS

    var genericException = function(message) {
        $scope.showTableError = true;
        $scope.tableErrorMessage = message;
    }
});