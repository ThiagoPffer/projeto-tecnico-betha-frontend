appModule.factory("funcionarioService", function($http, properties) {
    
    var _getFuncionario = function(email) {
        return $http.get(properties.baseUrl + "/funcionarios/email?value=" + email);
    }
    
    var _getFromLocalStorage = function() {
        return JSON.parse(localStorage.getItem("loggedUser"));
    }

    var _sendToLocalStorage = function(data) {
        localStorage.setItem("loggedUser", JSON.stringify(data));
    }

    var _clearLocalStorage = function() {
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("authToken");
    }

    return {
        getFuncionario: _getFuncionario,
        getFromLocalStorage: _getFromLocalStorage,
        sendToLocalStorage: _sendToLocalStorage,
        clearLocalStorage: _clearLocalStorage
    };
});