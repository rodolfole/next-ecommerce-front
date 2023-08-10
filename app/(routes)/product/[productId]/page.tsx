import getProduct from "@/actions/getProduct";
import getProducts from "@/actions/getProducts";
import Gallery from "@/components/Gallery";
import Info from "@/components/Info";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/Container";

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 w-[380px]">
              <Info product={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Products" products={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
