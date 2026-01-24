import { useState, useEffect } from "react";

import { ShoppingCartContext } from "./ShoppingCartContext";

const buildFallbackImageUrl = (seed) =>
  `https://picsum.photos/seed/${encodeURIComponent(String(seed))}/640/480`;

const normalizeImageUrl = (url, seed) => {
  if (typeof url !== "string") return buildFallbackImageUrl(seed);

  const trimmed = url.trim();
  if (!trimmed) return buildFallbackImageUrl(seed);

  // API sometimes includes deprecated/broken hosts or non-image endpoints.
  if (trimmed.includes("placeimg.com")) return buildFallbackImageUrl(seed);
  if (trimmed.includes("i.imgurm"))
    return trimmed.replace("i.imgurm", "i.imgur.com");
  if (
    /^https?:\/\/api\.escuelajs\.co\/api\/v1\/products\/\d+\/images\/?$/i.test(
      trimmed,
    )
  ) {
    return buildFallbackImageUrl(seed);
  }

  try {
    // Validate URL to avoid setting invalid src values.
    const parsed = new URL(trimmed);
    return parsed.toString();
  } catch {
    return buildFallbackImageUrl(seed);
  }
};

const normalizeProduct = (product) => {
  const id = product?.id ?? "product";
  const rawImages = Array.isArray(product?.images)
    ? product.images
    : product?.images
      ? [product.images]
      : [];

  const images = rawImages
    .map((img, idx) => normalizeImageUrl(img, `${id}-${idx}`))
    .filter(Boolean);

  if (images.length === 0) images.push(buildFallbackImageUrl(id));

  return {
    ...product,
    images,
  };
};

const filteredItemsByTitle = (items, searchByTitle) => {
  return items?.filter((item) =>
    item.title.toLowerCase().includes(searchByTitle.toLowerCase()),
  );
};

const filteredItemsByCategory = (items, searchByCategory) => {
  return items?.filter((item) =>
    item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()),
  );
};

const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
  if (searchType === "BY_TITLE") {
    return filteredItemsByTitle(items, searchByTitle);
  }

  if (searchType === "BY_CATEGORY") {
    return filteredItemsByCategory(items, searchByCategory);
  }

  if (searchType === "BY_TITLE_AND_CATEGORY") {
    return filteredItemsByCategory(items, searchByCategory).filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase()),
    );
  }

  if (!searchType) {
    return items;
  }
};

export const ShoppingCartProvider = ({ children }) => {
  // Shopping Cart · Increment quantity
  const [count, setCount] = useState(0);

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Checkout Side Menu · Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Product Detail · Show product
  const [productToShow, setProductToShow] = useState({});

  // Shopping Cart · Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  // Shopping Cart · Order
  const [order, setOrder] = useState([]);

  // Get products
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null);

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data.map(normalizeProduct)
          : [];
        setItems(normalized);
      });
  }, []);

  useEffect(() => {
    if (searchByTitle && searchByCategory)
      setFilteredItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory,
        ),
      );
    if (searchByTitle && !searchByCategory)
      setFilteredItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory),
      );
    if (!searchByTitle && searchByCategory)
      setFilteredItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory),
      );
    if (!searchByTitle && !searchByCategory)
      setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
  }, [items, searchByTitle, searchByCategory]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        searchByCategory,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
