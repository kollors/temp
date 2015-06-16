function config($httpProvider, $routeProvider, $locationProvider) {
    $routeProvider
        .when("/main", {
            templateUrl: "templates/main.html",
            controller: "MainController",
            controllerAs: "main"
        })
        .when("/home", {
            templateUrl: "templates/home.html",
            controller: "HomeController",
            controllerAs: "home"
        })
        .otherwise({
            redirectTo: "/main"
        });

    $httpProvider.interceptors.push("securityFactory");
    $locationProvider.html5Mode(true).hashPrefix("!");
}

angular
    .module("ankular")
    .config(config);