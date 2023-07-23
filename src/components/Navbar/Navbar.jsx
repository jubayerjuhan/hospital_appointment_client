import logo from "../../assets/logo.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" className="navbarImage" />
        </a>

        <ul className="d-flex gap-4 navlinks mb-0">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/book-appointment">
              Book Appointment
            </a>
          </li>
        </ul>

        {/* Right Aligned Link */}
        <ul className="navbar-nav navbarButtons">
          <li className="nav-item">
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-info"
              onClick={() => (window.location.href = "/sign-up")}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
