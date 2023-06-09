const mongoose = require("mongoose")
require("./userSchema")
require("./productSchema")

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
      },
   
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
      },
    productReview:{
        type: String,
    },
    product_description:{
        type: String,
    },
   
    isActive :{
        type:Boolean,
        default: true
    }
    
})
reviewSchema.set('timestamps', true)
module.exports = mongoose.model('review', reviewSchema)