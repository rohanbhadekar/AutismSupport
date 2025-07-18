import { useEffect, useState } from "react";

function Employee1({ initialEmpList }) {
  const [empList, setEmpList] = useState(initialEmpList || []);
  const [empName, setEmpName] = useState("");
  const [empLastName, setLastEmpName] = useState("");
  const [editId, setEditId] = useState(null);

  const AddUpdateList = () => {
    if (empName.trim() === "" || empLastName.trim() === "") {
      alert("Please enter both first and last name");
      return;
    }

    if (editId === null) {
      const id = empList.length > 0 ? empList[empList.length - 1].id : 1;
      const newEmp = { id: id + 1, empName: empName, empLastName: empLastName };

      setEmpList([...empList, newEmp]);
    } else {
    
      const updated = empList.map((emp) =>
        emp.id === editId
          ? { ...emp, empName: empName, empLastName: empLastName }
          : emp
      );

      setEmpList(updated);
    }
    setEmpName("");
    setLastEmpName("");
    setEditId("");
  };
  useEffect(() => {
    console.log("Content Rendered!");
    
  }, []);

  useEffect(() => {
    console.log("list updated!");
    empList.sort((a, b) => a.empName.localeCompare(b.empName));

  }, [empList]);

  useEffect(() => {
    console.log("name changed!");
  }, [empName]);

  const handleDelete = (id) => {
    const updated = empList.filter((emp) => emp.id !== id);
    //const updated = [...empList];     // Create a copy
    //updated.splice(index, 1);         // Remove item at index
    setEmpList(updated);
  };

  const handleEdit = (emp) => {
    setEmpName(emp.empName);
    setLastEmpName(emp.empLastName);
    setEditId(emp.id);
    // alert(i);
  };
  return (
    <ul>
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
        {" "}
        {editId > 0 ? "Update" : "Add to list"}{" "}
      </button>
      {empList.map((emp) => (
        <span>
          <li key={emp.id}>
            {`${emp.id} - ${emp.empName} ${emp.empLastName}`}{" "}
            <button onClick={() => handleEdit(emp)}>✏️ Edit</button>{" "}
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${emp.empName} ${emp.empLastName}?`
                  )
                )
                  handleDelete(emp.id);
              }}
            >
              ❌ Delete
            </button>
          </li>
        </span>
      ))}
    </ul>
  );
}

export default Employee1;
