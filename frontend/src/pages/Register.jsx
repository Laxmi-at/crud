import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // For inline messages
  const [loading, setLoading] = useState(false);

  const { name, age, email, password } = user;

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setMessage(""); // clear previous message
  };

  // Validation regex
  const nameReg = /^[a-zA-Z\s]{3,10}$/;
  const ageReg = /^(?:[1-9]|[1-9][0-9]|1[01][0-9]|120)$/;
  const passwordReg = /^[a-zA-Z0-9]{8,10}$/;
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!nameReg.test(name)) {
      setMessage("Name: only letters and spaces, 3–10 characters.");
      return;
    }
    if (!ageReg.test(age)) {
      setMessage("Age must be between 1 and 120.");
      return;
    }
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
      // Send data to backend via relative /api/ URL
      await axios.post("/api/users/register", { ...user });

      setMessage("Registration successful!");

      // Clear form
      setUser({ name: "", age: "", email: "", password: "" });

      // Optional: redirect to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      // Inline error message
      setMessage(error.response?.data?.message || "Server error, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      {message && (
        <h4 style={{ color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </h4>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          autoComplete="name"
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          value={age}
          onChange={handleChange}
          autoComplete="off"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          autoComplete="email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
