import React from "react";
import { Link } from "react-router-dom";


import NavLinks from "./NavLinks";

const Navigation = () => {
  return (
    <nav className="normalNavigation">
      <Link className="logoMobileLink" to="/">
        <div className="logoMobile">
          <p>Strona główna</p>
        </div>
      </Link>
      <NavLinks />
    </nav>
  );
};

export default Navigation;
