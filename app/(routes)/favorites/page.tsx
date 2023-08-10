import getFavoriteProducts from "@/actions/getFavoriteProducts";

import ProductList from "@/components/ProductList";

const FavoritesPage = async () => {
  const products = await getFavoriteProducts();

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p>No favorites found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 py-10">
      <ProductList title="Favorited products" products={products} />
    </div>
  );
};

export default FavoritesPage;
