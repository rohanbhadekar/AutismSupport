import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NotFound() {
  const [counter, setCounter] = useState(5);

  const navigate = useNavigate();
  // Effect to set the document title and redirect after a delay
  useEffect(() => {
    document.title = "404 - Not Found";
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // Redirect after 5 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]); //explaining the dependency array

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>404 - Page Not Found 🚫</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}
      >
        ⬅️ Back to Home
      </Link>
      <p>You will be redirected to the home page in {counter} seconds.</p>
      <x />
    </div>
  );
}

export default NotFound;
