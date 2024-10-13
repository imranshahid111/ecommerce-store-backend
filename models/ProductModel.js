import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "user",
    },
    image: {
        data: String,
        contentType: String
    },
    category: {
        type: String,
        
    },
    rating: {
        rate: {
            type: Number, 
            default: 0, 
            },
        count: {
            type: Number, 
            default: 0, 
        },
    },
}, { timestamps: true }); 

const Products = mongoose.model('Products', productSchema); 

export default Products;
