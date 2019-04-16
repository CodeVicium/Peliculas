var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    passwordconf:{
        type:String,
        required:true
    }



});
//extencion de Schema para autenticar usuario
UserSchema.static.authenticate = function(email,password,callback){
    User.findOne({email:email}).exec(
        function(err,user){
            if(err){
                return callback(err);
            }
            else if(!user){
                var err = new Error("Usuario no encontrado..");
                err.status=401;
                return callback(err);
            }
            // si no tengo error y tengo usuario continuo...
            bcrypt.compare(password,user.password,function(err,result){
                if(result==true){
                    return callback(null,user);
                }
                else {
                    var err = new Error("Clave Ingresada no valida");
                    err.status=401;
                    return callback(err);
                }
            });
        }
    );
};
// antes de guardar un usuario encripto la clave..
UserSchema.pre("save",function(next){
var user = this;
bcrypt.hash(user.password,10,function(err,hash){
    if(err){
        return next (err);
    }
    user.password=hash;
    user.passwordconf=hash;
    next();
}) ;
});

var User = mongoose.model("User",UserSchema);
module.exports= User;