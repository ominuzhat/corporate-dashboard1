import React from "react";
import { Outlet } from "react-router-dom";

const Accounts: React.FC = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default Accounts;
