import {
  FaUserSecret,
  FaRegEdit,
  FaBookReader,
  FaRegFileAlt,
  FaVolleyballBall,
  FaInfo,
  FaLuggageCart,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosMenu, IoIosPerson, IoIosLogOut } from "react-icons/io";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";


function Sidebar({ children }) {
  const Name = sessionStorage.getItem("myName");
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaBookReader />,
    },
    {
      path: "/showsite",
      name: "show site",
      icon: <FaRegEdit />,
    },
    {
      path: "/admin",
      name: "Admin",
      icon: <FaUserSecret />,
    },
    {
      path: "/",
      name: "Mylist",
      icon: <FaLuggageCart />,
    },
  ];

  return (
    <div className="sid-container">
      <div className="sidebar">
        <div className="top_section">
          <div className="icon">
            <FaVolleyballBall />
          </div>
          <div className="link d-none d-sm-inline">Cognisity App </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link text-deactron"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="ms-3 d-none d-sm-inline">{item.name}</div>
          </NavLink>
        ))}
      </div>

      <main>
        <NavScrollExample  />
        {children}
      </main>
    </div>
  );
}

export default Sidebar;

export function NavScrollExample() {
  const myname = sessionStorage.getItem("myname");
  const myOrgination=sessionStorage.getItem("myOrgination")
  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const [mailopen,setMailopen]=useState(false)
  console.log(change);
  const changesty = () => {
    if (change == true) {
      setChange(false);
    } else {
      setChange(true);
    }
  };
  function logout() {
    sessionStorage.clear();
    navigate("/login");
  }
  return (
    <div>
      <Navbar className="nav-clr" expand="lg">
        <Container fluid>
          <Navbar.Brand
            href="#"
            style={{ color: "gold", fontSize: "30px" }}
            className="title"
          >
           <span className="name-top">{myname}</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll">
            <span>
              <IoIosMenu />
            </span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll" >
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu">
            <button type="button" className="top-icon-btn">
                  <FaInfo />
                </button>
                <button type="button" className="top-icon-btn">
                  <a href="mailto:someone@example.com"><MdEmail /></a>
                </button>
                <button type="button" className="top-icon-btn">
                <a href="tel:+919361592747"><FaPhoneAlt /></a> 
                </button>
                <button
                  type="button"
                  className="top-icon-btn"
                  onClick={() => navigate("/dashboard")}
                >
                  <FaHome />
                </button>
              <li className="nav-item dropdown">
                <button
                  className={`nav-link dropdown-toggle ${
                    change === true ? "show" : ""
                  }`}
                  id="navbarDropdown"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={change}
                  value={change}
                  onClick={(e) => changesty()}
                >
                  <div className="profile-pic">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz-dSbbpNWBQ8jn0wehN-QYp2CjBSHgdgeRw&s"
                      alt="Profile Picture"
                    />
                  </div>
                </button>
                <ul
                  className={`dropdown-menu ${change === true ? "show" : ""}`}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => navigate("/updateuser")}
                    >
                      <IoIosPerson /> Account
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => logout()}
                    >
                      <IoIosLogOut /> Log Out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {mailopen===true ? <ButtonMailto mailto="spragul33@gmail.com"/>:""}
    </div>
  );
}




