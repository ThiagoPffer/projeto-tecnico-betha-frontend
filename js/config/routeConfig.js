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
        controller: "ordemDetailsController",
        resolve: {
            loadOrdemServico: function(ordemServicoService, $location) {
                var ordemId = $location.path().split("/ordens/").pop();
                return ordemServicoService.getOrdemServicoById(ordemId);
            }
        }
    });

    $routeProvider.when("/ordens/:idOrdem/itens/:idItem", {
        templateUrl: "view/ordemItem.html",
        controller: "ordemItemController"
    });

    $routeProvider.when("/novo-cliente/", {
        templateUrl: "view/novoCliente.html",
        controller: "novoClienteController",
    });

    $routeProvider.when("/clientes/", {
        templateUrl: "view/clientes.html",
        controller: "clientesController",
        resolve: {
            loadClientes: function(clienteService, $location) {
                return clienteService.getClientes($location.search().page);
            }
        }
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