import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDesc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    sizes: {
        type: Array,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    bestSeller: {
        type: Boolean,
        default: false,
    }
})

const Product = mongoose.model('Product', productSchema);
export default Product;

