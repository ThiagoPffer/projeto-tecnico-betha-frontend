appModule.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");

    $routeProvider.when("/login", {
        templateUrl: "view/login.html",
        controller: "loginController"
    });

    $routeProvider.when("/forgot", {
        templateUrl: "view/forgot.html",
        controller: "forgotController"
    });

    $routeProvider.when("/home", {
        templateUrl: "view/home.html",
        controller: "homeController",
        resolve: {
            userData: function(funcionarioService) {
                return funcionarioService.getFromLocalStorage();
            }
        }
    });

    $routeProvider.when("/nova-ordem", {
        templateUrl: "view/novaOrdem.html",
        controller: "cadastroOrdemController"
    });

    $routeProvider.when("/ordens", {
        templateUrl: "view/ordensServico.html",
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
            },
            userData: function(funcionarioService) {
                return funcionarioService.getFromLocalStorage();
            }
        }
    });

    $routeProvider.when("/ordens/:idOrdem/itens/:idItem", {
        templateUrl: "view/ordemItem.html",
        controller: "ordemItemController",
        resolve: {
            userData: function(funcionarioService) {
                return funcionarioService.getFromLocalStorage();
            }
        }
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
    
    $routeProvider.when("/clientes/:idCliente", {
        templateUrl: "view/clienteDetails.html",
        controller: "clienteDetailsController",
        resolve: {
            loadCliente: function(clienteService, $location) {
                var idCliente = $location.path().split("/clientes/").pop();
                return clienteService.getClienteById(idCliente);
            },
            userData: function(funcionarioService) {
                return funcionarioService.getFromLocalStorage();
            }
        }
    });

    $routeProvider.when("/novo-funcionario/", {
        templateUrl: "view/novoFuncionario.html",
        controller: "novoFuncionarioController",
    });

    $routeProvider.when("/funcionarios/", {
        templateUrl: "view/funcionarios.html",
        controller: "funcionariosController",
        resolve: {
            loadFuncionarios: function(funcionarioService, $location) {
                return funcionarioService.getFuncionarios($location.search().page);
            },
            userData: function(funcionarioService) {
                return funcionarioService.getFromLocalStorage();
            }
        }
    });

    $routeProvider.when("/funcionarios/:idFuncionario", {
        templateUrl: "view/funcionarioDetails.html",
        controller: "funcionarioDetailsController",
        resolve: {
            loadFuncionario: function(funcionarioService, $location) {
                var idFuncionario = $location.path().split("/funcionarios/").pop();
                return funcionarioService.getFuncionarioById(idFuncionario);
            },
            userData: function(funcionarioService) {
                return funcionarioService.getFromLocalStorage();
            }
        }
    });

    $routeProvider.when("/erro", {
        templateUrl: "view/errorPage.html",
        controller: "errorPageController"
    });

    $routeProvider.when("/erro-autorizacao", {
        templateUrl: "view/authorizationErrorPage.html",
        controller: "errorPageController"
    });

    

    if(localStorage.getItem("authToken") === null){
        $routeProvider.otherwise({redirectTo: "/login"});
    } else {
        $routeProvider.otherwise({redirectTo: "/home"});
    }

});