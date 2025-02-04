import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter product name"],
      trim: true,
      maxlength: [20, "product name cannot be larger than 20 chars"],
    },
    price: {
      type: Number,
      required: [true, "please enter product price"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);

// export default Product;
