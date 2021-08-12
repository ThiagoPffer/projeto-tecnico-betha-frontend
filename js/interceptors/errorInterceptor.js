appModule.factory("errorInterceptor", function($q, $location) {
    return {
        responseError: function(error) {
            if(error.status === 401 || error.status === 403){
                console.log(error.data);
                $location.path("/login");
            }
            if(error.status === 404){
                console.log(error.data);
                $location.path("/erro");
            }
            return $q.reject(error);
        }
    };
});