import { useState } from "react";

const Signin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const resp = await fetch("http://localhost:3000/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (resp.ok) {
        setPassword("");
        setPassword("");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2>User Signin</h2>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="password">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-primary" onSubmit={handleSubmit}>
                Signin
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Signin;
