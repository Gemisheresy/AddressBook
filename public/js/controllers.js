app.controller('homeController',['$scope',function($scope){

}]);
app.controller('searchController',['$scope','$http','$location',function($scope,$http,$location){
    $scope.searchBox = '';
    $scope.submit = function(){
        $location.path('/fetching')
        var req = {
            method: 'POST',
            url: '/search/validation',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { search : $scope.searchBox }
        };
        $http(req).then(function(response){
            $location.path('/results')
        }, function(response){
            $location.path('/search')
        });
    }
}]);
app.controller('resultsController',['$scope','$http','$location',function($scope,$http){
    $scope.userInfo;
    $http.get('/search/results').then(function(response){
        console.log("I worked" + response);
        $scope.userInfo = response.data;
        console.log($scope.userInfo);
        console.log($scope);
    },function(err){
        console.log(err);
    });


}]);