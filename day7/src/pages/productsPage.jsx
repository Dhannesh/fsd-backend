import { useEffect, useState } from "react";
import { Link } from "react-router";
import Product from "../components/Product";
import Pages from "../components/Pages";
import Loader from "../components/Loader";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [queryString, setQueryString] = useState(
    "http://localhost:3000/api/v1/products"
  );
  const [sortBy, setSortBy] = useState("Price: Low to High");
  const [pages, setPages] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [totalProduct, setProductCount] = useState();
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const resp = await fetch(`${queryString}?pg=${pageNo}&sortby=${sortBy}`);
      const data = await resp.json();
      const { count } = data;
      setProductCount(count);

      if (count % 6 === 0) setPages(count / 6);
      else setPages(Math.floor(count / 6) + 1);

      setProducts(data.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleClick = (pg) => {
    setPageNo(pg);
    getData();
  };

  const handleSortBy = (value) => {
    let sortby;
    if (value == "plh") {
      setSortBy("Price: Low to High");
      sortby = "price";
    } else if (value == "phl") {
      setSortBy("Price: High to Low");
      sortby = "-price";
    } else if (value == "naz") {
      setSortBy("Name: A to Z");
      sortby = "name";
    } else {
      setSortBy("Name: Z to A");
      sortby = "-name";
    }
    setSortBy(sortby);
    setPageNo(1);
    getData();
  };
  const Pages = () => {
    console.log("pages:", pages);
    return (
      <>
        {[...Array(pages).keys()].map((x) => (
          <button
            className="btn btn-primary"
            key={x + 1}
            onClick={() => handleClick(x + 1)}
          >
            {x + 1}
          </button>
        ))}
      </>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="header">
        <h2>Total {totalProduct} Products Found</h2>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            {`Sort by ${sortBy} `}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleSortBy("plh")}
              >
                Price: Low to High
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleSortBy("phl")}
              >
                Price: High to Low
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleSortBy("naz")}
              >
                Name: A to Z
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleSortBy("nza")}
              >
                Name: Z to A
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="products">
        {products.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </div>
      <div className="page-container">
        <Pages pages={pages} />
      </div>
    </>
  );
};
export default ProductsPage;
