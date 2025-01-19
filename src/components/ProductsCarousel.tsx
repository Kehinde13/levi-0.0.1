import ProductsCard from "./ProductCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { flashSales } from "@/lib/products";

type ProductsCarouselProps = {
  products: typeof flashSales
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
