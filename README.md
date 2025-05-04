# ValleTour - Planificador de Viajes

Aplicación web para planificar viajes personalizados a Oaxaca con generación de PDF y códigos QR.

## Estructura del Proyecto

- **Frontend**: React.js con TypeScript
- **Backend**: Node.js con Express

## Configuración Local

### Frontend

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Crear archivo `.env` en la raíz del proyecto (ya existente):
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

3. Iniciar la aplicación en modo desarrollo:
   ```bash
   npm start
   ```

### Backend

1. Navegar al directorio del servidor:
   ```bash
   cd server
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Despliegue en Producción

### Paso 1: Desplegar el Backend en Render

1. Crear una cuenta en [Render](https://render.com) si aún no tienes una.

2. Desde el Dashboard, selecciona "New" y luego "Web Service".

3. Conecta tu repositorio de GitHub o sube directamente el código.

4. Configura el servicio:
   - **Name**: valletour-api (o el nombre que prefieras)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

5. En la sección "Environment Variables", añade:
   - `NODE_ENV`: `production`

6. Haz clic en "Create Web Service" y espera a que se complete el despliegue.

7. Anota la URL del servicio (ejemplo: `https://valletour-api.onrender.com`).

### Paso 2: Desplegar el Frontend en Netlify

1. Crear una cuenta en [Netlify](https://netlify.com) si aún no tienes una.

2. Desde el Dashboard, haz clic en "New site from Git".

3. Conecta tu repositorio de GitHub.

4. Configura el despliegue:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

5. En la sección "Advanced build settings", añade la variable de entorno:
   - `REACT_APP_API_URL`: La URL de tu backend en Render (ej: `https://valletour-api.onrender.com`)

6. Haz clic en "Deploy site" y espera a que se complete el despliegue.

## Consideraciones para Producción

- **Almacenamiento de archivos**: En producción, considera usar un servicio como AWS S3 o Cloudinary para almacenar los PDFs.
- **Base de datos**: Implementa una base de datos (MongoDB, PostgreSQL) para almacenar la información de los PDFs en lugar del almacenamiento en memoria.
- **Dominio personalizado**: Configura un dominio personalizado tanto para el frontend como para el backend.

## Funcionalidades

- Generación de planes de viaje personalizados
- Creación de PDF con detalles del plan
- Generación de códigos QR para compartir el plan
- Interfaz intuitiva con animaciones fluidas

## Tecnologías Utilizadas

- React.js
- TypeScript
- Express.js
- Framer Motion
- React-PDF
- Tailwind CSS

## Características Principales

- 🌍 Exploración de destinos nacionales e internacionales
- 🎯 Búsqueda y filtrado avanzado de experiencias
- 👤 Sistema de autenticación de usuarios
- 🌙 Modo oscuro/claro
- 📱 Diseño responsive
- 🌐 Soporte multiidioma
- 💳 Integración con pasarelas de pago
- 📍 Integración con Google Maps
- 📱 Soporte PWA

## Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Cuenta de Firebase
- Cuenta de Google Cloud (para Google Maps)
- Cuenta de Stripe

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/valletour.git
   cd valletour
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Copiar el archivo de variables de entorno:
   ```bash
   cp .env.example .env
   ```

4. Configurar las variables de entorno en el archivo .env con tus credenciales

5. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

```
src/
├── assets/ # Recursos estáticos
├── components/ # Componentes reutilizables
├── config/ # Configuraciones
├── context/ # Contextos de React
├── hooks/ # Hooks personalizados
├── pages/ # Páginas de la aplicación
├── services/ # Servicios y APIs
├── styles/ # Estilos globales
├── types/ # Tipos de TypeScript
└── utils/ # Utilidades y helpers
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la versión de producción
- `npm run lint`: Ejecuta el linter

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

ValleTour - [info@valletour.com](mailto:info@valletour.com)

Proyecto: [https://github.com/tu-usuario/valletour](https://github.com/tu-usuario/valletour)
