function MainController($scope) {
    $scope.canvas = {
        area: {
            x: 0,
            y: 100,
            width: 1000,
            height: 200
        },
        object: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    };
}

angular
    .module("ankular")
    .controller("MainController", MainController);