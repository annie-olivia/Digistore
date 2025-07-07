import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,
    currentProduct: null,

    formData:{
        name: "",
        price: "",
        image: ""
    },

    setFormData: (formData) => set({ formData}),
    resetForm: () => set({formData: {name: "", price: "", image: ""}}),
    
    addProduct: async (e) => {
        e.preventDefault();
        set({loading: true});
        try{
            const {formData} = get();
            await axios.post(`${BASE_URL}/api/products`, formData);
            await get().fetchProducts();
            get().resetForm();
            toast.success("Product added successfully");
            document.getElementById("add_product_modal").close();
        }catch(error){
            console.log("Error in adding product", error);
            toast.error("Failed to add product. Please try again later.");
        }finally{
            set({loading:false});
        }
    },

    fetchProducts: async () => {
        set({loading:true});
        try{
            const response = await axios.get(`${BASE_URL}/api/products`);
            set({products: response.data.data, error: null});
        }catch (err){
            if(err.status == 429) set({error: "Rate limit exceeded", products: []});
            else set({ error: "Something went wrong. Please try again later.", products:[] });
        }finally{
            set({loading: false});
        }
    },

    deleteProduct: async (id) => {
        set({loading: true});
        try{
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            set(prev => ({
                products: prev.products.filter((product) => product.id!== id)
            }));
            toast.success("Product deleted successfully");
        } catch (error){
            console.log("Error in deleting product", error);
            toast.error("Failed to delete product. Please try again later.");
        }finally{
            set({loading: false});
        }
    },

    fetchProduct: async (id) => {
        if (!id || typeof id !== "string" || id.trim() === ":" || id.includes(":")) {
            console.warn("Invalid product ID passed to fetchProduct:", id);
            toast.error("Invalid product ID");
            return;
        }
        set({loading: true});
        try{
            const response = await axios.get(`${BASE_URL}/api/products/${id}`);
            set({
                currentProduct: response.data.data,
                formData: response.data.data,
                error: null,
            });
        }catch (error){
            console.log("Error in fetching product", error);
            set({error: "Failed to fetch product. Please try again later.", currentProduct: null});
        }finally{
            set({loading: false});
        }
    },

    updateProduct: async (id) => {
        set({loading: true});
        try{
            const {formData} = get();
            const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
            set({ currentProduct: response.data.data});
            toast.success("Product updated successfully");
        }catch(error){
            toast.error("Failed to update product. Please try again later.");
            console.log("Error in updating product", error);
        }finally{
            set({loading: false});
        }
    },
}));