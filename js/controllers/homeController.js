appModule.controller("homeController", function($http, $scope, token, config) {
    console.log(token.getToken() != null);

});