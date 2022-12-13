function cartController(){
    return {
        cart: (req,res)=>{
            res.render('customer/cart.ejs')
        }
    }
} 
module.exports=cartController