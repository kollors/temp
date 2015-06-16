function HomeController(HomeService) {
    var home = this;
    HomeService.getUser().then(function (user) {
        home.user = user;
    });
}

angular
    .module("ankular")
    .controller("HomeController", HomeController);