appModule.factory("errorInterceptor", function($q, $location) {
    return {
        responseError: function(rejection) {
            if(rejection.status === 401 || rejection.status === 403){
                console.log(rejection.data);
                $location.path("/login");
            }
            if(rejection.status === 404 && rejection.data.path.indexOf('/email') === -1){
                console.log(rejection.data);
                $location.path("/erro");
            }
            return $q.reject(rejection);
        }
    };
});