appModule.controller("ordensServicoController", function($location, $scope, ordemService) {
    var paginaAtual;
    
    $scope.ordens = [];
    $scope.paginacao = [];
    $scope.isSelected = function(valorPaginacao) {
        if(paginaAtual === valorPaginacao){
            return "selected";
        }
    };
    
    var carregarOrdens = function() {
        ordemService.getOrdens().then(function(response) {
            $scope.ordens = response.data.content;
            paginaAtual = response.data.number+1;
            carregarPaginacao(response.data.totalPages);
            console.log(response);
        },function(err) {
            console.log(err);
        })
    }

    var carregarPaginacao = function(totalPaginas) {
        for(let i=1;i<=totalPaginas;i++){
            $scope.paginacao.push({'value': i});
        }
    }

    $scope.verOrdem = function(id) {
        $location.path("/nova-ordem");
    }

    carregarOrdens();
});