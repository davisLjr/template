# Celpi-cl - Proyecto Base Next.js

Proyecto base para el sitio web de un estudio contable profesional, construido con Next.js, TypeScript y SCSS Modules.

## Características

- **Next.js 16** con TypeScript
- **SCSS Modules** para estilos modulares y organizados
- **Sistema de temas Light/Dark** con Context API
- **Tipografías profesionales** desde Google Fonts
- **Optimización de imágenes desactivada** (configurado para Vercel)
- **Estructura limpia y modular** lista para desarrollo

## Tecnologías

- Next.js 16
- React 19
- TypeScript
- SCSS/Sass
- Context API para manejo de estado global

## Estructura del Proyecto

```
celpi-cl/
├── components/          # Componentes reutilizables (vacío, listo para usar)
├── contexts/            # Contextos de React
│   └── ThemeContext.tsx # Context para tema Light/Dark
├── pages/               # Páginas de Next.js
│   ├── _app.tsx        # App wrapper con ThemeProvider
│   ├── _document.tsx   # Document con fuentes de Google
│   ├── index.tsx       # Página principal
│   └── api/            # API routes
├── public/              # Assets estáticos
├── styles/              # Estilos SCSS
│   ├── globals.scss    # Estilos globales, variables y mixins
│   └── Home.module.scss # Estilos modulares de la página Home
└── tsconfig.json        # Configuración de TypeScript
```

## Tipografías

El proyecto utiliza las siguientes fuentes de Google Fonts:

- **Títulos principales**: Inter (Bold/ExtraBold) o Poppins (Bold/SemiBold)
- **Subtítulos**: Inter (Medium/SemiBold) o Work Sans (Medium)
- **Texto de cuerpo**: Inter (Regular/Medium) o Open Sans (Regular)

## Tema Light/Dark

El proyecto incluye un sistema completo de temas que:

- Alterna entre modo claro y oscuro
- Guarda la preferencia en localStorage
- Detecta preferencia del sistema operativo
- Aplica transiciones suaves entre temas

### Variables de Color

- **Light**:
  - Fondo: `#ffffff`
  - Texto: `#111111`

- **Dark**:
  - Fondo: `#111111`
  - Texto: `#ffffff`

### Uso del Hook useTheme

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MiComponente() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Tema actual: {theme}
    </button>
  );
}
```

## SCSS Modules

### Variables Disponibles

```scss
// Colores
$light-bg: #ffffff;
$light-text: #111111;
$dark-bg: #111111;
$dark-text: #ffffff;

// Fuentes
$font-heading: 'Inter', 'Poppins', sans-serif;
$font-subheading: 'Inter', 'Work Sans', sans-serif;
$font-body: 'Inter', 'Open Sans', sans-serif;

// Pesos
$fw-regular: 400;
$fw-medium: 500;
$fw-semibold: 600;
$fw-bold: 700;
$fw-extrabold: 800;
```

### Mixins Disponibles

```scss
@include heading;              // Títulos principales (bold)
@include heading-extrabold;    // Títulos principales (extrabold)
@include subheading;           // Subtítulos (semibold)
@include subheading-medium;    // Subtítulos (medium)
@include body-text;            // Texto de cuerpo (regular)
@include body-text-medium;     // Texto de cuerpo (medium)
```

### Uso en Componentes

```scss
@import './variables';

.miTitulo {
  @include heading-extrabold;
  font-size: 2.5rem;
}

.miParrafo {
  @include body-text;
  font-size: 1rem;
}
```

### Estructura de Archivos SCSS

El proyecto utiliza dos archivos principales de SCSS:

- **`_variables.scss`**: Contiene solo variables y mixins (se importa en módulos SCSS)
- **`globals.scss`**: Contiene estilos globales, reset CSS y configuración de temas (se importa solo en _app.tsx)

Esta separación es necesaria porque Next.js no permite selectores globales dentro de módulos SCSS.

### Notas Importantes

- El proyecto utiliza `@import` para importar archivos SCSS. Aunque Sass está deprecando `@import` en favor de `@use`, `@import` sigue funcionando perfectamente. Los warnings de deprecación se pueden ignorar.

## Instalación y Uso

### Instalar dependencias

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para producción

```bash
npm run build
```

### Iniciar servidor de producción

```bash
npm start
```

## Configuración

### next.config.ts

- Optimización de imágenes desactivada (`images.unoptimized: true`)
- React Strict Mode activado

### tsconfig.json

- Configuración estándar de Next.js con TypeScript
- Alias `@/*` configurado para imports absolutos

## Próximos Pasos

1. Agregar componentes en la carpeta `components/`
2. Crear páginas adicionales en `pages/`
3. Agregar assets (logos, imágenes) en `public/`
4. Personalizar variables y mixins en `styles/_variables.scss`
5. Desarrollar la estructura completa del sitio web

## Comandos Útiles

```bash
npm run dev          # Modo desarrollo
npm run build        # Build de producción
npm start            # Servidor de producción
npm run lint         # Linter
```

## Licencia

Este proyecto es privado y pertenece a Celpi-cl.
