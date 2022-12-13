const mongoose=require('mongoose')

const Schema=mongoose.Schema

const menuSchema=  new Schema({
    P_name:{type:String,required:true},
    Price:{type:Number,required:true},
    img:{type:String,required:true}
})

module.exports=mongoose.model('Menu',menuSchema);

