appModule.factory("token", function(/*$http, properties*/) {

    var _getToken = function() {
        return localStorage.getItem("authToken");
    }

    // var _refreshToken = function() {
    //     return $http({
    //         method: "POST",
    //         url: properties.baseUrl + "/auth/refresh-token",
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