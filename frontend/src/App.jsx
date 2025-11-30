import { NavLink, Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <section className="app">
      <header>
        <NavLink to="/">All Users</NavLink>
        <NavLink to="register">Register</NavLink>
        <NavLink to="login">Login</NavLink>
      </header>

      <main>
        <Outlet />
      </main>
    </section>
  );
}

export default App;
