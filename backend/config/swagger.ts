import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Doctor Appointment API",
      version: "1.0.0",
      description: "API for doctor appointment system",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };
