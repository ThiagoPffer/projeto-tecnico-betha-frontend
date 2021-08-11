appModule.factory("ordemServicoService", function($http, properties) {
    
    var _insertOrdemServico = function(ordemServico) {
        return $http.post(properties.baseUrl + "/ordensservico", ordemServico);
    }

    var _getOrdensServico = function() {
        return $http.get(properties.baseUrl + "/ordensservico/page");
    }
    
    return {
        insertOrdemServico: _insertOrdemServico,
        getOrdensServico: _getOrdensServico
    };
});