let User=require('../../models/user')
const bcrypt=require('bcrypt')
function authController(){
      return {
        login:(req,res)=>{
            res.render('auth/login.ejs')
        },
        register:(req,res)=>{
            res.render('auth/register.ejs')
        },
        postRegister: async (req,res)=>{
          const {name,email,password}=req.body;
          User.exists({email:email},(err,result)=>{
              if(result){
                req.flash('err',"Email already taken");
                return res.redirect('/register')
              }
          })
          // hashing of password
          let hashedPassword=await bcrypt.hash(password,10)
          // creation of user
          const user=new User({
            name:name,
            email:email,
            password:hashedPassword
          })
          
          user.save().then((user)=>{
           res.redirect('/')
          }).catch((err)=>{
            req.flash('err',"something went wrong")
            res.redirect('/register')
          })
        }
      }
}
module.exports=authController