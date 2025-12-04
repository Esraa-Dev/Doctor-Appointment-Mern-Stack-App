import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Doctor Appointment API',
    version: '1.0.0',
    description: 'A comprehensive doctor appointment booking system',
    contact: {
      name: 'Esraa Mohammad',
      email: 'esraamohammad107@gmail.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './models/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };