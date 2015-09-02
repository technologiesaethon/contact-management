
var randToken=require('rand-token');
var userService=require('../service/UserService');
var parseMongooseError=require('../Utils/ParseMongooseError');

exports.getAllUsers=function(req,res) {
    if(req.session.user.role==='admin'){
     userService.getAllUsers().on('SUCCESS',function(result){
         res.send({status:200,error:null,data:result});
     }).on('ERROR',function(err){
         res.send({status:500,error:parseMongooseError(err),data:{}});
     })
    }else
    {
        res.send({status:500,error:"No Data Found",data:{}});
    }

}

exports.updateUser=function(req,res) {
    if(req.session.user.role==='admin'){
    var user=req.body;
    user.modified_on=new Date();
    var userId=req.params.id;
    userService.updateUser(user,userId).on('SUCCESS',function(result){
        res.send({status:200,error:null,data:result});
    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })
    }
    else
        res.send({status:500,error:"No Data Found",data:{}});
}

exports.getUserByNameAndPassword=function(req,res) {
    userService.getUserByNameAndPassword(req.body.username,req.body.password).on('SUCCESS',function(result){
        if(result){
            req.session.user=result;
            req.session.csrfToken=randToken.generate(16);
            res.send({status:200,error:null,data:result,csrftoken:req.session.csrfToken});
        }
        else{
          res.send({status:500,error:'invalid credentials',data:null});
        }
    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })

}

exports.createUser=function(req,res) {
    var user={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    userService.createUser(user).on('SUCCESS',function(result){
        req.session.csrfToken=randToken.generate(16);
        req.session.user=result;
        res.send({status:200,error:null,data:result,csrftoken:req.session.csrfToken});
    }).on('ERROR',function(error){
         res.render('login',{error:parseMongooseError(error)});
    })

}


exports.getUserById=function(req,res) {
      if(req.session.user.role='admin' || req.session.user._id===req.params.id) {
          userService.getUserById(req.params.id).on('SUCCESS', function (result) {
              res.send({status: 200, error: null, data: result});

          }).on('ERROR', function (err) {
              res.send({status: 500, error: parseMongooseError(err), data: {}});
          })
      }
    else{
          res.send({status:500,error:"No Data Found",data:{}});
      }

}
