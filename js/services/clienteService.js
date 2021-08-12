appModule.factory("clienteService", function($http, properties) {
    
    var _getCliente = function(email) {
        return $http.get(properties.baseUrl + "/clientes/email?value=" + email);
    }

    var _getClienteById = function(id) {
        return $http.get(properties.baseUrl + "/clientes/" + id);
    }
    
    var _toStringEndereco = function(enderecoCliente) {
        return `${enderecoCliente.logradouro}, número ${enderecoCliente.numero}, bairro ${enderecoCliente.bairro}, ${enderecoCliente.cidade}, ${enderecoCliente.estado}`;
    }

    return {
        getCliente: _getCliente,
        getClienteById: _getClienteById,
        toStringEndereco: _toStringEndereco
    };
});