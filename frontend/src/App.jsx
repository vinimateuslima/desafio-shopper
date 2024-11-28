import "./App.css";

import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover
        theme="light"
      />

      <div className="container">
        <Navbar/>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
