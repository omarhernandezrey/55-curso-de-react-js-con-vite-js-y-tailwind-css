/**
 * This function calculates total price of a new order
 * @param {Array} products cartProduct: Array of Objects
 * @returns {numer} Total price
 */
export const totalPrice = (products) => {
  let sum = 0;
  products.forEach((product) => (sum += product.price));
  return sum;
};

const FALLBACK_IMAGE_URL =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">' +
      '<rect width="640" height="480" fill="#f3f4f6"/>' +
      '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="24">No image</text>' +
      "</svg>",
  );

const coerceImagesToArray = (images) => {
  if (Array.isArray(images)) return images;
  if (typeof images !== "string") return [];

  const trimmed = images.trim();
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // ignore
    }
  }

  return [images];
};

const isBadImageUrl = (url) => {
  if (typeof url !== "string") return true;
  const trimmed = url.trim();
  if (!trimmed) return true;

  if (trimmed.startsWith("data:image/")) return false;

  if (!/^https?:\/\//i.test(trimmed)) return true;

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();
    const pathname = parsed.pathname.toLowerCase();

    // Si no parece una imagen (no tiene extensión), mejor usar fallback.
    // Esto evita requests a endpoints tipo ".../images" o placeholders que suelen fallar.
    const looksLikeImageFile = /\.(png|jpe?g|webp|gif|avif|svg)$/i.test(
      pathname,
    );
    if (!looksLikeImageFile) return true;

    if (hostname === "placeimg.com" || hostname.endsWith(".placeimg.com"))
      return true;
    if (hostname === "i.imgurm" || hostname.endsWith(".imgurm")) return true;

    // Endpoint JSON (no es una imagen): /api/v1/products/:id/images
    if (
      hostname === "api.escuelajs.co" &&
      /^\/api\/v1\/products\/\d+\/images$/.test(pathname)
    ) {
      return true;
    }

    return false;
  } catch {
    return true;
  }
};

export const getProductImageUrl = (product) => {
  const candidates = coerceImagesToArray(product?.images);
  const firstValid = candidates.find((candidate) => !isBadImageUrl(candidate));
  return firstValid || FALLBACK_IMAGE_URL;
};

export const sanitizeProductImages = (product) => {
  const candidates = coerceImagesToArray(product?.images);
  const sanitized = candidates.filter((candidate) => !isBadImageUrl(candidate));

  return {
    ...product,
    images: sanitized.length ? sanitized : [FALLBACK_IMAGE_URL],
  };
};
