import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Nav,
  NavItem,
  Navbar,
  NavbarToggler,
  Collapse,
  NavbarBrand,
} from "reactstrap";

function Header(props) {
  const [isNavOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!isNavOpen);
  return (
    <Navbar color="dark" dark expand="md">
      <div className="container">
        <NavbarBrand className="mr-auto" href="/home">
          GRIP Bank
        </NavbarBrand>
        <NavbarToggler onClick={toggleNav} />
        <Collapse className="justify-content-end" isOpen={isNavOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/customer">
                Customers
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to="/transactions">
                Transactions History
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
