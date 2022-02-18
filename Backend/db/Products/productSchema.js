const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        require:true,
        unique:true
    },
    product_image:{
        type:String,
        require:true
    },
    product_desc:{
        type:String,
        require:true
    },
    product_cost:{
        type:Number,
        require:true
    },
    product_stock:{
        type:Number,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model("product", productSchema)

