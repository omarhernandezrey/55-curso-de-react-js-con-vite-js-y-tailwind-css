import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";

const NAV_CATEGORIES = [
  { label: "All", path: "/", value: null },
  { label: "Clothes", path: "/clothes", value: "clothes" },
  { label: "Electronics", path: "/electronics", value: "electronics" },
  { label: "Furnitures", path: "/furnitures", value: "furnitures" },
  { label: "Toys", path: "/toys", value: "toys" },
  { label: "Others", path: "/others", value: "others" },
];

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";

  const shouldShowBottomNav =
    !context.isCheckoutSideMenuOpen && !context.isProductDetailOpen;

  const categoryLinkClass = ({ isActive }) => {
    const base =
      "inline-flex items-center rounded-full px-3 py-1 text-sm transition-colors";

    return isActive
      ? `${base} bg-black text-white`
      : `${base} bg-black/5 text-black hover:bg-black/10`;
  };

  const categoryLinkClassMobile = ({ isActive }) => {
    const base =
      "flex w-full justify-center rounded-full px-2 py-1 text-[12px] leading-5 transition-colors";

    return isActive
      ? `${base} bg-black text-white`
      : `${base} bg-black/5 text-black hover:bg-black/10`;
  };

  const actionLinkClass = ({ isActive }) => {
    const base = "transition-colors";
    return isActive ? `${base} ${activeStyle}` : base;
  };

  const tabletPillLinkClass = ({ isActive }) => {
    const base =
      "flex w-full justify-center rounded-full px-3 py-2 text-xs md:text-sm transition-colors";

    return isActive
      ? `${base} bg-black text-white`
      : `${base} bg-black/5 text-black hover:bg-black/10`;
  };

  return (
    <>
      {/* Desktop navbar (lg+) */}
      <nav className="hidden lg:flex justify-between items-center fixed z-10 top-0 w-full h-[68px] bg-white/90 backdrop-blur border-b border-black/10 px-8 text-sm font-light">
        <ul className="flex items-center gap-4">
          <li className="font-semibold text-lg mr-2">
            <NavLink to="/">Shopi</NavLink>
          </li>

          {NAV_CATEGORIES.map((category) => (
            <li key={category.label}>
              <NavLink
                to={category.path}
                onClick={() => context.setSearchByCategory(category.value)}
                className={categoryLinkClass}
              >
                {category.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <ul className="flex items-center gap-4">
          <li className="text-black/60">teff@platzi.com</li>
          <li>
            <NavLink to="/my-orders" className={actionLinkClass}>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-account" className={actionLinkClass}>
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-in" className={actionLinkClass}>
              Sign In
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              onClick={() => context.openCheckoutSideMenu()}
              className="flex items-center gap-2 hover:opacity-80"
              aria-label="Open cart"
            >
              <ShoppingBagIcon className="h-6 w-6 text-black" />
              <div>{context.cartProducts.length}</div>
            </button>
          </li>
        </ul>
      </nav>

      {/* Tablet navbar (sm..lg-1): app bar + categorías tipo chips + acciones */}
      <nav className="hidden sm:flex lg:hidden fixed z-10 top-0 w-full bg-white/90 backdrop-blur border-b border-black/10">
        <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-3 px-6 py-3">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="font-semibold text-lg">
              Shopi
            </NavLink>

            <button
              type="button"
              onClick={() => context.openCheckoutSideMenu()}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-black/5"
              aria-label="Open cart"
            >
              <ShoppingBagIcon className="h-6 w-6 text-black" />
              {context.cartProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                  {context.cartProducts.length}
                </span>
              )}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <NavLink to="/my-orders" className={tabletPillLinkClass}>
              My Orders
            </NavLink>
            <NavLink to="/my-account" className={tabletPillLinkClass}>
              My Account
            </NavLink>
            <NavLink to="/sign-in" className={tabletPillLinkClass}>
              Sign In
            </NavLink>
          </div>

          <ul className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {NAV_CATEGORIES.map((category) => (
              <li key={category.label}>
                <NavLink
                  to={category.path}
                  onClick={() => context.setSearchByCategory(category.value)}
                  className={categoryLinkClassMobile}
                >
                  {category.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile navbar (xs): app bar simple + categorías + bottom-nav fija (sin hamburguesa) */}
      <nav className="sm:hidden fixed z-10 top-0 w-full bg-white/90 backdrop-blur border-b border-black/10">
        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="font-semibold text-lg">
              Shopi
            </NavLink>
            <button
              type="button"
              onClick={() => context.openCheckoutSideMenu()}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-black/5"
              aria-label="Open cart"
            >
              <ShoppingBagIcon className="h-6 w-6 text-black" />
              {context.cartProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                  {context.cartProducts.length}
                </span>
              )}
            </button>
          </div>

          <ul className="grid grid-cols-3 gap-2">
            {NAV_CATEGORIES.map((category) => (
              <li key={category.label}>
                <NavLink
                  to={category.path}
                  onClick={() => context.setSearchByCategory(category.value)}
                  className={categoryLinkClassMobile}
                >
                  {category.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {shouldShowBottomNav && (
        <nav className="sm:hidden fixed z-10 bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-black/10">
          <div className="grid grid-cols-4 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] text-[11px]">
            <NavLink
              to="/"
              onClick={() => context.setSearchByCategory(null)}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-1 rounded-lg ${
                  isActive ? "text-black" : "text-black/60"
                }`
              }
            >
              <HomeIcon className="h-6 w-6" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-1 rounded-lg ${
                  isActive ? "text-black" : "text-black/60"
                }`
              }
            >
              <ClipboardDocumentListIcon className="h-6 w-6" />
              <span>Orders</span>
            </NavLink>

            <NavLink
              to="/my-account"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-1 rounded-lg ${
                  isActive ? "text-black" : "text-black/60"
                }`
              }
            >
              <UserCircleIcon className="h-6 w-6" />
              <span>Account</span>
            </NavLink>

            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-1 rounded-lg ${
                  isActive ? "text-black" : "text-black/60"
                }`
              }
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-black/20">
                In
              </span>
              <span>Sign in</span>
            </NavLink>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
