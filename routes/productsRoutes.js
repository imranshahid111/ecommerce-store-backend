import express from "express";
import { AddProduct, ProductController, ProductsController, uploadProductImage } from "../controllers/ProductController.js";
import { requireSignin } from "../middlewares/authMiddleware.js";

const router =  express.Router();

router.get('/products',ProductsController);
router.get('/products/:id',ProductController);
router.post('/products/addproduct', requireSignin , uploadProductImage, AddProduct);
export default router;
