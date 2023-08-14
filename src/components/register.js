import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        url: "https://financewapp-589026a6b4b3.herokuapp.com/user/register",
        withCredentials: "true",
        data: { userName, email, password, salary },
      });
      setUserName("");
      setEmail("");
      setPassword("");
      setSalary("");
      if (response.status === 200) {
        toast.success("Successfully registered!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 500) {
        toast.error("User already registered, proceed to login", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/login");
      } else if (error.response.status === 404) {
        toast.error("can't create user, try again", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
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
