// eslint-disable-next-line react/prop-types
const Product = ({ name, price }) => {
  return (
    <div className="product">
      <h3>{name}</h3>
      <h4>Rs.{price}</h4>
      <a className="btn btn-primary">Order Now</a>
    </div>
  );
};
export default Product;
