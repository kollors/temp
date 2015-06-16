function hello() {
    return {
        restrict: "E",
        scope: {
            name: "@"
        },
        link: link
    };

    function link($scope, $element) {
        $element.html("<b>From Directive: Hello " + $scope.name + "</b>");
    }
}

/**
 * @ngdoc directive
 * @name hello
 * @module ankular
 * @restrict E
 * @param {string} name
 */
angular
    .module("ankular")
    .directive("hello", hello);