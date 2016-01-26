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

app.controller('addressController', ['$scope', '$http', function($scope, $http){
        console.log("button hit");


        $scope.getAddress = function() {
            $http.get('/api/location').then(function (response) {
                console.log(response.data);
                $scope.locations = response.data;
                console.log('full response');
            });
        }
}]);

app.controller('dateController', ['$scope', '$http', function($scope, $http){

        var singleUser = $scope.id;
        $scope.getOrders = function() {
            $http.get('/api/orders/' + singleUser).then(function (response) {
                console.log(response.data);
                $scope.orders = response.data;
            });
        };

    $scope.getUsers= function() {
        console.log('button click');
        $http.get('/api/users').then(function (response) {
            console.log(response.data);
            $scope.users = response.data;
            console.log('full response');
        });
    }}]);