import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { getProductImageUrl } from "../../utils";
import "./styles.css";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);

  const images = useMemo(() => {
    const raw = context.productToShow?.images;
    const list = Array.isArray(raw) ? raw.filter(Boolean) : [];
    return list.length ? list : [getProductImageUrl(context.productToShow)];
  }, [context.productToShow]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeUrl = images[activeIndex] ?? images[0];

  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });

  const resetZoom = () => {
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  };

  const openZoom = () => {
    setIsZoomOpen(true);
  };

  const closeZoom = () => {
    setIsZoomOpen(false);
    resetZoom();
  };

  useEffect(() => {
    if (!context.isProductDetailOpen) {
      setIsZoomOpen(false);
      resetZoom();
    }
  }, [context.isProductDetailOpen]);

  useEffect(() => {
    setActiveIndex(0);
    setIsZoomOpen(false);
    resetZoom();
  }, [images]);

  useEffect(() => {
    if (!isZoomOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeZoom();
      if (event.key === "ArrowLeft") {
        setActiveIndex(
          (current) => (current - 1 + images.length) % images.length,
        );
        resetZoom();
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length);
        resetZoom();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isZoomOpen, images.length]);

  const onPointerDown = (event) => {
    if (zoomScale <= 1) return;
    isPanningRef.current = true;
    lastPointRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!isPanningRef.current) return;
    const dx = event.clientX - lastPointRef.current.x;
    const dy = event.clientY - lastPointRef.current.y;
    lastPointRef.current = { x: event.clientX, y: event.clientY };

    setPan((current) => ({
      x: clamp(current.x + dx, -600, 600),
      y: clamp(current.y + dy, -600, 600),
    }));
  };

  const onPointerUp = (event) => {
    isPanningRef.current = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const zoomIn = () =>
    setZoomScale((s) => clamp(Number((s + 0.5).toFixed(2)), 1, 4));
  const zoomOut = () => {
    setZoomScale((s) => {
      const next = clamp(Number((s - 0.5).toFixed(2)), 1, 4);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
    resetZoom();
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
    resetZoom();
  };

  return (
    <aside
      className={`${context.isProductDetailOpen ? "flex" : "hidden"} product-detail flex-col fixed right-0 z-30 border border-black/10 rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center px-6 py-4 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="flex flex-col">
          <h2 className="font-medium text-xl">Detail</h2>
          {context.productToShow?.category?.name && (
            <span className="text-xs text-black/60">
              {context.productToShow.category.name}
            </span>
          )}
        </div>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeProductDetail()}
          ></XMarkIcon>
        </div>
      </div>
      <div className="px-6 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <figure
          className="group w-full aspect-[4/3] rounded-lg overflow-hidden bg-black/5 relative cursor-zoom-in"
          onClick={openZoom}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") openZoom();
          }}
          aria-label="Open image zoom"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
            src={activeUrl ?? undefined}
            alt={context.productToShow.title}
            loading="lazy"
          />
          <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-3 py-1 text-xs text-black/70">
            Tap to zoom
          </span>
        </figure>

        {images.length > 1 && (
          <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
            {images.map((url, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={`${url}-${index}`}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    resetZoom();
                  }}
                  className={`aspect-square rounded-lg overflow-hidden border ${
                    isActive ? "border-black" : "border-black/10"
                  } bg-black/5`}
                  aria-label={`Select image ${index + 1}`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={url}
                    alt=""
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-medium text-base leading-snug">
              {context.productToShow.title}
            </h3>
            <span className="font-semibold text-lg shrink-0">
              ${context.productToShow.price}
            </span>
          </div>
          <p className="mt-2 text-sm text-black/70 leading-relaxed">
            {context.productToShow.description}
          </p>
        </div>
      </div>

      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={closeZoom}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-x-0 top-0 bottom-0 mx-auto max-w-4xl p-4 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-full rounded-2xl overflow-hidden bg-black">
              <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={closeZoom}
                  className="rounded-full bg-white/90 px-3 py-2 text-sm"
                >
                  Close
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={zoomOut}
                    className="rounded-full bg-white/90 px-3 py-2 text-sm"
                    aria-label="Zoom out"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={resetZoom}
                    className="rounded-full bg-white/90 px-3 py-2 text-sm"
                    aria-label="Reset zoom"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={zoomIn}
                    className="rounded-full bg-white/90 px-3 py-2 text-sm"
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                </div>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 w-10 h-10"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 w-10 h-10"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}

              <div
                className={`w-full h-full flex items-center justify-center ${
                  zoomScale > 1
                    ? "cursor-grab active:cursor-grabbing"
                    : "cursor-zoom-in"
                }`}
                onDoubleClick={() => {
                  setZoomScale((s) => {
                    const next = s > 1 ? 1 : 2;
                    if (next === 1) setPan({ x: 0, y: 0 });
                    return next;
                  });
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                <img
                  src={activeUrl ?? undefined}
                  alt={context.productToShow.title}
                  className="max-w-none select-none"
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
                    transition: isPanningRef.current
                      ? "none"
                      : "transform 120ms ease-out",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                  draggable={false}
                />
              </div>

              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-white/80">
                <span>Double tap/click to zoom</span>
                <span>
                  {activeIndex + 1}/{images.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default ProductDetail;
