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
        controller: "ordensServicoController"
    });

    if(localStorage.getItem("authToken") === null){
        $routeProvider.otherwise({redirectTo: "/login"});
    } else {
        $routeProvider.otherwise({redirectTo: "/home"});
    }

});