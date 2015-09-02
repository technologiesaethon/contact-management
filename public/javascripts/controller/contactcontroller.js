angular.module('contactApp').controller('ContactCtrl',['$scope','httpService','$state','$modal', function($scope,httpService,$state,$modal){

    $scope.loggedUser=JSON.parse(sessionStorage.getItem('loggedUser'));
    $scope.formValidation={}
    httpService(function(err,result){
        if(err)
            console.log(err);
        else
        {
            if(result && result.status===200)
                $scope.contacts=result.data;
        }

    },{method:"GET",url:"/contact"})


    $scope.create=function(){
     httpService(function(err,result){
            if(err)
                console.log(err);
            else{
                if(result.status===200){
                    if(result.data.create){
                        $scope.modifiedObject={};
                        $scope.modifiedObject.user_id=$scope.loggedUser._id;
                        $state.go('contact.create');
                    }
                    else{
                        $modal.open({
                            templateUrl:'templates/alert.html',
                            controller:'AlertCtrl',
                            size:'sm',
                            resolve:{
                                alerts:function(){
                                    return {'alert':"Don't have permission,contact to Admin"}
                                }
                            }

                        })
                    }
                }
            }
        },{method:"GET",url:"/user/"+$scope.loggedUser._id})

    }
    $scope.update=function(item){
        $scope.submitForm=false;
        httpService(function(err,result){
            if(err)
                console.log(err);
            else{
                if(result.status===200){

                    if(result.data.update){
                        $scope.modifiedObject=angular.copy(item);
                        $scope.modifiedObject.user_id=$scope.loggedUser._id;
                        $state.go('contact.edit');
                    }
                    else{
                        $modal.open({
                            templateUrl:'templates/alert.html',
                            controller:'AlertCtrl',
                            size:'sm',
                            resolve:{
                                alerts:function(){
                                    return {'alert':'you dont have permission to update it ,contact to Admin'}
                                }
                            }

                        })
                    }
                }
            }
        },{method:"GET",url:"/user/"+$scope.loggedUser._id})

    }
    $scope.delete=function(item){
        httpService(function(err,result){
            if(err)
                console.log(err);
            else{

                if(result.status===200){
                   if(result.data.delete){
                       httpService(function(err,result){
                           console.log('>>>>>>>>>',err,result);
                           if(err)
                               console.log(err);
                           else
                           {
                               if(result && result.status===200)
                                   $scope.contacts.splice($scope.contacts.indexOf(item),1);
                           }

                       },{method:"DELETE",url:"/contact/"+item._id})
                   }
                    else{
                       $modal.open({
                           templateUrl:'templates/alert.html',
                           controller:'AlertCtrl',
                           size:'sm',
                           resolve:{
                               alerts:function(){
                                   return {'alert':'you dont have permission to delete it ,contact to Admin'}
                               }
                           }

                       })
                   }
                }
            }
        },{method:"GET",url:"/user/"+$scope.loggedUser._id})



    }

    $scope.save=function(contactForm){

            if ($scope.modifiedObject._id) {

                httpService(function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        httpService(function (err, result) {
                            if (err)
                                console.log(err);
                            else {
                                if (result && result.status === 200) {
                                    $scope.contacts = result.data;
                                    $state.go('contact.all');
                                }
                                else {
                                    console.log(">>>>", result.error);
                                }
                            }

                        }, {method: "GET", url: "/contact", params: {user_id: $scope.loggedUser._id}})
                    }

                }, {method: "PUT", headers: {"content-type": "application/json"}, url: '/contact/' + $scope.modifiedObject._id, data: $scope.modifiedObject});
            }
            else {

                httpService(function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        httpService(function (err, result) {
                            if (err)
                                console.log(err);
                            else {
                                if (result && result.status === 200) {
                                    $scope.contacts = result.data;
                                    $state.go('contact.all');
                                }
                                else {
                                    console.log(">>>>", result.error);
                                }
                            }

                        }, {method: "GET", url: "/contact"})
                    }

                }, {method: "POST", headers: {"content-type": "application/json"}, url: '/contact', data: $scope.modifiedObject});
            }

    }

    $scope.cancel=function(){
        $scope.modifiedObject=null;
        $state.go('contact.all');
    }
}]);