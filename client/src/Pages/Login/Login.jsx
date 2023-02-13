import React, { useState } from "react";

export default function Login({isLogin}) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  function handleChange(evt) {
    const value = evt.target.value;
    setCredentials({
      ...credentials,
      [evt.target.name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin") {
      localStorage.setItem("adminLogin", "true");
      isLogin(true);
    }
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Username : </label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Password : </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
