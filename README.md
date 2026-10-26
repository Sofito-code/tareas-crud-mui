# Tasks · CRUD mínimo con React Router + Material UI

Plantilla base del curso: tres páginas fijas y un recurso (`tasks`) con **listar, crear,
editar y eliminar con confirmación**. Es la app que se construye en el bloque 4 de las
diapositivas, ya terminada y funcionando.

## Correr

```bash
yarn install
yarn dev        # http://localhost:5173
```

Build de producción:

```bash
yarn build
yarn preview
```

Dependencias (las que se instalan en clase):

```bash
yarn add @mui/material@^6.0.0 @emotion/react @emotion/styled
yarn add react-router-dom
```

## Rutas

| URL | Pantalla | Archivo |
| --- | --- | --- |
| `/` | Home | `pages/Home.jsx` |
| `/about` | About | `pages/About.jsx` |
| `/tasks` | Listado (Read) | `pages/tasks/List.jsx` |
| `/tasks/create` | Crear (Create) | `pages/tasks/Create.jsx` |
| `/tasks/edit/:id` | Editar (Update) | `pages/tasks/Edit.jsx` |
| *(botón en la fila)* | Eliminar (Delete, modal) | `List.jsx` → `<Dialog>` |
| `*` | 404 | `pages/NotFound.jsx` |

## Estructura

```
src/
├─ main.jsx            BrowserRouter + ThemeProvider + CssBaseline
├─ App.jsx             estado (useCrud) y rutas
├─ theme.js            colores del curso y botones sin MAYÚSCULAS
├─ hooks/
│  └─ useCrud.js       fetch del JSON + create / update / remove
├─ components/
│  └─ Layout.jsx       AppBar con NavLink + <Outlet />
└─ pages/
   ├─ Home.jsx
   ├─ About.jsx
   ├─ NotFound.jsx
   └─ tasks/
      ├─ List.jsx
      ├─ Create.jsx
      └─ Edit.jsx

public/data/tasks.json   ← la semilla que lee el fetch
public/_redirects        ← regla para que el hosting sirva index.html
```

## Las tres ideas que demuestra

1. **El estado vive en `App`**, no en las páginas: al navegar, el listado no se pierde.
2. **El menú se escribe una vez** en `Layout` y las páginas entran por `<Outlet />`.
3. **`useCrud` es la misma puerta** para el JSON de hoy y la API de mañana: solo cambia la URL.

## Prueba de dos minutos

1. `/tasks` muestra las **tres** tareas del JSON.
2. New task → Save → vuelve a `/tasks` con **cuatro** filas.
3. Edit → el formulario llega **precargado**.
4. Delete → pide confirmación; **Cancel** no borra nada.
5. Recargar (F5) en `/tasks` → vuelven a estar las tres.
6. Una URL inventada → página **404**.

## Para convertirlo en otro recurso

1. Copia `public/data/tasks.json` → `products.json` y cambia los campos.
2. En `App.jsx`: `useCrud('/data/products.json')` y las rutas a `products`.
3. Renombra `pages/tasks` y ajusta los campos de los dos formularios.

## Tropiezos conocidos

- **404 al recargar en producción**: hace falta la regla de redirección del hosting
  (`public/_redirects` con `/*  /index.html  200`, o `vercel.json` con `rewrites`).
- **`useParams` devuelve texto**: por eso en `Edit.jsx` se compara con `Number(id)`.
- **`fetch('/data/…')` busca en `public/`**, no en `src/`. Si el JSON está en `src/`, hay que
  usar `import` en lugar de `fetch`.
- **El JSON es de solo lectura**: crear, editar y eliminar viven en memoria y se pierden al
  recargar. Es justo lo que justifica el backend.
