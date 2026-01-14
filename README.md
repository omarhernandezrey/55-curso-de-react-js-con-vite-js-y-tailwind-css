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






