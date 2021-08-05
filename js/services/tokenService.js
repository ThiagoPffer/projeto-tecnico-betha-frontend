appModule.factory("token", function(/*$http, config*/) {

    var _getToken = function() {
        return localStorage.getItem("authToken");
    }

    // var _refreshToken = function() {
    //     return $http({
    //         method: "POST",
    //         url: config.baseUrl + "/auth/refresh-token",
    //         headers: {
    //             Authorization: _getToken()
    //         }
    //     });
    // };

    return {
        getToken: _getToken,
        // refreshToken: _refreshToken,
    };
});