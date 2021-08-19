appModule.factory("clienteService", function($http, properties) {
    
    var _insertCliente = function(cliente) {
        return $http.post(properties.baseUrl + "/clientes/", cliente);
    }

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
        insertCliente: _insertCliente,
        getCliente: _getCliente,
        getClienteById: _getClienteById,
        toStringEndereco: _toStringEndereco
    };
});