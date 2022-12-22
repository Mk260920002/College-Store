const Order = require('../../../models/order');
function orderController(){
    return {
        store(req,res){
         const {name,address,phone}=req.body;
         if(!name || !address || !phone){
            req.flash('error',"All fields required")
          return  res.redirect('/customer_adress')
         }
      const order=new Order({
            customerId:req.user._id,
            name:name,
            address:address,
            phone:phone,
            items:req.session.cart.items,

        })
        order.save().then((result)=>{
            delete req.session.cart
          return res.redirect('/')
        }).catch(err=>{
            req.flash('error','Something went wrong')
            return res.redirect('/customer_adress')
        })
        }
    }
}
module.exports=orderController