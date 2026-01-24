import { XMarkIcon } from "@heroicons/react/24/solid";

const OrderCard = (props) => {
  const { id, title, imageUrl, price, handleDelete } = props;
  const shouldRenderDelete = typeof handleDelete === "function";

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-black/10 bg-white p-3">
      <div className="flex items-center gap-3 min-w-0">
        <figure className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-lg bg-black/5">
          <img
            className="w-full h-full object-cover"
            src={imageUrl}
            alt={title}
            loading="lazy"
          />
        </figure>
        <p className="text-sm font-light text-black/80 truncate">{title}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <p className="text-base sm:text-lg font-medium">${price}</p>
        {shouldRenderDelete && (
          <button
            type="button"
            onClick={() => handleDelete(id)}
            className="p-1"
            aria-label="Remove item"
          >
            <XMarkIcon className="h-6 w-6 text-black cursor-pointer" />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
