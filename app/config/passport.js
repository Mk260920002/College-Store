const LocalStratagie=require('passport-local').Strategy;
const User=require('../models/user')
const bcrypt=require('bcrypt')
function init(passport){
passport.use(new LocalStratagie({usernameField:'email'},async (email,password,done)=>{
 // login logic
  // first confirm the wether user exist with this email or not
  const user=await User.findOne({email:email});
  if(!user){
    return done(null,false,{message:"no user found with this email"});
  }
   bcrypt.compare(password,user.password).then((match)=>{
     if(match){
    return  done(null,user,{message:"Logedin successfully"})
     }
     return  done(null,false,{message:"Wrong username or password"})
   }).catch(err=>{
    if(err){
        return  done(null,false,{message:"Something went wrong"})
    }
   })
}))

passport.serializeUser((user,done)=>{
    done(null,user._id);
})
passport.deserializeUser((id,done)=>{
   User.findById(id,(err,user)=>{
    done(err,user);
   })
})
 
}
module.exports=init