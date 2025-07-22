import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler, rateLimiter } from "./middlewares";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(helmet());
app.use(morgan("combined"));
app.use(rateLimiter());

app.get("/", (req, res) => {
  res.send("Welcome to the VaultX API");
});

app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

export default app;
