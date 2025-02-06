import { useEffect, useState } from "react";
import axios from "axios";
import { ProductsCarousel } from "./ProductsCarousel";

const API_URL = "http://localhost:3005/api/products"
interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

function Products() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<IProduct[]>(API_URL);
                setProducts(response.data);
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
            {loading && <p>Loading products...</p>}

            {/* Display Error if API Fails */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Render Carousel only when products are available */}
            {!loading && !error && <ProductsCarousel products={products} />}
        </div>
    );
}

export default Products;
