var app = angular.module('sqlApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

    $routeProvider
        .when('/addressView', {
            templateUrl: 'views/addressView.html',
            controller: 'addressController'
        })
        .when('/dateView', {
            templateUrl: 'views/dateView.html',
            controller: 'dateController'
        });

    $locationProvider.html5Mode(true);

}]);

app.controller('MainController', ['$scope', '$http', function($scope, $http){

    $scope.getData = function(){
        $http.get('/api/users', 'data').then(function(response){
            $scope.users = response.data;
        });
    }

}]);
app.controller('addressController', ['$scope', '$http', function($scope, $http){
   var singleUser = $scope.idValue;

        $http.get('/api/location' + singleUser, 'data').then(function(response){
            console.log(response.data);
            $scope.locations = response.data;

        });

    //
    //$scope.getAddress = function() {
    //    $http.get('/addressView/addresses').then(function (response) {
    //        $scope.openSesame = false;
    //        $scope.locations =[];
    //        $scope.locations = response.data;


    //    });
    //};



}]);

app.controller('dateController', ['$scope', '$http', function($scope, $http){

        var singleUser = $scope.idValue;
        $scope.getOrders = function() {
            $http.get('/api/orders/' + singleUser, 'data').then(function (response) {
                console.log(response.data);
                $scope.orders = response.data;
            });
        };

}]);