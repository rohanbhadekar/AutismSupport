import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeAPI() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Employees from API</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} ({emp.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeAPI;
