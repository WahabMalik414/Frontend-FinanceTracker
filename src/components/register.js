import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [salary, setSalary] = useState(0);
  const navigate = useNavigate();
  //Implement okay response here!
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3005/user/register",
        withCredentials: "true",
        data: { userName, email, password, salary },
      });
      setUserName("");
      setEmail("");
      setPassword("");
      setSalary("");
      if (response.status === 200) {
        alert("Successfully registered!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 500) {
        alert("User already registered, please proceed to login!");
        navigate("/login");
      } else if (error.response.status === 404) {
        alert("Can't create user, please try again!");
      }
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5 mb-3">
            <h1 className="text-center">Sign up</h1>
            <form onSubmit={handleSubmit} className="signin-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                />
                <div className="form-group">
                  <label htmlFor="salary">Salary:</label>
                  <input
                    type="text"
                    id="salary"
                    className="form-control"
                    onChange={(e) => setSalary(e.target.value)}
                    value={salary}
                    required
                  />
                </div>
              </div>
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
                  Register
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                  className="btn btn-danger signin-button "
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
