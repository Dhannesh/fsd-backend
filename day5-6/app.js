import express from "express";
import { StatusCodes as stc } from "http-status-codes";
import "dotenv/config";
import { dbConnect } from "./dbConnect.js";
import productRoutes from "./routes/productRoutes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("requested url:", req.url);
  next();
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(stc.NOT_FOUND).json({ status: "Success" });
});
app.use(
  // morgan(":method :url :status :res[content-length] - :response-time ms")
  morgan("tiny")
);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/otps", otpRoutes);

app.use((req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.status(401).json({ status: "fail", message: "unauthorized" });
      return;
    }
  });
  req.userId = decoded; //decrypt and store the userinfo from jwt token
  next();
});
app.use("/api/v1/products", productRoutes);

(async () => {
  const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nodeexpressprojects.duwlsyo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=NodeExpressProjects`;
  try {
    await dbConnect(MONGO_URL);
    console.log("Database is connected....");
    app.listen(PORT, console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.log("Error: ", err.message);
  }
})();
