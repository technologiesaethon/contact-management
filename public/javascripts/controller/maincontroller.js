angular.module('contactApp').controller('MainCtrl',['$scope','$modal','$state','httpService','$window', function($scope,$modal,$state,httpService,$window){
       $scope.login=function(){
        var modal=$modal.open({
            templateUrl:'templates/login.html',
            controller:'LoginCtrl',
            size:'sm'
        })
        modal.result.then(function(){
            $scope.loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'));
        },function(err){})
    }

    $scope.signup=function(){
        var modal=$modal.open({
            templateUrl:'templates/signup.html',
            controller:'SignUpCtrl',
            size:'sm'
        })
        modal.result.then(function(){
            $scope.loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'));
        },function(err){})
    }

    $scope.logout=function(){
            //event.preventDefault();
        console.log('vikas gadha hai');
        httpService(function(err,result){
            if(err)
             console.log(err);
            else{
                console.log('Logout successfully');
                sessionStorage.removeItem('loggedUser');
               $window.open('index','_self');
            }
        },{method:"GET",url:"/logout"})
    }
}]);
