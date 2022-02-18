const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    order_data:{
        type:Array   },
    order_date:{
        type:Date,
        default:Date.now
    },
    address:{
        type:Object
    },
    paymentmethod:{
        type:String
    },
    transactiondetail:{
        type:Object
    }
})
module.exports = mongoose.model("order", orderSchema)