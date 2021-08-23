appModule.factory("tokenInterceptor", function($q, $location, tokenService) {
    return {
        request: function(config) {
            var url = config.url;
            if(url.indexOf('login') > -1 || url.indexOf('view') > -1){
                return config;
            }
            config.headers['authorization'] = tokenService.getToken();

            console.log(config.url); // URL DA REQUISIÇÃO
            console.log(config.headers); // HEADERS ENVIADAS NA REQUISIÇÃO

            return config;
        },
        responseError: function(rejection) {
            if(rejection.status === 401 || rejection.status === 403){
                $location.path("/login");
            }
            return $q.reject(rejection);
        }
    };
});