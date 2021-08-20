appModule.factory("funcionarioService", function($http, properties) {
    
    var _insertFuncionario = function(funcionario) {
        return $http.post(properties.baseUrl + "/funcionarios/", funcionario);
    }

    var _updateFuncionario = function(funcionario, idFuncionario) {
        return $http.put(properties.baseUrl + "/funcionarios/" + idFuncionario, funcionario);
    } 

    var _getFuncionario = function(email) {
        return $http.get(properties.baseUrl + "/funcionarios/email?value=" + email);
    }

    var _getFuncionarioById = function(id) {
        return $http.get(properties.baseUrl + "/funcionarios/" + id);
    }
   
    var _getFuncionarios = function(pageId) {
        if(pageId === null || pageId === undefined){
            pageId = 0;
        }
        return $http.get(properties.baseUrl + "/funcionarios/page?page=" + pageId);
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
        insertFuncionario: _insertFuncionario,
        updateFuncionario: _updateFuncionario,
        getFuncionario: _getFuncionario,
        getFuncionarioById: _getFuncionarioById,
        getFuncionarios: _getFuncionarios,
        getFromLocalStorage: _getFromLocalStorage,
        sendToLocalStorage: _sendToLocalStorage,
        clearLocalStorage: _clearLocalStorage
    };
});