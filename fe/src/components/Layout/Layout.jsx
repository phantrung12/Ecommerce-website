import React from "react";
import Header from "../Header/Header";
import Menuheader from "../MenuHeader/Menuheader";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <Menuheader />
      {props.children}
    </div>
  );
};

export default Layout;
