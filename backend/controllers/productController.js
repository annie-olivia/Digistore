import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
    try{
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;
        res.status(200).json({success: true, data: products})
    }catch(error){
        console.log("Error fetching products", error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
};

export const createProduct = async (req, res) => {
    const { name, image, price } = req.body;
    if(!name || !image || !price){
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    try{
        const newProduct = await sql`
            INSERT INTO products (name, image, price)
            VALUES (${name}, ${image}, ${price})
            RETURNING *
        `;
        console.log("New product added", newProduct);
        res.status(201).json({success: true, data: newProduct[0]});
    }catch(error){
        console.log("Error creating a product", error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try{
        const product = await sql`
            SELECT * FROM products
            WHERE id= ${id}
        `;
        res.status(200).json({success: true, data: product[0]});

    }catch(error){
        console.log("Error fetching product by id", error);
        res.status(500).json({success: false, message:"Internal Server Error"});
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, image, price } = req.body;

    try{
        const updateProduct= await sql`
            UPDATE products
            SET name= ${name}, image= ${image}, price= ${price}
            WHERE id= ${id}
            RETURNING *
        `;
        if(updateProduct.length === 0){
            return res.status(404).json({success: false, message: "Product not found"});
        }
        res.status(200).json({success: true, data: updateProduct[0]});
    }catch(error){
        console.log("Error updating product", error);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
};
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try{
        const deleteProduct = await sql`
            DELETE FROM products
            WHERE id= ${id}
            RETURNING *
        `;
        if(deleteProduct.length === 0){
            return res.status(404).json({success: false, message: "Product not found"});
        }
        res.status(200).json({success: true, message: "Product deleted successfully", data: deleteProduct[0]});
    }catch(error){
        console.log("Error deleting product", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};