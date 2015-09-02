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
angular.module('contactApp').controller('LoginCtrl',['$scope','$modalInstance','$state','httpService',function($scope,$modalInstance,$state,httpService){

    $scope.login=function(){

        if($scope.loginForm.$invalid){
            $scope.submitForm=true;

        }
        else {
            httpService(function (err, result) {
                if (err)
                    console.log('error occurs');
                else {
                    if (result.status === 200) {
                        sessionStorage.setItem('loggedUser', JSON.stringify(result.data));
                        $modalInstance.close();
                        if(result.data.role==='guest')
                            $state.go('contact.all');
                        else
                            $state.go('admin.alluser');
                    }
                    else if (result.status === 500) {
                        $scope.errorMessage = result.error;
                    }
                }
            }, {url: "/login", method: "POST", data: $scope.user});
        }
    }
    $scope.cancel=function(){
        $modalInstance.dismiss();
    }
}])

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

angular.module('contactApp').controller('AlertCtrl',['$scope','$modalInstance','alerts', function($scope,$modalInstance,alerts){
     console.log('alert controller called');
     $scope.alerts=alerts;
     $scope.ok=function(){
        $modalInstance.close();
    }
}]);