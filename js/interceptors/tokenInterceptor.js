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
        responseError: function(error) {
            if(error.status === 401 || error.status === 403){
                console.log(error.data); // TRATAR ERRO / VER COM O MICHEL SE É NECESSÁRIO TRATAR LOCALMENTE
                $location.path("/login");
            }
            return $q.reject(error);
        }
    };
});