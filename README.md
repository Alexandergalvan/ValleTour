# ValleTour - Plataforma de Viajes

ValleTour es una plataforma web moderna y funcional para una agencia de viajes especializada en experiencias turísticas nacionales e internacionales.

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

## Tecnologías Utilizadas

- React + Vite
- TypeScript
- Tailwind CSS
- Firebase (Auth & Firestore)
- React Router
- Zustand
- Framer Motion
- Headless UI
- Stripe

## Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Cuenta de Firebase
- Cuenta de Google Cloud (para Google Maps)
- Cuenta de Stripe

## Instalación

1. Clonar el repositorio:
   \`\`\`bash
   git clone https://github.com/tu-usuario/valletour.git
   cd valletour
   \`\`\`

2. Instalar dependencias:
   \`\`\`bash
   npm install
   \`\`\`

3. Copiar el archivo de variables de entorno:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Configurar las variables de entorno en el archivo .env con tus credenciales

5. Iniciar el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`

## Estructura del Proyecto

\`\`\`
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
\`\`\`

## Scripts Disponibles

- \`npm run dev\`: Inicia el servidor de desarrollo
- \`npm run build\`: Construye la aplicación para producción
- \`npm run preview\`: Previsualiza la versión de producción
- \`npm run lint\`: Ejecuta el linter

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

ValleTour - [info@valletour.com](mailto:info@valletour.com)

Proyecto: [https://github.com/tu-usuario/valletour](https://github.com/tu-usuario/valletour)
