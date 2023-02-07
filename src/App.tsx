import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCustomer from "./components/AddCustomer";
import UpDateCustomer from "./components/UpDateCustomer";
import Login from "./components/Login";
import Customer from "./components/Customer";
import Register from "./components/Register";
import Logo from "./components/Logo";
import { ToastContainer } from "react-toastify";

function App() {
  let [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    sessionStorage.getItem("isLoggedIn") === "true" ? true : false
  );
  return (
    <div className="App">
      <Router>
        <ToastContainer/>
        <Logo isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/customers" element={<Customer />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/update-customer/:id" element={<UpDateCustomer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
