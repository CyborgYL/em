EM.controller('listCtrl',['$scope', '$timeout','userData', function($scope, $timeout, userData) {
    $scope.users = userData.list_users();
    $scope.predicate = 'id';
    $scope.reverse = true;
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.pageStart = 0;
    $scope.numOfPages = Math.ceil($scope.users.length/$scope.pageSize);

    $scope.deleteUser = function(id) {
        userData.deleteUser(id);
    };

    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };

    $scope.changePageSize = function(size) {
        $scope.pageSize =  Number(size);
        $scope.pageStart = 0;
        $scope.numOfPages = Math.ceil($scope.filtered.length/$scope.pageSize);
        if ($scope.numOfPages == 0) {
            $scope.currentPage = 0;
        }
        else{
            $scope.currentPage = 1;
        }
    };

    $scope.viewAll = function() {
        $scope.pageSize = $scope.users.length;
        $scope.pageStart = 0;
        $scope.numOfPages = Math.ceil($scope.filtered.length / $scope.pageSize);
        if ($scope.numOfPages == 0) {
            $scope.currentPage = 0;
        }
        else{
            $scope.currentPage = 1;
        }
    };


    $scope.nextPage = function(){
        $scope.currentPage = $scope.currentPage + 1;
        $scope.pageStart = $scope.pageStart + $scope.pageSize;
    };
    $scope.previousPage = function(){
        $scope.currentPage = $scope.currentPage - 1;
        $scope.pageStart = $scope.pageStart - $scope.pageSize;
    };

    $scope.filter = function() {
        $timeout(function() {
            //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.numOfPages = Math.ceil($scope.filtered.length/$scope.pageSize);
            if ($scope.numOfPages == 0) {
                $scope.currentPage = 0;
            }
            else{
                $scope.currentPage = 1;
            }
        }, 10);
        $scope.pageStart = 0;
    };
}]);

EM.controller('showCtrl',['$scope', '$routeParams', 'userData', function($scope, $routeParams,  userData) {
    $scope.userId = $routeParams.userId;
    $scope.newUser = userData.getUser($routeParams.userId);

    $scope.go = function (path) {
        userData.go(path);
    };

    $scope.goBack = function() {
        window.history.back();
    };
}]);

EM.controller('directReportsCtrl',['$scope', '$routeParams', '$timeout', 'userData', function($scope, $routeParams, $timeout, userData) {
    $scope.users = userData.list_users();
    $scope.userId = $routeParams.userId;
    $scope.directReports = userData.getUser($routeParams.userId).directReports;
    $scope.pageSize = 5;
    $scope.pageStart = 0;
    $scope.numOfPages = Math.ceil($scope.directReports.length/$scope.pageSize);
    $scope.reports = [];

    if ($scope.directReports.length == 0) {
        $scope.currentPage = 0;
    }
    else {
        $scope.currentPage = 1;
    }

    for (var i= 0; i<$scope.directReports.length; i++) {
        var num = $scope.directReports[i].id;
        $scope.reports.push($scope.users[num]);
    }

    $scope.changePageSize = function(size) {
        $scope.pageSize =  parseInt(size, 10);
        $scope.pageStart = 0;
        $scope.numOfPages = Math.ceil($scope.filtered.length / $scope.pageSize);
        if ($scope.numOfPages == 0) {
            $scope.currentPage = 0;
        }
        else{
            $scope.currentPage = 1;
        }
    };

    $scope.viewAll = function() {
        $scope.pageSize = $scope.directReports.length;
        $scope.pageStart = 0;
        $scope.numOfPages = Math.ceil($scope.filtered.length / $scope.pageSize);
        if ($scope.numOfPages == 0) {
            $scope.currentPage = 0;
        }
        else{
            $scope.currentPage = 1;
        }
    };

    $scope.nextPage = function(){
        $scope.currentPage = $scope.currentPage + 1;
        $scope.pageStart = $scope.pageStart + $scope.pageSize;
    };
    $scope.previousPage = function(){
        $scope.currentPage = $scope.currentPage - 1;
        $scope.pageStart = $scope.pageStart - $scope.pageSize;
    };

    $scope.filter = function() {
        $timeout(function() {
            $scope.numOfPages = Math.ceil($scope.filtered.length/$scope.pageSize);
            if ($scope.numOfPages == 0) {
                $scope.currentPage = 0;
            }
            else{
                $scope.currentPage = 1;
            }
        }, 10);
        $scope.pageStart = 0;
    };

    $scope.goBack = function() {
        window.history.back();
    };
}]);



EM.controller('editCtrl', ['$scope', '$routeParams', 'userData', function($scope, $routeParams, userData) {
    $scope.users = userData.list_users();
    $scope.edit = true;
    $scope.userId = $routeParams.userId;
    $scope.mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //phone number validation(XXX-XXX-XXXX, XXX.XXX.XXXX, XXX XXX XXXX, XXXXXXXXXX)
    $scope.phoneformat= /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    $scope.incomplete = true;
    if ($scope.userId == 'new') {
        $scope.edit = false;
        $scope.newUser = {};
        $scope.newUser.id = null;
        $scope.newUser.fName = "";
        $scope.newUser.lName = "";
        $scope.newUser.title = "";
        $scope.newUser.age = undefined;
        $scope.newUser.officePhone = undefined;
        $scope.newUser.cellPhone = undefined;
        $scope.newUser.email = undefined;
        $scope.newUser.sex = undefined;
    }
    else {
        $scope.edit = true;
        $scope.newUser = userData.getUser($routeParams.userId);
        $scope.initialValue = angular.copy($scope.newUser);
    }


    $scope.$watch('newUser.fName', function() {$scope.test();});
    $scope.$watch('newUser.lName', function() {$scope.test();});
    $scope.$watch('newUser.title', function() {$scope.test();});
    $scope.$watch('newUser.age', function() {$scope.test();});
    $scope.$watch('newUser.officePhone', function() {$scope.test();});
    $scope.$watch('newUser.cellPhone', function() {$scope.test();});
    $scope.$watch('newUser.email', function() {$scope.test();});
    $scope.$watch('newUser.sex', function() {$scope.test();});


    $scope.test = function() {
        if (!$scope.newUser.fName.length || !$scope.newUser.lName.length || !$scope.newUser.title.length ||
            !$scope.newUser.age.length || isNaN($scope.newUser.age) || !$scope.phoneformat.test($scope.newUser.officePhone) ||
            !$scope.phoneformat.test($scope.newUser.cellPhone) || !$scope.mailformat.test($scope.newUser.email)
            || !$scope.newUser.sex.length) {
            $scope.incomplete = true;
        }
        else {
            $scope.incomplete = false;
        }
    };

    $scope.saveUser = function (path) {
        userData.saveUser($scope.newUser);
        userData.go(path);
        $scope.newUser = {};
    };

    $scope.reset = function () {
        angular.copy($scope.initialValue, $scope.newUser);
    };

    $scope.goBack = function() {
        window.history.back();
    };
}]);