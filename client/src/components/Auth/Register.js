import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";


function Register({ history }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errors, setErrors] = useState([]);

  const submit = (event) => {
    event.preventDefault();
    Register({
      username,
      email,
      password,
      confirmPassword,
      firstName,
      lastName
    })
      .then((user) => history.push("/"))
      .catch((err) => {
        setErrors(err.messages || ["Whoops! Something unexpected happened..."]);
      });
  };

  return (
    <form onSubmit={submit}>
      <h1>Register</h1>
      <ul>
        {errors && errors.map((message, i) => <li key={i}>{message}</li>)}
      </ul>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="firstName"
          required
          placeholder="John"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="lastName"
          required
          placeholder="Doe"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
      <p>
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
}

export default withRouter(Register);
