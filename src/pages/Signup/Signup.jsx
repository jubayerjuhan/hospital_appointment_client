import { useState } from "react";
import client from "../../client/client";
import "./signUp.css";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [credentials, setCredentials] = useState({});

  const handleFieldChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    console.log(credentials, "credentials");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post("user/create-user", credentials);
      localStorage.setItem("accessToken", JSON.stringify(data.token));
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 login-background">
      <div className="card shadow login-card">
        <h2 className="mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Patient Name</label>
            <input
              type="name"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter name"
              onChange={(e) => handleFieldChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) => handleFieldChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handleFieldChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
