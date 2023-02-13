import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";

export default function Admin() {
  const [login, isLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("adminLogin") === "true") {
      isLogin(true);
    } else {
      isLogin(false);
    }
  }, []);
  return login ? <Dashboard /> : <Login isLogin={isLogin} />;
}
