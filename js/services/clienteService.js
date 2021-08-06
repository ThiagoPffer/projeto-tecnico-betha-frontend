appModule.factory("clienteService", function($http, properties) {
    
    var _getCliente = function(email) {
        return $http.get(properties.baseUrl + "/clientes/email?value=" + email);
    }
    
    return {
        getCliente: _getCliente
    };
});