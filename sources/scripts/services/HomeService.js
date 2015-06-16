function HomeService($http) {
    this.getUser = function () {
        return $http.get("_data/user.json").then(function (response) {
            return response.data;
        });
    };
}

angular
    .module("ankular")
    .service("HomeService", HomeService);