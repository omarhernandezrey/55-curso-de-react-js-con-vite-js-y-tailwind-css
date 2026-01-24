import { useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import Layout from "../../Components/Layout";
import OrderCard from "../../Components/OrderCard";
import { getProductImageUrl } from "../../utils";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  if (index === "last") index = context.order?.length - 1;

  const currentOrder = context.order?.[index];

  return (
    <Layout>
      <header className="grid grid-cols-3 items-center w-full max-w-md mx-auto mb-6">
        <Link to="/my-orders" className="justify-self-start p-1 -ml-1">
          <ChevronLeftIcon className="h-6 w-6 text-black" />
        </Link>
        <h1 className="justify-self-center text-xl sm:text-2xl font-medium">
          My Order
        </h1>
        <div />
      </header>

      <section className="flex flex-col w-full max-w-md mx-auto gap-3">
        {currentOrder?.products.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={getProductImageUrl(product)}
            price={product.price}
          />
        ))}
      </section>

      <section className="w-full max-w-md mx-auto mt-6 rounded-lg border border-black/10 bg-white p-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-black/70">Total products</span>
          <span className="font-medium">{currentOrder?.totalProducts}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-black/70">Total</span>
          <span className="font-bold text-xl">${currentOrder?.totalPrice}</span>
        </div>
      </section>
    </Layout>
  );
}

export default MyOrder;
