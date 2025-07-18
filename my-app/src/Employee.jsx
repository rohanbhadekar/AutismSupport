import { useEffect, useState } from "react";

function Employee({ initialEmpList }) {
  const [empList, setEmpList] = useState(initialEmpList || []);
  const [empName, setEmpName] = useState("");
  const [empLastName, setLastEmpName] = useState("");
  const [empfirstNameSearch, setEmpfirstNameSearch] = useState("");
  const [empLastNameSearch, setEmpLastNameSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const AddUpdateList = () => {
    if (empName.trim() === "" || empLastName.trim() === "") {
      alert("Please enter both first and last name");
      return;
    }

    if (editId === null) {
      const id = empList.length > 0 ? empList[empList.length - 1].id : 0;
      const newEmp = { id: id + 1, empName, empLastName };
      setEmpList([...empList, newEmp]);
    } else {
      const updated = empList.map((emp) =>
        emp.id === editId
          ? { ...emp, empName, empLastName }
          : emp
      );
      setEmpList(updated);
    }
    setEmpName("");
    setLastEmpName("");
    setEditId(null);
  };

  useEffect(() => {
    console.log("Content Rendered!");
  }, []);

  useEffect(() => {
    console.log("list updated!");
  }, [empList]);

  useEffect(() => {
    console.log("name changed!");
  }, [empName]);

  const handleDelete = (id) => {
    const updated = empList.filter((emp) => emp.id !== id);
    setEmpList(updated);
    // If editing the deleted employee, reset form
    if (editId === id) {
      setEmpName("");
      setLastEmpName("");
      setEditId(null);
    }
  };

  const handleCancel = () => {
    setEmpName("");
    setLastEmpName("");
    setEditId(null);
  };

  const handleEdit = (emp) => {
    setEmpName(emp.empName);
    setLastEmpName(emp.empLastName);
    setEditId(emp.id);
  };

  // Filter and sort employees by search and Last Name
   
  // Filter and sort employees by search and name
  const filteredEmpList = empList.filter((emp) =>
    emp.empName.toLowerCase().includes(empfirstNameSearch.toLowerCase()) &&
    emp.empLastName.toLowerCase().includes(empLastNameSearch.toLowerCase())
  );
  const sortedEmpList = [...filteredEmpList].sort((a, b) =>
    a.empName.localeCompare(b.empName)     

  );

  return (
    <div>
      <h1>
        <input
          type="text"
          placeholder="Search employee by first name"
          value={empfirstNameSearch}
          onChange={(e) => setEmpfirstNameSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search employee by last name"
          value={empLastNameSearch}
          onChange={(e) => setEmpLastNameSearch(e.target.value)}
        />
      </h1>
      <h2>Employees</h2>
      <input
        type="text"
        placeholder="Enter employee first name"
        value={empName}
        onChange={(e) => setEmpName(e.target.value)}
      />{" "}
      &nbsp;
      <input
        type="text"
        placeholder="Enter employee last name"
        value={empLastName}
        onChange={(e) => setLastEmpName(e.target.value)}
      />{" "}
      &nbsp;
      <button onClick={AddUpdateList}>
        {editId !== null ? "Update" : "Add to list"}
      </button>
      {editId !== null && (
        <button onClick={handleCancel}>Cancel</button>
      )}
      <ul>
        {sortedEmpList.map((emp) => (
          <li key={emp.id}>
            {`${emp.id} - ${emp.empName} ${emp.empLastName}`}{" "}
            <button onClick={() => handleEdit(emp)}>✏️ Edit</button>{" "}
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${emp.empName} ${emp.empLastName}?`
                  )
                ) {
                  handleDelete(emp.id);
                }
              }}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employee;
