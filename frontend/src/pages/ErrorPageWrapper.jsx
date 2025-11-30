import { useLocation } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";

const ErrorPageWrapper = () => {
  const location = useLocation();
  const { status, message } = location.state || {};
  return <ErrorPage status={status} message={message} />;
};

export default ErrorPageWrapper;
