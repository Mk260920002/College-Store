const session = require("express-session");

function cartController(){
    return {
        cart: (req,res)=>{
            res.render('customer/cart.ejs')
        },
        update:(req,res)=>{
            
             if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalqty:0,
                    totalPrice:0
                }
             }
             let cart=req.session.cart;
             if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    item:req.body,
                    qty:1
                }
                cart.totalqty=cart.totalqty+1;
                cart.totalPrice=req.body.Price+cart.totalPrice;
             }
            else{
                 
                cart.items[req.body._id].qty=cart.items[req.body._id].qty+1;
                cart.totalqty=cart.totalqty+1;
                cart.totalPrice=req.body.Price+cart.totalPrice;
            }

          
         return res.json({totalqty:cart.totalqty});
         
        },
        delete_cart:(req,res)=>{
            let cart=req.session.cart;
            
           
            if(req.session.cart){
            cart.items[req.body.item._id].qty=cart.items[req.body.item._id].qty-1;
            cart.totalPrice=cart.totalPrice-req.body.item.Price;
            cart.totalqty=cart.totalqty-1; 
            if(cart.items[req.body.item._id].qty==0){
              delete cart.items[req.body.item._id];
            }
            
            if(cart.totalqty==0){
                
                delete req.session.cart;
              
            }
        }
        
       
       
         return res.json(cart);
       
        }
    }
} 
module.exports=cartController