var app = angular.module('AddressApp',['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:"public/views/home.html",
            controller:'homeController'
        })
        .when('/search',{
            templateUrl:'public/views/search.html',
            controller: 'searchController'
        })
        .when('/results',{
            templateUrl:'public/views/resultspage.html',
            controller: 'resultsController'
        })
        .when('/fetching',{
            templateUrl:"public/views/loading.html"
        })
})