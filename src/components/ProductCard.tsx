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
    <Card className="flex flex-col h-full">
    <div className="relative w-full aspect-video">
      <img
        src={product.image || '/placeholder.png'}
        alt={product.name}
        className="object-cover w-full h-full"
      />
    </div>
    <CardHeader>
      <CardTitle>{product.name}</CardTitle>
      <CardDescription>${product.price}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="line-clamp-4 min-h-[2rem]">{product.description}</p>
    </CardContent>
    <CardFooter>
      <Button size="lg" className="w-full" onClick={() => handleAddToBasket()}>
        Add To Cart
      </Button>
    </CardFooter>
  </Card>
  
  );
}

export default ProductsCard;
