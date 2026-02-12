import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HealthCare API",
      version: "1.0.0",
      description: "User Authentication & Profile APIs",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            age: { type: "number" },
            weight: { type: "number" },
            height: { type: "number" },
            address: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            zipcode: { type: "string" },
            avatar: { type: "string" },
            userType: { type: "string", enum: ["patient", "admin"] },
          },
        },
        Service: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            durationInMinutes: { type: "number" },
            image: { type: "string" },
            isActive: { type: "boolean" },
          },
        },
        Appointment: {
          type: "object",
          properties: {
            _id: { type: "string" },
            patient: { type: "string" },
            patientName: { type: "string" },
            date: { type: "string" },
            time: { type: "string" },
            department: { type: "string" },
            doctorName: { type: "string" },
            comments: { type: "string" },
            report: { type: "string" },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "completed", "cancelled"],
            },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./src/routes/*.js"], // route files
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
