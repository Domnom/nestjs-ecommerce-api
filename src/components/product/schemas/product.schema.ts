import * as mongoose from 'mongoose';


let ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    }
})


mongoose.model("Product", ProductSchema);

export {
    ProductSchema
}