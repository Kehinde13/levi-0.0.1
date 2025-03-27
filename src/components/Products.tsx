import { useEffect, useState } from "react";
import axios from "axios";
import { ProductsCarousel } from "./ProductsCarousel";
import { ApiProductResponse, IProduct } from "@/lib/types";
import loader from "@/assets/Animation Fire GIF by Chris Gannon.gif";

const API_URL = import.meta.env.VITE_API_URL;


function Products() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await axios.get<ApiProductResponse>(`${API_URL}/products`); 
                setProducts(response.data.products); 
            } catch (err) {
                setError("Failed to load products");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, []);
    

    return (
        <div className="lg:p-20 md:p-10 p-5 w-full">
            <div className="flex text-[#DB4444] items-center gap-3 mb-10 font-semibold">
                <div className="w-4 h-10 bg-[#DB4444] rounded-sm" />
                <h1>Our Products</h1>
            </div>

            <h1 className="md:text-4xl text-2xl font-semibold">Explore Our Products</h1>

            {/* Display Loading State */}
            {loading && <img src={loader} alt="Loading..." className="w-full" />}

            {/* Display Error if API Fails */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Render Carousel only when products are available */}
            {!loading && !error && <ProductsCarousel products={products} />}
        </div>
    );
}

export default Products;
