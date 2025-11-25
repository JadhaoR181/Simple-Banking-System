import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/customer/login");
  };

  return (
    <div className="app-root">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-left">
          <img src="/vite.svg" alt="Bank Logo" className="logo"/>
          <div>
            <h3 className="brand">Simple Banking System</h3>
            <p className="subtitle">Secure Banking Portal</p>
          </div>
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="navbar-right desktop-menu">
          {role ? (
            <>
              <span className="nav-user">
                {name} <span className="role-chip">({role})</span>
              </span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/customer/login" className="link-btn">Customer Login</Link>
              <Link to="/banker/login" className="link-btn">Banker Login</Link>
            </>
          )}
        </div>

        {/* MOBILE MENU ICON */}
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* MOBILE DROPDOWN */}
        {menuOpen && (
          <div className="mobile-menu">
            {role ? (
              <>
                <p className="mobile-user">{name} ({role})</p>
                <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/customer/login" onClick={() => setMenuOpen(false)}>Customer Login</Link>
                <Link to="/banker/login" onClick={() => setMenuOpen(false)}>Banker Login</Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* MAIN SECTION */}
      <main className="main-content">{children}</main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Simple Banking System</p>
        <div className="footer-links">
          <Link to="/customer/login">Customer Login</Link> |
          <Link to="/banker/login">Banker Login</Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
