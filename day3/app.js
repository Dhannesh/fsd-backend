import http from "node:http";
import fs from "node:fs";
import fsPromises from "node:fs/promises";

const app = http.createServer(async (req, res) => {
  //   res.setHeader("content-type", "text/html");
  //   if (req.url === "/") {
  //     res.write("<body style='background-color:red'>");
  //     res.write("<h1>Hello</h1>");
  //   } else if (req.url === "/about") {
  //     res.write("<body style='background-color:yellow'>");
  //     res.write("Dhaneshwar Kumar");
  //   } else
  //     res.write("Opps... not found");
  // res.end('</body>')

  //   let data;
  //   if (req.url === "/") data = fs.readFileSync("./pages/home.html");
  //   else if (req.url === "/about") data = fs.readFileSync("./pages/about.html");
  //   else data = fs.readFileSync("./pages/error.html");
  //   res.end(data);

  let data;
  if (req.url === "/") {
    // data = fs.readFileSync("./pages/home.html");
    data = await fsPromises.readFile("./pages/home.html");
  } else if (req.url === "/about") {
    // data = fs.readFileSync("./pages/about.html");
    data = await fsPromises.readFile("./pages/about.html");
  } else {
    // data = fs.readFileSync("./pages/error.html");
    data = await fsPromises.readFile("./pages/error.html");
  }
  res.end(data);
});

app.listen(3000, (req, res) => {
  console.log("Server is running....");
});
