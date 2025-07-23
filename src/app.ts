import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { setupSwagger } from "./docs/swagger";
import { errorHandler, rateLimiter } from "./middlewares";
import { env } from "./config";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("combined"));
app.use(rateLimiter());
setupSwagger(app);

app.get("/", (req, res) => {
  res.send("Welcome to the VaultX API");
});

app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

export default app;
