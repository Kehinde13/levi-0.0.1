import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

type Prop = {
  product: {
    name: string;
    price: string;
    discount: string;
    ratings: number;
    feedbacks: number;
    image: string;
  }
};

function ProductsCard({ product }: Prop) {
  
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <img src={product.image} width={400} height={200} alt={product.name} />
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{/* {formatCurrency(product.price / 100)} */}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* <p className="line-clamp-4">{product.description}</p> */}
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full" /* onClick={(e) => addProductToBasket( product.id)} */>
        Add To Cart{/* <Link href={`/products/${product.id}/purchase`}></Link> */}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductsCard;
