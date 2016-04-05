app.directive('userresults',function() {
    return {
        templateUrl : 'public/views/results.html',
        restrict: 'E',
        scope: {
            userInfo : '='
        }

    }
})