
angular.module('contactApp').config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){

        $stateProvider.state('home',{
            url:'/home',
            templateUrl:'templates/home.html'
        }).state('admin',{
            url:'^/admin',
            abstract:true,
            controller:'AdminCtrl',
            templateUrl:'templates/leftrightview.html'
        }).state('admin.alluser',{
            url:'^/alluser',
            views:{
                leftbar:{templateUrl:"templates/adminleftbar.html"},
                rightbar:{templateUrl:'templates/userall.html'}
            }
        }).state('contact',{
            url:'^/contact',
            abstract:true,
            controller:'ContactCtrl',
            templateUrl:'templates/leftrightview.html'
        }).state('contact.all',{
            url:'^/allcontact',
            views:{
                leftbar:{templateUrl:"templates/leftbar.html"},
                rightbar:{templateUrl:'templates/contactall.html'}
            }
        }).state('contact.edit',{
            url:'^/edit',
            views:{
                leftbar:{templateUrl:"templates/leftbar.html"},
                rightbar:{templateUrl:'templates/contactedit.html'}
            }
        }).state('contact.create',{
            url:'^/create',
            views:{
                leftbar:{templateUrl:"templates/leftbar.html"},
                rightbar:{templateUrl:'templates/contactedit.html'}
            }
        })
    $httpProvider.interceptors.push(function(){
        return {
            request:function(config){
                return config;
            },
            response:function(response){
                return response;
            }
        }
    })

    }])
