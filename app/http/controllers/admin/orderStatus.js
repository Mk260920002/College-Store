const Order = require('../../../models/order');
function OrderStatus(){
    return {
        
            update(req,res){
                const {orderId,status}=req.body;
                Order.updateOne({_id:orderId},{status:status},(err,data)=>{
                   if(err){
                    return res.redirect('/admin/order')
                   }
                   const eventEmitter=req.app.get('eventEmitter')
                   eventEmitter.emit('orderUpdated',{id:orderId,status:status})
                   return res.redirect('/admin/order')
                })

                
              }
            
    }
}
module.exports=OrderStatus