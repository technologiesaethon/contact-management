angular.module('contactApp').controller('AdminCtrl',['$scope','$state','httpService', function($scope,$state,httpService){

    $scope.loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'));
    httpService(function(err,result){
        if(err)
            console.log(err);
        else{
            if(result.status===200){
                $scope.users=result.data;
            }
        }

    },{method:"GET",url:"/user"})
    $scope.change=function(user){
        httpService(function(err,result){
            if(err)
                console.log(err);
            else{
                console.log(result);
            }

        },{method:"PUT",url:"/user/"+user._id,headers:{"content-type":"application/json"},data:user});
    }

}]);