import NoResults from "@/components/ui/NoResults";
import ProductCard from "@/components/ui/ProductCard";
import { IProduct } from "@/types";

interface ProductListProps {
  products: IProduct[];
  title: string;
}

const ProductList: React.FC<ProductListProps> = ({ title, products }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl mb-8">{title}</h3>
      {products.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
