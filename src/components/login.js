import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3005/user/login",
        data: { email, password },
        withCredentials: true,
      });
      setEmail("");
      setPassword("");
      navigate("/products");
    } catch (error) {}
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 mb-3">
          <h1 className="text-center">Sign In</h1>
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
            <div className="pt-3">
              <button className="btn btn-primary signin-button me-2">
                Sign In
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
                className="btn btn-success signin-button "
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
