import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [otp, setOTP] = useState("");
  const [isotpSent, setOtpSent] = useState(false);

  const otpHandle = async (e) => {
    try {
      e.preventDefault();
      const resp = await fetch(import.meta.env.VITE_SOME_KEY + "/api/v1/otps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const respObj = await resp.json();
      if (respObj.status === "success") {
        setOtpSent(true);
        setMsg(respObj.message);
      } else alert(resp.message);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    // const navigate = useNavigate();
    try {
      e.preventDefault();
      const resp = await fetch(
        import.meta.env.VITE_SOME_KEY + "/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fname, email, password, otp }),
        }
      );

      const respObj = await resp.json();
      if (respObj.status === "success") {
        setFname("");
        setPassword("");
        setPassword("");
        alert(respObj.message);
        // navigate("/user/login");
      } else {
        alert(respObj.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Register User</h2>
        <div className="form-horizontal">
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="fname">
              Full Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter full name"
                name="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
          </div>
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
          {!isotpSent ? (
            <>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button className="btn btn-primary" onClick={otpHandle}>
                    Send OTP
                  </button>
                </div>
              </div>
              <h4>{msg}</h4>
            </>
          ) : (
            <>
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="otp">
                  Enter OTP
                </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control"
                    id="otp"
                    placeholder="Enter otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
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
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Signup
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Signup;
