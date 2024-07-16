import { products } from "@/utils/products";
import Container from "./Components/Container";
import HomeBanner from "./Components/HomeBanner";
import { truncateText } from "@/utils/truncate";
import ProductCard from "./Components/products/ProductCard";


export default function Home() {
  return (
    <div className="p-9">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-9">
          {products.map((product: any) => {
            return <ProductCard data={product}/>
          })}
        </div>

      </Container>
    </div>
  );
}
