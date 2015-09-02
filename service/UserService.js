/**
 * Created by aethons on 29/4/15.
 */

var User=require('../domain/User');
exports.getAllUsers=function(){
 var emitter=this;
    User.find({role:{$ne:"admin"}},function(err,result){
        if(err)
            emitter.emit('ERROR',err);
        else
            emitter.emit('SUCCESS',result);
    })
}.toEmitter();

exports.updateUser=function(user,userId){
    var emitter=this;
    User.update({_id:userId},user,function(err,result){
        if(err)
         emitter.emit("ERROR",err);
        else
        emitter.emit('SUCCESS',result);
    })
}.toEmitter();


exports.createUser=function(user){
    var emitter=this;
    console.log('user >>>',user);
    User.create(user,function(err,result){
        if(err)
            emitter.emit("ERROR",err);
        else
            emitter.emit('SUCCESS',result);
    })
}.toEmitter();

exports.getUserByNameAndPassword=function(name,password){

    var emitter=this;
    User.findOne({name:name,password:password},{password:0},function(err,result){
        if(err)
            emitter.emit("ERROR",err);
        else{
            console.log("::::::::::::",result);
            emitter.emit('SUCCESS',result);
        }
    })
}.toEmitter();

exports.getUserById=function(id){

    var emitter=this;
    User.findById(id,function(err,result){
        if(err)
            emitter.emit("ERROR",err);
        else{
            emitter.emit('SUCCESS',result);
        }
    })
}.toEmitter();