appModule.factory("loginInterceptor", function($location, tokenService) {
    return {
        request: function(config) {
            var url = config.url;
            if(url.indexOf('view/login.html') > -1){
                if(tokenService.getToken() != null){
                    $location.path("/home");
                    return config;
                }
                return config
            }
            return config;
        }
    };
});