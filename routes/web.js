
const homeController= require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartController=require('../app/http/controllers/customer/cartController')
const orderController=require('../app/http/controllers/customer/orderController')
const guest=require('../app/http/middleware/guest')
const Orderguest=require('../app/http/middleware/Orderguest')
function init_routes(app){
    
app.get('/',homeController().index)
app.get('/login',guest,authController().login)
app.post('/login',authController().postLogin);
app.post('/logout',authController().logout)
app.get('/register',guest,authController().register)
app.get('/cart',cartController().cart)
app.post('/update-cart',cartController().update)
app.post('/delete-cart',cartController().delete_cart)
app.post('/register',authController().postRegister)
app.post('/customer/order',orderController().store)
app.get('/customer/order',Orderguest,orderController().index)
app.get('/customer/address',(req,res)=>{
    res.render('customer/address.ejs')
})
}

module.exports=init_routes