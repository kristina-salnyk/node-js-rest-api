const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const PORT = process.env.PORT || 3000;

const document = {
  info: {
    title: "Contacts API",
    description: "Contacts project backend service",
  },
  consumes: ["application/json", "multipart/form-data"],
  produces: ["application/json"],
  servers: [
    {
      url: "https://contacts-29l4.onrender.com",
      description: "production server",
    },
    {
      url: `http://localhost:${PORT}`,
      description: "local server",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "User authorization endpoints",
    },
    {
      name: "Users",
      description: "Users manage endpoints",
    },
    {
      name: "Contacts",
      description: "Contacts manage endpoints",
    },
  ],
};

const outputFile = "../swagger.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, document);
