# Configuración VS Code con WSL 2 en Windows 10

## ✅ Configuración Completada

Esta es la configuración final del proyecto para máxima integración con WSL 2 y Windows 10.

### 1. Terminal Integrada
- **Terminal Predeterminada**: WSL 2 (Ubuntu)
- **Icono**: Terminal Linux
- **Comando**: `wsl.exe -d Ubuntu`
- **Fuente**: Monospace 13pt
- **Scroll**: 1000 líneas

### 2. Extensiones Instaladas

#### Core Development
- **ESLint** (dbaeumer.vscode-eslint) - Linting de JavaScript
- **Prettier** (esbenp.prettier-vscode) - Formateador de código
- **ES7 React Snippets** (dsznajder.es7-react-js-snippets) - Snippets para React

#### Especializadas
- **Tailwind CSS** (bradlc.vscode-tailwindcss) - IntelliSense para Tailwind
- **GitLens** (eamodio.gitlens) - Información de Git mejorada
- **TypeScript** (ms-vscode.vscode-typescript-next) - Soporte TypeScript

### 3. Configuración de Formateo
- **Formateador Predeterminado**: Prettier
- **Formato al Guardar**: Activado
- **Auto-guardado**: Cada 1 segundo
- **Corregir ESLint al Guardar**: Activado

### 4. Debugging
- **Servidor Vite Dev**: `npm run dev`
- **Debugging en Chrome**: Soportado en puerto 5173

## 🚀 Cómo Usar

### Abrir proyecto en VS Code
```bash
cd ~/personalProjects/55-curso-de-react-js-con-vite-js-y-tailwind-css
code .
```

### Terminal Integrada
La terminal integrada ya usa WSL 2 por defecto. Puedes:
- Abrirla con: `Ctrl + Ñ` (o `Ctrl + ~`)
- Ya tendrás acceso a todos los comandos de Linux (git, npm, etc.)

### Ejecutar aplicación
```bash
npm run dev
```

### Debugging
1. Presiona F5 o ve a Run → Start Debugging
2. Selecciona "Start Vite Dev Server"
3. La aplicación se abrirá en http://localhost:5173

## 📝 Atajos Útiles

| Atajo | Acción |
|-------|--------|
| `Ctrl + Ñ` | Abrir/Cerrar terminal |
| `Shift + Alt + D` | Debugging |
| `Ctrl + Shift + X` | Extensiones |
| `Ctrl + ,` | Configuración |
| `Ctrl + K Ctrl + 0` | Plegar todo |
| `Ctrl + K Ctrl + J` | Desplegar todo |

## 🔧 Troubleshooting

### Si la terminal no abre WSL
1. Abre Configuración (Ctrl + ,)
2. Busca: `terminal.integrated.defaultProfile.windows`
3. Asegúrate que sea `WSL`

### Si ESLint no funciona
```bash
npm install --save-dev eslint
```

### Si Prettier no formatea
1. Asegúrate que esté instalado: `npm install --save-dev prettier`
2. Abre cualquier archivo y presiona: `Alt + Shift + F`

## 📦 Requisitos

- Windows 10 (Build 2004 o superior)
- WSL 2 instalado con Ubuntu
- Node.js 16+ en WSL
- VS Code 1.60+

## ✨ Características

✅ Terminal WSL 2 integrada completamente  
✅ Formato de código automático (Prettier)  
✅ Linting automático (ESLint)  
✅ Debugging integrado  
✅ Auto-guardado activado  
✅ IntelliSense para Tailwind CSS  
✅ Git integrado y mejorado  

