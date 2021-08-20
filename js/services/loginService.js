appModule.factory("loginService", function($http, properties) {
    var _authenticate = function(funcionario) {
        return $http.post(properties.baseUrl + "/login", funcionario);
    };

    var _forgotPassword = function(email) {
        return $http.post(properties.baseUrl + "/auth/forgot", email);
    };

    return {
        authenticate: _authenticate,
        forgotPassword: _forgotPassword
    };
});