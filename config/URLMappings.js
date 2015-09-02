
var userController=require('../controller/UserController');
var contactController=require('../controller/ContactController');
var readDirFiles=require('../Utils/ReadDirFiles.js');

module.exports=function(app){
    app.get('/',function(req,res){
       res.redirect('/index');
    })

    app.get('/index',function(req,res){
         res.render('index',{cache:readDirFiles(__dirname+"/../public")});
    })

    app.get('/logout',function(req,res){
        try{
         req.session.destroy();
         res.send({status:200,error:'',data:"logout"});
        }catch(e){
         res.send({status:500,error: e.message,data:null});
        }

    })


    app.get('/contact/:id',contactController.getContactById);
    app.get('/contact',contactController.getAllContact);
    app.put('/contact/:id',contactController.updateContact);
    app.post('/contact',contactController.createContact);
    app.delete('/contact/:id',contactController.deleteContactById);



    app.get('/user',userController.getAllUsers);
    app.get('/user/:id',userController.getUserById)
    app.put('/user/:id',userController.updateUser);
    app.post('/login',userController.getUserByNameAndPassword);
    app.post('/signup',userController.createUser);

}
