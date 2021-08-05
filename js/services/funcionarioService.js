appModule.factory("funcionarioService", function($http, config) {
    
    var _getFuncionario = function(email) {
        return $http.get(config.baseUrl + "/funcionarios/email?value=" + email);
    }
    
    var _getFromLocalStorage = function() {
        return JSON.parse(localStorage.getItem("loggedUser"));
    }

    var _sendToLocalStorage = function(data) {
        localStorage.setItem("loggedUser", JSON.stringify(data));
    }

    return {
        getFuncionario: _getFuncionario,
        getFromLocalStorage: _getFromLocalStorage,
        sendToLocalStorage: _sendToLocalStorage
    };
});