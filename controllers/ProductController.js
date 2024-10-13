import Products from "../models/ProductModel.js";
import multer from "multer";
import path from 'path'

export const ProductsController = async (req, res) => {
    try {

        const data = await Products.find();
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        return res.status(200).send({
            success: true,
            message: "Products Loaded",
            data,
            // data: data.map(product => ({
            //     _id: product._id,
            //     title: product.title,
            //     price: product.price,
            //     description: product.description,
            //     category: product.category,
            //     image: product.image,
            //     rating: product.rating,
            // })),
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Products",
            error: error.message, 
        });
    }
};

export const ProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Product Loaded",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in single Product",
            error: error.message, 
        });
    }
};



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});


const upload = multer({ storage });


export const AddProduct = async (req, res) => {
    try {
       
        const imagePath = req.file.path;

        const { title, price, description, category } = req.body;


        const product = new Products({
            title: title,
            price: price,
            description: description,
            category: category,
            image: imagePath, 
        });

        await product.save();

        res.status(200).send({
            success: true,
            message: "Product Added",
            product,
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Add Product controller",
            error,
        });
    }
};

export const uploadProductImage = upload.single('image');
