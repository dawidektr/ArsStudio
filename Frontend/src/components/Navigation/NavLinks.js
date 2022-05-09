import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const list = [
  {
    name: "strona główna",
    path: "/",
    exact: true
  }
];

const NavLinks = (props) => {
  const animateFrom = { opacity: 0, y: -40 };
  const animatoTo = { opacity: 1, y: 0 };
  const menu = list.map((item, index) => {
    const delay = 0.07 * index;
    return (
      <motion.li
        initial={animateFrom}
        animate={animatoTo}
        transition={{ delay: delay }}
        onClick={() => props.isMobile && props.closeMobileMenu()}
        key={item.name}
      >
        <NavLink to={item.path} exact={item.exact ? item.exact : false}>
          {item.name}
        </NavLink>
      </motion.li>
    );
  });

  return <ul>{menu}</ul>;
};

export default NavLinks;
