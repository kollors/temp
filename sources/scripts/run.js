function run($rootScope, $http, $location) {
    $rootScope.$on("$locationChangeStart", function () {
        $http.get($location.path()).then(function (response) {
        //$http.get("https://httpbin.org/status/403").then(function (response) {
            console.log(response);
        });
    });
}

angular
    .module("ankular")
    .run(run);