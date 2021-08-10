appModule.factory("ordemService", function($http, properties) {
    
    var _insertOrdem = function(ordem) {
        return $http.post(properties.baseUrl + "/ordensservico", ordem);
    }

    var _getOrdens = function(ordem) {
        return $http.get(properties.baseUrl + "/ordensservico/page");
    }
    
    return {
        insertOrdem: _insertOrdem,
        getOrdens: _getOrdens
    };
});