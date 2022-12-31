let emailValidator = require("deep-email-validator");
let User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
function authController() {
  return {
    login: (req, res) => {
      res.render("auth/login.ejs");
    },
    logout: (req, res) => {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/login");
      });
    },
    postLogin(req, res, next) {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          req.flash("username", req.body.email);
          next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          req.flash("username", req.body.email);
          return res.redirect("/login");
        }
        req.login(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            req.flash("username", req.body.email);
            return next(err);
          }
          if(req.user.role==="admin")return res.redirect('/admin/order')
          
           return   res.redirect("/");
        });
      })(req, res, next);
    },
    register: (req, res) => {
      res.render("auth/register.ejs");
    },
    postRegister: async (req, res) => {
      const { name, email, password } = req.body;
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("err", "Email already taken");
          req.flash("name", name);
          return res.redirect("/register");
        }
      });
      // hashing of password
      let hashedPassword = await bcrypt.hash(password, 10);
      // creation of user
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      async function isEmailValid(email) {
        return emailValidator.validate(email);
      }
      const { valid, reason, validators } = await isEmailValid(email);
      if (!valid) {
        req.flash("err", "Please provide a valid email !!");
        req.flash("name", name);

        return res.redirect("/register");
      }
      user
        .save()
        .then((user) => {
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("err", "something went wrong");
          req.flash("name", name);
          return res.redirect("/register");
        });
    },
    // userDetail:(req,res)=>{
    //   if(req.xhr){
    //     return res.json(req.user._id)
    //   }
    //   return res.redirect('/');
    // }
  };
}
module.exports = authController;
