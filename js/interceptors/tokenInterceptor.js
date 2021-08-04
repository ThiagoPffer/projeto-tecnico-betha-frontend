appModule.factory("tokenInterceptor", function(token) {
    return {
        request: function(config) {
            var url = config.url;
            if(url.indexOf('login') > -1){
                return config;
            }
            console.log(config.url);
            
            // token.getToken();
            // token.verifyToken().then(function(response) {
            //     return response;
            // }, function(err) {
            //     return err;
            // });

            return config;
        }
    };
});