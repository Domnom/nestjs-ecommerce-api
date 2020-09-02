import * as mongoose from 'mongoose';



let OrderSchema = new mongoose.Schema({
    user_id: {
        type : String,
        ref : "User",
        required : true
    },
    delivery_details : {
        name : {
            type : String,
            required : true
        },
        street : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true,
        },
        country : {
            type : String,
            required : true,
        }
    },
    products : [
        {
            product_id: {
                type : String,
                ref : "Product",
                required : true
            },
            name : {
                type : String,
                required : true
            },
            price : {
                type : Number,
                required : true
            },
            quantity : {
                type : Number,
                required : true
            }
        }
    ]
})


mongoose.model("Order", OrderSchema);

export {
    OrderSchema
}