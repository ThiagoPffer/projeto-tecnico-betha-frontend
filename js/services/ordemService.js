appModule.factory("ordemService", function($http, properties) {
    
    var _insertOrdem = function(ordem) {
        return $http.post(properties.baseUrl + "/ordensservico", ordem);
    }
    
    return {
        insertOrdem: _insertOrdem
    };
});