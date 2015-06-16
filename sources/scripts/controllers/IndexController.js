function IndexController() {
    var index = this;
    index.welcome = "Welcome Text";
}

angular
    .module("ankular")
    .controller("IndexController", IndexController);