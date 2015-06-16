function securityFactory() {
    return {
        response: response,
        responseError: responseError
    };

    function response(resolve) {
        return resolve;
    }

    function responseError(reject) {
        console.log(reject.data);
        return reject;
    }
}

angular
    .module("ankular")
    .factory("securityFactory", securityFactory);