module.exports=function(){
    return function(req,res,next){
        var csrfToken=req.headers['x-csrftoken'];
        var url=req.url;
        console.log('session',req.session.csrfToken,'header',csrfToken);
        if(url==='/'||url==='/index' || url==='/login' || url==='/signup' || (url!=='/'  && url!=='/login' && url!=='/signup' && url!=='/index' && req.session && req.session.csrfToken && (req.session.csrfToken===csrfToken))){

                next();

        }
        else{
            res.send({status:401,error:"UNAUTHORIZED",data:{}})
        }
    }
}