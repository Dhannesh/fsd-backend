import fsPromises from "node:fs/promises";

const path = "./data.json";

export const getProducts = async () => {
  try {
    const data = await fsPromises.readFile(path, "utf-8");
    const products = await JSON.parse(data);
    return products;
  } catch (err) {
    console.log("Error in reading file:", err.message);
  }
};

export const addProducts = async (product) => {
  try {
    const products = await getProducts(path);
    const id = Date.now();
    const updatedProducts = [...products, { id, ...product }];
    await fsPromises.writeFile(path, JSON.stringify(updatedProducts), "utf-8");
    return product;
  } catch (err) {
    console.log("Error in product addition:", err.message);
  }
};

export const getProduct = async (pid) => {
  try {
    const products = await getProducts(path);
    const product = products.find((product) => product.id == pid);
    return product;
  } catch (err) {}
};

export const removeProduct = async (pid) => {
  try {
    const products = await getProducts(path);
    const updatedProducts = products.filter((product) => product.id != pid);
    await fsPromises.writeFile(path, JSON.stringify(updatedProducts), "utf-8");
    return pid;
  } catch (err) {
    console.log("Error in removing product", err.message);
  }
};

export const updateProduct = async (product, pid) => {
  try {
    const products = await getProducts(path);
    const updatedProducts = products.map((item) => {
      if (item.id == pid) {
        console.log(item);
        return { ...item, ...product };
      }
      return item;
    });
    console.log(updatedProducts);

    await fsPromises.writeFile(path, JSON.stringify(updatedProducts), "utf-8");
  } catch (err) {
    console.log("Error in product update", err.message);
  }
};
