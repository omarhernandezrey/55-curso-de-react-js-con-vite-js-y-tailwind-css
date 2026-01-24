import { ChevronRightIcon } from "@heroicons/react/24/solid";

const OrdersCard = (props) => {
  const { totalPrice, totalProducts } = props;

  return (
    <div className="w-full rounded-lg border border-black/10 bg-white p-4 sm:p-5 flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-sm text-black/60">01.02.23</span>
        <span className="text-sm font-light text-black/80">
          {totalProducts} articles
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold text-lg sm:text-xl">${totalPrice}</span>
        <ChevronRightIcon className="h-6 w-6 text-black/80" />
      </div>
    </div>
  );
};

export default OrdersCard;
