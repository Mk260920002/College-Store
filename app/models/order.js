const mongoose=require('mongoose')
const User=require('./user')
const Schema=mongoose.Schema

const orderSchema=  new Schema({
    customerId:{type: Schema.Types.ObjectId,ref:User,required:true},
    name:{type:String,required:true},
    items:{type:Object,required:true},
    totalPrice:{type:Number,required:true},
    address:{type:String,required:true},
    phone:{type:String,required:true},
    role:{type:String,default:"COD"},
    status:{type:String,default:"Order_placed"}
},{
    timestamps:true
})


module.exports=mongoose.model('order',orderSchema);

