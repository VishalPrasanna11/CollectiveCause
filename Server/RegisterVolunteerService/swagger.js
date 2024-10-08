import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// import router from "./routes/volunteer-routes";
// import volunteerSchema from "./models/volunteer-model";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version:"1.0.0"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes.js", "./models/volunteer-model.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  // app.get("/docs.json", (req, res) => {
  //   res.setHeader("Content-Type", "application/json");
  //   res.send(swaggerSpec);
  // });

  // log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
