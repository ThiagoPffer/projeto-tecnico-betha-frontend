appModule.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");

    $routeProvider.when("/login", {
        templateUrl: "view/login.html",
        controller: "loginController"
    });

    $routeProvider.when("/home", {
        templateUrl: "view/home.html",
        controller: "homeController"
    });

    $routeProvider.when("/nova-ordem", {
        templateUrl: "view/cadastro-ordem.html",
        controller: "cadastroOrdemController"
    });

    $routeProvider.when("/ordens", {
        templateUrl: "view/ordens.html",
        controller: "ordensServicoController",
        resolve: {
            loadOrdensServico: function(ordemServicoService, $location) {
                return ordemServicoService.getOrdensServico($location.search().page);
            }
         }
    });

    $routeProvider.when("/ordens/:id", {
        templateUrl: "view/ordemDetails.html",
        controller: "ordemDetailsController"
    });

    $routeProvider.when("/erro", {
        templateUrl: "view/errorPage.html",
        controller: "errorPageController"
    });

    if(localStorage.getItem("authToken") === null){
        $routeProvider.otherwise({redirectTo: "/login"});
    } else {
        $routeProvider.otherwise({redirectTo: "/home"});
    }

});