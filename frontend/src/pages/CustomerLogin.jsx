import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const CustomerLogin = () => {
  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("customer123");
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

      if (role !== "CUSTOMER") {
        setError("This is not a customer account.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email)

      navigate("/customer/transactions");
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
        <h2>Customer Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Email
            <input
              type="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              placeholder="Minimum 6 Characters"
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
          Are you a new Customer?
          <button
  className="link-btn"
  type="button"
  onClick={() => navigate("/customer/register")}
>
Register Now
</button>
        </p>
      </div>
    </div>
  );
};

export default CustomerLogin;
