import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

const CustomerRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("customer123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.register(name, email, password);
      alert("Registration Successful!");
      navigate("/customer/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page-center">
      <div className="card card-small">
        <h2>Customer Registration</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              value={name}
              placeholder="e.g. John Doe"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email Address
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

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="helper-text">
          Already have an account?{" "}
          <button
            type="button"
            className="link-btn"
            onClick={() => navigate("/customer/login")}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default CustomerRegister;
