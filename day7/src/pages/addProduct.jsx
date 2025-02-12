import { useState } from "react";

const AddProduct = () => {
  const [pname, setPname] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(pname, price);

      const resp = await fetch("http://localhost:3000/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: pname, price }),
      });
      if (resp.ok) {
        setPname("");
        setPrice("");
        setMsg("Product added successfully");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Add New Product</h2>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="name">
              Product Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter product name"
                name="pname"
                value={pname}
                onChange={(e) => setPname(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="price">
              Product Price
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter product price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-primary" onSubmit={handleSubmit}>
                Add Product
              </button>
            </div>
          </div>
        </form>
        <h3>{msg}</h3>
      </div>
    </>
  );
};
export default AddProduct;
