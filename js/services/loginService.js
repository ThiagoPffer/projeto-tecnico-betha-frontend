appModule.factory("login", function($http, properties) {
    var _authenticate = function(funcionario) {
        return $http.post(properties.baseUrl + "/login", funcionario);
    };

    return {
        authenticate: _authenticate
    };
});