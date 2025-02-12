import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    // const products = await Product.find();
    const productQuery = Product.find();
    const {
      q,
      size = 6,
      pg = 1,
      minprice,
      maxprice,
      sortby = "price",
    } = req.query;
    const fields = "_id name price createdAt updatedAt"
    if (q) {
      const reg = new RegExp(q, "i");
      productQuery.where("name").regex(reg);
    }
    if (minprice) productQuery.where("price").gte(minprice);
    if (maxprice) productQuery.where("price").lte(maxprice);
    // productQuery.sort("price -name");
    productQuery.sort(sortby);

    const cloneQuery = productQuery.clone();
    const total = await cloneQuery.countDocuments();
    if (size) productQuery.limit(size);

    productQuery.select(fields);
    productQuery.skip((pg - 1) * size);
    const products = await productQuery;
    res.status(200).json({ count: total, data: products });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ msg: "Interal Server Error" });
  }
};

export const addProduct = async (req, res) => {
  try {
    console.log("Req.body: ", req.body);
    const product = await Product.create(req.body);

    res.status(201).json({ product });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ msg: "Interal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) return res.status(200).json(product);
    res.status(200).json({ msg: "product not found" });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ msg: "Interal Server Error" });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (product)
      return res.status(200).json({ msg: "product deleted", product });
    res.status(200).json({ msg: "product not found" });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ msg: "Interal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (product)
      return res.status(200).json({ msg: "product updated", product });
    res.status(200).json({ msg: "product not found" });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ msg: "Interal Server Error" });
  }
};
