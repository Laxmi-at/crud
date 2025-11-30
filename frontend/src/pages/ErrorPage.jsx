import { useNavigate } from "react-router-dom";

const ErrorPage = ({ status = 500, message = "Something went wrong" }) => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Error {status}</h1>
      <p>{message}</p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default ErrorPage;
