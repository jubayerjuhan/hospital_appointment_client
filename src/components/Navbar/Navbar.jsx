import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { BiUserCircle } from "react-icons/bi";
import "./navbar.css";

const Navbar = () => {
  const { loggedIn, user } = useSelector((state) => state.user);
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
        {loggedIn ? (
          <div className="d-flex align-items-center">
            <BiUserCircle size={40} className="text-primary mr-2" />
            <p className="mb-0 text-muted">{user?.name}</p>
            {user.role === "admin" && (
              <button
                className="btn btn-info ml-4"
                onClick={() => (window.location.href = "/all-appointments")}
              >
                Admin Panel
              </button>
            )}
            <button
              className="btn btn-primary ml-4"
              onClick={() => (window.location.href = "/my-appointments")}
            >
              My Appointments
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
