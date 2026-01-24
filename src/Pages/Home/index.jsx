import { useContext } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return context.filteredItems?.map((item) => (
        <Card key={item.id} data={item} />
      ));
    } else {
      return (
        <div className="col-span-full text-center text-black/60">
          We don't have anything :(
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-full mb-4">
        <h1 className="font-medium text-xl sm:text-2xl">Exclusive Products</h1>
      </div>
      <input
        type="text"
        placeholder="Search a product"
        className="block rounded-lg border border-black w-full max-w-md mx-auto p-3 sm:p-4 mb-4 focus:outline-none"
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full place-items-stretch">
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
