import { useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import Layout from "../../Components/Layout";
import OrderCard from "../../Components/OrderCard";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  if (index === "last") index = context.order?.length - 1;

  const currentOrder = context.order?.[index];

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>
        <h1>My Order</h1>
      </div>
      <div className="flex flex-col w-80">
        {currentOrder?.products.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.images}
            price={product.price}
          />
        ))}
      </div>
      <div className="flex flex-col w-80 mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between mb-2">
          <span className="font-light">Total products:</span>
          <span className="font-medium">{currentOrder?.totalProducts}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-light text-lg">Total:</span>
          <span className="font-bold text-lg">${currentOrder?.totalPrice}</span>
        </div>
      </div>
    </Layout>
  );
}

export default MyOrder;
