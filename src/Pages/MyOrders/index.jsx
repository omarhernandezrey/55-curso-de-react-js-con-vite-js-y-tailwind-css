import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import OrdersCard from "../../Components/OrdersCard";

function MyOrders() {
  const context = useContext(ShoppingCartContext);

  return (
    <Layout>
      <header className="flex items-center justify-center relative w-full max-w-md mx-auto mb-6">
        <h1 className="text-xl sm:text-2xl font-medium">My Orders</h1>
      </header>

      <section className="flex flex-col w-full max-w-md mx-auto gap-3">
        {context.order.map((order, index) => (
          <Link key={index} to={`/my-orders/${index}`} className="w-full">
            <OrdersCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
            />
          </Link>
        ))}
      </section>
    </Layout>
  );
}

export default MyOrders;
