/**
 * Created by aethons on 29/4/15.
 */
/**
 * Created by aethons on 29/4/15.
 */
var mongoose=require('mongoose');
var User=require('./User');
var contactSchema=new mongoose.Schema({
    first:{type:String,required:true},
    last:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    created_on:{type:Date,default:Date.now},
    modified_on:{type:Date,default:Date.now},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'}

})

var Contact=mongoose.model('Contact',contactSchema,'contact');

module.exports=Contact;