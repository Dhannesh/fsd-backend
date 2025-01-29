import express from "express";
import { addProduct, myReadFile } from "./utils.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const data = await myReadFile("./data.json");
  res.json(data);
});

app.post("/", (req, res) => {
  console.log(req.body);
  addProduct("./data.json", req.body);

  res.send("add data");
});

app.put("/", (req, res) => {
  res.send("update data with put");
});

app.patch("/", (req, res) => {
  res.send("udpate data with patch");
});

app.delete("/", (req, res) => {
  res.send("delete the data");
});

app.listen(3000, () => {
  console.log("Server is running ....");
});
