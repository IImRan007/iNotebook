import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Signup = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let history = useHistory();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    // save the auth token and redirect
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history.push("/");
      showAlert("Account Created Succesfully", "success");
    } else {
      showAlert("Invalid Details", "danger");
    }
  };

  return (
    <>
      <h2 className="mt-3 mb-3">Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            value={credentials.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={handleChange}
            value={credentials.cpassword}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Signup;
