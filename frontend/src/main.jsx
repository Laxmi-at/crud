import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Users from "./pages/Users.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ErrorPageWrapper from "./pages/ErrorPageWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      import ErrorPage from "./components/ErrorPage.jsx";
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Users />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="error" element={<ErrorPageWrapper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
