import express from "express";
import { createServer } from "http";
import { setupVite, serveStatic, log } from "./vite";
import { registerRoutes } from "./routes";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
registerRoutes(app);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

async function startServer() {
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
    log("Vite dev server configured");
  } else {
    serveStatic(app, "./dist/public");
    log("Serving static files from ./dist/public");
  }

  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});