import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const BankerLogin = () => {
  const [email, setEmail] = useState("banker1@example.com");
  const [password, setPassword] = useState("banker123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authApi.login(email, password);
      const { token, role, userId, name } = res.data;

      if (role !== "BANKER") {
        setError("This is not a banker account.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);

      navigate("/banker/accounts");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page-center">
      <div className="card card-small">
        <h2>Banker Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <div className="alert alert-error">{error}</div>}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="helper-text">
          Are you a customer?{" "}
          <button
            className="link-btn"
            type="button"
            onClick={() => navigate("/customer/login")}
          >
            Customer Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default BankerLogin;
