import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";
import { toast } from "react-toastify"; // Import toast
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import SearchBox from "../screens/SearchBox";
import { resetCart } from "../redux/slices/cartSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
      toast.success(res?.data?.message || "Success!");
      // localStorage.removeItem("userInfo");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              {/* <img
              src="https://t4.ftcdn.net/jpg/03/37/25/51/360_F_337255148_9tccNfphQtFZVLewTLZvqJikiUtuyeix.jpg"
              alt="proShop"
              style={{ height: "25px", width: "25px" , gap:"5px"}}
            /> */}
              EliteBazaar
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart />
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo && userInfo.isAdmin ? (
                <NavDropdown title={userInfo.name} id="adminmenu">
                  <LinkContainer to="admin/productlist">
                    <NavDropdown.Item>Products List </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="admin/userslist">
                    <NavDropdown.Item>Users List </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="admin/orderslist">
                    <NavDropdown.Item>Orders List </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="inventory">
                    <NavDropdown.Item>Inventory</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
