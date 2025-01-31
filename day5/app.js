import express from "express";
import { StatusCodes as stc } from "http-status-codes";
import "dotenv/config";
import { dbConnect } from "./dbConnect.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(stc.NOT_FOUND).json({ status: "Success" });
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
