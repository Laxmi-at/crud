import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { name, age, email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setMessage(""); // Clear previous messages on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameReg = /^[a-zA-Z\s]{3,10}$/;
    const ageReg = /^(?:[1-9]|[1-9][0-9]|1[01][0-9]|120)$/;
    const passwordReg = /^[a-zA-Z0-9]{8,10}$/;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!nameReg.test(name)) {
      setMessage("Name: only characters, 3–10 letters.");
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

    // Send data to server
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:3000/api/users/register", { ...user });
      setMessage("Registration successful!");
      setUser({ name: "", age: "", email: "", password: "" });
    } catch (error) {
      setMessage(error.response?.data?.messsage || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      {message && <h4>{message}</h4>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          value={age}
          onChange={handleChange}
        />

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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
