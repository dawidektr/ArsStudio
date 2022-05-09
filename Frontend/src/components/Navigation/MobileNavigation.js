import NavLinks from "./NavLinks";
import { CgMenu } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const hamburgerIcon = (
    <CgMenu
      onClick={() => setOpen(!open)}
      className="hamburger"
      size="40px"
      color="white"
    />
  );

  const closeIcon = (
    <CgClose
      onClick={() => setOpen(!open)}
      className="hamburger"
      size="40px"
      color="white"
    />
  );
  const closeMobileMenu = () => setOpen(false);
  return (
    <nav className="mobileNavigation">
      {open ? closeIcon : hamburgerIcon}
      {open && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu} />}
    </nav>
  );
};

export default MobileNavigation;
