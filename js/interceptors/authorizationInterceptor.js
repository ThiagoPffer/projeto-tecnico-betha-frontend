appModule.factory("authorizationInterceptor", function($q, $location) {
    
    var _accessVerification = function(url, userData) {
        if(userData.tipo != "ADMINISTRADOR"){
            if(url.indexOf('/funcionarios') > -1 
            || url.indexOf('/novo-funcionario') > -1){
                $location.path("/erro-autorizacao");
            }
        }
        if(userData.tipo != "ADMINISTRADOR" && userData.tipo != "RECEPCIONISTA"){
            if(url.indexOf('/cadastro-ordem') > -1 
            || url.indexOf('/novoCliente') > -1){
                $location.path('/erro-autorizacao');
            }
        }
    }
    
    return {
        request: function(config) {
            var url = config.url;
            var userData = JSON.parse(localStorage.getItem('loggedUser'));
            if(userData === null){
                return config;
            }
            if(url.indexOf('sidemenu.html') > -1 || url.indexOf('localhost:8080') > -1){
                return config;
            }
            _accessVerification(url, userData);
            return config;
        },
        responseError: function(error) {
            console.log(error)
            return $q.reject(error);
        }
    };
});