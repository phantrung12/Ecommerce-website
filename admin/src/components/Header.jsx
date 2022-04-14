import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { signout } from "../redux/actions/action";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="signin" className="nav-link">
            Sign in
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="signup" className="nav-link">
            Sign up
          </NavLink>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={logout}
            style={{ cursor: "pointer" }}
          >
            Sign out
          </span>
        </li>
      </Nav>
    );
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        bg="dark"
        variant="dark"
        style={{ zIndex: 1 }}
      >
        <Container fluid>
          <Link to="/" className="navbar-brand">
            Admin Dashboard
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            {auth.authenticate
              ? renderNonLoggedInLinks()
              : renderLoggedInLinks()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
