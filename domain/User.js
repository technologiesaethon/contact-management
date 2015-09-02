/**
 * Created by aethons on 29/4/15.
 */
var mongoose=require('mongoose');

var userSchema=new mongoose.Schema({

    name:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    role:{type:String,default:"guest"},
    update:{type:Boolean,default:true},
    create:{type:Boolean,default:true},
    delete:{type:Boolean,default:true},
    created_on:{type:Date,default:Date.now},
    modified_on:{type:Date,default:Date.now}
})

var User=mongoose.model('User',userSchema,'user');

module.exports=User;

