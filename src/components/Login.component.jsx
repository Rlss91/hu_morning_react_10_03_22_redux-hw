import { useState } from "react";
import { useDispatch } from "react-redux";
import Joi from "joi-browser";
import axios from "axios";

import { authActions } from "../store/auth";
import loginSchema from "../validation/login.validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateLogin = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });
    const { error } = validateLogin;
    // const error = validateLogin.error
    if (error) {
      console.log(error);
    } else {
      try {
        const responseFromServer = await axios.post("/users/login", {
          email,
          password,
        });
        console.log("responseFromServer", responseFromServer);
        localStorage.setItem("token", responseFromServer.data.token);
        dispatch(authActions.login());
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Login;
