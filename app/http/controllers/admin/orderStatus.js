const Order = require('../../../models/order');
function OrderStatus(){
    return {
        
            update(req,res){
                const {orderId,status}=req.body;
                Order.updateOne({_id:orderId},{status:status},(err,data)=>{
                   if(err){
                    return res.redirect('/admin/order')
                   }
                   return res.redirect('/admin/order')
                })

                
              }
            
    }
}
module.exports=OrderStatus