appModule.factory("login", function($http, config) {
    var _authenticate = function(funcionario) {
        return $http.post(config.baseUrl + "/login", funcionario);
    };

    return {
        authenticate: _authenticate
    };
});