// src/config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API - Proyecto Final Backend',
      description: 'Documentación de las rutas del módulo Users',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/mocks.router.js'], // acá apuntamos al archivo con los endpoints a documentar
};

const specs = swaggerJSDoc(swaggerOptions);

export { specs, swaggerUiExpress };
