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


