appModule.factory("timestampInterceptor", function() {
    return {
        request: function(config) {
            var url = config.url;
            if(url.indexOf('view') > -1 || 
            url.indexOf('login') > -1 ||
            url.indexOf('?value') > -1){
                return config;
            }
            var timestamp = new Date().getTime();
            config.url = url + "?timestamp=" + timestamp;
            return config;
        }
    };
});