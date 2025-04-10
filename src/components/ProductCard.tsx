import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useBasket } from "@/hooks/useBasket";

type Prop = {
  product: {
    name: string;
    description: string;
    _id: string;
    price: number;
    category: string;
    stock: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  }
};

function ProductsCard({ product }: Prop) {

  const {addProductToBasket} = useBasket()
  
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  const handleAddToBasket = () => {
    addProductToBasket(product._id, {
      id: product._id, // Convert _id to id
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1, // Ensure quantity exists
    });
  };

  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <img src={product.image || '/placeholder.png'} width={400} height={200} alt={product.name} />
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription> {formatCurrency(product.price / 100)} </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{product.description}</p> 
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full" onClick={() => handleAddToBasket()}>
        Add To Cart{/* <Link href={`/products/${product.id}/purchase`}></Link> */}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductsCard;
