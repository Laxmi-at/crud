import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setMessage(""); // Clear previous messages on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordReg = /^[a-zA-Z0-9]{8,10}$/;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!emailReg.test(email)) {
      setMessage("Enter a valid email.");
      return;
    }
    if (!passwordReg.test(password)) {
      setMessage("Password must be 8–10 letters or numbers.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/users/login",
        {
          ...user,
        }
      );
      setMessage("Login successful!");

      // Store token if backend sends one
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setUser({ email: "", password: "" });
    } catch (error) {
      setMessage(error.response?.data?.messsage || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {message && <h4>{message}</h4>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Login..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
