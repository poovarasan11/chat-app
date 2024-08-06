import React from "react";
import logo from "../assets/logo3.png";

const AuthLayouts = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center h-15 shadow-md bg-white">
        <img src={logo} alt="app logo" width={100} height={40} />
      </header>
      {children}
    </>
  );
};

export default AuthLayouts;
