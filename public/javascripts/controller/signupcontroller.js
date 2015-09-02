angular.module('contactApp').controller('SignUpCtrl',['$scope','$modalInstance','$state','httpService', function($scope,$modalInstance,$state,httpService){

    $scope.signup=function(){
        if($scope.signUpForm.$invalid){
            $scope.submitForm=true;
        }
        else {
            httpService(function (err, result) {
                if (err)
                    console.log(err);
                else {
                    if (result.status === 200) {

                        sessionStorage.setItem('loggedUser', JSON.stringify(result.data));

                        $modalInstance.close();
                        $state.go('contact.all');
                    }
                    else if (result.status === 500 && result.error) {
                        $scope.errorMessage = result.error;
                    }

                }
            }, {method: "POST", headers: {"content-type": "application/json"}, url: "/signup", data: $scope.user});
        }
    }
    $scope.cancel=function(){
        $modalInstance.dismiss();
    }
}]);