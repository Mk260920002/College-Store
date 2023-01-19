
const menu=require('../../models/menu')
function homeController(){
    return {
        index: async (req,res)=>{
            const items= await menu.find();
           
            return  res.render('home',{items:items});
            
        }
    }
} 
module.exports=homeController