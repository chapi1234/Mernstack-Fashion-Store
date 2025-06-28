
import { v2 as cloudinary } from 'cloudinary';
import ProductModel from '../models/productModel.js';


export const addProduct = async (req, res) => {
     try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        console.log(req.files);

        
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [ image1, image2, image3, image4 ].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: 'image'
                });
                return result.secure_url;
            })
        )
        
        const productData = new ProductModel({
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: sizes.split(','),
            bestSeller: bestSeller === 'true' ? true : false,
            date: Date.now()
        })

        console.log(productData);

        const product = await productData.save();

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: product
        })

     } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false, 
            message: err.message
        });
     }
}

export const listProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({}).sort({ date: -1 });
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            products
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

export const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success:false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product removed successfully'
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

}

export const singleProduct = async (req, res) => {

    try {
        const { productId } = req.body;
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: product
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}