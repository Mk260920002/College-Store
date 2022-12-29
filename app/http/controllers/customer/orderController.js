const Order = require('../../../models/order');
function orderController(){
    return {
        store(req,res){
         const {name,address,phone}=req.body;
         if(!name || !address || !phone){
            req.flash('error',"All fields required")
          return  res.redirect('/customer/address')
         }
      const order=new Order({
            customerId:req.user._id,
            name:name,
            address:address,
            phone:phone,
            items:req.session.cart.items,
            totalPrice:req.session.cart.totalPrice
        })
        order.save().then((result)=>{
          Order.populate(result,{path:'customerId'},(err,placedOrder)=>{
            if(placedOrder){
            const eventEmitter=req.app.get('eventEmitter')
            eventEmitter.emit('orderPlaced',placedOrder);
            }
          })
                
            delete req.session.cart
          return res.redirect('/customer/order')
        }).catch(err=>{
            req.flash('error','Something went wrong')
            return res.redirect('/customer/address')
        })
        },
       
       index: async (req,res)=>{
          const arr=await Order.find({customerId:req.user._id}).sort({createdAt:-1});
          //console.log(item)
          
          
          return res.render("customer/order.ejs",{arr:arr})
        },
        detail: async (req,res)=>{
          let order=await Order.findById(req.params.id);
          if(order.customerId.toString()===req.user._id.toString()){
            return res.render('customer/orderDetail.ejs',{order})
          }
         
          return res.redirect('/')
        }
     
    }
}
module.exports=orderController