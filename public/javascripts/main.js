var EM = angular.module('multiCtrl', ['ngRoute']);

EM.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/listUser', {
                templateUrl: 'view/listUser.html',
                controller: 'listCtrl'
            })
            .when('/showUser/:userId', {
                templateUrl: 'view/showUser.html',
                controller: 'showCtrl'
            })
            .when('/editUser/:userId', {
                templateUrl: 'view/editUser.html',
                controller: 'editCtrl'
            })
            .when('/directReports/:userId', {
                templateUrl: 'view/directReports.html',
                controller: 'directReportsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
}]);
