/**
 * Created by aethons on 1/5/15.
 */

module.exports=function(error){
    var errorMessage=null;
    if(error && error.name && error.name==="ValidationError"){
        var errorKey="";
        for(var err in error.errors){
            errorKey+=err;
            break;
        }
        errorMessage=errorKey+" is required";
    }
    else if(error && error.name && error.name==="MongoError"){
        errorMessage=error.message.substring(error.message.indexOf("dup key: { :")+"dup key: { :".length,error.message.lastIndexOf("}"));
        errorMessage=errorMessage.substring(errorMessage.indexOf("\"")+1,errorMessage.lastIndexOf("\""))+" already exists";

    }
    else{
        errorMessage=error;
    }
    return errorMessage;
}