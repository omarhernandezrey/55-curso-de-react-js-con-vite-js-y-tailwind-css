# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 55-curso-de-react-js-con-vite-js-y-tailwind-css

## Progreso del Curso

### 8 Consumiendo la FakeStore API para pintar cards

- Se implementó la llamada a la API `https://api.escuelajs.co/api/v1/products` usando `useEffect` y `fetch`.
- Los datos obtenidos se almacenan en un estado local y se mapean para renderizar componentes `Card`.
- Se corrigieron problemas de importación (case-sensitivity) en el componente `Card`.
- Se añadieron directivas de Tailwind CSS en `src/index.css` para corregir estilos.
- Se añadió manejo de errores y limpieza de URLs para las imágenes de los productos que vienen de la API.

### 9 Contexto global de la aplicación

- Se creó el archivo `src/Context/index.jsx` para inicializar el contexto global `ShoppingCartContext`.
- Se implementó el `ShoppingCartProvider` para envolver la aplicación.
- Se actualizó `src/Pages/App/index.jsx` para usar el proveedor de contexto y dar acceso global a los estados definidos.

### 10 Contador de productos en el carrito

- Se consumió el `ShoppingCartContext` en el componente `Navbar` para mostrar el número de productos (`context.count`).
- Se consumió el `ShoppingCartContext` en el componente `Card` para actualizar el contador al hacer clic en el botón `+`.
- Se configuró el estado inicial del contador en 0 dentro del `ShoppingCartProvider`.

### 11 Abriendo el detalle de cada producto

- Se creó el componente `ProductDetail` para mostrar la información detallada de un producto.
- Se instaló la librería `@heroicons/react` para usar iconos en la interfaz (como la 'X' para cerrar).
- Se integró el componente `ProductDetail` en la página principal `Home`.
- Se añadieron estilos específicos para el componente en `src/Components/ProductDetail/styles.css`.

### 12 Reto heroicons con TailwindCSS

- Se reemplazó el texto "+" en el componente `Card` por el ícono `PlusIcon` de `@heroicons/react`.
- Se reemplazó el emoji del carrito "🛒" en el componente `Navbar` por el ícono `ShoppingBagIcon`.
- Se aplicaron clases de Tailwind CSS para estilizar los íconos (tamaño y color).

### 13 Maquetando el ProductDetail

- Se añadieron estados al contexto global `ShoppingCartContext` para manejar la visibilidad del detalle del producto (`isProductDetailOpen`) y el producto seleccionado (`productToShow`).
- Se maquetó el componente `ProductDetail` para mostrar dinámicamente la imagen, título, precio y descripción del producto seleccionado.
- Se actualizó el componente `Card` para que al hacer clic en la tarjeta se abra el `ProductDetail` con la información correspondiente.
- Se implementó la lógica para cerrar el detalle al hacer clic en el incono 'X'.
- Solución de bugs: Manejo condicional de la carga de imágenes para evitar errores cuando `productToShow` está vacío.

### 14 Mostrando productos en ProductDetail

- Se mejoró significativamente el diseño del `ProductDetail` para una apariencia más moderna y profesional (sombras, bordes redondeados, layout sticky).
- Se implementó un efecto de **lupa (zoom)** interactivo sobre la imagen del producto.
- Se optimizó la visualización para evitar scroll general, utilizando un diseño flexible que se adapta a la ventana.
- Se aseguró la consistencia visual de la etiqueta de categoría con las tarjetas (`Cards`).
- Se eliminó el archivo CSS externo, migrando todos los estilos a clases de utilidad de **Tailwind CSS**.

### 15 Agregando productos al carrito

- Se actualizó el la lógica en el componente `Card` para agregar productos reales al array `cartProducts` del contexto global.
- Se implementó `event.stopPropagation()` en el botón "+" de la tarjeta para evitar que se abra el detalle del producto al mismo tiempo que se agrega al carrito.
- Se configuró la acción para cerrar el `ProductDetail` automáticamente al agregar un producto al carrito, manteniendo la interfaz limpia.
- Se verificó que el contador del carrito (`count`) y la lista de productos (`cartProducts`) se actualicen correctamente en el estado global.

### 16 SideMenu del carrito de compras

- Se creó el componente `CheckoutSideMenu` que servirá para visualizar los productos agregados al carrito de compras.
- Se agregaron estados en el `ShoppingCartContext` para controlar la apertura y cierre del `CheckoutSideMenu` (`isCheckoutSideMenuOpen`).
- Se integró el `CheckoutSideMenu` en `App/index.jsx` para que esté disponible globalmente junto al `Navbar`.
- Se actualizó el componente `Card` para que al agregar un producto:
  - Se abra automáticamente el `CheckoutSideMenu`.
  - Se cierre el `ProductDetail` (si estaba abierto).
  - Se detenga la propagación del evento click para no reabrir el `ProductDetail`.
- Se añadieron estilos para posicionar el menú lateral a la derecha (`fixed right-0`) con scroll independiente si es necesario.

### 17 Componente OrderCard

- Se creó el componente `OrderCard` para representar visualmente cada artículo dentro del carrito de compras (`CheckoutSideMenu`).
- El componente muestra la imagen, título y precio del producto, alineados horizontalmente.
- Se implementó el icono `XMarkIcon` de Heroicons, preparado para la futura funcionalidad de eliminar productos del carrito.
- Se integró `OrderCard` dentro de `CheckoutSideMenu`, iterando sobre el array `cartProducts` del contexto global para renderizar la lista dinámica de productos seleccionados.

### 18 Evitando productos duplicados en el carrito

- Se modificó el componente `Card` para verificar si un producto ya existe en el carrito (`cartProducts`).
- Se implementó la función `renderIcon` que renderiza condicionalmente:
  - Un icono de **Check** (✓) con fondo negro si el producto ya está en el carrito.
  - Un icono de **Más** (+) con fondo blanco si el producto se puede agregar.
- Se deshabilitó la opción de agregar múltiples veces el mismo producto desde la tarjeta.
- Se mejoró la UX proporcionando feedback visual inmediato sobre los productos seleccionados.

### 19 Eliminar productos del carrito

- Se implementó la función `handleDelete` en `CheckoutSideMenu` para eliminar artículos del estado `cartProducts`.
- Se pasó la función `handleDelete` como prop al componente `OrderCard`.
- En `OrderCard`, se asignó el evento `onClick` al icono `XMarkIcon` para ejecutar la eliminación del producto específico mediante su ID.
- Se añadió la clase `overflow-y-scroll` al contenedor de la lista de productos en el `CheckoutSideMenu` para permitir el desplazamiento cuando hay muchos artículos.

### 20 Suma total de productos en el carrito

- Se creó la carpeta `src/utils` y el archivo `index.js` para alojar funciones de utilidad generales.
- Se implementó la función `totalPrice` que recibe un array de productos y retorna la suma de sus precios.
- Se integró `totalPrice` en el componente `CheckoutSideMenu` para calcular y mostrar el costo total de la orden en tiempo real.
- Se añadieron estilos para destacar visualmente el total en la parte inferior del menú lateral.

### 21 Flujo para crear una nueva orden

- Se añadió un nuevo estado `order` al `ShoppingCartContext` para almacenar el historial de órdenes realizadas.
- Se implementó la función `handleCheckout` en el `CheckoutSideMenu`, la cual:
  - Crea un objeto `orderToAdd` con la fecha, lista de productos, cantidad total y precio total.
  - Agrega este objeto al array de órdenes global.
  - Limpia el carrito de compras (`setCartProducts([])`) después de realizar el checkout.
- Se añadió un botón "Checkout" en el menú lateral que dispara el proceso de creación de orden.
- Se ajustó el layout del `CheckoutSideMenu` para que el botón y el total permanezcan fijos en la parte inferior.

### 22 Checkout de productos en el carrito

- Se configuró la ruta `/my-orders/last` en `src/Pages/App/index.jsx` para mostrar la última orden generada.
- Se actualizó la página `MyOrder` para visualizar los detalles de la orden recién creada (resumen de compra).
- Se implementó la lógica para obtener la última orden del array `context.order` (`slice(-1)[0]`) y renderizar sus productos usando el componente `OrderCard`.
- Se reutilizó el componente `OrderCard` en modo "lectura" (sin opción de eliminar) para mostrar el historial en la página de confirmación.

### 23 Página de MyOrders: lista de órdenes

- Se creó el componente `OrdersCard` para mostrar un resumen visual de cada orden histórica (fecha, cantidad de productos, precio total).
- Se actualizó la página `MyOrders` para iterar sobre el historial de órdenes (`context.order`) y renderizar una lista de componentes `OrdersCard`.
- Se implementó la navegación con `Link` de `react-router-dom` envolviendo cada tarjeta, permitiendo al usuario acceder al detalle de una orden específica (aunque la vista de detalle se implementará en el siguiente paso).
- Se corrigieron errores de sintaxis en el renderizado del mapa de órdenes y nombres de archivo.

### 24 Página de MyOrder: orden individual

- Se implementó la página `MyOrder` (`src/Pages/MyOrder/index.jsx`) para mostrar el detalle completo de una orden específica.
- Se integró la navegación mediante `react-router-dom` con rutas dinámicas:
  - `/my-orders/last`: Muestra la última orden creada.
  - `/my-orders/:id`: Muestra la orden correspondiente al índice proporcionado.
- Se extrajo el índice de la orden desde la URL usando `window.location.pathname`.
- Se reutilizó el componente `OrderCard` para renderizar cada producto dentro de la orden seleccionada, accediendo al array `context.order[index].products`.
- Se implementó un botón de retorno (`ChevronLeftIcon` de Heroicons) que permite navegar de vuelta a la página `/my-orders`.
- Se utilizó el componente `Layout` para mantener la consistencia visual de toda la aplicación.

### 25 Reto: órdenes de compra con TailwindCSS

- Se mejoró significativamente el componente `OrdersCard` aplicando estilos avanzados de Tailwind CSS.
- Se implementó un diseño responsivo y moderno con bordes, padding y espaciado consistentes.
- Se utilizó el ícono `ChevronRightIcon` de Heroicons para indicar la navegación hacia el detalle de la orden.
- Se estructuró la tarjeta con información clara: fecha, cantidad de artículos y precio total.
- Se aplicaron clases de Tailwind para flexbox (`flex`, `justify-between`, `items-center`) asegurando un layout limpio y alineado.
- Se optimizó la visualización de precios y el icono de navegación con espaciado (`gap-2`) y estilos de fuente (`font-medium`, `font-light`).

### 26 Buscador de productos

- Se corrigió el error de ESLint `react-refresh/only-export-components` que impedía que el Fast Refresh funcionara correctamente.
- Se dividió el archivo `src/Context/index.jsx` en dos archivos:
  - `src/Context/ShoppingCartContext.js`: Contiene solo la declaración del contexto `ShoppingCartContext`.
  - `src/Context/index.jsx`: Contiene únicamente el componente `ShoppingCartProvider`.
- Esta separación permite que Vite optimice el Fast Refresh, mejorando la experiencia de desarrollo al recargar solo los componentes modificados.
- Se mantuvo toda la funcionalidad del contexto sin cambios, asegurando compatibilidad total con el resto de la aplicación.

### 27 Filtrando títulos con JavaScript

- Se añadió el estado `searchByTitle` en el contexto para guardar el texto del input del buscador.
- Se implementó un filtrado por título con `Array.prototype.filter()` + `includes()` convirtiendo a minúsculas para hacerlo case-insensitive.
- Se agregó el estado `filteredItems` para almacenar la lista filtrada y renderizarla cuando el usuario escribe.
- Se conectó el input en `Home` para actualizar `searchByTitle` con `onChange` y se decidió entre `items` vs `filteredItems` al renderizar.
- Se usó `useEffect` para recalcular el filtrado cuando cambian `items` o `searchByTitle`.

Archivos clave:

- `Home`: [src/Pages/Home/index.jsx](src/Pages/Home/index.jsx)
- `Context Provider`: [src/Context/index.jsx](src/Context/index.jsx)
- `Context`: [src/Context/ShoppingCartContext.js](src/Context/ShoppingCartContext.js)

### 28 Filtrando categorías con JavaScript

- Se añadió el estado `searchByCategory` en el contexto para guardar la categoría seleccionada.
- Se implementó el filtrado por categoría usando `Array.prototype.filter()` sobre `item.category.name` y `includes()` (case-insensitive).
- Se extendió `filterBy` para soportar `BY_CATEGORY` y `BY_TITLE_AND_CATEGORY` (combinando ambos filtros).
- Se conectó el `Navbar` para actualizar `searchByCategory` al hacer clic en cada categoría (y limpiar con “All”).
- El `useEffect` del contexto recalcula `filteredItems` cuando cambian `items`, `searchByTitle` o `searchByCategory`.

Archivos clave:

- `Navbar (categorías)`: [src/Components/Navbar/index.jsx](src/Components/Navbar/index.jsx)
- `Context (filtros)`: [src/Context/index.jsx](src/Context/index.jsx)
- `Home (render)`: [src/Pages/Home/index.jsx](src/Pages/Home/index.jsx)

### 29 Corrigiendo bugs de la aplicación

- Se corrigieron imports sensibles a mayúsculas/minúsculas en WSL/Linux (por ejemplo `Signin`) para evitar errores de Vite al resolver módulos.
- Se resolvió el warning de Fast Refresh (`react-refresh/only-export-components`) dejando [src/Context/index.jsx](src/Context/index.jsx) exportando solo el Provider y moviendo el contexto a [src/Context/ShoppingCartContext.js](src/Context/ShoppingCartContext.js).
- Se eliminó el warning `react-hooks/exhaustive-deps` estabilizando la función `filterBy` (helpers fuera del componente).
- Se corrigieron errores de consola por imágenes inválidas:
  - Normalización de URLs al consumir la API (fallback para hosts rotos y endpoints que no son imágenes) en [src/Context/index.jsx](src/Context/index.jsx).
  - Se aseguró que `img src` reciba una URL string (por ejemplo `images[0]`) en [src/Components/ProductDetail/index.jsx](src/Components/ProductDetail/index.jsx), [src/Components/CheckoutSideMenu/index.jsx](src/Components/CheckoutSideMenu/index.jsx) y [src/Components/Card/index.jsx](src/Components/Card/index.jsx).

Archivos clave:

- [src/Pages/App/index.jsx](src/Pages/App/index.jsx)
- [src/Context/index.jsx](src/Context/index.jsx)
- [src/Context/ShoppingCartContext.js](src/Context/ShoppingCartContext.js)
