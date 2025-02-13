import { Link } from "react-router";
const Navbar = (props) => {
  console.log(props);

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            ABES Cafe
          </a>
        </div>
        <ul className="nav navbar-nav">
          <li className="active">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/products/add">Add Products</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/user/register">
              <span className="glyphicon glyphicon-user"></span> Sign Up
            </Link>
          </li>
          <li>
            <Link to="/user/login">
              <span className="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
