
const homeController= require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartController=require('../app/http/controllers/customer/cartController')
const orderController=require('../app/http/controllers/customer/orderController')
const AdminOrderController=require('../app/http/controllers/admin/orderController')
const AdminOrderStatus=require('../app/http/controllers/admin/orderStatus')
// middleware
const guest=require('../app/http/middleware/guest')
const auth=require('../app/http/middleware/auth')
const admin=require('../app/http/middleware/admin')
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
app.post('/customer/order',auth,orderController().store)
app.get('/customer/order',auth,orderController().index)
app.get('/customer/order/:id',auth,orderController().detail)
app.get('/admin/order',admin,AdminOrderController().index)
app.post('/admin/order/status',admin,AdminOrderStatus().update)

app.get('/customer/address',auth,(req,res)=>{
    res.render('customer/address.ejs')
})
}

module.exports=init_routes