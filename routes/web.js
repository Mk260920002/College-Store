
const homeController= require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartController=require('../app/http/controllers/customer/cartController')
function init_routes(app){
    
app.get('/',homeController().index)
app.get('/login',authController().login)
app.get('/register',authController().register)
app.get('/cart',cartController().cart)
app.post('/update-cart',cartController().update)
app.get('/customer_adress',(req,res)=>{
    res.render('customer/adress.ejs')
})
}
module.exports=init_routes