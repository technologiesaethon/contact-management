angular.module('contactApp').controller('AlertCtrl',['$scope','$modalInstance','alerts', function($scope,$modalInstance,alerts){
     console.log('alert controller called');
     $scope.alerts=alerts;
     $scope.ok=function(){
        $modalInstance.close();
    }
}]);