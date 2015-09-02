angular.module('contactApp').factory('httpService',['$http', function($http){
    return function(callback,config){
        $http(config).success(function(data) {
            console.log('httpService Success ', data);
            callback(null,data);
        }).error(function(error) {
            console.log('httpService Error: ', error);
            callback(error,null);
        });
    }
}]);