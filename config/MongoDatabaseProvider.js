
var mongoose=require('mongoose');
var config=require('./Config.json');
function initMongoose(callback){
    var dbURI="mongodb://"+config.mongodb.username+":"+config.mongodb.password+"@"+config.mongodb.host+":"+config.mongodb.port+"/"+config.mongodb.db;
     console.log(dbURI);

     mongoose.connect(dbURI,{
        'auto_reconnect': true,
            'poolSize': 20,
            socketOptions: {keepAlive: 1}
    });
    mongoose.connection.on('connected',function(){
        console.log('connected');
    })
    mongoose.connection.on("disconnected",function(){
         console.log('disconnected');
    })
    mongoose.connection.on("error",function(err){
        console.log('error',err);
    });
    mongoose.connection.on('open',function(){
         console.log('open');
         callback();
    })
}

exports.initMongoose=function(callback){
    initMongoose(callback);
}