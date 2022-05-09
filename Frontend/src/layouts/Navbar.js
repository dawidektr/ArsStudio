import React from "react";
import Navigation from "../components/Navigation/Navigation";
import MobileNavigation from "../components/Navigation/MobileNavigation";
import "../styles/Navigation/Navigation.scss";
const NavBar = () => {
  return (
    <div className="NavBar">
      <Navigation />
      <MobileNavigation />
    </div>
  );
};

export default NavBar;
