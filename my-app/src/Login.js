import { useState } from "react";

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state

  const handleClick = () => {
    const messages = [];

    if (userName === "") messages.push("User name cannot be blank");
    if (password === "") messages.push("Password cannot be blank");

    if (messages.length === 0) {
      setMessage(`Welcome ${userName} to the world of React JS!`);
      setUserName("");
      setPassword("");
      setShowPassword(false);
    } else {
      alert(messages.join("\n"));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{props.title}</h2>

      <div>
        <label>
          User Name:{" "}
          <input
            type="text"
            placeholder="Enter user id"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
      </div>
      <br />

      <div>
        <label>
          Password:{" "}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ paddingRight: "30px" }}
          />
        </label>
        {/* 👁️ Toggle Icon */}
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            cursor: "pointer",
            marginLeft: "10px",
            fontSize: "20px",
            userSelect: "none",
          }}
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>

      <br />
      <button onClick={handleClick}>Submit</button>
      <br />
      <h3 style={{ color: "green" }}>{message}</h3>
    </div>
  );
}

export default Login;