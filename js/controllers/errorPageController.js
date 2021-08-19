appModule.controller("errorPageController", function($scope, $location, funcionarioService) {
    $scope.logOut = function() {
        funcionarioService.clearLocalStorage();
        $location.path("/login");
    };
});