import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3005/user/login",
        data: { email, password },
        withCredentials: true,
      });
      console.log(response?.data);
      const accessToken = response?.data?.accessToken;
      //const roles = response?.data?.roles;
      setEmail("");
      setPassword("");
      setSuccess(true);
      navigate("/products");
    } catch (error) {}
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 mb-3">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button className="btn btn-primary signin-button">Sign In</button>
          </form>
          <p>Want an account?</p>
          <span className="line">
            {/* Put react router link here */}
            <a href="#">Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
};
