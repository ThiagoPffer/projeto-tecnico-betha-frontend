appModule.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");

    $routeProvider.when("/login", {
        templateUrl: "view/login.html",
        controller: "loginController"
    });

    $routeProvider.when("/home", {
        templateUrl: "view/home.html",
        controller: "loginController"
    });

    $routeProvider.when("/nova-ordem", {
        templateUrl: "view/cadastro-ordem.html",
        controller: "loginController"
    });

    if(localStorage.getItem("authToken") === null){
        $routeProvider.otherwise({redirectTo: "/login"});
    } else {
        $routeProvider.otherwise({redirectTo: "/home"});
    }

});