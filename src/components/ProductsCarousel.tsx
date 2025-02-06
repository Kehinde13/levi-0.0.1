import ProductsCard from "./ProductCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type ProductsCarouselProps = {
products: Array<{
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}>
}


export function ProductsCarousel({products} : ProductsCarouselProps) {
  return (
    <Carousel className="w-full my-10 md:my-20">
      <CarouselContent className="-ml-1">
        {products.map((product, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/4">
            <ProductsCard product={product}/>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext className="hidden md:block"/>
    </Carousel>
  )
}
