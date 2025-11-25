import { useNavigate, Link } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/customer/login");
  };

  return (
    <div className="app-root">
      {/* 🔷 NAVBAR */}
      <header className="navbar">
        <div className="navbar-left">
          <img src="/vite.svg" alt="Bank Logo" className="logo" />
          <div>
            <h3 className="brand">Simple Banking System (Enpointe.io)</h3>
            <p className="subtitle">Secure Banking Portal</p>
          </div>
        </div>

        <div className="navbar-right">
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
              <Link to="/customer/login" className="link-btn">
                Customer Login
              </Link>
              <Link to="/banker/login" className="link-btn">
                Banker Login
              </Link>
            </>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main className="main-content">{children}</main>

      {/* FOOTER */}
      <footer className="footer">
        <span>© 2025 Simple Banking System - Enpointe.io Assignment</span>
        <div className="footer-links">
          <Link to="/customer/login">Customer Login</Link>
          <Link to="/banker/login">Banker Login</Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
