angular.module('myApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngTagsInput']);
angular.module('myApp').controller("myCtrl", function($scope, $http) {
    $scope.radioModel = 'Middle';
    $scope.paths = [];
    $scope.tags = [

    ];
    $scope.totalTags = [];
    $scope.loadTags = function(query) {
        var matchedTags = [];
        query = query.toLowerCase();
        for (var i = 0; i < $scope.totalTags.length; i++) {
            if ($scope.totalTags[i].toLowerCase().indexOf(query) > -1) {
                matchedTags.push($scope.totalTags[i]);
            }
        }
        return matchedTags;
    };
    $scope.$watch('tags', function(newVal, oldVal) {
        $scope.filterPahts();
    });
    $scope.filterPahts = function(filterPath) {
        return function(filterPath) {
            if ($scope.tags.length === 0) {
                return true;
            } else {
                for (var i = 0; i < $scope.tags.length; i++) {
                    if (filterPath.tags.indexOf($scope.tags[i].text.replace("-"," ")) > -1) {
                        return true;
                    }
                }
            }
            return false;
        }
    };
    $http.get(" https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths")
        .then(function(response) {
            if (response.status === 200) {
                $scope.paths = response.data.paths;
                var paths = response.data.paths;
                var toatlPaths = paths.length;
                for (var i = 0; i < toatlPaths; i++) {
                    $scope.totalTags = $scope.totalTags.concat(paths[i].tags.split(","));
                }
            }
        });
});
