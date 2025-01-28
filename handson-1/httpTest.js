import http from "node:http";

let counter = 0;

const app = http.createServer(async (req, res) => {
  console.log("Request received: ", ++counter);
  //   res.write("Hello");
  //   console.log(Object.keys(req));
  console.log("-->", req.url);
  //   res.end("Hello");
  res.setHeader("content-type", "text/html");
  //   res.end('<h1 style="color:red">Hello</h1>');

  try {
    const temp = await fetch("https://dummyjson.com/products");
    const data = await temp.json();
    const { products } = data;
    console.log(products);
    res.write(`
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Products List</title>
    <style>
    body{
    background:pink;
    padding: 2rem;
    display: flex;
    flex-wrap:wrap;
    gap: 2rem;
    }
    div{
        width: 400px;
        background: violet;
        padding: 2rem;
        }
    </style>
  </head>
  <body>
        `);
    // const { price, rating, stock, title, description } = product;
    // res.end(JSON.stringify(product));
    //     res.end(`
    //         <!DOCTYPE html>
    // <html lang="en">
    //   <head>
    //     <meta charset="UTF-8" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //     <title>Document</title>
    //   </head>
    //   <body>
    //     <h1>${title}</h1>
    //     <h2>Price ${price}<h2>
    //     <p>${description}</p>
    //     <h3>Rating: ${rating} </h3>
    products.forEach((elem) => {
      res.write(`
            <div>
                <h1>${elem.title}</h1>
                <p>${elem.description}</p>
                <img src="${elem.thumbnail}" height='200'>
            </div>
        `);
    });

    res.end(`
      </body>
    </html>
    `);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, (req, res) => {
  //it may use a default port if not provided
  const port = app.address().port;
  console.log("server is running at", port);
});
