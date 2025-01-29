import fsPromises from "node:fs/promises";

export const myReadFile = async (loc) => {
  try {
    const data = await fsPromises.readFile(loc, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log("Error in file reading:", error.message);
  }
};

export const addProduct = async (loc, product) => {
  const data = await fsPromises.readFile(loc, "utf-8");
  const oldProducts = JSON.parse(data);
//   console.log(oldProducts);
  
  oldProducts.push(product);
  console.log(oldProducts);

  fsPromises.writeFile(loc, JSON.stringify(oldProducts));
};
