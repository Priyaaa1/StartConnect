import { useEffect, useState, useRef } from "react";
import { scroller } from "react-scroll";
import { useLocation, NavLink } from "react-router-dom";
import logo from "../../assets/logo2.png";
import menu_icon from "../../assets/menu-icon.png";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../features/theme";
import moonIcon from "./moon.jpg";
import sunIcon from "./sun.jpg";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [visible, setVisible] = useState(true);
  const isDark = useSelector((state) => state.theme.value);
  const theme = "header-light";
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const handleThemeChange = () => {
    dispatch(changeTheme());
  };

  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setSticky(currentScrollY > 200);

      if (currentScrollY > lastScrollY) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.classList.contains('menu-icon')) {
        setMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const scrollToHero = () => {
    scroller.scrollTo("hero", {
      smooth: true,
      offset: 0,
      duration: 500,
    });
  };

  const scrollToAbout = () => {
    scroller.scrollTo("about", {
      smooth: true,
      offset: -260,
      duration: 500,
    });
  };

  const scrollToTestimonials = () => {
    scroller.scrollTo("testimonials", {
      smooth: true,
      offset: -260,
      duration: 500,
    });
  };

  const scrollToFAQ = () => {
    scroller.scrollTo("accordian", {
      smooth: true,
      offset: -260,
      duration: 500,
    });
  };

  const scrollToContact = () => {
    scroller.scrollTo("contact", {
      smooth: true,
      offset: -260,
      duration: 500,
    });
  };

  return (
    <nav
      className={`container1 ${
        sticky ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
          ? "dark-nav"
          : ""
      } ${visible ? "" : "hidden-nav"} ${theme}`}
    >
      <NavLink to="/" onClick={scrollToHero}>
        <p>
          <b>Start Connect Hub</b>
        </p>
        <img src={logo} alt="" className="logo" />
      </NavLink>
      <ul className={mobileMenu ? "" : "hide-mobile-menu"} ref={menuRef}>
        <li>
          <div className="nav1">
            <NavLink to="/" onClick={scrollToHero}>
              Home
            </NavLink>
          </div>
        </li>
        <li>
          <div className="nav1">
            <NavLink to="/#about" onClick={scrollToAbout}>
              About
            </NavLink>
          </div>
        </li>
        <li>
          <div className="nav1">
            <NavLink to="/#tesimonials" onClick={scrollToTestimonials}>
              Testimonials
            </NavLink>
          </div>
        </li>
        <li>
          <div className="nav1">
            <NavLink to="/#accordian" onClick={scrollToFAQ}>
              FAQ's
            </NavLink>
          </div>
        </li>
        <li>
          <div className="nav1">
            <NavLink to="/#contact" onClick={scrollToContact}>
              Contact Us
            </NavLink>
          </div>
        </li>
        <li>
          <div className="nav1">
            <NavLink to="/feedback">Feedback</NavLink>
          </div>
        </li>
        <li>
          <NavLink to="/login">
            <button className="logIn">LOG IN</button>
          </NavLink>
        </li>
      </ul>
      <button
        className="theme-toggle-button"
        onClick={() => dispatch(changeTheme())}
        title="Change Theme"
      >
        <img src={isDark ? moonIcon : sunIcon} alt="Sun" />
      </button>
      <img
        src={menu_icon}
        alt=""
        className="menu-icon"
        onClick={toggleMenu}
      />
    </nav>
  );
};

export default Navbar;
